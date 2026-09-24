import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  ShoppingBag,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";

/* ============================================================
   TRUST STRIP DATA
============================================================ */
const TRUST_POINTS = [
  {
    icon: Clock3,
    label: "24/7 Support",
    desc: "Assistance available whenever you need help",
  },
  {
    icon: ShoppingBag,
    label: "Easy Ordering",
    desc: "Quick, hassle-free checkout in just a few steps",
  },
  {
    icon: RotateCcw,
    label: "Easy Return & Exchange",
    desc: "Accepted strictly with a valid reason",
  },
];

/* ============================================================
   LOCAL STYLES — shared with the rest of the site
   Text scale matches HowToOrder exactly:
   - Main text  (headings inside cards): 18px, font-medium
   - Secondary text (body/description):  14px, leading-relaxed
============================================================ */
const LocalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');

    .ct-card {
      transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
    }
    .ct-card:hover {
      transform: translateY(-3px);
      border-color: rgba(181, 122, 37, 0.4);
      box-shadow: 0 16px 35px -15px rgba(61, 40, 29, 0.14);
    }
    .ct-icon-box {
      transition: border-color 300ms ease, box-shadow 300ms ease;
    }
    .ct-card:hover .ct-icon-box {
      border-color: rgba(181, 122, 37, 0.5);
      box-shadow: 0 0 16px 0 rgba(181, 122, 37, 0.2);
    }
    .ct-input:focus {
      box-shadow: 0 0 0 3px rgba(181, 122, 37, 0.12);
    }

    /* Two-tier text scale, matching HowToOrder */
    .ct-main {
      font-size: 18px;
      font-weight: 500;
      color: #221C18;
    }
    .ct-secondary {
      font-size: 14px;
      line-height: 1.625;
      color: #52463C;
    }
  `}</style>
);

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const phoneNumber = "918891900699";
  const emailAddress = "martvexastore@gmail.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[linear-gradient(160deg,#F3E9D2_0%,#F8F2E4_45%,#FBF9F4_100%)] text-[#221C18] py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <LocalStyles />
      <div className="max-w-6xl mx-auto">

        {/* ================= HERO HEADER ================= */}
        <div className="text-center flex flex-col items-center gap-3 mb-12 md:mb-16">
          <span className="text-[11px] font-semibold tracking-[0.14em] text-[#8C7A6B] uppercase">
            Direct Support & Assistance
          </span>
          <h1
            className="text-[36px] sm:text-[46px] md:text-[52px] font-medium leading-tight text-[#221C18]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            How Can We <span className="text-[#B57A25]">Help?</span>
          </h1>
          <p className="ct-secondary text-[15px] sm:text-[16px] max-w-lg">
            Questions about an order, shipping, or a product? Reach our team directly
            through any of the channels below.
          </p>
        </div>

        {/* ================= TRUST STRIP ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 md:mb-14">
          {TRUST_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.label}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-[#B57A25]/15 rounded-2xl px-4 py-3.5"
              >
                <div className="w-9 h-9 rounded-full bg-[#B57A25]/12 border border-[#B57A25]/20 flex items-center justify-center shrink-0 text-[#B57A25]">
                  <Icon className="w-4.5 h-4.5" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="ct-main">
                    {point.label}
                  </p>
                  <p className="ct-secondary">
                    {point.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* LEFT: Direct Channels (5 Cols) */}
          <div className="md:col-span-5 space-y-4">

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hello! I have a query regarding an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-card group block bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#B57A25]/20 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/10 text-[#1E9E4B] ct-secondary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                  Quick response
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C7A6B] group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div className="flex items-start gap-3.5">
                <div className="ct-icon-box w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="ct-main">
                    WhatsApp chat
                  </h3>
                  <p className="ct-secondary mt-0.5">
                    Message our team for instant stock checks and order help.
                  </p>
                </div>
              </div>
            </a>

            {/* Direct Phone & Email Card */}
            <div className="ct-card bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#B57A25]/20 shadow-sm space-y-3">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-[#8C7A6B] uppercase block">
                Direct reachouts
              </span>

              {/* Phone */}
              <a
                href={`tel:+${phoneNumber}`}
                className="flex items-center justify-between p-3 rounded-xl border border-[#B57A25]/12 hover:border-[#B57A25]/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B57A25]/12 border border-[#B57A25]/20 text-[#B57A25] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="ct-main">Call us</p>
                    <p className="ct-secondary">+91 88919 00699</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A6B] group-hover:text-[#B57A25] transition-colors" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center justify-between p-3 rounded-xl border border-[#B57A25]/12 hover:border-[#B57A25]/40 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#B57A25]/12 border border-[#B57A25]/20 text-[#B57A25] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="ct-main">Email us</p>
                    <p className="ct-secondary truncate">{emailAddress}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A6B] group-hover:text-[#B57A25] transition-colors shrink-0" />
              </a>
            </div>

            {/* Assurance Note */}
            <div className="flex items-start gap-3 rounded-2xl border border-[#B57A25]/15 bg-[#EFE6D5]/50 p-4">
              <ShieldCheck className="w-4 h-4 text-[#B57A25] shrink-0 mt-0.5" strokeWidth={1.8} />
              <p className="ct-secondary">
                <span className="text-[#221C18] font-medium">Verified Support:</span>{" "}
                All messages are read directly by our store team to guarantee privacy and fast assistance
              </p>
            </div>

          </div>

          {/* RIGHT: Message Form (7 Cols) */}
          <div className="md:col-span-7 bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#B57A25]/20 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <h3
                  className="text-[22px] font-medium text-[#221C18]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Message received
                </h3>
                <p className="ct-secondary max-w-xs mx-auto">
                  Thanks for reaching out. Our team has your query and will reply shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="ct-secondary mt-2 text-[#B57A25] font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2
                    className="text-[22px] font-medium text-[#221C18]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Send a message
                  </h2>
                  <p className="ct-secondary mt-0.5">
                    Leave your inquiry below and we'll reply to your inbox or phone.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="ct-secondary font-medium block">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ct-input ct-secondary w-full px-3.5 py-2.5 rounded-xl border border-[#B57A25]/20 bg-white/60 text-[#221C18] focus:bg-white focus:outline-none focus:border-[#B57A25] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="ct-secondary font-medium block">
                    Email or phone number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Where should we get back to you?"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="ct-input ct-secondary w-full px-3.5 py-2.5 rounded-xl border border-[#B57A25]/20 bg-white/60 text-[#221C18] focus:bg-white focus:outline-none focus:border-[#B57A25] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="ct-secondary font-medium block">
                    Your message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, order ID, or product question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="ct-input ct-secondary w-full px-3.5 py-2.5 rounded-xl border border-[#B57A25]/20 bg-white/60 text-[#221C18] focus:bg-white focus:outline-none focus:border-[#B57A25] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#111111] text-[#FFFFFF] text-[14px] font-medium hover:bg-[#2A2A2A] transition-colors duration-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3D281D] focus-visible:outline-offset-4"
                >
                  <span>Send message</span>
                  <Send className="w-3.5 h-3.5" strokeWidth={1.8} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}