import { useState } from "react";
import { Instagram, Twitter, Youtube, ChevronLeft, ChevronRight } from "lucide-react";
import t1 from "@/assets/trainer-1.jpg";
import t2 from "@/assets/trainer-2.jpg";
import t3 from "@/assets/trainer-3.jpg";

const trainers = [
  { name: "Marcus Vane", img: t1, spec: "Powerlifting · Hypertrophy", years: "11 yrs" },
  { name: "Elena Cruz", img: t2, spec: "HIIT · Metabolic Conditioning", years: "8 yrs" },
  { name: "Dario Kaine", img: t3, spec: "MMA · Fight Conditioning", years: "9 yrs" },
];

export function Trainers() {
  const [i, setI] = useState(0);
  const move = (d: number) => setI((v) => (v + d + trainers.length) % trainers.length);

  return (
    <section id="trainers" className="border-y border-border bg-card/30 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[11px] tracking-[0.3em] text-primary uppercase">The Coaches</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-5xl sm:text-6xl">
            TRAINER <span className="neon-text">SPOTLIGHT</span>
          </h2>
          <div className="flex gap-2">
            <button
              aria-label="Previous trainer"
              onClick={() => move(-1)}
              className="btn-ghost-volt rounded-lg p-3"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              aria-label="Next trainer"
              onClick={() => move(1)}
              className="btn-ghost-volt rounded-lg p-3"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(${-i} * (100% / 3 + 0px)))` }}
          >
            {trainers.map((t) => (
              <article
                key={t.name}
                className="w-full shrink-0 overflow-hidden rounded-2xl border border-border md:w-[calc((100%-3rem)/3)]"
              >
                <div className="relative">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    width={800}
                    height={1008}
                    className="h-96 w-full object-cover"
                  />
                  <div className="from-background absolute inset-0 bg-gradient-to-t to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-3xl">{t.name}</h3>
                  <p className="mt-1 text-xs tracking-[0.18em] text-primary uppercase">
                    {t.spec}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Certified S&amp;C coach · {t.years} on the floor
                  </p>
                  <div className="mt-5 flex gap-3 text-muted-foreground">
                    <a href="#contact" aria-label="Instagram" className="hover:text-primary">
                      <Instagram className="size-4" />
                    </a>
                    <a href="#contact" aria-label="Twitter" className="hover:text-primary">
                      <Twitter className="size-4" />
                    </a>
                    <a href="#contact" aria-label="YouTube" className="hover:text-primary">
                      <Youtube className="size-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
