import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================
   PRODUCT MEDIA
   Handles gallery image selection with Next/Prev navigation buttons.
============================================================ */

export default function ProductMedia({ images = [], name }) {
  const gallery = images.length ? images : [null];
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  return (
    <div className="flex flex-col md:flex-row-reverse gap-3 md:gap-4">
      {/* Main Image with Navigation Buttons */}
      <div className="relative flex-1">
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-[20px] overflow-hidden bg-[#F6F1E4] border border-[#1B1712]/[0.06]">
          {gallery[activeIndex] ? (
            <img
              key={gallery[activeIndex]}
              src={gallery[activeIndex]}
              alt={name}
              className={`h-full w-full object-cover ${transitionCls}`}
              draggable={false}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-[12px] text-[#4A4238]/50">Product image</span>
            </div>
          )}

          {/* Prev & Next Buttons on top of image */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#221D16] shadow-md transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F]"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#221D16] shadow-md transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F]"
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
          aria-label={`${name} image thumbnails`}
        >
          {gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show image ${i + 1} of ${gallery.length}`}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-[12px] overflow-hidden bg-[#F6F1E4] border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2 ${
                i === activeIndex ? "border-[#A9812F]/70" : "border-[#1B1712]/[0.08]"
              }`}
            >
              {src ? (
                <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover" draggable={false} />
              ) : (
                <div className="h-full w-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}