import { useEffect, useRef, useState } from "react";
// import bgImg from "../assets/bgs/paint.jpg";

// ✅ your images
import roses from "../assets/events/roses.png";
import candles from "../assets/events/candles.png";
import treasures from "../assets/events/treasures.png";
import bills from "../assets/events/bills.png";
import shots from "../assets/events/shots.png";

const images = [roses, candles, treasures, bills, shots];

const keyToIndex: Record<string, number> = {
  roses: 0,
  candles: 1,
  treasure: 2,
  bills: 3,
  shots: 4,
};

const indexToKey: Record<number, string> = {
  0: "roses",
  1: "candles",
  2: "treasure",
  3: "bills",
  4: "shots",
};

export default function EventPage() {
  const [show, setShow] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);

  // ✅ robust hash parsing
  useEffect(() => {
    const applyFromHash = () => {
      // ex: "#events?item=treasure"
      const raw = window.location.hash || "";
      const clean = raw.startsWith("#") ? raw.slice(1) : raw; // "events?item=treasure"

      const [anchor, query] = clean.split("?");
      if (anchor !== "events") return;

      const params = new URLSearchParams(query || "");
      const item = params.get("item");
      if (!item) return;

      const i = keyToIndex[item];
      if (typeof i === "number") setIndex(i);
    };

    applyFromHash(); // on mount
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  // ✅ fade-in animation
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setIndexAndHash = (i: number) => {
    setIndex(i);
    const key = indexToKey[i] ?? "roses";
    window.location.hash = `events?item=${key}`; // ✅ triggers hashchange
  };

  const prev = () => setIndexAndHash((index - 1 + images.length) % images.length);
  const next = () => setIndexAndHash((index + 1) % images.length);

  return (
    <section
      id="events"
      ref={pageRef}
      className="min-h-screen w-full relative overflow-hidden flex items-start justify-center pt-28 pb-20"
    >
      {/* Background image */}
      {/* <img
        src={bgImg}
        alt="18 events background"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}

      {/* Slight overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* ✅ CONTENT */}
      <div
        className={`relative z-30 w-full max-w-7xl px-4 transition-all duration-1000 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header */}
        <h1 className="text-center font-tangerine text-5xl sm:text-6xl font-bold tracking-[0.15em] text-[#6f5247]">
          Signature 18s
        </h1>

        {/* Partition line */}
        <div className="mx-auto h-[1px] w-44 sm:w-72 bg-[#9a6a57]/40" />

        {/* ✅ CENTERED single card */}
        <div className="mt-5 flex justify-center">
          <div className="w-full max-w-3xl rounded-sm bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px]">
              <img
                src={images[index]}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-contain px-6 py-4"
                draggable={false}
              />

              {/* Controls */}
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/55 hover:bg-[#9a6a57] hover:text-white px-3 py-2 text-[#6f5247] transition"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/55 hover:bg-[#9a6a57] hover:text-white px-3 py-2 text-[#6f5247] transition"
                aria-label="Next"
              >
                ›
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndexAndHash(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      i === index ? "bg-[#9a6a57]" : "bg-white/55 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
