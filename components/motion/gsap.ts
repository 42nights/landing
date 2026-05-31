import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once. useGSAP is safe to register on the server; ScrollTrigger
// touches the DOM, so only register it in the browser. gsap.registerPlugin is
// idempotent, but we guard registration behind a module-level flag so repeated
// imports never re-run it.
let registered = false;

if (!registered) {
  gsap.registerPlugin(useGSAP);
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  registered = true;
}

export { gsap, ScrollTrigger, useGSAP };
