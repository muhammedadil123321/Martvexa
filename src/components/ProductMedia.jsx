import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductMedia({ images = [], videoUrl = "", name = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Safe Media Array filtering
  const mediaList = [...images.filter(Boolean)];
  if (videoUrl) {
    mediaList.push({ type: "video", url: videoUrl });
  }

  // Swipe / Scroll ചെയ്യുമ്പോൾ Active Index മാറും
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

  // Dots അല്ലെങ്കിൽ Arrow ക്ലിക്ക് ചെയ്യുമ്പോൾ Slide ചെയ്യുന്ന ഫംഗ്ഷൻ
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
      <div className="relative w-full aspect-square rounded-xl bg-[#FBF8F0] overflow-hidden border border-gray-200/80 shadow-sm">
        
        {/* Main Carousel Slider */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-y overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    className="w-full h-full object-cover object-center pointer-events-none select-none"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP ONLY: Next & Prev Arrows */}
        {mediaList.length > 1 && (
          <div className="hidden md:flex items-center justify-between absolute inset-x-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <button
              type="button"
              onClick={() =>
                scrollToSlide(activeIndex > 0 ? activeIndex - 1 : mediaList.length - 1)
              }
              className="p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm pointer-events-auto transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                scrollToSlide(activeIndex < mediaList.length - 1 ? activeIndex + 1 : 0)
              }
              className="p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm pointer-events-auto transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* DOTS INDICATOR (Mobile & Desktop) */}
        {mediaList.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 shadow-sm pointer-events-auto">
              {mediaList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-5 bg-[#D4AF37]"
                      : "w-1.5 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}