// Einfaches In-Memory-Ratenlimit pro IP (Muster aus app/api/booking/route.ts).
// Reicht für eine Single-Instance-Deployment; bei mehreren Instanzen zählt jede
// für sich — für einen Bot-Schutz am Bewerbungsformular ist das ausreichend.

export function createRateLimiter({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}): (key: string) => boolean {
  const hits = new Map<string, number[]>();

  return (key: string) => {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);

    if (hits.size > 5000) {
      for (const [k, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }
    return recent.length > limit;
  };
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
