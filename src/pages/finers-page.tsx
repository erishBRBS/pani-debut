import { useEffect, useRef, useState } from "react";
// import bgImg from "../assets/bgs/card.jpg";
import TextCursor from "../components/TextCursor";

import finerImg1 from "../assets/invitation/front.png";
import finerImg2 from "../assets/invitation/back.png";

export default function FinersPage() {
  const [show, setShow] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="finers"
      ref={pageRef}
      className="min-h-screen w-full relative overflow-hidden flex items-start justify-center pt-28 pb-20"
    >
      {/* Background image */}
      {/* <img
        src={bgImg}
        alt="Finers background"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}

      {/* Slight overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* ✅ TextCursor effect on whole page */}
      <div className="absolute inset-0 z-20">
        <TextCursor />
      </div>

      {/* ✅ CONTENT */}
      <div
        className={`relative z-30 w-full max-w-6xl px-4 transition-all duration-1000 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header */}
        <h1 className="text-center font-tangerine text-5xl sm:text-6xl font-bold tracking-[0.15em] text-[#6f5247]">
          The Finers
        </h1>

        {/* Partition line */}
        <div className="mx-auto h-[1px] w-44 sm:w-72 bg-[#9a6a57]/40" />

        {/* ✅ ONE BIG CONTAINER (both images inside) */}
        <div className="mt-5 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.10)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT */}
            <div className="w-full h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center">
              <img
                src={finerImg1}
                alt="Finer 1"
                className="w-full h-full object-contain px-6 py-4"
              />
            </div>

            {/* RIGHT */}
            <div className="w-full h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center">
              <img
                src={finerImg2}
                alt="Finer 2"
                className="w-full h-full object-contain px-6 py-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
