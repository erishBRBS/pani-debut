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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={pageRef}
      className="w-full relative overflow-hidden flex items-center justify-center min-h-screen min-h-[100dvh]"
    >
      {/* Background image */}
      <img
        src={bgImg}
        alt="Invitation background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Slight overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* CARD TEXT AREA */}
      <div
        className={`relative z-10 w-[min(640px,92vw)]
          aspect-[4/3] sm:aspect-[3/2]
          flex items-center justify-center
          transition-all duration-1000 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <div className="w-full h-full px-5 sm:px-10 md:px-12 py-5 sm:py-8 flex flex-col justify-center">
          <h1 className="text-center font-tangerine font-bold leading-none text-[clamp(45px,7vw,56px)] tracking-[0.10em] text-[#9a6a57]">
            You are invited!
          </h1>

          <div className="mx-auto mt-1 w-32 sm:w-56 border-t border-[#9a6a57]/70" />

          <p className="mt-3 text-center text-[#6f5247] leading-[1.55] text-[clamp(12px,3.3vw,18px)]">
            Come join me in celebrating as I reach a decade and eight! I would
            love for you to be with me on my very special day.
          </p>

          <p className="mt-3 text-center text-[#6f5247] leading-[1.55] text-[clamp(12px,3.3vw,18px)]">
            All the details, including the venue, ceremonies, time, and more,
            will be shared here.
          </p>

          <p className="mt-3 text-center text-[#6f5247] leading-[1.55] text-[clamp(12px,3.3vw,18px)]">
            I can’t wait to celebrate with you and create a once-in-a-lifetime,
            unforgettable experience together!
          </p>

          <div className="mt-3 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#finers"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-[#9a6a57] px-5 py-2.5 text-white text-sm sm:text-base hover:opacity-95 active:opacity-90 transition"
            >
              Details
            </a>

            <a
              href="https://www.facebook.com/stephanieauldry.berboso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-[#9a6a57]/40 bg-white/40 px-5 py-2.5 text-[#6f5247] text-sm sm:text-base hover:bg-white/60 transition"
            >
              RSVP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
