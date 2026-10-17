"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  AudioLines,
  CalendarDays,
  Check,
  ChevronDown,
  Mail,
  MessageSquare,
  Smartphone,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Spieler, type Ladestand } from "./kamerafahrt-spieler";

/*
 * Kamerafahrt durch das NexAI-Büro, gesteuert über das Scrollen.
 *
 * Die Sektion ist sechzehn Bildschirmhöhen lang (bei zehn kam man beim Lesen
 * nicht hinterher, Max 11.10.), darin klebt ein Bildschirm, und
 * die Scrollposition bestimmt das Filmbild — runter fährt die Kamera vorwärts,
 * hoch zurück. Gerendert ist der Film in Blender (Quelle: ~/Developer/NexAI/
 * NexAI-Film/buero), die Fenster mit den Produktpunkten sind HTML: scharf,
 * zweisprachig und für Suchmaschinen lesbar. Die Zeiten unten gehören zu den
 * Haltepunkten der Kamera (drehbuch.py) und dürfen sich nur mit dem Film ändern.
 *
 * Der Film liegt in zehn Teilstücken vor (siehe kamerafahrt-spieler.ts), alle
 * 10 Bilder ein Schlüsselbild, keine umsortierten Bilder, damit ein Sprung im
 * Film nichts kostet.
 */

const DAUER = 80.5; // Sekunden Film
const HERO_WEG = [0.6, 3.2] as const; // Hero-Text blendet in diesem Abschnitt aus
const BAND = [1.0, 5.0] as const; // hochkant: vom Vollbild zum 16:9-Band
const ENDE_AB = 74.5; // Schlussbild blendet ab hier ein

type StationKey = "voice" | "crm" | "chat" | "app" | "calendar" | "mail" | "sales";

const STATIONEN: { key: StationKey; von: number; bis: number; icon: LucideIcon }[] = [
  { key: "voice", von: 14.25, bis: 17.9, icon: AudioLines },
  { key: "crm", von: 19.6, bis: 26.6, icon: Users },
  { key: "chat", von: 27.2, bis: 32.8, icon: MessageSquare },
  { key: "app", von: 39.5, bis: 44.3, icon: Smartphone },
  { key: "calendar", von: 44.8, bis: 48.8, icon: CalendarDays },
  { key: "mail", von: 52.7, bis: 59.1, icon: Mail },
  { key: "sales", von: 62.9, bis: 69.9, icon: TrendingUp },
];

export type Station = { label: string; tag: string; title: string; points: string[] };

export type KamerafahrtTexte = {
  label: string;
  hint: string;
  loading: string;
  stationsLabel: string;
  stations: Record<StationKey, Station>;
  end: { title: string; description: string; primary: string; secondary: string };
  products: { slug: string; title: string }[];
};

// Teilstücke: 30 Bilder je Sekunde, 242 Bilder je Stück, 2415 Bilder insgesamt
const FPS = 30;
const BILDER_JE_TEIL = 242;
const BILDER = 2415;
const TEILE = Math.ceil(BILDER / BILDER_JE_TEIL);
const quellen = (groesse: 720 | 1080) =>
  Array.from({ length: TEILE }, (_, k) => `/film/kamerafahrt-${groesse}-${String(k).padStart(2, "0")}.mp4`);
const POSTER = "/film/kamerafahrt-poster.jpg";

function weich(a: number, b: number, x: number) {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

export function KamerafahrtFilm({
  texte,
  hero,
}: {
  texte: KamerafahrtTexte;
  /** Text des ersten Bildschirms, liegt auf dem ersten Filmbild */
  hero: React.ReactNode;
}) {
  const sektion = useRef<HTMLElement>(null);
  const buehne = useRef<HTMLDivElement>(null);
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const spieler = useRef<Spieler | null>(null);
  const intro = useRef<HTMLDivElement>(null);
  const schleier = useRef<HTMLDivElement>(null);
  const leiste = useRef<HTMLElement>(null);
  const ende = useRef<HTMLDivElement>(null);
  const fortschritt = useRef<HTMLDivElement>(null);
  const zeit = useRef(0);
  // Zuletzt gesetzte Werte: Stil und Zustand nur schreiben, wenn sie sich ändern
  const zuletzt = useRef({ aktiv: -2, heroWeg: false, ende: false, band: -1, laden: "" });
  const [aktiv, setAktiv] = useState(-1);
  const [heroWeg, setHeroWeg] = useState(false);
  const [endeSichtbar, setEndeSichtbar] = useState(false);
  const [ladeAnzeige, setLadeAnzeige] = useState<number | null>(null);
  const ohneBewegung = useReducedMotion();

  /** Filmzeit, die zur aktuellen Scrollposition gehört. */
  const zielzeit = useCallback(() => {
    const s = sektion.current;
    if (!s) return 0;
    const r = s.getBoundingClientRect();
    // Höhe der Bühne statt window.innerHeight: Die ändert sich auf dem Handy,
    // wenn die Adressleiste ein- und ausfährt, und der Film spränge mit.
    const lauf = r.height - (buehne.current?.offsetHeight ?? window.innerHeight);
    const p = lauf > 0 ? Math.min(Math.max(-r.top / lauf, 0), 1) : 0;
    return p * (DAUER - 1 / 30);
  }, []);

  /** Alles, was an der Filmzeit hängt: Bild, Einleitung, Fenster, Schluss. */
  const anwenden = useCallback((t: number) => {
    spieler.current?.ziel(t);
    const z = zuletzt.current;
    const h = weich(HERO_WEG[0], HERO_WEG[1], t);
    if (intro.current) intro.current.style.opacity = String(1 - h);
    if (schleier.current) schleier.current.style.opacity = String(1 - h);
    if (h > 0.95 !== z.heroWeg) setHeroWeg((z.heroWeg = h > 0.95));
    const band = Math.round(weich(BAND[0], BAND[1], t) * 1000) / 1000;
    if (band !== z.band) buehne.current?.style.setProperty("--band", String((z.band = band)));
    if (leiste.current) leiste.current.style.opacity = String(weich(3, 5, t));
    const e = weich(ENDE_AB, ENDE_AB + 3, t);
    if (ende.current) ende.current.style.opacity = String(e);
    if (e > 0.5 !== z.ende) setEndeSichtbar((z.ende = e > 0.5));
    if (fortschritt.current) fortschritt.current.style.transform = `scaleY(${t / DAUER})`;
    const a = STATIONEN.findIndex((st) => t >= st.von && t <= st.bis);
    if (a !== z.aktiv) setAktiv((z.aktiv = a));
  }, []);

  // Scrollen → Filmzeit. Läuft nur, solange die Sektion im Bild ist, und
  // gleitet dem Ziel nach, damit grobe Mausrad-Rasten weich werden.
  useEffect(() => {
    const s = sektion.current;
    if (!s) return;
    let raf = 0;
    let sichtbar = false;
    const schritt = () => {
      const ziel = zielzeit();
      const d = ziel - zeit.current;
      zeit.current = ohneBewegung || Math.abs(d) < 0.004 ? ziel : zeit.current + d * 0.14;
      anwenden(zeit.current);
      if (sichtbar) raf = requestAnimationFrame(schritt);
    };
    const io = new IntersectionObserver(([eintrag]) => {
      sichtbar = eintrag.isIntersecting;
      cancelAnimationFrame(raf);
      if (sichtbar) raf = requestAnimationFrame(schritt);
    });
    io.observe(s);
    // Einmal sofort, damit Einleitung und Fortschritt auch vor dem ersten Bild stimmen
    zeit.current = zielzeit();
    anwenden(zeit.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [anwenden, zielzeit, ohneBewegung]);

  // Teilstücke laden und abspielen. Große Fassung nur, wo sie auch zu sehen ist.
  useEffect(() => {
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;
    const sparen = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const pixel = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
    const s = new Spieler([a, b], quellen(sparen || pixel <= 1400 ? 720 : 1080), FPS, BILDER_JE_TEIL, BILDER, (stand: Ladestand) => {
      // Anzeige nur, solange an der aktuellen Stelle noch nichts da ist
      const text = stand.aktuellDa ? "" : String(Math.round(stand.anteil * 100));
      if (text !== zuletzt.current.laden) {
        zuletzt.current.laden = text;
        setLadeAnzeige(text ? Number(text) : null);
      }
    });
    spieler.current = s;
    s.ziel(zeit.current);
    return () => {
      s.zerstoeren();
      spieler.current = null;
    };
  }, []);

  /** Sprung zu einer Station über die Punkte am Rand. */
  const springe = (i: number) => {
    const s = sektion.current;
    if (!s) return;
    const st = STATIONEN[i];
    const lauf = s.offsetHeight - (buehne.current?.offsetHeight ?? window.innerHeight);
    const t = st.von + Math.min(1.2, (st.bis - st.von) / 3);
    const oben = s.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: oben + (t / (DAUER - 1 / 30)) * lauf, behavior: ohneBewegung ? "auto" : "smooth" });
  };

  const station = aktiv >= 0 ? STATIONEN[aktiv] : null;
  const versatz = ohneBewegung ? 0 : 1;

  return (
    <section
      ref={sektion}
      id="rundgang"
      aria-label={texte.label}
      className="relative h-[1600vh]"
    >
      <div ref={buehne} className="sticky top-0 h-svh overflow-hidden bg-bg">
        {/* Film: quer bildfüllend. Hochkant erst bildfüllend unter dem Hero-Text,
            dann schrumpft er beim Losfahren zum 16:9-Band unter der Kopfzeile
            (--band läuft von 0 nach 1). */}
        <div className="absolute inset-0 portrait:bottom-auto portrait:top-[calc(var(--band,0)_*_max(88px,13svh))] portrait:h-[calc(100svh_-_var(--band,0)_*_(100svh_-_56.25vw))]">
          {/* Zwei Videos übereinander: eins zeigt, das andere hält das nächste Stück bereit */}
          <video
            ref={videoA}
            className="absolute inset-0 h-full w-full object-cover"
            poster={POSTER}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
            tabIndex={-1}
          />
          <video
            ref={videoB}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
            tabIndex={-1}
          />
          {/* Oben unter der Kopfzeile abdunkeln, unten in die nächste Sektion */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/80 to-transparent portrait:h-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg/90 to-transparent portrait:h-10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-bg/45 to-transparent portrait:hidden" />
        </div>

        {/* Schleier hinter dem Hero-Text, damit er auf der hellen Fassade lesbar bleibt */}
        <div
          ref={schleier}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_48%,rgba(8,9,13,0.76)_0%,rgba(8,9,13,0.5)_55%,rgba(8,9,13,0.28)_100%)]"
        />

        {/* Fenster der aktiven Station */}
        <div className="absolute bottom-[6%] left-[3.4%] right-4 sm:right-auto portrait:inset-x-4 portrait:bottom-auto portrait:top-[calc(max(88px,13svh)+56.25vw+20px)]">
          <AnimatePresence mode="wait">
            {station && (
              <motion.div
                key={station.key}
                aria-hidden
                initial={{ opacity: 0, x: -28 * versatz }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOutExpo } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <InfoFenster
                  station={texte.stations[station.key]}
                  icon={station.icon}
                  versatz={versatz}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stationen am rechten Rand: zeigt, wo man ist, und springt per Klick */}
        <nav
          ref={leiste}
          aria-label={texte.stationsLabel}
          className="absolute right-8 top-1/2 hidden -translate-y-1/2 opacity-0 xl:block portrait:hidden"
        >
          <div className="relative rounded-2xl border border-white/[0.08] bg-bg/50 py-4 pl-4 pr-4 backdrop-blur-md">
            <div className="absolute bottom-6 right-[21px] top-6 w-px bg-white/10" />
            <div
              ref={fortschritt}
              className="absolute bottom-6 right-[21px] top-6 w-px origin-top bg-gradient-to-b from-blue via-violet to-purple"
              style={{ transform: "scaleY(0)" }}
            />
            <ol className="relative flex flex-col gap-5">
              {STATIONEN.map((st, i) => (
                <li key={st.key}>
                  <button
                    type="button"
                    onClick={() => springe(i)}
                    className="group flex w-full items-center justify-end gap-3"
                  >
                    <span
                      className={cn(
                        "text-[12px] font-medium tracking-wide transition-colors duration-300",
                        i === aktiv ? "text-fg" : "text-subtle group-hover:text-muted",
                      )}
                    >
                      {texte.stations[st.key].label}
                    </span>
                    <span
                      className={cn(
                        "size-[11px] rounded-full border transition-all duration-300",
                        i === aktiv
                          ? "border-transparent bg-gradient-to-br from-blue via-violet to-purple shadow-[0_0_14px_rgba(139,92,246,0.7)]"
                          : "border-white/25 bg-bg group-hover:border-white/50",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Schluss: dunkelt ab, Claim, alle Produkte, Erstgespräch */}
        <div
          ref={ende}
          inert={!endeSichtbar}
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-bg/80 px-6 opacity-0",
            endeSichtbar ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <div className="max-w-3xl text-center">
            <h2 className="text-gradient text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl">
              {texte.end.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-[17px] leading-relaxed text-muted">
              {texte.end.description}
            </p>
            <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
              {texte.products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="inline-flex h-9 items-center rounded-full border border-white/12 bg-white/[0.04] px-4 text-[13px] text-fg/85 backdrop-blur-sm transition-colors hover:border-blue/50 hover:text-fg"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" size="lg" withArrow>
                {texte.end.primary}
              </Button>
              <Button href="/produkte" size="lg" variant="secondary">
                {texte.end.secondary}
              </Button>
            </div>
          </div>
        </div>

        {/* Ladeanzeige, solange der Film noch kommt */}
        {ladeAnzeige !== null && (
          <div className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-bg/70 px-3 py-1.5 text-[12px] text-muted backdrop-blur-md">
            {texte.loading} · {ladeAnzeige} %
          </div>
        )}
      </div>

      {/* Hero-Text auf dem ersten Filmbild. Er klebt nicht, sondern läuft beim
          Scrollen ganz normal nach oben weg, während der Film stehen bleibt und
          losfährt — so wird auch auf kleinen Handys nichts abgeschnitten. */}
      <div
        ref={intro}
        inert={heroWeg}
        className="absolute inset-x-0 top-0 z-10 flex min-h-svh flex-col items-center justify-center px-6 pb-28 pt-28 sm:px-8 sm:pt-32"
      >
        <div className="w-full max-w-5xl">{hero}</div>
        <p className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-subtle">
          <ChevronDown className="size-4 motion-safe:animate-bounce" />
          {texte.hint}
        </p>
      </div>

      {/* Alle Fenster als Text, für Bildschirmleser und Suchmaschinen */}
      <div className="sr-only">
        {STATIONEN.map((st) => {
          const s = texte.stations[st.key];
          return (
            <div key={st.key}>
              <h3>
                {s.title} ({s.tag})
              </h3>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Glasfenster wie im Film: Kachel mit Zeichen, Kategorie, Titel, vier Haken. */
function InfoFenster({
  station,
  icon: Icon,
  versatz,
}: {
  station: Station;
  icon: LucideIcon;
  versatz: number;
}) {
  return (
    <div className="relative w-full max-w-[560px] overflow-hidden rounded-[22px] border border-white/[0.12] bg-[linear-gradient(180deg,rgba(19,20,32,0.58),rgba(8,9,13,0.74))] p-6 shadow-[0_18px_50px_-14px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:w-max sm:p-7 portrait:w-full portrait:max-w-none">
      {/* Lichtschein der Marke von links oben, heller Rand oben */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_110%_at_8%_0%,rgba(139,92,246,0.28),rgba(77,124,255,0.09)_45%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/10 via-white/30 to-white/10" />

      <div className="relative flex items-center gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-blue via-violet to-purple shadow-[0_6px_22px_-4px_rgba(115,90,255,0.6)] sm:size-[54px] sm:rounded-[16px]">
          <Icon className="size-6 text-white" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b3baff] sm:text-[11.5px]">
            {station.tag}
          </p>
          <h3 className="mt-1 text-balance text-[21px] font-semibold leading-[1.15] tracking-[-0.01em] sm:max-w-[420px] sm:text-[25px]">
            {station.title}
          </h3>
        </div>
      </div>

      <div className="relative mt-5 h-px bg-gradient-to-r from-white/15 to-white/[0.02]" />

      <motion.ul
        className="relative mt-5 flex flex-col gap-3"
        initial="aus"
        animate="an"
        variants={{ an: { transition: { delayChildren: 0.3, staggerChildren: 0.12 } } }}
      >
        {station.points.map((p) => (
          <motion.li
            key={p}
            className="flex items-start gap-3"
            variants={{
              aus: { opacity: 0, x: -12 * versatz },
              an: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeOutExpo } },
            }}
          >
            <span className="mt-[2px] grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue via-violet to-purple">
              <Check className="size-3 text-white" strokeWidth={3.2} />
            </span>
            <span className="text-[15px] leading-snug text-fg/90 sm:text-[16.5px]">{p}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
