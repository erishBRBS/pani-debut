import { useMemo } from "react";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

type FooterProps = {
  name?: string;
  email?: string;
  phone?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  yearCreated?: number;
};

export default function FooterPage({
  name = "Erish Berboso",
  email = "erishberboso10@gmail.com",
  phone = "0977-018-7649",
  facebookUrl = "https://www.facebook.com/Erish.berboso.7/",
  instagramUrl = "https://www.instagram.com/erish_berboso?igsh=ejBnNjNiNG16aWNk",
  yearCreated,
}: FooterProps) {
  const year = useMemo(() => yearCreated ?? new Date().getFullYear(), [yearCreated]);

  const socials = [
    facebookUrl ? { label: "Erish Berboso", href: facebookUrl, Icon: Facebook } : null,
    instagramUrl ? { label: "erish_berboso", href: instagramUrl, Icon: Instagram } : null,
  ].filter(Boolean) as { label: string; href: string; Icon: React.ElementType }[];

  const contacts = [
    email ? { label: email, href: `mailto:${email}`, Icon: Mail } : null,
    phone ? { label: phone, href: `tel:${phone}`, Icon: Phone } : null,
  ].filter(Boolean) as { label: string; href: string; Icon: React.ElementType }[];

  return (
    <footer className="w-full bg-[#9a6a57] text-[#ffffff] ">
      {/* thin top divider like FB */}
      <div className="border-t border-black/10" />

      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:py-6">
        <div className="flex flex-col items-center text-sm">
          <div className="font-medium">{name}</div>

          {/* ✅ Mobile: 2 rows (Contacts row + Socials row), evenly spaced */}
          {/* ✅ Desktop: becomes centered, wrap-friendly */}
          {contacts.length > 0 && (
            <div
              className="
                mt-2 w-full
                flex flex-wrap
                items-center
                justify-evenly sm:justify-center
                gap-y-2 sm:gap-y-1
                text-xs sm:text-sm
              "
            >
              {contacts.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  className="
                    inline-flex items-center gap-2
                    px-2 py-1
                    hover:underline underline-offset-2
                  "
                >
                  <c.Icon className="h-4 w-4 opacity-80" aria-hidden="true" />
                  <span className="whitespace-nowrap">{c.label}</span>
                </a>
              ))}
            </div>
          )}

          {socials.length > 0 && (
            <div
              className="
                mt-1 w-full
                flex flex-wrap
                items-center
                justify-evenly sm:justify-center
                gap-y-2 sm:gap-y-1
                text-xs sm:text-sm
              "
            >
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    px-2 py-1
                    hover:underline underline-offset-2
                  "
                >
                  <s.Icon className="h-4 w-4 opacity-80" aria-hidden="true" />
                  <span className="whitespace-nowrap">{s.label}</span>
                </a>
              ))}
            </div>
          )}

          <div className="mt-3 text-center text-xs">
            © {year} {name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
