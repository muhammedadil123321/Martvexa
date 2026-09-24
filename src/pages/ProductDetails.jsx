import { useState, useEffect } from "react";
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
  Award,
  Lock,
  Loader2,
} from "lucide-react";
import ProductMedia from "../components/ProductMedia";
import { fetchProductById, fetchSettings } from "../services/api";

/* ============================================================
    WHATSAPP CONFIG & LINK BUILDER
============================================================ */
const WHATSAPP_NUMBER = "+918891900699";

function buildWhatsAppLink(product, paymentMethod = "prepaid", settings = null) {
  const codCharge = Number(product?.codCharge) || 0;
  const isPrepaid = paymentMethod === "prepaid";
  const basePrice = Number(product?.price) || 0;
  const finalPrice = codCharge > 0 ? (isPrepaid ? basePrice : basePrice + codCharge) : basePrice;

  const paymentText = codCharge > 0
    ? `💳 Selected Option: *${isPrepaid ? "Prepaid (Free Shipping)" : "Cash on Delivery"}*\n`
    : `🚚 Delivery: *Free Shipping*\n`;

  let message = '';
  let whatsappNumber = WHATSAPP_NUMBER;

  if (settings) {
    if (settings.whatsappNumber) whatsappNumber = settings.whatsappNumber;
    if (settings.messageTemplate) {
      message = settings.messageTemplate
        .replace(/{product_name}/g, product?.name || "Product")
        .replace(/{price}/g, finalPrice);
      message += `\n\n${paymentText}`;
    }
  }

  if (!message) {
    message =
      `Hi Martvexa,\n\n` +
      `I want to order this item:\n` +
      `🛍️ *${product?.name || "Product"}*\n` +
      paymentText +
      `💵 Total Amount: *₹${finalPrice}*\n\n` +
      `Please confirm my order and share the next steps.`;
  }

  return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}

/* ============================================================
    PARTICLE BURST COMPONENT
============================================================ */
function ParticleBurst() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <span className="absolute w-2 h-2 rounded-full bg-[#2E7D32] animate-[spark-1_0.6s_ease-out_forwards]" />
      <span className="absolute w-2 h-2 rounded-full bg-[#A9812F] animate-[spark-2_0.6s_ease-out_forwards]" />
      <span className="absolute w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-[spark-3_0.6s_ease-out_forwards]" />
      <span className="absolute w-2 h-2 rounded-full bg-[#FFB300] animate-[spark-4_0.6s_ease-out_forwards]" />
      <span className="absolute w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-[spark-5_0.6s_ease-out_forwards]" />
      <span className="absolute w-2 h-2 rounded-full bg-[#A9812F] animate-[spark-6_0.6s_ease-out_forwards]" />
    </div>
  );
}

/* ============================================================
    PRODUCT BENEFITS BANNER
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
    <div className="relative p-[1.5px] rounded-[18px] overflow-hidden my-1 shadow-[0_10px_25px_-15px_rgba(169,129,47,0.25)] font-sans">
      <div
        aria-hidden="true"
        className="absolute inset-[-200%] animate-[snake-spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#A9812F_340deg,#E6CA65_360deg)] opacity-90"
      />

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
            <span className="text-[11px] sm:text-[13px] font-semibold text-[#221D16] leading-[1.25] tracking-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
    PREPAID VS COD CARDS
============================================================ */
function PaymentPricingCards({ product, selectedOption, setSelectedOption }) {
  const codCharge = Number(product?.codCharge) || 0;
  const prepaidPrice = Number(product?.price) || 0;
  const codPrice = prepaidPrice + codCharge;

  return (
    <div className="flex flex-col gap-2.5 my-1 font-sans">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] sm:text-[13px] font-bold uppercase tracking-wider text-[#4A4238] whitespace-nowrap">
          Select Payment Preference
        </span>

        {codCharge > 0 && selectedOption === "prepaid" && (
          <div key={selectedOption} className="relative inline-flex items-center shrink-0">
            <ParticleBurst />
            <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full border border-[#2E7D32]/30 whitespace-nowrap animate-[pop-burst_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
              <span className="inline-block animate-[pop-burst_0.5s_ease-out] text-[12px] leading-none">🎉</span>
              <span className="leading-none">Save ₹{codCharge} on Prepaid</span>
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Prepaid Option Card */}
        <button
          type="button"
          onClick={() => setSelectedOption("prepaid")}
          className={`relative text-left p-3.5 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden ${
            selectedOption === "prepaid"
              ? "border-[#A9812F] bg-[#FDFBF7] shadow-md scale-[1.01] animate-[card-pop_0.35s_ease-out]"
              : "border-gray-200 bg-white hover:border-gray-300 opacity-80"
          }`}
        >
          {selectedOption === "prepaid" && <ParticleBurst />}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-bold text-[#A9812F] uppercase tracking-wide">
              Prepaid (Recommended)
            </span>
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-transform ${
              selectedOption === "prepaid" ? "border-[#A9812F] bg-[#A9812F] scale-110" : "border-gray-300"
            }`}>
              {selectedOption === "prepaid" && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#221D16] tracking-tight">₹{prepaidPrice}</span>
            <span className="text-[11px] text-[#2E7D32] font-semibold">Free Delivery</span>
          </div>
          <p className="text-[11.5px] text-[#4A4238]/80 mt-0.5 font-normal">Fastest dispatch & zero extra fees</p>
        </button>

        {/* COD Option Card */}
        <button
          type="button"
          onClick={() => setSelectedOption("cod")}
          className={`relative text-left p-3.5 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden ${
            selectedOption === "cod"
              ? "border-[#A9812F] bg-[#FDFBF7] shadow-md scale-[1.01] animate-[card-pop_0.35s_ease-out]"
              : "border-gray-200 bg-white hover:border-gray-300 opacity-80"
          }`}
        >
          {selectedOption === "cod" && <ParticleBurst />}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-bold text-gray-600 uppercase tracking-wide">
              Cash On Delivery
            </span>
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-transform ${
              selectedOption === "cod" ? "border-[#A9812F] bg-[#A9812F] scale-110" : "border-gray-300"
            }`}>
              {selectedOption === "cod" && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#221D16] tracking-tight">₹{codPrice}</span>
            <span className="text-[11px] text-gray-500 font-medium">(+₹{codCharge} COD Fee)</span>
          </div>
          <p className="text-[11.5px] text-[#4A4238]/80 mt-0.5 font-normal">Pay after receiving order</p>
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
    <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-gray-50 border border-gray-100 text-center font-sans">
      <div className="flex flex-col items-center gap-1">
        <Truck className="w-4 h-4 text-[#A9812F]" />
        <span className="text-[11px] font-semibold text-[#221D16] leading-tight">Fast Express Shipping</span>
      </div>
      <div className="flex flex-col items-center gap-1 border-x border-gray-200">
        <Award className="w-4 h-4 text-[#A9812F]" />
        <span className="text-[11px] font-semibold text-[#221D16] leading-tight">100% Quality Inspected</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Lock className="w-4 h-4 text-[#A9812F]" />
        <span className="text-[11px] font-semibold text-[#221D16] leading-tight">Safe WhatsApp Checkout</span>
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
    <div className="border-b border-[#1B1712]/[0.08] font-sans">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9812F] focus-visible:outline-offset-2"
      >
        <span className="text-[15px] font-semibold text-[#221D16] tracking-tight">{title}</span>
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
    <section className="bg-[#FBF8F0] min-h-[60vh] flex items-center font-sans">
      <div className="max-w-[560px] mx-auto px-[18px] py-20 text-center flex flex-col items-center gap-4">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-[#A9812F] uppercase">
          Product Not Found
        </span>
        <h1 className="text-[26px] md:text-[30px] font-bold text-[#221D16] tracking-tight">
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
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentOption, setPaymentOption] = useState("prepaid");
  const [storeSettings, setStoreSettings] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;

    setLoading(true);
    setError(null);

    Promise.all([
      fetchProductById(id).catch(err => { throw err; }),
      fetchSettings().catch(() => null)
    ])
      .then(([res, settingsData]) => {
        if (!isMounted) return;
        const productData = res?.data?.product || res?.data || res?.product || res;

        if (productData && (productData._id || productData.id || productData.name)) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }

        if (settingsData) setStoreSettings(settingsData);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.response?.data?.message || err?.message || "Error loading product");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white font-sans">
        <Loader2 className="w-10 h-10 text-[#A9812F] animate-spin" />
      </div>
    );
  }

  if (error || !product) return <ProductNotFound />;

  const isAvailable = product.active !== false && product.isAvailable !== false;
  const isEligibleForReturnExchange = Boolean(product.returnable || product.exchangeable);
  const whatsappHref = buildWhatsAppLink(product, paymentOption, storeSettings);
  const basePrice = Number(product.price) || 0;
  const codCharge = Number(product.codCharge) || 0;

  const currentPrice = codCharge > 0
    ? (paymentOption === "prepaid" ? basePrice : basePrice + codCharge)
    : basePrice;

  const rawDetails = product.additionalDetails || product.specifications;
  const detailsData = (rawDetails && typeof rawDetails === "object" && !Array.isArray(rawDetails))
    ? rawDetails
    : null;

  const imagesList = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image].filter(Boolean);

  const keyBenefitsList = Array.isArray(product.keyBenefits) ? product.keyBenefits : [];

  return (
    <section className="bg-white font-sans antialiased text-[#221D16]">
      <div className="max-w-[1180px] mx-auto px-[18px] md:px-8 py-6 md:py-10 pb-28 md:pb-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 md:mb-8 font-sans">
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
              images={imagesList}
              videoUrl={product.videoUrl || ""}
              name={product.name}
            />
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col gap-4 lg:pt-1">
            <h1 className="text-[24px] sm:text-[27px] md:text-[29px] font-bold text-[#1B1712] leading-[1.25] tracking-tight font-sans">
              {product.name}
            </h1>

            {product.smallDescription && (
              <p className="text-[14.5px] leading-relaxed text-[#4A4238] -mt-2 font-normal">
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
              <div className="flex items-center gap-3 my-1 font-sans">
                <span className="text-[28px] font-bold text-[#221D16] tracking-tight">
                  ₹{basePrice}
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full border border-[#2E7D32]/20">
                  🎉 Free Delivery
                </span>
              </div>
            )}

            {!isAvailable && (
              <div className="rounded-[10px] bg-[#1B1712]/[0.04] border border-[#1B1712]/10 px-3.5 py-2.5 font-sans">
                <span className="text-[12.5px] font-medium text-[#4A4238]">
                  This product is currently unavailable for ordering.
                </span>
              </div>
            )}

            {/* Benefits Banner */}
            <ProductBenefits isEligible={isEligibleForReturnExchange} />

            {/* Desktop WhatsApp CTA */}
            <div className="hidden md:flex flex-col gap-3 pt-2 font-sans">
              {isAvailable ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#128C7E] hover:bg-[#0E6F64] active:bg-[#0B5E54] text-white text-[15px] font-bold transition-colors duration-200 shadow-md"
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
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 mt-2 font-sans">
                <h2 className="text-[16px] font-bold text-[#1B1712] tracking-tight">
                  About Product
                </h2>
                <p className="text-[14px] leading-relaxed text-[#4A4238] font-normal">{product.description}</p>
              </div>
            )}

            {/* Key Benefits */}
            {keyBenefitsList.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-1 font-sans">
                <h2 className="text-[16px] font-bold text-[#1B1712] tracking-tight">
                  Key Benefits
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {keyBenefitsList.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#A9812F]/12 text-[#A9812F]">
                        <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-[14px] leading-relaxed text-[#4A4238] font-normal">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Full-width Accordions */}
        <div className="max-w-[720px] mx-auto mt-16 md:mt-20 font-sans">
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
                    <span className="text-[13px] text-[#4A4238]/70 capitalize font-medium">{key}</span>
                    <span className="text-[13.5px] font-semibold text-[#221D16] text-right">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </Accordion>
          )}

          <Accordion title="Delivery Information">
            <p className="text-[14px] leading-relaxed text-[#4A4238] font-normal">
              {product.deliveryInformation ||
                "Once your order is placed, you will receive all delivery updates, dispatch details, and tracking information directly via WhatsApp/SMS."}
            </p>
          </Accordion>

          <Accordion title="Return / Exchange Policy">
            <div className="flex flex-col gap-2 font-sans">
              <p className="text-[14px] leading-relaxed text-[#4A4238] font-normal">
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

      {/* FLOATING MOBILE BUTTON */}
      {isAvailable && (
        <div className="md:hidden fixed bottom-4 inset-x-0 z-50 px-4 pointer-events-none pb-[env(safe-area-inset-bottom)] font-sans">
          <div className="max-w-md mx-auto pointer-events-auto">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-3 rounded-full bg-[#111111] hover:bg-[#2A2A2A] text-white text-[15px] font-semibold uppercase tracking-wide transition-colors duration-200 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 text-white fill-white" strokeWidth={2} />
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* FONTS + ANIMATIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        .font-sans {
          font-family: 'Manrope', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
        }

        @keyframes pop-burst {
          0% { transform: scale(0.7) rotate(-4deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(2deg); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes card-pop {
          0% { transform: scale(0.96); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1.01); }
        }

        @keyframes spark-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-28px, -24px) scale(0); opacity: 0; }
        }
        @keyframes spark-2 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(28px, -28px) scale(0); opacity: 0; }
        }
        @keyframes spark-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-32px, 18px) scale(0); opacity: 0; }
        }
        @keyframes spark-4 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(30px, 22px) scale(0); opacity: 0; }
        }
        @keyframes spark-5 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(0px, -35px) scale(0); opacity: 0; }
        }
        @keyframes spark-6 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(0px, 30px) scale(0); opacity: 0; }
        }

        @keyframes snake-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}