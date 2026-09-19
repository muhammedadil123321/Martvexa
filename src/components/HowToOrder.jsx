import React from "react";
import {
  Search,
  MapPin,
  CreditCard,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

/* ============================================================
   STEPS DATA — exact original content
============================================================ */
const STEPS = [
  {
    number: "01",
    title: "Browse & Select Product",
    desc: "Browse through our curated collection, explore product details, and choose the item that best fits your needs.",
    icon: Search,
  },
  {
    number: "02",
    title: "Send Details via WhatsApp",
    desc: "Click the WhatsApp button on the product page to send us the product details for instant clarity, customization, and stock checks.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Provide Shipping Details",
    desc: "Fill in your full name, accurate delivery address, email, and contact number during checkout.",
    icon: MapPin,
  },
  {
    number: "04",
    title: "Select Payment Method",
    desc: "Choose your preferred payment option from UPI, Credit/Debit Cards, Net Banking, or Cash on Delivery (COD).",
    icon: CreditCard,
  },
  {
    number: "05",
    title: "Order Confirmation",
    desc: "Once completed, you will receive an instant order confirmation along with tracking details to follow your shipment.",
    icon: CheckCircle2,
  },
];

/* ============================================================
   LOCAL STYLES — font + animation
============================================================ */
const LocalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');

    .hto-card {
      transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
    }
    .hto-card:hover {
      transform: translateY(-4px);
      border-color: rgba(181, 122, 37, 0.4);
      box-shadow: 0 16px 35px -15px rgba(61, 40, 29, 0.12);
    }
    .hto-icon-box {
      transition: border-color 300ms ease, box-shadow 300ms ease;
    }
    .hto-card:hover .hto-icon-box {
      border-color: rgba(181, 122, 37, 0.5);
      box-shadow: 0 0 16px 0 rgba(181, 122, 37, 0.2);
    }
  `}</style>
);

export default function HowToOrder() {
  return (
    <div className="bg-[linear-gradient(160deg,#F3E9D2_0%,#F8F2E4_45%,#FBF9F4_100%)] text-[#221C18] py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <LocalStyles />
      <div className="max-w-6xl mx-auto">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center flex flex-col items-center gap-3 mb-12 md:mb-16">
          <span className="text-[11px] font-semibold tracking-[0.14em] text-[#8C7A6B] uppercase">
            Simple & Easy Steps
          </span>
          <h1
            className="text-[36px] sm:text-[46px] md:text-[52px] font-medium leading-tight text-[#221C18]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            How to <span className="text-[#B57A25]">Order</span>
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#52463C] max-w-lg leading-relaxed">
            Follow these simple steps to seamlessly place your order on our platform.
          </p>
        </div>

        {/* ================= CURVED WIREFRAME LAYOUT (DESKTOP GRID) ================= */}
        <div className="relative">
          
          {/* Decorative Curved Wireframe SVG (Laptop/Desktop display) */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0"
            fill="none"
            stroke="currentColor"
          >
            {/* Top Row Curve: Step 01 -> Step 02 -> Step 03 */}
            <path
              d="M 180 140 H 820"
              stroke="#B57A25"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
            />
            {/* S-Curve Loop Down: Step 03 -> Step 04 */}
            <path
              d="M 820 140 C 1020 140, 1020 420, 820 420"
              stroke="#B57A25"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
            />
            {/* Bottom Row Curve: Step 04 <- Step 05 */}
            <path
              d="M 820 420 H 500"
              stroke="#B57A25"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
            />
          </svg>

          {/* Row 1: Steps 01, 02, 03 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-6 lg:mb-16">
            {STEPS.slice(0, 3).map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="hto-card bg-white/80 backdrop-blur-md border border-[#B57A25]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="hto-icon-box w-10 h-10 rounded-full bg-[#B57A25]/12 border border-[#B57A25]/20 flex items-center justify-center shrink-0 text-[#B57A25]">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                      <span className="w-8 h-8 rounded-full bg-[#EFE6D5] text-[#3D281D] flex items-center justify-center text-[12px] font-bold">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-medium text-[#221C18] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[#52463C] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: Steps 04, 05 (Serpentine Flow / Curved alignment) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {/* Empty Spacer Column for Desktop Curved Wireframe Alignment */}
            <div className="hidden lg:block" />

            {STEPS.slice(3, 5).map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="hto-card bg-white/80 backdrop-blur-md border border-[#B57A25]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="hto-icon-box w-10 h-10 rounded-full bg-[#B57A25]/12 border border-[#B57A25]/20 flex items-center justify-center shrink-0 text-[#B57A25]">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                      <span className="w-8 h-8 rounded-full bg-[#EFE6D5] text-[#3D281D] flex items-center justify-center text-[12px] font-bold">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-medium text-[#221C18] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[#52463C] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}