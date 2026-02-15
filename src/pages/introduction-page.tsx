import { useEffect, useMemo, useRef, useState } from "react";
// import bgImg from "../assets/card.jpg";
import debutImg from "../assets/person/pic2.png";

function isInAppBrowser() {
  const ua = navigator.userAgent || "";
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
      className="w-full relative overflow-hidden flex items-center justify-center min-h-screen min-h-[100svh] px-3 py-6"
    >
      {/* Background */}
      {/*
      <img
        src={bgImg}
        alt="Invitation background"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable={false}
      />
      */}
      <div className="absolute inset-0 bg-black/5" />

      <div
        className={`relative z-10 w-[min(1100px,94vw)]
          transition-all duration-1000 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <div
          className={`
            grid items-stretch gap-0 overflow-hidden
            bg-white ring-1 ring-white/15
            shadow-[0_18px_60px_rgba(0,0,0,0.10)]
            ${inApp ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1fr_1fr]"}
            h-auto md:h-[min(560px,62vh)]
          `}
        >
          {/* LEFT: PHOTO */}
          <div className="relative w-full bg-white/10 overflow-hidden">
            {/* ✅ Mobile: set fixed height so crop stays consistent (same vibe as desktop) */}
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-full">
              <img
                src={debutImg}
                alt="Debut portrait"
                className="absolute inset-0 w-full h-full object-cover object-[25%_40%]"
                draggable={false}
              />
            </div>
          </div>

          {/* RIGHT: TEXT */}
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`
                w-full h-full
                flex flex-col items-center justify-center text-center
                px-5 sm:px-8 md:px-10
                py-6 md:py-10
              `}
            >
              <h1
                className={`
                  font-tangerine font-bold leading-none tracking-[0.10em] text-[#9a6a57]
                  ${
                    inApp
                      ? "text-[clamp(40px,7vw,52px)]"
                      : "text-[clamp(44px,3.6vw,58px)]"
                  }
                `}
              >
                You are invited!
              </h1>

              <div className="mt-1.5 h-px w-32 sm:w-56 bg-[#9a6a57]/70" />

              <p
                className={`
                  font-serif italic
                  max-w-[44ch] text-[#6f5247]
                  mt-3 leading-[1.5]
                  ${
                    inApp
                      ? "text-[clamp(12px,3.2vw,16px)]"
                      : "text-[clamp(12px,3.1vw,18px)]"
                  }
                `}
              >
                Come join me in celebrating as I reach a decade and eight! I would
                love for you to be with me on my very special day.
              </p>

              <p
                className={`
                  font-serif italic
                  max-w-[44ch] text-[#6f5247]
                  mt-3 leading-[1.5]
                  ${
                    inApp
                      ? "text-[clamp(12px,3.2vw,16px)]"
                      : "text-[clamp(12px,3.1vw,18px)]"
                  }
                `}
              >
                All the details, including the venue, ceremonies, time, and more,
                will be shared here.
              </p>

              <p
                className={`
                  font-serif italic
                  max-w-[44ch] text-[#6f5247]
                  mt-3 leading-[1.5]
                  ${
                    inApp
                      ? "text-[clamp(12px,3.2vw,16px)]"
                      : "text-[clamp(12px,3.1vw,18px)]"
                  }
                `}
              >
                I can’t wait to celebrate with you and create a once-in-a-lifetime,
                unforgettable experience together!
              </p>

              <div className="font-serif italic mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 justify-center w-full">
                <a
                  href="#finers"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-[#9a6a57] px-6 py-2.5 text-white text-sm sm:text-base hover:opacity-95 active:opacity-90 transition"
                >
                  Details
                </a>

                <a
                  href="https://www.facebook.com/stephanieauldry.berboso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-[#9a6a57]/40 bg-white/40 px-6 py-2.5 text-[#6f5247] text-sm sm:text-base hover:bg-white/60 transition"
                >
                  RSVP
                </a>
              </div>
            </div>
          </div>
          {/* end right */}
        </div>
      </div>
    </section>
  );
}
