"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Liest ?ref= / utm_* beim Aufruf der Vertriebspartner-Seite in den
 * sessionStorage. Bewusst ein Effekt statt useSearchParams: so bleibt die
 * Seite statisch, und der Browser ist die einzige Stelle, die die Parameter
 * sieht, bis jemand wirklich eine Bewerbung absendet.
 */
export function SourceCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
