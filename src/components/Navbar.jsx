import { useState, useEffect, useRef } from "react";
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  BadgeCheck,
  MessageCircle,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "How To Order", href: "/howorder" },
  { label: "Contact", href: "/contact" },
];

const TRUST_ITEMS = [
  { icon: Truck, label: "Free Delivery For Prepaid Orders" },
  { icon: ShieldCheck, label: "Easy & Secure Ordering" },
  { icon: CheckCircle2, label: "Carefully Selected Products" },
  { icon: BadgeCheck, label: "Premium Quality Assured" },
  { icon: MessageCircle, label: "24/7 WhatsApp Customer Support" },
];

function BrandMark({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="19" fill="#17130F" />
      <circle cx="20" cy="20" r="19" stroke="#C9A75A" strokeWidth="0.75" />
      <path
        d="M11 27V14.5L20 22.5L29 14.5V27"
        stroke="#FAF8F4"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 14.5L20 22.5"
        stroke="#C9A75A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================================================
   CHAMPAGNE GOLD TRUST STRIP (5 ROTATING ITEMS)
============================================================ */
function TrustStrip() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TRUST_ITEMS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-10 flex items-center justify-center bg-[#17130F] border-b border-[#C9A75A]/20 overflow-hidden select-none">
      <div className="relative h-full w-full max-w-4xl flex items-center justify-center px-4">
        {TRUST_ITEMS.map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <div
              key={item.label}
              className={`absolute flex items-center justify-center gap-2.5 transition-all duration-500 ease-out ${
                i === activeIndex
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-2 pointer-events-none scale-95"
              }`}
            >
              {/* Soft Champagne Gold Sparkle */}
              <Sparkles className="w-3.5 h-3.5 text-[#C9A75A]" />

              {/* Icon */}
              <ItemIcon className="w-4 h-4 text-[#D8B768]" strokeWidth={1.75} />

              {/* Text */}
              <span className="text-[12.5px] sm:text-[13px] font-medium tracking-wide text-[#FAF8F4]/90">
                {item.label}
              </span>

              {/* Soft Champagne Gold Sparkle */}
              <Sparkles className="w-3.5 h-3.5 text-[#C9A75A]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   MOBILE MENU COMPONENT
============================================================ */
function MobileMenu({ open, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && open) onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={`fixed inset-0 z-[200] bg-white flex flex-col transition-transform duration-300 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 visible" : "-translate-y-full invisible"
      }`}
    >
      <div className="h-[76px] flex items-center justify-between px-[18px] border-b border-[#E7E1D6] flex-shrink-0">
        <a href="/" className="flex items-center gap-3" aria-label="Martvexa home">
          <BrandMark className="w-8 h-8" />
          <span
            className="text-base font-medium text-[#17130F]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            MARTVEXA
          </span>
        </a>
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close menu"
          className="w-11 h-11 flex items-center justify-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2"
        >
          <X className="w-5 h-5 text-[#17130F]" strokeWidth={1.7} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 pb-20 overflow-y-auto">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="group py-4 first:pt-0 border-b border-[#E7E1D6] text-[32px] font-medium text-[#17130F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:-outline-offset-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            <span className="inline-block transition-transform duration-200 group-active:translate-x-1">
              {link.label}
            </span>
          </a>
        ))}
      </div>

      <div className="px-8 pb-7 flex-shrink-0">
        <p className="text-[12.5px] text-[#3A342C]/70">
          Every product on Martvexa is chosen with{" "}
          <b className="text-[#A9812F] font-semibold">intention</b>, not volume.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN HEADER COMPONENT
============================================================ */
export default function MartvexaHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-[100] w-full font-sans">
      <TrustStrip />

      <nav
        aria-label="Primary"
        className={`h-[76px] transition-colors duration-300 ${
          isScrolled
            ? "bg-[#FAF8F4]/85 backdrop-blur-md border-b border-[#E7E1D6]"
            : "bg-[#FAF8F4]/95 border-b border-transparent"
        }`}
      >
        <div className="h-full max-w-[1280px] mx-auto px-[18px] md:px-8 flex items-center justify-between gap-6">
          <a
            href="/"
            className="flex items-center gap-3 flex-shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-4"
            aria-label="Martvexa home"
          >
            <BrandMark className="w-[34px] h-[34px] md:w-[38px] md:h-[38px]" />
            <span
              className="text-[17px] md:text-[19px] font-medium text-[#17130F] tracking-[0.015em] whitespace-nowrap"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              MARTVEXA
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[14.5px] font-medium text-[#3A342C] py-1.5 hover:text-[#17130F] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#A9812F] after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block w-[38px] flex-shrink-0" aria-hidden="true" />

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="martvexa-mobile-menu"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2"
          >
            <Menu className="w-5 h-5 text-[#17130F]" strokeWidth={1.7} />
          </button>
        </div>
      </nav>

      <div id="martvexa-mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}