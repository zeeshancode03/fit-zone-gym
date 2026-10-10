import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const HeroScene = lazy(() =>
  import("./HeroScene").then((m) => ({ default: m.HeroScene })),
);

const slides = [
  { title: "PUSH YOUR LIMITS", sub: "Strength built in the dark hours." },
  { title: "UNLEASH THE BEAST", sub: "Coaching that refuses average." },
  { title: "TRAIN LIKE STEEL", sub: "Every rep forged, every set tracked." },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-60" />
      <div className="absolute inset-0 md:left-1/3">
        {mounted && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="max-w-xl pt-28 pb-16">
          <span className="btn-ghost-volt inline-block rounded-full px-4 py-1.5 text-[11px] tracking-[0.25em]">
            Est. 2014 — 24/7 Access
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="mt-6 text-6xl sm:text-7xl lg:text-8xl">
                {(slides[i]?.title ?? "").split(" ").map((w, n) => (
                  <span key={n} className={n === 1 ? "neon-text block" : "block"}>
                    {w}
                  </span>
                ))}
              </h1>
              <p className="mt-5 max-w-sm text-base text-muted-foreground">{slides[i]?.sub}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#pricing" className="btn-volt rounded-lg px-7 py-3 text-sm">
              Start Free Trial
            </a>
            <a href="#programs" className="btn-ghost-volt rounded-lg px-7 py-3 text-sm">
              View Programs
            </a>
          </div>

          <div className="mt-12 flex gap-10">
            {[
              ["8.4K", "Members"],
              ["42", "Coaches"],
              ["120+", "Classes / week"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="display text-3xl">{n}</div>
                <div className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  {l}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-2">
            {slides.map((_, n) => (
              <button
                key={n}
                aria-label={`Slide ${n + 1}`}
                onClick={() => setI(n)}
                className={`h-1 rounded-full transition-all ${
                  n === i ? "bg-primary w-10" : "bg-border w-5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
