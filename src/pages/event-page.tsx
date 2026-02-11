import { useEffect, useRef, useState } from "react";
import bgImg from "../assets/paint-inverted.jpg";

// ✅ your images
import roses from "../assets/roses.png";
import candles from "../assets/candles.png";
import treasures from "../assets/treasures.png";
import bills from "../assets/bills.png";
import shots from "../assets/shots.png";

const images = [roses, candles, treasures, bills, shots];

export default function EventPage() {
  const [show, setShow] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  // carousel state
  const [index, setIndex] = useState(0);

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

  // optional autoplay
  // useEffect(() => {
  //   const t = setInterval(() => {
  //     setIndex((i) => (i + 1) % images.length);
  //   }, 3500);

  //   return () => clearInterval(t);
  // }, []);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section
      id="events"
      ref={pageRef}
      className="min-h-screen w-full relative overflow-hidden flex items-start justify-center pt-28 pb-20"
    >
      {/* Background image */}
      <img
        src={bgImg}
        alt="18 events background"
        className="absolute inset-0 w-full h-full object-cover"
      />

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
          18s
        </h1>

        {/* Partition line */}
        <div className="mx-auto h-[1px] w-44 sm:w-72 bg-[#9a6a57]/40" />

        {/* ✅ CENTERED single card */}
        <div className="mt-5 flex justify-center">
          {/* LEFT: Carousel */}
          <div className="w-full max-w-3xl rounded-3xl bg-white/20 backdrop-blur-sm ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">
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
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/55 hover:bg-white/75 px-3 py-2 text-[#6f5247] transition"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/55 hover:bg-white/75 px-3 py-2 text-[#6f5247] transition"
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
                    onClick={() => setIndex(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      i === index
                        ? "bg-[#9a6a57]"
                        : "bg-white/55 hover:bg-white/80"
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
