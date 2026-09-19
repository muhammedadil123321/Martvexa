import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

/* ============================================================
   TRENDING PRODUCTS SECTION — Warm Premium & Minimalist Theme
============================================================ */

export default function TrendingProducts() {
  const activeProducts = products.filter((product) => product.active);

  return (
    <section
      className="relative bg-[linear-gradient(160deg,#F3E9D2_0%,#F8F2E4_45%,#FBF9F4_100%)] overflow-hidden py-14 md:py-20"
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
          <p className="text-[14px] sm:text-[15px] text-[#52463C] max-w-md">
            Handpicked customer favorites crafted for everyday convenience and style.
          </p>
        </div>

        {/* MINIMAL & TRUSTWORTHY PRODUCT GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {activeProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-[#B57A25]/15 p-2 sm:p-2.5 shadow-sm hover:shadow-xl hover:shadow-[#3D281D]/8 hover:border-[#B57A25]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* VIEW MORE BUTTON */}
        {/* <div className="flex justify-center w-full mt-10 md:mt-14">
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#3D281D] text-[#FDFBF7] text-[14px] font-medium hover:bg-[#2A1B13] transition-colors duration-200 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3D281D] focus-visible:outline-offset-2"
          >
            View More
          </Link>
        </div> */}

      </div>
    </section>
  );
}