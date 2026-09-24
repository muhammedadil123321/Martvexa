import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

/* ============================================================
   PRODUCT MEDIA COMPONENT
   Accepts:
     images   — string[]  (product image URLs from DB)
     videoUrl — string    (product videoUrl from DB, empty = no video tab)
     name     — string
============================================================ */

export default function ProductMedia({ images = [], videoUrl = "", name }) {
  // Build a unified media array: images first, then video if URL exists
  const mediaItems = [
    ...images.map((src) => ({ type: "image", src })),
    ...(videoUrl ? [{ type: "video", src: videoUrl, poster: undefined }] : []),
  ];

  const gallery = mediaItems.length ? mediaItems : [{ type: "image", src: null }];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const hasMultiple = gallery.length > 1;

  function showPrev() {
    setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % gallery.length);
  }

  const transitionCls = prefersReducedMotion
    ? ""
    : "transition-opacity duration-[350ms] ease-out";

  const currentMedia = gallery[activeIndex];

  return (
    <div className="flex flex-col md:flex-row-reverse gap-3 md:gap-4">
      {/* Main Display Area */}
      <div className="relative flex-1">
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-[20px] overflow-hidden bg-[#F6F1E4] border border-[#1B1712]/[0.06] flex items-center justify-center">
          
          {/* Render Video */}
          {currentMedia?.type === "video" ? (
            <video
              key={currentMedia.src}
              ref={videoRef}
              src={currentMedia.src}
              poster={currentMedia.poster}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain bg-black/90 rounded-[20px]"
            >
              Your browser does not support the video tag.
            </video>
          ) : currentMedia?.src ? (
            /* Render Image */
            <img
              key={currentMedia.src}
              src={currentMedia.src}
              alt={name}
              className={`h-full w-full object-cover ${transitionCls}`}
              draggable={false}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-[12px] text-[#4A4238]/50">Product media unavailable</span>
            </div>
          )}

          {/* Navigation Overlay Buttons */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous media"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#221D16] shadow-md transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] z-10"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next media"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#221D16] shadow-md transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] z-10"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div
          className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:max-h-[560px] pb-1 md:pb-0 -mx-[18px] px-[18px] md:mx-0 md:px-0"
          role="tablist"
          aria-label={`${name} media thumbnails`}
        >
          {gallery.map((item, i) => (
            <button
              key={(item.src || i) + i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show ${item.type === "video" ? "video" : "image"} ${i + 1} of ${gallery.length}`}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-[12px] overflow-hidden bg-[#F6F1E4] border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2 ${
                i === activeIndex ? "border-[#A9812F] ring-2 ring-[#A9812F]/20" : "border-[#1B1712]/[0.08]"
              }`}
            >
              {item.type === "video" ? (
                /* Video Thumbnail Representation */
                <div className="relative h-full w-full bg-[#1B1712]/90 flex items-center justify-center">
                  {item.poster ? (
                    <img src={item.poster} alt="Video preview" className="h-full w-full object-cover opacity-60" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1B1712] to-[#4A4238]" />
                  )}
                  {/* Play Icon Overlay */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="p-1.5 rounded-full bg-[#A9812F] text-white shadow-sm">
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" strokeWidth={2} />
                    </span>
                  </span>
                </div>
              ) : item.src ? (
                /* Image Thumbnail */
                <img src={item.src} alt="" aria-hidden="true" className="h-full w-full object-cover" draggable={false} />
              ) : (
                <div className="h-full w-full bg-gray-200" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}