import { useEffect, useMemo, useRef, useState } from "react";
import bgImg from "../assets/card.jpg";

function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  // FB/Messenger/Instagram webviews
  return /FBAN|FBAV|Instagram/i.test(ua);
}

export default function IntroductionPage() {
  const [show, setShow] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  const inApp = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return isInAppBrowser();
  }, []);

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
        {/* ✅ tighten padding a bit only on in-app */}
        <div
          className={`w-full h-full flex flex-col justify-center
            px-5 sm:px-10 md:px-12
            ${inApp ? "py-4 sm:py-6" : "py-5 sm:py-8"}
          `}
        >
          {/* ✅ smaller title only on in-app */}
          <h1
            className={`text-center font-tangerine font-bold leading-none tracking-[0.10em] text-[#9a6a57]
              ${
                inApp
                  ? "text-[clamp(34px,6.2vw,50px)]"
                  : "text-[clamp(45px,7vw,56px)]"
              }
            `}
          >
            You are invited!
          </h1>

          {/* partition closer + visible */}
          <div className={`mx-auto border-t border-[#9a6a57]/70 ${inApp ? "mt-0.5 w-28 sm:w-48" : "mt-1 w-32 sm:w-56"}`} />

          {/* ✅ reduce paragraph size + spacing only on in-app */}
          <p
            className={`text-center text-[#6f5247] leading-[1.45]
              ${inApp ? "mt-2 text-[clamp(11px,3.0vw,16px)]" : "mt-3 text-[clamp(12px,3.3vw,18px)]"}
            `}
          >
            Come join me in celebrating as I reach a decade and eight! I would
            love for you to be with me on my very special day.
          </p>

          <p
            className={`text-center text-[#6f5247] leading-[1.45]
              ${inApp ? "mt-2 text-[clamp(11px,3.0vw,16px)]" : "mt-3 text-[clamp(12px,3.3vw,18px)]"}
            `}
          >
            All the details, including the venue, ceremonies, time, and more,
            will be shared here.
          </p>

          <p
            className={`text-center text-[#6f5247] leading-[1.45]
              ${inApp ? "mt-2 text-[clamp(11px,3.0vw,16px)]" : "mt-3 text-[clamp(12px,3.3vw,18px)]"}
            `}
          >
            I can’t wait to celebrate with you and create a once-in-a-lifetime,
            unforgettable experience together!
          </p>

          {/* ✅ buttons spacing smaller on in-app */}
          <div className={`flex flex-col sm:flex-row gap-3 justify-center ${inApp ? "mt-2" : "mt-3"}`}>
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
