import { useEffect, useRef, useState } from "react";

type SectionId =
  | "home"
  | "finers"
  | "roses"
  | "candles"
  | "treasure"
  | "bills"
  | "shots";

const MAIN: { id: "home" | "finers"; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "finers", label: "Finers" },
];

const EIGHTEEN: { id: Exclude<SectionId, "home" | "finers">; label: string }[] = [
  { id: "roses", label: "Roses" },
  { id: "candles", label: "Candles" },
  { id: "treasure", label: "Treasure" },
  { id: "bills", label: "Bills" },
  { id: "shots", label: "Shots" },
];

const ALL_IDS: SectionId[] = ["home", "finers", "roses", "candles", "treasure", "bills", "shots"];

export default function StickyNav() {
  const [active, setActive] = useState<SectionId>("home");
  const [open18, setOpen18] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const btn18Ref = useRef<HTMLButtonElement | null>(null);

  // ✅ detect active section based on scroll position (top marker)
  useEffect(() => {
    let ticking = false;

    const getActiveSection = () => {
      const offset = 110; // adjust if you move nav (top-4 etc)
      const y = offset;

      for (const id of ALL_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // "active" kapag yung section covers the marker line near top
        if (rect.top <= y && rect.bottom > y) return id;
      }

      return "home" as SectionId;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActive(getActiveSection());
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll(); // init

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (id: SectionId) => {
    setActive(id); // ✅ instant highlight
    setOpen18(false);

    // ✅ update URL hash
    window.history.replaceState(null, "", `#${id}`);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ close dropdown when clicking outside
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open18) return;
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (btn18Ref.current?.contains(target)) return;
      setOpen18(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open18]);

  // ✅ ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen18(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const is18Active = ["roses", "candles", "treasure", "bills", "shots"].includes(active);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="pointer-events-auto rounded-2xl border border-white/20 bg-white/55 backdrop-blur-md shadow-sm px-3 py-2">
          <div className="flex items-center justify-between gap-3">
            <div className="font-semibold font-tangerine text-2xl sm:text-3xl tracking-wide text-[#6f5247]">
              ✦ Stephanie Auldry @18
            </div>

            <div className="flex items-center gap-2">
              {MAIN.map((link) => {
                const isActive = active === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`rounded-xl px-3 py-2 text-sm transition cursor-pointer
                      ${isActive ? "bg-[#9a6a57] text-white" : "bg-white/40 text-[#6f5247] hover:bg-white/70"}
                    `}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* 18 dropdown */}
              <div className="relative">
                <button
                  ref={btn18Ref}
                  onClick={() => setOpen18((v) => !v)}
                  className={`rounded-xl px-3 py-2 text-sm transition inline-flex items-center gap-2 cursor-pointer
                    ${is18Active ? "bg-[#9a6a57] text-white" : "bg-white/40 text-[#6f5247] hover:bg-white/70"}
                  `}
                  aria-haspopup="menu"
                  aria-expanded={open18}
                >
                  18 <span className={`text-xs transition ${open18 ? "rotate-180" : ""}`}>▾</span>
                </button>

                {open18 && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/20 bg-white/80 backdrop-blur-md shadow-lg"
                    role="menu"
                  >
                    {EIGHTEEN.map((item) => {
                      const itemActive = active === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollTo(item.id)}
                          className={`w-full text-left px-4 py-2 text-sm transition
                            ${itemActive ? "bg-[#9a6a57]/15 text-[#6f5247]" : "text-[#6f5247] hover:bg-white/70"}
                          `}
                          role="menuitem"
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
