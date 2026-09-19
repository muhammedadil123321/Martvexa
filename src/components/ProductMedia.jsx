import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================
   PRODUCT MEDIA
   ============================================================
   Pure presentation component: takes `images` (array of URLs) and
   `name` (used for alt text), and handles gallery selection + the
   fullscreen lightbox. Owns no product data itself.
============================================================ */

export default function ProductMedia({ images = [], name }) {
  const gallery = images.length ? images : [null];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const closeButtonRef = useRef(null);

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

  function openLightbox() {
    setLightboxOpen(true);
  }
  function closeLightbox() {
    setLightboxOpen(false);
  }

  // Keyboard support while the lightbox is open: Escape closes, arrows navigate.
  useEffect(() => {
    if (!lightboxOpen) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft" && hasMultiple) showPrev();
      else if (e.key === "ArrowRight" && hasMultiple) showNext();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, hasMultiple]);

  const transitionCls = prefersReducedMotion
    ? ""
    : "transition-opacity duration-[350ms] ease-out";

  return (
    <div className="flex flex-col md:flex-row-reverse gap-3 md:gap-4">
   {/* Main image */}
<div className="flex-1">
  <button
    type="button"
    onClick={openLightbox}

    className="relative block w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-[20px] overflow-hidden bg-[#F6F1E4] border border-[#1B1712]/[0.06] cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-4"
    aria-label={`View larger image of ${name}`}
  >
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
  </button>
</div>

      {/* Thumbnails — vertical column on desktop, horizontal scroll strip on mobile */}
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1B1712]/90 p-4 md:p-10 ${transitionCls}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} image viewer`}
          onClick={closeLightbox}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-[#FAF8F4]/10 text-[#FAF8F4] hover:bg-[#FAF8F4]/20 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2"
            aria-label="Close image viewer"
          >
            <X className="w-5 h-5" strokeWidth={1.8} />
          </button>

          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 md:left-6 p-2.5 rounded-full bg-[#FAF8F4]/10 text-[#FAF8F4] hover:bg-[#FAF8F4]/20 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.8} />
            </button>
          )}

          {gallery[activeIndex] && (
            <img
              key={gallery[activeIndex]}
              src={gallery[activeIndex]}
              alt={name}
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[85vh] max-w-[90vw] object-contain rounded-[8px] ${transitionCls}`}
            />
          )}

          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 md:right-6 p-2.5 rounded-full bg-[#FAF8F4]/10 text-[#FAF8F4] hover:bg-[#FAF8F4]/20 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.8} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}