import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Truck,
  MessageSquare,
  Lock,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import TrendingProducts from "./TrendingProducts";
import { fetchVideos } from "../services/api";
import Reviews from "./Reviews";

/* ============================================================
   WHATSAPP ASSISTANT FLOATING BUTTON
============================================================ */
function WhatsAppAssistant() {
  const fullText = "Hello! Do you need any assistance?";
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 65);

      return () => clearTimeout(timer);
    }
  }, [charIndex, fullText]);

  const phoneNumber = "+918891900699";
  const defaultMessage = encodeURIComponent("Hello! I need some assistance.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2.5 select-none">
      <div className="hidden md:flex bg-white/95 backdrop-blur-md border border-[#B57A25]/30 text-[#221C18] text-[14px] font-semibold px-4 py-2 rounded-2xl shadow-xl items-center gap-1.5">
        <span>{displayedText}</span>
        {charIndex < fullText.length && (
          <span className="inline-block w-1 h-3.5 bg-[#B57A25] animate-pulse" />
        )}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact WhatsApp Assistant"
        className="relative group flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-transform duration-300 border-2 border-white shrink-0"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}

/* ============================================================
   MOBILE SINGLE VIDEO CARD
============================================================ */
function MobileVideoCard({ video }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }
      },
      { threshold: 0.65 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const productId = video.linkedProductId?._id || video.linkedProductId;

  return (
    <div
      ref={containerRef}
      className="snap-center shrink-0 w-[240px] h-[380px] relative rounded-2xl overflow-hidden bg-white border border-gray-300 shadow-xl flex flex-col justify-between transition-all duration-300"
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        playsInline
        loop={true}
        muted={isMuted}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* TOP BAR BADGE */}
      <div className="relative z-20 flex items-center justify-between p-3 bg-gradient-to-b from-black/60 to-transparent">
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] via-[#B57A25] to-[#8C5B18] text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md border border-amber-200/30">
          <Sparkles className="w-3 h-3 text-amber-100 fill-amber-100 animate-pulse" />
          <span>Best Seller</span>
        </div>
      </div>

      {/* SOUND TOGGLE BUTTON */}
      <div className="absolute bottom-4 right-3 z-30">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-black/30 text-white hover:bg-black/70 backdrop-blur-md border border-white/30 shadow-lg active:scale-90 transition-all duration-200"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* MOBILE SHOP NOW BUTTON OVERLAY AT BOTTOM */}
      <div className="relative z-20 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center gap-2">
        {productId ? (
          <Link
            to={`/products/${productId}`}
            className="group relative inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-black/30 hover:bg-black/70 text-white font-bold text-xs border border-white/20 hover:border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span className="relative z-10 text-white font-bold tracking-wide">Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-white relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full px-5 py-2.5 rounded-full bg-black/60 text-gray-400 font-semibold text-xs border border-white/10 opacity-60 cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   VIDEO SHOWCASE SKELETON LOADER
============================================================ */
function HeroVideoSkeleton({ isMobile }) {
  if (isMobile) {
    return (
      <div className="w-full overflow-x-auto flex gap-4 rounded-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="shrink-0 w-[250px] h-[380px] relative rounded-2xl bg-slate-200 border border-slate-300/60 p-3 flex flex-col justify-between animate-pulse shadow-md"
          >
            <div className="w-24 h-6 rounded-full bg-slate-300" />
            <div className="self-center w-12 h-12 rounded-full bg-slate-300/80 flex items-center justify-center my-auto" />
            <div className="w-32 h-10 rounded-full bg-slate-300 self-center mb-1" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-[360px] h-[550px] md:w-[400px] md:h-[500px] rounded-sm bg-slate-200 border border-slate-300 p-3 shadow-xl animate-pulse flex flex-col justify-between">
        <div className="w-28 h-7 rounded-full bg-slate-300" />
        <div className="self-center w-16 h-16 rounded-full bg-slate-300/80 my-auto" />
        <div className="flex justify-center gap-2 mb-2">
          <div className="w-6 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
      </div>
      <div className="w-40 h-12 rounded-full bg-slate-300 animate-pulse mt-1" />
    </div>
  );
}

/* ============================================================
   HERO VIDEO SHOWCASE
============================================================ */
function HeroVideoShowcase() {
  const desktopVideoRef = useRef(null);
  const mobileContainerRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktopMuted, setIsDesktopMuted] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchVideos()
      .then((data) => {
        setVideos(data.length ? data : []);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  const currentVideo = videos[currentIndex];

  const handleNext = useCallback(() => {
    if (videos.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const handlePrev = useCallback(() => {
    if (videos.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const handleSelectIndex = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const el = desktopVideoRef.current;
    if (!el || !currentVideo || isMobile) return;

    el.muted = isDesktopMuted;
    el.play().catch(() => {});
  }, [currentIndex, currentVideo, isMobile]);

  const toggleDesktopMute = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (desktopVideoRef.current) {
      const nextMuted = !isDesktopMuted;
      desktopVideoRef.current.muted = nextMuted;
      setIsDesktopMuted(nextMuted);
      if (!nextMuted) {
        desktopVideoRef.current.play().catch(() => {});
      }
    }
  };

  if (videos.length === 0) {
    return <HeroVideoSkeleton isMobile={isMobile} />;
  }

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
    <div className="w-full flex flex-col items-center gap-6">
      {isMobile ? (
        <div
          ref={mobileContainerRef}
          className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 rounded-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((vid) => (
            <MobileVideoCard
              key={vid._id || vid.id || vid.videoUrl}
              video={vid}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div
            className="relative w-[360px] h-[550px] md:w-[400px] md:h-[500px] transition-all duration-300 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="absolute -inset-6 bg-amber-300/40 blur-[100px] pointer-events-none rounded-sm"
              aria-hidden="true"
            />

            <div className="relative w-full h-full bg-white/20 border border-amber-500/20 rounded-sm p-3 shadow-2xl shadow-amber-900/10">
              <div className="relative w-full h-full rounded-sm overflow-hidden bg-[#111]">
                <video
                  ref={desktopVideoRef}
                  src={currentVideo?.videoUrl}
                  autoPlay
                  loop={true}
                  muted={isDesktopMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] via-[#B57A25] to-[#8C5B18] text-white px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-lg shadow-amber-950/30 border border-amber-200/40 backdrop-blur-md z-10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-100 fill-amber-100 animate-pulse" />
                  <span>Best Seller</span>
                </div>

                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous video"
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-[#1B1712]/60 text-white backdrop-blur-sm hover:bg-[#1B1712]/85 active:scale-90 transition-all z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next video"
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-[#1B1712]/60 text-white backdrop-blur-sm hover:bg-[#1B1712]/85 active:scale-90 transition-all z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* BOTTOM RIGHT MUTE BUTTON (DESKTOP) */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-30">
                  <button
                    type="button"
                    onClick={toggleDesktopMute}
                    aria-label={isDesktopMuted ? "Unmute sound" : "Mute sound"}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-gray-200 hover:text-white backdrop-blur-md border border-white/20 shadow-md hover:bg-black/80 hover:scale-105 active:scale-90 transition-all duration-200"
                  >
                    {isDesktopMuted ? (
                      <VolumeX className="w-4 h-4 text-gray-300" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-gray-100" />
                    )}
                  </button>
                </div>

                {/* SLIDE INDICATORS */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectIndex(index)}
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

          <div className="flex flex-col items-center justify-center w-full pt-1">
            {currentVideo?.linkedProductId ? (
              <Link
                to={`/products/${
                  currentVideo.linkedProductId._id || currentVideo.linkedProductId
                }`}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3 rounded-full bg-[#221C18] text-white transition-all duration-300 hover:bg-black hover:scale-105 active:scale-95 border border-white/20 hover:border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <span className="relative z-10 text-white font-bold tracking-wide text-[15px] sm:text-[16px]">
                  Shop Now
                </span>
                <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center text-center justify-center px-7 py-2.5 sm:px-8 sm:py-3 rounded-full bg-black/60 text-white text-[15px] sm:text-[16px] font-semibold opacity-50 cursor-not-allowed shadow-md"
              >
                Coming Soon
              </button>
            )}
          </div>
        </div>
      )}
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
            <div
              className={`flex items-center gap-4 flex-wrap ${entranceCls}`}
              style={delay(90)}
            >
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3 rounded-full bg-[#221C18] text-white transition-all duration-300 hover:bg-black hover:scale-105 active:scale-95 border border-white/20 hover:border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#221C18]"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <span className="relative z-10 text-white font-bold tracking-wide text-[15px] sm:text-[16px]">
                  Our Products
                </span>

                <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                to="/how-to-order"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#EFE6D5] text-[#3D281D] text-[15px] sm:text-[16px] font-semibold hover:bg-[#E4D7C2] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3D281D] focus-visible:outline-offset-2"
              >
                How To Order
              </Link>
            </div>

            {/* TRUST HIGHLIGHTS */}
            <div
              className={`pt-5 border-t border-[#8C7A6B]/20 grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-4 mt-2 ${entranceCls}`}
              style={delay(110)}
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#B57A25]/12 text-[#B57A25] shrink-0 border border-[#B57A25]/20">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-[#221C18] tracking-tight leading-tight">
                  Easy &amp; Secure Ordering
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#B57A25]/12 text-[#B57A25] shrink-0 border border-[#B57A25]/20">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-[#221C18] tracking-tight leading-tight">
                  No Login Needed
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#B57A25]/12 text-[#B57A25] shrink-0 border border-[#B57A25]/20">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-[#221C18] tracking-tight leading-tight">
                  Cash On Delivery
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#B57A25]/12 text-[#B57A25] shrink-0 border border-[#B57A25]/20">
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-[#221C18] tracking-tight leading-tight">
                  WhatsApp Direct
                </span>
              </div>
            </div>
          </div>

          {/* VIDEO SHOWCASE SECTION */}
          <div
            className={`order-2 flex flex-col gap-4 items-center justify-center ${entranceCls}`}
            style={delay(120)}
          >
            <HeroVideoShowcase />
          </div>
        </div>
      </div>

      <TrendingProducts />
      <Reviews />

      {/* FLOATING WHATSAPP ASSISTANT BUTTON */}
      <WhatsAppAssistant />
    </section>
  );
}