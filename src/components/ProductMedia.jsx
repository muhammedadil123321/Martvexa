import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function ProductMedia({ images = [], videoUrl = "", name = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchOffset, setTouchOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef(0);

  // Filter media items
  const mediaList = [...images.filter(Boolean)];
  if (videoUrl) {
    mediaList.push({ type: "video", url: videoUrl });
  }

  if (mediaList.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#FBF8F0] rounded-2xl flex items-center justify-center text-gray-400 font-sans">
        No Image Available
      </div>
    );
  }

  /* ============================================================
     TOUCH SWIPE LOGIC (Real-time Finger Dragging)
  ============================================================ */
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStartX.current;
    setTouchOffset(diff); // വിരൽ നീങ്ങുന്നതനുസരിച്ച് image നീങ്ങും
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const minSwipeDistance = 50; // Swipe threshold (in pixels)

    if (touchOffset < -minSwipeDistance) {
      // Left Swipe -> Next Image
      setActiveIndex((prev) => (prev < mediaList.length - 1 ? prev + 1 : prev));
    } else if (touchOffset > minSwipeDistance) {
      // Right Swipe -> Previous Image
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    setTouchOffset(0); // Position reset
  };

  return (
    <div className="flex flex-col gap-3 font-sans select-none">
      {/* Main Image Viewport */}
      <div
        className="relative w-full aspect-square rounded-2xl bg-[#FBF8F0] overflow-hidden border border-gray-200/80 shadow-sm touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding Track */}
        <div
          className={`w-full h-full flex ${
            isDragging ? "" : "transition-transform duration-300 ease-out"
          }`}
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${touchOffset}px))`,
          }}
        >
          {mediaList.map((media, idx) => {
            const isVid = typeof media === "object" && media?.type === "video";
            return (
              <div key={idx} className="w-full h-full flex-shrink-0">
                {isVid ? (
                  <iframe
                    src={media.url}
                    title={`${name} Video`}
                    className="w-full h-full object-cover pointer-events-auto"
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
          <div className="hidden md:flex items-center justify-between absolute inset-x-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1))}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm pointer-events-auto transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0))}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm pointer-events-auto transition-all"
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
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
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
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
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