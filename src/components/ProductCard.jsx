import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck } from "lucide-react";

/* ============================================================
   PRODUCT CARD — Martvexa
   ============================================================
   Pure presentation component. Receives a single `product` object
   and renders it. Does not fetch data, does not own the product
   collection, does not contain any backend/auth logic.
============================================================ */

function WhatsAppIcon({ className }) {
  // lucide-react has no WhatsApp glyph, so a minimal brand-accurate
  // outline is inlined here to keep the icon set self-contained.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.8.37c-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2Zm0 18.2a8.16 8.16 0 0 1-4.17-1.14l-.3-.18-3 .79.8-2.92-.2-.3A8.18 8.18 0 1 1 20.2 12a8.19 8.19 0 0 1-8.18 8.2Z" />
    </svg>
  );
}

export default function ProductCard({ product }) {
  const { _id, id, name, price, image } = product;
  // MongoDB uses _id; fall back to numeric id for any legacy data
  const productId = _id || id;

  return (
    <Link
      to={`/products/${productId}`}
      className="group relative flex flex-col overflow-hidden rounded-[15px] transition-[transform,box-shadow] duration-500 ease-out motion-reduce:transition-none hover:-translate-y-1.5  focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-4"
      aria-label={`View ${name}`}
    >
      {/* Image area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
        {/* Faint radial gold glow behind the product */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 45%, rgba(169,129,47,0.16) 0%, rgba(169,129,47,0) 70%)",
          }}
          aria-hidden="true"
        />

        <img
          src={image}
          alt={name}
          loading="lazy"
          draggable={false}
          className="relative h-full w-full object-cover transition-transform duration-[550ms] ease-out motion-reduce:transition-none group-hover:scale-105"
        />



        {/* Desktop hover — "View Product" reveal */}
        <div
          className="pointer-events-none absolute inset-0 hidden md:flex items-end justify-center bg-gradient-to-t from-[#1B1712]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none group-hover:opacity-100"
          aria-hidden="true"
        >
          <span className="mb-4 inline-flex items-center rounded-full bg-[#FAF8F4]/90 px-4 py-1.5 text-[12px] font-medium tracking-[0.02em] text-[#1B1712] backdrop-blur-md opacity-0 translate-y-2 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none group-hover:opacity-100 group-hover:translate-y-0">
            View Product
          </span>
        </div>
      </div>

      {/* Content — sits on the card's own warm ivory surface, set apart
          from the image by a hairline gold-tinted divider */}
      <div className="flex flex-col gap-1.5 border-t border-[#A9812F]/[0.12] px-3.5 py-3.5">
        <h3
          className="truncate text-[15px] font-medium text-[#221D16] leading-snug font-serif"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {name}
        </h3>

        {/* Price + trust badge — stacked on mobile, inline from sm up */}
        <div className="flex flex-col items-start gap-1.5 pt-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <span className="text-[17px] font-semibold text-[#1B1712]">₹{price}</span>

        </div>
      </div>
    </Link>
  );
}