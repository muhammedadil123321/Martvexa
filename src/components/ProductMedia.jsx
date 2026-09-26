import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function ProductMedia({ images = [], videoUrl = "", name = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Filter media items
  const mediaList = [...images.filter(Boolean)];
  if (videoUrl) {
    mediaList.push({ type: "video", url: videoUrl });
  }

  // Mobile Swipe ചെയ്യുമ്പോൾ active index തനിയെ മാറും
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const width = container.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(container.scrollLeft / width);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  // Thumbnail / Arrow ക്ലിക്ക് ചെയ്യുമ്പോൾ കൃത്യമായി ഇമേജിലേക്ക് സ്ക്രോൾ ചെയ്യും
  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  if (mediaList.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#FBF8F0] rounded-2xl flex items-center justify-center text-gray-400 font-sans">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 font-sans select-none">
      {/* Main Image Viewport */}
      <div className="relative w-full aspect-square rounded-2xl bg-[#FBF8F0] overflow-hidden border border-gray-200/80 shadow-sm">
        {/* Native CSS Scroll Snap Slider Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {mediaList.map((media, idx) => {
            const isVid = typeof media === "object" && media?.type === "video";
            return (
              <div
                key={idx}
                className="w-full h-full flex-shrink-0 snap-center snap-always flex items-center justify-center"
              >
                {isVid ? (
                  <iframe
                    src={media.url}
                    title={`${name} Video`}
                    className="w-full h-full object-cover"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={typeof media === "string" ? media : media?.url}
                    alt={`${name} - View ${idx + 1}`}
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Only Next / Prev Buttons */}
        {mediaList.length > 1 && (
          <div className="hidden md:flex items-center justify-between absolute inset-x-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <button
              type="button"
              onClick={() =>
                scrollToSlide(activeIndex > 0 ? activeIndex - 1 : mediaList.length - 1)
              }
              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm pointer-events-auto transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                scrollToSlide(activeIndex < mediaList.length - 1 ? activeIndex + 1 : 0)
              }
              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm pointer-events-auto transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* WHITE & GOLD INDICATORS (Mobile & Touch View) */}
        {mediaList.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-lg pointer-events-auto">
              {mediaList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-7 bg-gradient-to-r from-[#FFE082] via-[#A9812F] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.9)] border border-white/60"
                      : "w-2.5 bg-white/80 hover:bg-white border border-white/40 opacity-70"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Thumbnails Bar */}
      {mediaList.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {mediaList.map((media, idx) => {
            const isVid = typeof media === "object" && media?.type === "video";
            const isSelected = activeIndex === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSlide(idx)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#A9812F] shadow-md scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {isVid ? (
                  <div className="w-full h-full bg-black/80 flex items-center justify-center text-white">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                ) : (
                  <img
                    src={typeof media === "string" ? media : media?.url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}