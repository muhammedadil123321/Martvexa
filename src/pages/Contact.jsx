import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#17130F] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#A3907C] uppercase">
            DIRECT SUPPORT & ASSISTANCE
          </p>
          
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#17130F] tracking-tight leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            How Can We <span className="text-[#B57A25]">Help?</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-[#6B5E52] leading-relaxed max-w-md mx-auto">
            Have questions about placing an order, shipping, or product details? Get in touch with us through any of the channels below.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Minimal & Trustworthy Direct Channels (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Minimal Trustworthy WhatsApp Card */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hello! I have a query regarding an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl p-5 border border-[#E7E1D6] hover:border-[#25D366] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/10 text-[#1E9E4B] text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                  Quick Response
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C7A6B] group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/20">
                  <MessageCircle className="w-5 h-5 fill-current opacity-90" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#17130F] group-hover:text-[#25D366] transition-colors">
                    WhatsApp Chat
                  </h3>
                  <p className="text-xs text-[#6B5E52] mt-0.5 leading-relaxed">
                    Chat directly with our team for instant stock checks & order help.
                  </p>
                </div>
              </div>
            </a>

            {/* Direct Phone & Email Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E1D6] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A3907C] block mb-1">
                Direct Reachouts
              </span>

              {/* Phone */}
              <a
                href={`tel:+${phoneNumber}`}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E1D6]/60 hover:border-[#B57A25] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F3EEE5] text-[#B57A25] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#17130F]">Call Us</p>
                    <p className="text-[11px] text-[#6B5E52]">+91 88919 00699</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A6B] group-hover:text-[#B57A25] transition-colors" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E1D6]/60 hover:border-[#B57A25] transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#F3EEE5] text-[#B57A25] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#17130F]">Email Us</p>
                    <p className="text-[11px] text-[#6B5E52] truncate">{emailAddress}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A6B] group-hover:text-[#B57A25] transition-colors shrink-0" />
              </a>
            </div>

            {/* Trust Assurance Badge */}
            <div className="bg-[#F3EEE5]/60 border border-[#E7E1D6] rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#B57A25] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#6B5E52] leading-relaxed">
                <strong className="text-[#17130F] font-semibold">Verified Support:</strong> All messages are read directly by our store team to guarantee privacy and fast assistance.
              </p>
            </div>

          </div>

          {/* RIGHT: Minimal Message Form (7 Cols) */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E1D6] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 
                  className="text-xl font-normal text-[#17130F]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Message Received
                </h3>
                <p className="text-xs text-[#6B5E52] max-w-xs mx-auto leading-relaxed">
                  Thank you for reaching out. We have received your query and will reply shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-[#B57A25] font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 
                    className="text-xl font-normal text-[#17130F]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Send a Message
                  </h2>
                  <p className="text-xs text-[#6B5E52] mt-0.5">
                    Leave your inquiry below and we’ll reply to your inbox or phone.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#17130F]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E1D6] bg-[#FAF8F5] text-[#17130F] focus:bg-white focus:outline-none focus:border-[#B57A25] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#17130F]">
                    Email or Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Where should we get back to you?"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E1D6] bg-[#FAF8F5] text-[#17130F] focus:bg-white focus:outline-none focus:border-[#B57A25] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#17130F]">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, order ID, or product question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E1D6] bg-[#FAF8F5] text-[#17130F] focus:bg-white focus:outline-none focus:border-[#B57A25] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#17130F] hover:bg-[#2D2620] text-white text-xs font-medium tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5 text-[#B57A25]" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}