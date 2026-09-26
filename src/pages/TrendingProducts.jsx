import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchTrendingProducts } from "../services/api";

/* ============================================================
   TRENDING PRODUCTS SECTION — Warm Premium & Minimalist Theme
============================================================ */

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchTrendingProducts()
      .then((data) => {
        if (isMounted) {
          // Safe Array check - to prevent crash if response is non-array
          setProducts(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch trending products:", err);
        if (isMounted) setProducts([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="relative bg-white overflow-hidden py-14 md:py-20"
      aria-label="Trending products"
    >
      {/* Soft ambient spotlight glow */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#B57A25]/10 blur-[130px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-[18px] md:px-8">

        {/* SECTION HEADER */}
        <div className="text-center flex flex-col items-center gap-2 mb-10 md:mb-14">
          <span className="text-[11px] font-semibold tracking-[0.14em] text-[#8C7A6B] uppercase">
            Curated Collection
          </span>
          <h2
            className="text-[30px] sm:text-[38px] md:text-[44px] font-medium text-[#221C18] tracking-[-0.01em] leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Trending <span className="text-[#B57A25]">Products</span>
          </h2>
        </div>

        {/* LOADING STATE - Skeleton Cards */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-50 border border-gray-100 p-2 sm:p-2.5 animate-pulse flex flex-col gap-3"
              >
                <div className="w-full h-48 sm:h-60 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded-md w-3/4 mt-1" />
                <div className="h-4 bg-gray-200 rounded-md w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-16">
            <p className="text-[#4A4238] text-[15px]">No trending products right now.</p>
          </div>
        ) : (
          /* PRODUCT GRID */
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {products.map((product, index) => (
              <div
                key={product._id || product.id || index}
                className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-[#1B1712]/[0.07] shadow-[0_10px_24px_-18px_rgba(34,29,22,0.28)] p-2 sm:p-2.5 hover:border-gray-100 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}