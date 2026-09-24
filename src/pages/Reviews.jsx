import React, { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API = `${API_BASE_URL}/api/reviews`;

/* ============================================================
   LOCAL STYLES — Hide Scrollbar & Hover Animations
============================================================ */
const LocalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');

    /* Horizontal line / Scrollbar പൂർണ്ണമായി ഹൈഡ് ചെയ്യാൻ */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;  /* IE & Edge */
      scrollbar-width: none;  /* Firefox */
    }

    .review-card {
      transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
    }
    .review-card:hover {
      transform: translateY(-4px);
      border-color: rgba(181, 122, 37, 0.45);
      box-shadow: 0 16px 30px -10px rgba(61, 40, 29, 0.12);
    }
  `}</style>
);

export default function Reviews() {
  const scrollContainerRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(API);
        const data = await res.json();
        // Show only approved reviews on the user-facing page
        setReviews(Array.isArray(data) ? data.filter(r => r.isApproved) : []);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // Desktop screen-ൽ മാത്രം arrow buttons വഴി scroll ചെയ്യാനുള്ള ഫംഗ്ഷനുകൾ
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[linear-gradient(160deg,#F3E9D2_0%,#F8F2E4_45%,#FBF9F4_100%)] text-[#221C18] py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <LocalStyles />
      <div className="max-w-6xl mx-auto">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center flex flex-col items-center gap-2 mb-10">
          <span className="text-[11px] font-semibold tracking-[0.14em] text-[#8C7A6B] uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#B57A25]" /> Verified Customer Feedback
          </span>
          <h1
            className="text-[34px] sm:text-[44px] font-medium text-[#221C18]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Customer <span className="text-[#B57A25]">Reviews</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#52463C] max-w-lg leading-relaxed">
            100% genuine reviews collected from verified customers following successful WhatsApp order deliveries.
          </p>
        </div>

        {/* ================= CONTROLS BAR (Laptop/Desktop Buttons Only) ================= */}
        <div className="flex items-center justify-end mb-4 px-2">
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-white/80 border border-[#B57A25]/30 flex items-center justify-center text-[#3D281D] hover:bg-[#B57A25] hover:text-white transition-colors shadow-sm"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-white/80 border border-[#B57A25]/30 flex items-center justify-center text-[#3D281D] hover:bg-[#B57A25] hover:text-white transition-colors shadow-sm"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= HORIZONTAL SCROLL CONTAINER (NO SCROLLBAR) ================= */}
        {loading && (
          <div className="flex justify-center items-center py-16 text-[#8C7A6B] text-sm">
            Loading reviews…
          </div>
        )}
        {!loading && reviews.length === 0 && (
          <div className="text-center py-16 text-[#8C7A6B] text-sm">
            No reviews yet. Be the first to share your experience!
          </div>
        )}
        {!loading && reviews.length > 0 && (
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-5 py-3 scroll-smooth"
        >
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.33px)] flex flex-col"
            >
              <div className="review-card h-full bg-white/85 backdrop-blur-md border border-[#B57A25]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                
                <div>
                  {/* 1. STARS RATING */}
                  <div className="flex items-center gap-1 text-[#B57A25] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#B57A25] stroke-none"
                      />
                    ))}
                  </div>

                  {/* 2. COMMENT */}
                  <p className="text-[14px] text-[#52463C] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div>
                  {/* 3. BREAK LINE */}
                  <hr className="border-t border-[#B57A25]/15 my-4" />

                  {/* 4. PROFILE SECTION */}
                  <div className="flex items-center gap-3">
                    {/* Avatar with First Letter */}
                    <div className="w-10 h-10 rounded-full bg-[#B57A25]/12 border border-[#B57A25]/20 flex items-center justify-center text-[#B57A25] font-semibold text-[15px] shrink-0">
                      {rev.userName.charAt(0)}
                    </div>

                    {/* Name & Item Ordered */}
                    <div className="overflow-hidden">
                      <h4 className="text-[14px] font-semibold text-[#221C18] truncate">
                        {rev.userName}
                      </h4>
                      <p className="text-[12px] text-[#8C7A6B] truncate">
                        Item:{" "}
                        <span className="text-[#B57A25] font-medium">
                          {rev.productName || 'General'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
        )}

      </div>
    </div>
  );
}