import { useState } from "react";
import { motion } from "motion/react";
import bodybuilding from "@/assets/program-bodybuilding.jpg";
import cardio from "@/assets/program-cardio.jpg";
import crossfit from "@/assets/program-crossfit.jpg";
import mma from "@/assets/program-mma.jpg";

const programs = [
  {
    cat: "Bodybuilding",
    img: bodybuilding,
    title: "Hypertrophy Block",
    meta: "12 weeks · 5 days/wk",
  },
  { cat: "Cardio", img: cardio, title: "Engine Builder", meta: "8 weeks · 4 days/wk" },
  { cat: "Crossfit", img: crossfit, title: "Metcon Chaos", meta: "6 weeks · 5 days/wk" },
  { cat: "MMA", img: mma, title: "Fight Camp", meta: "10 weeks · 6 days/wk" },
  { cat: "Bodybuilding", img: crossfit, title: "Raw Strength", meta: "16 weeks · 4 days/wk" },
  { cat: "MMA", img: mma, title: "Striking Conditioning", meta: "8 weeks · 3 days/wk" },
];

const filters = ["All", "Bodybuilding", "Cardio", "Crossfit", "MMA"];

export function Programs() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? programs : programs.filter((p) => p.cat === active);

  return (
    <section id="programs" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-primary uppercase">Training</p>
          <h2 className="mt-3 text-5xl sm:text-6xl">
            PICK YOUR <span className="neon-text">BATTLEGROUND</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-all ${
                active === f
                  ? "btn-volt"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <motion.article
            key={p.title}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="group relative overflow-hidden rounded-2xl border border-border"
          >
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              width={800}
              height={1008}
              className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-[10px] tracking-[0.25em] text-primary uppercase">
                {p.cat}
              </span>
              <h3 className="mt-1 text-2xl">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.meta}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
