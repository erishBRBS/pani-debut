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
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
    >
      {/* Background image (petals + card) */}
      <img
        src={bgImg}
        alt="Invitation background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Optional: slight overlay to make text more readable (adjust if you want) */}
      <div className="absolute inset-0 bg-black/5" />

      {/* CARD TEXT AREA (centered exactly where the card is) */}
      <div
        className={[
          "relative z-10 w-[min(560px,90vw)]", // card width responsive
          "aspect-[3/2]", // card shape (adjust if needed)
          "flex items-center justify-center",
          "transition-all duration-1000 ease-out",
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
      >
        {/* Text wrapper inside the card area */}
        <div
          className={[
            "w-full h-full",
            "px-6 sm:px-10 md:px-12",
            "py-6 sm:py-8",
            "flex flex-col justify-center",
            // You can add a tiny blur/white layer IF needed, but user asked text only.
            // If readability is still hard, uncomment next line:
            // "bg-white/20 backdrop-blur-[1px] rounded-lg",
          ].join(" ")}
        >
          <h1 className="text-center font-tangerine font-bold text-5xl tracking-[0.15em] text-[#9a6a57]">
            You are invited!
          </h1>

          <div className="mx-auto mt-3 h-[1px] w-40 sm:w-56 bg-[#9a6a57]/40" />

          <p className="mt-4 text-center text-[#6f5247] leading-relaxed text-sm sm:text-base md:text-lg">
            Come join me in celebrating as I reach a decade and eight! I would
            love for you to be with me on my very special day.
          </p>

          <p className="mt-4 text-center text-[#6f5247] leading-relaxed text-sm sm:text-base md:text-lg">
            All the details, including the venue, ceremonies, time, and more,
            will be shared here.
          </p>

          <p className="mt-4 text-center text-[#6f5247] leading-relaxed text-sm sm:text-base md:text-lg">
            I can’t wait to celebrate with you and create a once-in-a-lifetime,
            unforgettable experience together!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#home"
              className="inline-flex items-center justify-center rounded-xl bg-[#9a6a57] px-5 py-2 text-white hover:opacity-95 active:opacity-90 transition"
            >
              Details
            </a>

            <a
              href="https://www.facebook.com/stephanieauldry.berboso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-[#9a6a57]/40 bg-white/40 px-5 py-2 text-[#6f5247] hover:bg-white/60 transition"
            >
              RSVP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
