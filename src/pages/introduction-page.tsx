import { useEffect, useRef, useState } from "react";
import bgImg from "../assets/card.jpg";

export default function IntroductionPage() {
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={pageRef}
      className="relative w-full flex items-center justify-center min-h-screen min-h-[100dvh] px-3"
    >
      {/* ✅ CARD WRAPPER (fixed aspect so Messenger won’t ruin crop) */}
      <div
        className={`relative w-[min(640px,92vw)]
          aspect-[2048/1365]
          max-h-[calc(100dvh-2rem)]
          transition-all duration-1000 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        {/* ✅ Background card image = NO CROP */}
        <img
          src={bgImg}
          alt="Invitation background"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />

        {/* Slight overlay (optional) */}
        <div className="absolute inset-0 bg-black/5" />

        {/* ✅ CONTENT locked inside the PINK BOX area */}
        <div
          className="
            absolute
            left-[7%] right-[7%]
            top-[30%] bottom-[16%]
            flex flex-col justify-center items-center
            text-center
            overflow-hidden
            px-[clamp(14px,3vw,48px)]
          "
        >
          <h1 className="font-tangerine font-bold leading-none text-[clamp(34px,7vw,56px)] tracking-[0.10em] text-[#9a6a57]">
            You are invited!
          </h1>

          {/* ✅ partition close to header */}
          <div className="mt-1 h-px w-32 sm:w-56 bg-[#9a6a57]/70" />

          <p className="mt-3 text-[#6f5247] leading-[1.55] text-[clamp(12px,3.3vw,18px)] max-w-[40ch]">
            Come join me in celebrating as I reach a decade and eight! I would
            love for you to be with me on my very special day.
          </p>

          <p className="mt-3 text-[#6f5247] leading-[1.55] text-[clamp(12px,3.3vw,18px)] max-w-[40ch]">
            All the details, including the venue, ceremonies, time, and more,
            will be shared here.
          </p>

          <p className="mt-3 text-[#6f5247] leading-[1.55] text-[clamp(12px,3.3vw,18px)] max-w-[40ch]">
            I can’t wait to celebrate with you and create a once-in-a-lifetime,
            unforgettable experience together!
          </p>

          <div className="mt-4 w-full flex flex-col gap-3 items-center">
            <a
              href="#finers"
              className="inline-flex w-full max-w-[360px] items-center justify-center rounded-xl bg-[#9a6a57] px-5 py-2.5 text-white text-sm sm:text-base hover:opacity-95 active:opacity-90 transition"
            >
              Details
            </a>

            <a
              href="https://www.facebook.com/stephanieauldry.berboso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-[360px] items-center justify-center rounded-xl border border-[#9a6a57]/40 bg-white/40 px-5 py-2.5 text-[#6f5247] text-sm sm:text-base hover:bg-white/60 transition"
            >
              RSVP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
