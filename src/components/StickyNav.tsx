import { useEffect, useRef, useState } from "react";

type SectionId = "home" | "finers" | "events";

type EventItemId = "roses" | "candles" | "treasure" | "bills" | "shots";

const MAIN: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "finers", label: "Finers" },
];

const EIGHTEEN: { id: EventItemId; label: string }[] = [
  { id: "roses", label: "Roses" },
  { id: "candles", label: "Candles" },
  { id: "treasure", label: "Treasure" },
  { id: "bills", label: "Bills" },
  { id: "shots", label: "Shots" },
];

const ALL_IDS: SectionId[] = ["home", "finers", "events"];

export default function StickyNav() {
  const [active, setActive] = useState<SectionId>("home");
  const [open18, setOpen18] = useState(false);

  // ✅ pending actions (effects will perform window updates / scrolling)
  const [pendingAnchor, setPendingAnchor] = useState<SectionId | null>(null);
  const [pendingEventItem, setPendingEventItem] = useState<EventItemId | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const btn18Ref = useRef<HTMLButtonElement | null>(null);

  // ✅ detect active section based on scroll position
  useEffect(() => {
    let ticking = false;

    const getActiveSection = () => {
      const offset = 110;
      const y = offset;

      for (const id of ALL_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= y && rect.bottom > y) return id;
      }

      return "home";
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
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ✅ run MAIN navigation (hash + scroll) in effect
  useEffect(() => {
    if (!pendingAnchor) return;

    // update hash
    window.location.hash = pendingAnchor;

    // scroll
    document.getElementById(pendingAnchor)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPendingAnchor(null);
  }, [pendingAnchor]);

  // ✅ run dropdown navigation (hash + scroll) in effect
  useEffect(() => {
    if (!pendingEventItem) return;

    // update hash
    window.location.hash = `events?item=${pendingEventItem}`;

    // scroll to events section
    document.getElementById("events")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPendingEventItem(null);
  }, [pendingEventItem]);

  const scrollTo = (id: SectionId) => {
    setActive(id); // instant highlight
    setOpen18(false);
    setPendingAnchor(id);
  };

  const goToEventItem = (id: EventItemId) => {
    setOpen18(false);
    setPendingEventItem(id);
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

  const is18Active = active === "events";

  return (
    <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="pointer-events-auto rounded-2xl border border-white/10 bg-white/55 backdrop-blur-md shadow-sm px-3 py-2">
          <div className="flex items-center justify-between gap-3">
            <div className="font-semibold font-tangerine text-lg sm:text-3xl tracking-wide text-[#6f5247]">
              ✦ Stephanie Auldry @18
            </div>

            <div className="flex items-center gap-2 font-serif italic">
              {MAIN.map((link) => {
                const isActive = active === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`rounded-xl px-3 py-2 text-sm transition cursor-pointer
                      ${
                        isActive
                          ? "bg-[#9a6a57] text-white"
                          : "bg-white/40 text-[#6f5247] hover:bg-white/70"
                      }
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
                    ${
                      is18Active
                        ? "bg-[#9a6a57] text-white"
                        : "bg-white/40 text-[#6f5247] hover:bg-white/70"
                    }
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
                    {EIGHTEEN.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => goToEventItem(item.id)}
                        className="w-full text-left px-4 py-2 text-sm transition text-[#6f5247] hover:bg-white/70"
                        role="menuitem"
                      >
                        {item.label}
                      </button>
                    ))}
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
