import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all ${
          scrolled ? "glass" : "border border-transparent"
        }`}
      >
        <a href="#home" className="display text-2xl tracking-widest">
          IRON<span className="neon-text">VOLT</span>
        </a>

        <ul className="hidden items-center gap-8 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#pricing" className="btn-volt hidden rounded-lg px-5 py-2 text-xs sm:block">
            Join Now
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="btn-ghost-volt rounded-lg px-3 py-2 text-xs md:hidden"
          >
            Menu
          </button>
        </div>
      </nav>

      {open && (
        <ul className="glass animate-fade-in mx-auto mt-2 max-w-6xl rounded-2xl p-4 text-sm tracking-widest uppercase md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-3 text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
