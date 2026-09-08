// Liest und schreibt die Sprachdateien direkt im GitHub-Repository.
//
// Warum GitHub und keine Datenbank: Das Repository bleibt die einzige Wahrheit.
// Änderungen über /admin landen in derselben Historie wie meine — mit Verlauf,
// Vergleich und „Revert“. Der Editor ist also nur eine bequemere Oberfläche für
// genau die Dateien, die es ohnehin gibt.
//
// Alle Dateien eines Speichervorgangs gehen in EINEN Commit (Git-Data-API):
// Deutsch und Englisch sind damit nie halb gespeichert, und ein einziges
// „Revert“ nimmt die komplette Änderung zurück.

const API = "https://api.github.com";

type RepoConfig = { owner: string; repo: string; branch: string; token: string };

export function githubConfig(): RepoConfig | null {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) return null;

  const slug = process.env.GITHUB_REPO?.trim() || "maximiliantrenk-wq/NexAI-Website";
  const [owner, repo] = slug.split("/");
  if (!owner || !repo) return null;

  return { owner, repo, branch: process.env.GITHUB_BRANCH?.trim() || "main", token };
}

export function githubConfigured(): boolean {
  return githubConfig() !== null;
}

async function call<T>(
  cfg: RepoConfig,
  path: string,
  init?: { method?: string; body?: unknown },
): Promise<T> {
  const response = await fetch(`${API}/repos/${cfg.owner}/${cfg.repo}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "nexai-website-admin",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    // Antworttext bewusst gekürzt und ohne Header — im Token-Fall darf nichts
    // Verwertbares in ein Log oder in die Oberfläche geraten.
    const detail = (await response.text().catch(() => "")).slice(0, 200);
    throw new Error(`GitHub ${response.status}: ${detail || response.statusText}`);
  }
  return (await response.json()) as T;
}

/** Inhalt einer Datei im aktuellen Stand des Branches. */
export async function readFile(path: string): Promise<string> {
  const cfg = githubConfig();
  if (!cfg) throw new Error("GITHUB_TOKEN fehlt");

  const data = await call<{ content: string; encoding: string }>(
    cfg,
    `/contents/${encodeURI(path)}?ref=${encodeURIComponent(cfg.branch)}`,
  );
  if (data.encoding !== "base64") throw new Error(`Unerwartete Kodierung: ${data.encoding}`);
  return Buffer.from(data.content, "base64").toString("utf8");
}

export type CommitResult = { sha: string; url: string };

/** Schreibt mehrere Dateien in einem einzigen Commit. */
export async function commitFiles(
  files: Record<string, string>,
  message: string,
): Promise<CommitResult> {
  const cfg = githubConfig();
  if (!cfg) throw new Error("GITHUB_TOKEN fehlt");

  const entries = Object.entries(files);
  if (entries.length === 0) throw new Error("Keine Dateien zu speichern");

  const ref = await call<{ object: { sha: string } }>(
    cfg,
    `/git/ref/heads/${encodeURIComponent(cfg.branch)}`,
  );
  const head = ref.object.sha;

  const headCommit = await call<{ tree: { sha: string } }>(cfg, `/git/commits/${head}`);

  const blobs = await Promise.all(
    entries.map(async ([path, content]) => {
      const blob = await call<{ sha: string }>(cfg, "/git/blobs", {
        method: "POST",
        body: { content, encoding: "utf-8" },
      });
      return { path, mode: "100644" as const, type: "blob" as const, sha: blob.sha };
    }),
  );

  const tree = await call<{ sha: string }>(cfg, "/git/trees", {
    method: "POST",
    body: { base_tree: headCommit.tree.sha, tree: blobs },
  });

  const commit = await call<{ sha: string; html_url: string }>(cfg, "/git/commits", {
    method: "POST",
    body: { message, tree: tree.sha, parents: [head] },
  });

  // Ohne `force`: Hat in der Zwischenzeit jemand anders gepusht, schlägt das
  // hier fehl, statt dessen Arbeit zu überschreiben.
  await call(cfg, `/git/refs/heads/${encodeURIComponent(cfg.branch)}`, {
    method: "PATCH",
    body: { sha: commit.sha, force: false },
  });

  return { sha: commit.sha, url: commit.html_url };
}
