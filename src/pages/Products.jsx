import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF9F4]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#A9812F] border-t-transparent rounded-full animate-spin" />
          <p className="text-[15px] font-medium text-[#4A4238]">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF9F4]">
        <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-red-100 max-w-md">
          <p className="text-red-600 font-semibold mb-2">Error Loading Products</p>
          <p className="text-[14px] text-[#4A4238]">{error}</p>
        </div>
      </div>
    );
  }

  const activeProducts = products.filter((product) => product.active !== false);

  return (
    <section
      className="relative bg-[linear-gradient(160deg,#F3E9D2_0%,#F8F2E4_45%,#FBF9F4_100%)] overflow-hidden min-h-screen py-12 md:py-20"
      aria-label="All products"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#B57A25]/10 blur-[130px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-[18px] md:px-8">
        
        {/* HEADER & BREADCRUMB SECTION */}
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

          {/* BREADCRUMB / NAV ITEMS */}
          <nav 
            aria-label="Breadcrumb" 
            className="mt-2 flex items-center gap-1.5 text-[14px] text-[#52463C] bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#1B1712]/[0.06] shadow-sm"
          >
            <Link 
              to="/" 
              className="hover:text-[#B57A25] transition-colors font-medium"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <span className="text-[#221C18] font-semibold">Products</span>
          </nav>
        </div>

        {activeProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#4A4238] text-[16px]">No products available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {activeProducts.map((product) => (
              <div
                key={product._id || product.id}
                className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-[#1B1712]/[0.07] shadow-[0_10px_24px_-18px_rgba(34,29,22,0.28)] p-2 sm:p-2.5 hover:border-gray-50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
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