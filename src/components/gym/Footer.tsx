import { useState } from "react";
import { Instagram, Twitter, Youtube, MapPin } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a href="#home" className="display text-3xl tracking-widest">
              IRON<span className="neon-text">VOLT</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A 24/7 strength and conditioning floor built for people who show up.
            </p>
            <div className="mt-6 flex gap-3 text-muted-foreground">
              <a href="#contact" aria-label="Instagram" className="hover:text-primary">
                <Instagram className="size-5" />
              </a>
              <a href="#contact" aria-label="Twitter" className="hover:text-primary">
                <Twitter className="size-5" />
              </a>
              <a href="#contact" aria-label="YouTube" className="hover:text-primary">
                <Youtube className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl">Find Us</h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <div className="grid-lines bg-card flex h-32 items-center justify-center">
                <MapPin className="size-6 text-primary" />
              </div>
              <p className="p-4 text-xs text-muted-foreground">
                Unit 12, Forge Street, Manchester M4 · Open 24/7
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl">Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Weekly programming tips. No spam, ever.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                toast.success("You're on the list.");
                setEmail("");
              }}
              className="mt-4 flex gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="bg-input/40 w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button type="submit" className="btn-volt rounded-lg px-5 text-xs">
                Go
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} IRONVOLT Gym. All rights reserved.</span>
          <span>Built for people who lift heavy things.</span>
        </div>
      </div>
    </footer>
  );
}
