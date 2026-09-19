import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  MessageCircle,
  Headphones,
  Banknote,
  RotateCcw,
  Ban,
  Plus,
  Minus,
  Truck,
  Sparkles,
  Award,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { products } from "../data/products";
import ProductMedia from "../components/ProductMedia";

/* ============================================================
    WHATSAPP CONFIG & LINK BUILDER
============================================================ */
const WHATSAPP_NUMBER = "910000000000"; // TODO: Replace with real WhatsApp number

function buildWhatsAppLink(product, paymentMethod = "prepaid") {
  const codCharge = product.codCharge ?? 0;
  const isPrepaid = paymentMethod === "prepaid";
  const finalPrice = codCharge > 0 ? (isPrepaid ? product.price : product.price + codCharge) : product.price;

  const paymentText = codCharge > 0 
    ? `💳 Selected Option: *${isPrepaid ? "Prepaid (Free Shipping)" : "Cash on Delivery"}*\n` 
    : `🚚 Delivery: *Free Shipping*\n`;

  const message =
    `Hi Martvexa,\n\n` +
    `I want to order this item:\n` +
    `🛍️ *${product.name}*\n` +
    paymentText +
    `💵 Total Amount: *₹${finalPrice}*\n\n` +
    `Please confirm my order and share the next steps.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ============================================================
    PRODUCT BENEFITS BANNER WITH 3s SNAKE BORDER ANIMATION
============================================================ */
function ProductBenefits({ isEligible }) {
  const items = [
    { icon: Headphones, label: "24/7 Support" },
    { icon: Banknote, label: "COD Available" },
    isEligible
      ? { icon: RotateCcw, label: "7 Days Exchange" }
      : { icon: Ban, label: "Non-Returnable" },
  ];

  return (
    <div className="relative p-[1.5px] rounded-[18px] overflow-hidden my-1 shadow-[0_10px_25px_-15px_rgba(169,129,47,0.25)]">
      {/* Snake Border Gradient Animation Loop */}
      <div 
        aria-hidden="true" 
        className="absolute inset-[-200%] animate-[snake-spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#A9812F_340deg,#E6CA65_360deg)] opacity-90" 
      />

      {/* Inner Card Content */}
      <div
        role="group"
        aria-label="Order benefits"
        className="relative z-10 grid grid-cols-3 divide-x divide-[#1B1712]/[0.08] rounded-[16.5px] bg-[#FBF8F0] py-1"
      >
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 sm:gap-2.5 px-2.5 py-3.5 sm:px-4 justify-center sm:justify-start">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#A9812F]/12">
              <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#A9812F]" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-[11px] sm:text-[13px] font-semibold text-[#221D16] leading-[1.25]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
    PREPAID VS COD HIGHLIGHT CARDS (Shown only if codCharge > 0)
============================================================ */
function PaymentPricingCards({ product, selectedOption, setSelectedOption }) {
  const codCharge = product.codCharge ?? 0;
  const prepaidPrice = product.price;
  const codPrice = product.price + codCharge;

  return (
    <div className="flex flex-col gap-2.5 my-1">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold uppercase tracking-wider text-[#4A4238]">
          Select Payment Preference
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#2E7D32]/20">
          <Sparkles className="w-3 h-3" /> Save ₹{codCharge} on Prepaid
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Prepaid Option Card */}
        <button
          type="button"
          onClick={() => setSelectedOption("prepaid")}
          className={`relative text-left p-3.5 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between ${
            selectedOption === "prepaid"
              ? "border-[#A9812F] bg-[#FDFBF7] shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-bold text-[#A9812F] uppercase tracking-wide">
              Prepaid (Recommended)
            </span>
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedOption === "prepaid" ? "border-[#A9812F] bg-[#A9812F]" : "border-gray-300"
            }`}>
              {selectedOption === "prepaid" && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#221D16]">₹{prepaidPrice}</span>
            <span className="text-[11px] text-[#2E7D32] font-semibold">Free Delivery</span>
          </div>
          <p className="text-[11.5px] text-[#4A4238]/80 mt-0.5">Fastest dispatch & zero extra fees</p>
        </button>

        {/* COD Option Card */}
        <button
          type="button"
          onClick={() => setSelectedOption("cod")}
          className={`relative text-left p-3.5 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between ${
            selectedOption === "cod"
              ? "border-[#A9812F] bg-[#FDFBF7] shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-bold text-gray-600 uppercase tracking-wide">
              Cash On Delivery
            </span>
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedOption === "cod" ? "border-[#A9812F] bg-[#A9812F]" : "border-gray-300"
            }`}>
              {selectedOption === "cod" && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#221D16]">₹{codPrice}</span>
            <span className="text-[11px] text-gray-500 font-medium">(+₹{codCharge} COD Fee)</span>
          </div>
          <p className="text-[11.5px] text-[#4A4238]/80 mt-0.5">Pay after receiving order</p>
        </button>
      </div>
    </div>
  );
}

/* ============================================================
    TRUST BADGES GRID NEAR CTA
============================================================ */
function TrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-gray-50 border border-gray-100 text-center">
      <div className="flex flex-col items-center gap-1">
        <Truck className="w-4 h-4 text-[#A9812F]" />
        <span className="text-[11px] font-medium text-[#221D16] leading-tight">Fast Express Shipping</span>
      </div>
      <div className="flex flex-col items-center gap-1 border-x border-gray-200">
        <Award className="w-4 h-4 text-[#A9812F]" />
        <span className="text-[11px] font-medium text-[#221D16] leading-tight">100% Quality Inspected</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Lock className="w-4 h-4 text-[#A9812F]" />
        <span className="text-[11px] font-medium text-[#221D16] leading-tight">Safe WhatsApp Checkout</span>
      </div>
    </div>
  );
}

/* ============================================================
    ACCORDION
============================================================ */
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#1B1712]/[0.08]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2"
      >
        <span className="text-[14.5px] font-medium text-[#221D16]">{title}</span>
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#1B1712]/[0.05] text-[#221D16]">
          {open ? <Minus className="w-3.5 h-3.5" strokeWidth={2} /> : <Plus className="w-3.5 h-3.5" strokeWidth={2} />}
        </span>
      </button>
      {open && <div className="pb-4 -mt-1">{children}</div>}
    </div>
  );
}

/* ============================================================
    NOT FOUND STATE
============================================================ */
function ProductNotFound() {
  return (
    <section className="bg-[#FBF8F0] min-h-[60vh] flex items-center">
      <div className="max-w-[560px] mx-auto px-[18px] py-20 text-center flex flex-col items-center gap-4">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-[#A9812F] uppercase">
          Product Not Found
        </span>
        <h1
          className="text-[26px] md:text-[30px] font-medium text-[#221D16]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          We couldn't find that product
        </h1>
        <p className="text-[14.5px] leading-relaxed text-[#4A4238]">
          The product you're looking for may have been moved or is no longer
          available. Take a look at our full range instead.
        </p>
        <Link
          to="/products"
          className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1B1712] text-[#FAF8F4] text-[14px] font-medium hover:bg-[#2C2620] transition-colors duration-200"
        >
          Back to Products
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
    PRODUCT DETAILS PAGE
============================================================ */
export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [paymentOption, setPaymentOption] = useState("prepaid");

  if (!product) return <ProductNotFound />;

  const isAvailable = product.active;
  const isEligibleForReturnExchange = product.returnable || product.exchangeable;
  const whatsappHref = buildWhatsAppLink(product, paymentOption);
  const codCharge = product.codCharge ?? 0;

  const currentPrice = codCharge > 0 
    ? (paymentOption === "prepaid" ? product.price : product.price + codCharge)
    : product.price;

  const detailsData = product.additionalDetails || product.specifications;

  return (
    <section className="bg-white">
      <div className="max-w-[1180px] mx-auto px-[18px] md:px-8 py-6 md:py-10 pb-32 md:pb-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
          <ol className="flex items-center flex-wrap gap-1.5 text-[12px] text-[#4A4238]/70">
            <li>
              <Link to="/" className="hover:text-[#221D16] transition-colors duration-150">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/products" className="hover:text-[#221D16] transition-colors duration-150">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#221D16] font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
          {/* LEFT: Media */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductMedia
              images={product.images?.length ? product.images : [product.image]}
              name={product.name}
            />
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col gap-4 lg:pt-1">
            <h1
              className="text-[24px] sm:text-[27px] md:text-[29px] font-medium text-[#221D16] leading-[1.2] tracking-[-0.005em]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {product.name}
            </h1>

            {product.smallDescription && (
              <p className="text-[14.5px] leading-relaxed text-[#4A4238] -mt-2">
                {product.smallDescription}
              </p>
            )}

            {/* Price Block */}
            {codCharge > 0 ? (
              <PaymentPricingCards
                product={product}
                selectedOption={paymentOption}
                setSelectedOption={setPaymentOption}
              />
            ) : (
              <div className="flex items-center gap-3 my-1">
                <span className="text-[28px] font-bold text-[#221D16]">
                  ₹{product.price}
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full border border-[#2E7D32]/20">
                  <Sparkles className="w-3.5 h-3.5" /> Free Delivery
                </span>
              </div>
            )}

            {!isAvailable && (
              <div className="rounded-[10px] bg-[#1B1712]/[0.04] border border-[#1B1712]/10 px-3.5 py-2.5">
                <span className="text-[12.5px] font-medium text-[#4A4238]">
                  This product is currently unavailable for ordering.
                </span>
              </div>
            )}

            {/* Snake Border Benefits Banner */}
            <ProductBenefits isEligible={isEligibleForReturnExchange} />

            {/* Desktop WhatsApp CTA */}
            <div className="hidden md:flex flex-col gap-3 pt-2">
              {isAvailable ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#128C7E] text-white text-[15px] font-bold hover:bg-[#0E6F64] transition-all duration-200 shadow-md animate-[whatsapp-pulse_2.6s_ease-in-out_infinite]"
                >
                  <MessageCircle className="w-5 h-5 text-white fill-white" strokeWidth={2} />
                  Order via WhatsApp (₹{currentPrice})
                </a>
              ) : (
                <span className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#1B1712]/[0.06] text-[#4A4238] text-[14.5px] font-medium cursor-not-allowed">
                  Currently Unavailable
                </span>
              )}

              {/* Trust Badges */}
              <TrustBadges />
            </div>

            {/* About Product */}
            {product.description && (
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 mt-2">
                <h2
                  className="text-[16px] font-medium text-[#221D16]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  About Product
                </h2>
                <p className="text-[14px] leading-relaxed text-[#4A4238]">{product.description}</p>
              </div>
            )}

            {/* Key Benefits */}
            {product.keyBenefits?.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-1">
                <h2
                  className="text-[16px] font-medium text-[#221D16]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Key Benefits
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {product.keyBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#A9812F]/12 text-[#A9812F]">
                        <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-[14px] leading-relaxed text-[#4A4238]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Full-width Accordions */}
        <div className="max-w-[720px] mx-auto mt-16 md:mt-20">
          {detailsData && Object.keys(detailsData).length > 0 && (
            <Accordion title="Additional Details">
              <div className="flex flex-col">
                {Object.entries(detailsData).map(([key, value], i) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between gap-6 py-2.5 ${
                      i > 0 ? "border-t border-[#1B1712]/[0.06]" : ""
                    }`}
                  >
                    <span className="text-[13px] text-[#4A4238]/70 capitalize">{key}</span>
                    <span className="text-[13.5px] font-medium text-[#221D16] text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </Accordion>
          )}

          <Accordion title="Delivery Information">
            <p className="text-[14px] leading-relaxed text-[#4A4238]">
              {product.deliveryInformation ||
                "Once your order is placed, you will receive all delivery updates, dispatch details, and tracking information directly via WhatsApp/SMS."}
            </p>
          </Accordion>

          <Accordion title="Return / Exchange Policy">
            <div className="flex flex-col gap-2">
              <p className="text-[14px] leading-relaxed text-[#4A4238]">
                {product.returnExchangePolicy ||
                  (isEligibleForReturnExchange
                    ? "This item is eligible for exchange within 7 days of delivery."
                    : "This item is non-returnable and non-exchangeable.")}
              </p>
              {isEligibleForReturnExchange && (
                <p className="text-[13px] font-medium text-[#A9812F] bg-[#A9812F]/10 px-3 py-2 rounded-lg">
                  * Note: Returns or exchanges are strictly accepted only with a valid reason (e.g. damaged product, wrong size/item delivered).
                </p>
              )}
            </div>
          </Accordion>
        </div>
      </div>

      {/* Prominent & High-Trust Mobile Sticky CTA Bar */}
      {isAvailable && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FAF8F4] border-t border-[#A9812F]/20 px-3.5 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+10px)] shadow-[0_-10px_25px_rgba(27,23,18,0.1)]">
          
          

          <div className="flex items-center justify-between gap-3">
            {/* Price & Savings Badge Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[20px] font-bold text-[#221D16] tracking-tight">
                  ₹{currentPrice}
                </span>

                {/* Dynamic Badge based on COD / Prepaid */}
                {codCharge > 0 ? (
                  paymentOption === "prepaid" ? (
                    <span className="text-[10.5px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#2E7D32]/20 shadow-none">
                      Save ₹{codCharge}
                    </span>
                  ) : (
                    <span className="text-[10.5px] font-semibold text-[#8C6D23] bg-[#FFF8E7] px-2 py-0.5 rounded-full border border-[#A9812F]/20">
                      +₹{codCharge} COD Fee
                    </span>
                  )
                ) : (
                  <span className="text-[10.5px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#2E7D32]/20">
                    Free Delivery
                  </span>
                )}
              </div>

              {/* Subtitle Micro-Trust Text */}
              <span className="text-[10.5px] text-[#4A4238] font-medium flex items-center gap-1 mt-0.5">
                {codCharge > 0 ? (
                  paymentOption === "prepaid" ? (
                    <span>⚡ Fast Dispatch • Zero Extra Fee</span>
                  ) : (
                    <span>📦 Pay Cash on Delivery</span>
                  )
                ) : (
                  <span>✨ All Taxes & Shipping Included</span>
                )}
              </span>
            </div>

            {/* High-Visibility Darker WhatsApp Green Button */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[195px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#128C7E] hover:bg-[#0E6F64] text-white text-[13.5px] font-bold active:scale-[0.98] transition-all shadow-md animate-[whatsapp-pulse_2.6s_ease-in-out_infinite]"
            >
              <MessageCircle className="w-4 h-4 text-white fill-white" strokeWidth={2} />
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Animations CSS */}
      <style>{`
        @keyframes snake-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes whatsapp-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(18, 140, 126, 0.45); }
          50% { box-shadow: 0 0 0 8px rgba(18, 140, 126, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}