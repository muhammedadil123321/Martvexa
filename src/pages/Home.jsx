import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Truck,
  MessageSquare,
  Lock,
} from "lucide-react";
import TrendingProducts from "./TrendingProducts";
import HowToOrder from "../components/HowToOrder";

// Local video imports
import video1 from "../assets/vedio/vedio1.mp4";
import video2 from "../assets/vedio/vedio2.mp4";
import video3 from "../assets/vedio/vedio3.mp4";
import Reviews from "./Reviews";

/* ============================================================
   VIDEO DATA SET (IDs must match product IDs in products.js)
============================================================ */
const VIDEO_LIST = [
  { id: 1, src: video1 },
  { id: 2, src: video2 },
  { id: 3, src: video3 },
];

/* ============================================================
   WHATSAPP ASSISTANT FLOATING BUTTON
============================================================ */
function WhatsAppAssistant() {
  const fullText = "Hello! Do you need any assistance?";
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // Letter-by-letter typing animation
  useEffect(() => {
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 65);

      return () => clearTimeout(timer);
    }
  }, [charIndex, fullText]);

  const phoneNumber = "919000000000"; 
  const defaultMessage = encodeURIComponent("Hello! I need some assistance.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2.5 select-none">
      {/* Laptop / Desktop Screens-ൽ മാത്രം കാണിക്കുന്ന Animated Text Bubble */}
      <div className="hidden md:flex bg-white/95 backdrop-blur-md border border-[#B57A25]/30 text-[#221C18] text-[13px] font-medium px-3.5 py-2 rounded-2xl shadow-xl items-center gap-1">
        <span>{displayedText}</span>
        {charIndex < fullText.length && (
          <span className="inline-block w-1 h-3.5 bg-[#B57A25] animate-pulse" />
        )}
      </div>

      {/* Floating WhatsApp Circle Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact WhatsApp Assistant"
        className="relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition-transform duration-300 border-2 border-white shrink-0 animate-bounce"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 fill-current text-white relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}

/* ============================================================
   MULTI-VIDEO CAROUSEL COMPONENT
============================================================ */
function HeroVideoShowcase() {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);

  const currentVideo = VIDEO_LIST[currentIndex];

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = isMuted;
    el.play().catch(() => {});
  }, [currentIndex, isMuted]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % VIDEO_LIST.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + VIDEO_LIST.length) % VIDEO_LIST.length);
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative w-[350px] h-[550px] md:w-[400px] md:h-[500px] transition-all duration-300 select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient background glow */}
        <div
          className="absolute -inset-6 bg-amber-300/40 blur-[100px] pointer-events-none rounded-full"
          aria-hidden="true"
        />

        {/* Card container */}
        <div className="relative w-full h-full bg-white/20 border border-amber-500/20 rounded-2xl p-3 shadow-2xl shadow-amber-900/10">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#111]">
            
            {/* Video Player */}
            <video
              ref={videoRef}
              src={currentVideo.src}
              autoPlay
              loop={false}
              muted={isMuted}
              playsInline
              onEnded={handleNext}
              className="w-full h-full object-cover"
            />

            {/* ONLY BEST SELLER BADGE (TOP LEFT) */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] via-[#B57A25] to-[#8C5B18] text-white px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-lg shadow-amber-950/30 border border-amber-200/40 backdrop-blur-md z-10">
              <Sparkles className="w-3.5 h-3.5 text-amber-100 fill-amber-100 animate-pulse" />
              <span>Best Seller</span>
            </div>

            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous video"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-[#1B1712]/60 text-white backdrop-blur-sm hover:bg-[#1B1712]/85 transition-colors z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next video"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-[#1B1712]/60 text-white backdrop-blur-sm hover:bg-[#1B1712]/85 transition-colors z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Controls (Mute/Unmute Only) */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1B1712]/70 text-white backdrop-blur-sm hover:bg-[#1B1712]/85 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-green-400" />
                )}
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {VIDEO_LIST.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "w-5 bg-[#B57A25]"
                      : "w-2 bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ORIGINAL SHOP NOW BUTTON */}
      <div className="flex justify-center w-full mt-2">
        <Link
          to={`/products/${currentVideo.id}`}
          className="inline-flex items-center text-center justify-center px-8 py-3.5 rounded-full bg-[#111111] text-[#FFFFFF] text-[14px] font-medium hover:bg-[#2A2A2A] transition-colors duration-200 shadow-md"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

/* ============================================================
   HERO MAIN COMPONENT
============================================================ */
export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const entranceCls = prefersReducedMotion
    ? "opacity-100 translate-y-0"
    : `transition-[opacity,transform] duration-700 ease-out ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`;
  const delay = (ms) =>
    mounted && !prefersReducedMotion ? { transitionDelay: `${ms}ms` } : {};

  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(160deg,#F3E9D2_0%,#F8F2E4_45%,#FBF9F4_100%)]"
      aria-label="Featured products"
    >
      <div className="max-w-[1280px] mx-auto px-[18px] md:px-8 py-12 md:py-16 min-h-[620px] md:min-h-[580px] flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* TEXT & BUTTONS SECTION */}
          <div className="flex flex-col gap-6 max-w-xl order-1">
            <div className={`flex flex-col gap-4 ${entranceCls}`} style={delay(0)}>
              <span className="text-[11px] font-semibold tracking-[0.14em] text-[#8C7A6B] uppercase">
                Smart solutions for everyday life
              </span>

              <h1
                className="text-[34px] leading-[1.1] sm:text-[42px] md:text-[47px] lg:text-[52px] font-medium text-[#221C18] tracking-[-0.01em]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Small Problems.
                <br />
                <span className="text-[#B57A25]">Smart Solutions.</span>
              </h1>

              <p className="text-[15px] md:text-[16px] leading-relaxed text-[#52463C] max-w-md">
                Carefully selected products designed to make everyday life
                simpler, easier and more convenient.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className={`flex items-center gap-4 flex-wrap ${entranceCls}`} style={delay(90)}>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#3D281D] text-[#FDFBF7] text-[14px] font-medium hover:bg-[#2A1B13] transition-colors duration-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3D281D] focus-visible:outline-offset-4"
              >
                Explore Products
              </Link>

              <Link
                to="/how-to-order"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#EFE6D5] text-[#3D281D] text-[14px] font-medium hover:bg-[#E4D7C2] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3D281D] focus-visible:outline-offset-2"
              >
                How To Order
              </Link>
            </div>

            {/* PREMIUM TRUST HIGHLIGHTS (2x2 Grid) */}
            <div
              className={`pt-5 border-t border-[#8C7A6B]/20 grid grid-cols-2 gap-x-4 gap-y-4 mt-2 ${entranceCls}`}
              style={delay(110)}
            >
              {/* Badge 1 */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B57A25]/12 text-[#B57A25] shrink-0 border border-[#B57A25]/20">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#221C18] tracking-tight leading-tight">
                  Easy &amp; Secure Ordering
                </span>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B57A25]/12 text-[#B57A25] shrink-0 border border-[#B57A25]/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#221C18] tracking-tight leading-tight">
                  No Login Needed
                </span>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B57A25]/12 text-[#B57A25] shrink-0 border border-[#B57A25]/20">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#221C18] tracking-tight leading-tight">
                  Cash On Delivery
                </span>
              </div>

              {/* Badge 4 */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B57A25]/12 text-[#B57A25] shrink-0 border border-[#B57A25]/20">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#221C18] tracking-tight leading-tight">
                  WhatsApp Direct
                </span>
              </div>
            </div>

          </div>

          {/* VIDEO SHOWCASE SECTION */}
          <div className={`order-2 flex flex-col gap-4 items-center justify-center ${entranceCls}`} style={delay(120)}>
            <HeroVideoShowcase />
          </div>

        </div>
      </div>

      <TrendingProducts />
      <Reviews />
      <HowToOrder />

      {/* FLOATING WHATSAPP ASSISTANT BUTTON */}
      <WhatsAppAssistant />

    </section>
  );
}