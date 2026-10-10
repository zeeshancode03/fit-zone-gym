import { useState } from "react";
import { Check } from "lucide-react";
import { TiltCard } from "./TiltCard";

const plans = [
  {
    name: "Starter",
    monthly: 29,
    perks: ["Open gym access", "Locker + towel", "2 group classes / month"],
  },
  {
    name: "Pro Gym",
    monthly: 59,
    featured: true,
    perks: [
      "24/7 unlimited access",
      "All group classes",
      "Monthly body composition scan",
      "Personalised program",
    ],
  },
  {
    name: "Elite",
    monthly: 99,
    perks: ["Everything in Pro Gym", "4 PT sessions / month", "Nutrition coaching", "Recovery suite"],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-28">
      <div className="text-center">
        <p className="text-[11px] tracking-[0.3em] text-primary uppercase">Membership</p>
        <h2 className="mt-3 text-5xl sm:text-6xl">
          NO CONTRACTS. <span className="neon-text">NO EXCUSES.</span>
        </h2>

        <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-border px-5 py-2.5">
          <span
            className={`text-xs tracking-[0.18em] uppercase ${!yearly ? "text-foreground" : "text-muted-foreground"}`}
          >
            Monthly
          </span>
          <button
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            onClick={() => setYearly((v) => !v)}
            className={`relative h-6 w-12 rounded-full transition-colors ${yearly ? "bg-primary" : "bg-secondary"}`}
          >
            <span
              className={`bg-background absolute top-1 size-4 rounded-full transition-all ${yearly ? "left-7" : "left-1"}`}
            />
          </button>
          <span
            className={`text-xs tracking-[0.18em] uppercase ${yearly ? "text-foreground" : "text-muted-foreground"}`}
          >
            Yearly <span className="text-primary">−20%</span>
          </span>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const price = yearly ? Math.round(p.monthly * 12 * 0.8) : p.monthly;
          return (
            <TiltCard key={p.name}>
              <div
                className={`glass relative h-full rounded-2xl p-7 ${
                  p.featured ? "border-primary/50 shadow-[var(--glow-soft)]" : ""
                }`}
              >
                {p.featured && (
                  <span className="btn-volt absolute -top-3 left-7 rounded-full px-3 py-1 text-[10px]">
                    Most Picked
                  </span>
                )}
                <h3 className="text-3xl">{p.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className="display text-6xl">${price}</span>
                  <span className="mb-2 text-xs text-muted-foreground">
                    /{yearly ? "year" : "month"}
                  </span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 block rounded-lg px-5 py-3 text-center text-xs ${
                    p.featured ? "btn-volt" : "btn-ghost-volt"
                  }`}
                >
                  Choose {p.name}
                </a>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
