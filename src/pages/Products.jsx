import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

/* ============================================================
   ALL PRODUCTS PAGE — Clean Header & Minimalist Theme
============================================================ */

export default function Products() {
  const activeProducts = products.filter((product) => product.active);

  return (
    <section
      className="relative bg-[linear-gradient(160deg,#F3E9D2_0%,#F8F2E4_45%,#FBF9F4_100%)] overflow-hidden min-h-screen py-12 md:py-20"
      aria-label="All products"
    >
      {/* Ambient warm spotlight glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#B57A25]/10 blur-[130px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-[18px] md:px-8">
        
        {/* SIMPLE HEADER SECTION */}
        <div className="text-center flex flex-col items-center gap-2 mb-10 md:mb-16">
          <h1
            className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#221C18] tracking-[-0.01em] leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Our Products
          </h1>
          <p className="text-[16px] sm:text-[18px] font-medium text-[#B57A25] tracking-wide">
            Smart Solutions for Everyday Life
          </p>
        </div>

        {/* RESPONSIVE PRODUCT GRID */}
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

      </div>
    </section>
  );
}