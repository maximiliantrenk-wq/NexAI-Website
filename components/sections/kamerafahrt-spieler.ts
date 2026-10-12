/*
 * Spielt die Kamerafahrt aus zehn Teilstücken, gesteuert über eine Filmzeit.
 *
 * Warum Teilstücke: Der Film ist die Startseite, also scrollt man sofort los.
 * Als eine Datei (40 MB) stand er auf der Live-Seite rund zehn Sekunden still,
 * bis alles geladen war (Max, 11.10.2026: „hakt beim Scrollen“). Ein Stück hat
 * 2 bis 4 MB, das erste ist nach etwa einer Sekunde da, der Rest lädt im
 * Hintergrund — zuerst das Stück, auf das man gerade zuscrollt.
 *
 * Zwei Videos liegen übereinander: eins zeigt das aktuelle Stück, das andere
 * hält unsichtbar das Nachbarstück in Scrollrichtung bereit, schon auf das
 * erste bzw. letzte Bild gesprungen. An der Grenze wird nur umgeschaltet;
 * ein frisch geladenes Video an der Grenze würde sichtbar hängen.
 *
 * Jedes Stück wird ganz in den Speicher geladen (Blob). Über das Netz würde
 * jeder Sprung im Film nachladen, und iOS lädt Videos nicht im Voraus.
 */

type Platz = {
  video: HTMLVideoElement;
  teil: number; // welches Stück geladen ist, -1 = keins
  bereit: boolean;
  entsperrt: boolean;
};

export type Ladestand = {
  /** Anteil der geladenen Stücke, 0 bis 1 */
  anteil: number;
  /** Ist das Stück an der aktuellen Stelle schon da? */
  aktuellDa: boolean;
};

export class Spieler {
  private plaetze: [Platz, Platz];
  private sichtbar: 0 | 1 = 0;
  private adressen: (string | null)[];
  private laufend = new Set<number>();
  private steuerung = new AbortController();
  private teilJetzt = 0;
  private richtung = 1;
  private letzteZeit = 0;
  private aus = false;

  constructor(
    videos: [HTMLVideoElement, HTMLVideoElement],
    private quellen: string[],
    private fps: number,
    private bilderJeTeil: number,
    private gesamtBilder: number,
    private melden: (stand: Ladestand) => void,
  ) {
    this.plaetze = videos.map((video) => ({ video, teil: -1, bereit: false, entsperrt: false })) as [
      Platz,
      Platz,
    ];
    this.adressen = quellen.map(() => null);
    this.zeigen(0);
    this.nachladen();
  }

  /** Bild zur Filmzeit t zeigen. Wird je Bildschirmbild aufgerufen. */
  ziel(t: number) {
    if (this.aus) return;
    if (t !== this.letzteZeit) this.richtung = t > this.letzteZeit ? 1 : -1;
    this.letzteZeit = t;

    const teil = Math.min(Math.floor((t * this.fps) / this.bilderJeTeil), this.quellen.length - 1);
    const lokal = Math.min(Math.max(t - (teil * this.bilderJeTeil) / this.fps, 0), this.laenge(teil) - 0.5 / this.fps);
    if (teil !== this.teilJetzt) {
      this.teilJetzt = teil;
      this.nachladen();
    }

    const vorn = this.plaetze[this.sichtbar];
    const hinten = this.plaetze[1 - this.sichtbar];

    if (vorn.teil === teil && vorn.bereit) {
      this.springe(vorn, lokal);
    } else if (hinten.teil === teil && hinten.bereit) {
      // Das Nachbarstück liegt schon bereit: hinspringen und umschalten
      this.springe(hinten, lokal);
      this.zeigen(this.sichtbar === 0 ? 1 : 0);
    } else {
      // Stück fehlt noch: vorne auf dem Randbild stehen bleiben
      if (vorn.bereit) this.springe(vorn, teil > vorn.teil ? this.laenge(vorn.teil) - 0.5 / this.fps : 0);
      if (this.adressen[teil] && hinten.teil !== teil) this.belege(hinten, teil, lokal);
    }

    // Den freien Platz mit dem Nachbarn in Scrollrichtung vorbereiten
    const frei = this.plaetze[1 - this.sichtbar];
    const nachbar = this.teilJetzt + this.richtung;
    if (
      frei.teil !== nachbar &&
      nachbar >= 0 &&
      nachbar < this.quellen.length &&
      this.adressen[nachbar] &&
      this.plaetze[this.sichtbar].teil === this.teilJetzt
    ) {
      this.belege(frei, nachbar, this.richtung > 0 ? 0 : this.laenge(nachbar) - 0.5 / this.fps);
    }

    this.melden({
      anteil: this.adressen.filter(Boolean).length / this.quellen.length,
      aktuellDa: !!this.adressen[teil],
    });
  }

  zerstoeren() {
    this.aus = true;
    this.steuerung.abort();
    for (const p of this.plaetze) {
      p.video.removeAttribute("src");
      p.video.load();
    }
    for (const a of this.adressen) if (a) URL.revokeObjectURL(a);
  }

  /** Länge eines Stücks in Sekunden (das letzte ist kürzer). */
  private laenge(teil: number) {
    const bilder = Math.min(this.bilderJeTeil, this.gesamtBilder - teil * this.bilderJeTeil);
    return bilder / this.fps;
  }

  private springe(p: Platz, lokal: number) {
    const v = p.video;
    if (!v.seeking && Math.abs(v.currentTime - lokal) > 0.5 / this.fps) v.currentTime = lokal;
  }

  private zeigen(i: 0 | 1) {
    this.sichtbar = i;
    this.plaetze[i].video.style.opacity = "1";
    this.plaetze[1 - i].video.style.opacity = "0";
  }

  /** Ein Stück in einen Platz laden und auf `lokal` springen. */
  private belege(p: Platz, teil: number, lokal: number) {
    const adresse = this.adressen[teil];
    if (!adresse) return;
    p.teil = teil;
    p.bereit = false;
    const v = p.video;
    const fertig = () => {
      if (p.teil !== teil) return; // inzwischen neu belegt
      v.currentTime = lokal;
      p.bereit = true;
      // iOS zeigt angesprungene Bilder erst, nachdem einmal abgespielt wurde
      if (!p.entsperrt) {
        p.entsperrt = true;
        v.play()
          .then(() => v.pause())
          .catch(() => {});
      }
      this.ziel(this.letzteZeit);
    };
    v.addEventListener("loadeddata", fertig, { once: true });
    v.src = adresse;
    v.load();
  }

  /**
   * Fehlende Stücke laden, nächstgelegene zuerst, höchstens zwei gleichzeitig.
   * Solange das Stück an der aktuellen Stelle fehlt, lädt nur dieses: Zwei
   * gleichzeitig teilen sich die Leitung, und das erste Bild käme doppelt so
   * spät (live gemessen 4,6 s bis zum ersten bewegten Bild bei 4 MB/s).
   */
  private nachladen() {
    if (this.aus) return;
    const n = this.quellen.length;
    const reihe: number[] = [];
    for (let d = 0; d < n; d++) {
      for (const k of [this.teilJetzt + d * this.richtung, this.teilJetzt - d * this.richtung]) {
        if (k >= 0 && k < n && !reihe.includes(k)) reihe.push(k);
      }
    }
    const fehlt = !this.adressen[this.teilJetzt];
    for (const k of reihe) {
      if (this.adressen[k] || this.laufend.has(k)) continue;
      if (fehlt && k !== this.teilJetzt) break;
      if (!fehlt && this.laufend.size >= 2) break;
      this.laufend.add(k);
      fetch(this.quellen[k], { signal: this.steuerung.signal })
        .then((a) => {
          if (!a.ok) throw new Error(String(a.status));
          return a.blob();
        })
        .then((b) => {
          if (this.aus) return;
          this.adressen[k] = URL.createObjectURL(b);
          this.laufend.delete(k);
          this.nachladen();
          this.ziel(this.letzteZeit);
        })
        .catch(() => {
          this.laufend.delete(k);
          // Rückfall: direkt vom Server abspielen, Sprünge laden dann nach
          if (!this.aus) this.adressen[k] = this.quellen[k];
        });
    }
  }
}
