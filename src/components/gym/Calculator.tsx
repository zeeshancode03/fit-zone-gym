import { useMemo, useState } from "react";

const activities = [
  { label: "Light", factor: 1.375 },
  { label: "Moderate", factor: 1.55 },
  { label: "Heavy", factor: 1.725 },
];

export function Calculator() {
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(78);
  const [age, setAge] = useState(28);
  const [act, setAct] = useState(1);

  const { bmi, band, calories } = useMemo(() => {
    const m = height / 100;
    const bmi = weight / (m * m);
    const band =
      bmi < 18.5 ? "Underweight" : bmi < 25 ? "Athletic range" : bmi < 30 ? "Overweight" : "Obese";
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    return {
      bmi: bmi.toFixed(1),
      band,
      calories: Math.round((bmr * (activities[act]?.factor ?? 1.55)) / 10) * 10,
    };
  }, [height, weight, age, act]);

  const pct = Math.min(100, Math.max(0, ((Number(bmi) - 14) / 22) * 100));

  return (
    <section className="border-y border-border bg-card/30 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-primary uppercase">Know your numbers</p>
          <h2 className="mt-3 text-5xl sm:text-6xl">
            BMI &amp; <span className="neon-text">CALORIE</span> CHECK
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Drag the sliders — the readout updates instantly. Bring these numbers to your first
            session and a coach will build your block around them.
          </p>

          <div className="mt-10 space-y-7">
            {[
              { label: "Height", value: height, set: setHeight, min: 140, max: 210, unit: "cm" },
              { label: "Weight", value: weight, set: setWeight, min: 40, max: 160, unit: "kg" },
              { label: "Age", value: age, set: setAge, min: 14, max: 80, unit: "yrs" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs tracking-[0.18em] uppercase">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="text-primary">
                    {s.value} {s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={s.value}
                  aria-label={s.label}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="accent-primary mt-3 w-full"
                />
              </div>
            ))}

            <div className="flex gap-2">
              {activities.map((a, n) => (
                <button
                  key={a.label}
                  onClick={() => setAct(n)}
                  className={`rounded-full px-4 py-2 text-[11px] tracking-[0.18em] uppercase ${
                    act === n ? "btn-volt" : "border border-border text-muted-foreground"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass flex flex-col justify-center rounded-2xl p-9">
          <span className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            Your BMI
          </span>
          <div className="display neon-text mt-2 text-8xl">{bmi}</div>
          <p className="text-sm text-primary">{band}</p>

          <div className="bg-secondary mt-6 h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <span className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              Daily maintenance
            </span>
            <div className="display mt-2 text-6xl">
              {calories.toLocaleString()}{" "}
              <span className="text-2xl text-muted-foreground">kcal</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Cut: {(calories - 400).toLocaleString()} kcal · Bulk:{" "}
              {(calories + 400).toLocaleString()} kcal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
