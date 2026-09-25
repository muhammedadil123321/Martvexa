import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, ArrowUpRight } from 'lucide-react';

function BrandMark({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="19" fill="#17130F" />
      <circle cx="20" cy="20" r="19" stroke="#C9A75A" strokeWidth="0.75" />
      <path
        d="M11 27V14.5L20 22.5L29 14.5V27"
        stroke="#FAF8F4"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 14.5L20 22.5"
        stroke="#C9A75A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================================================
   LOCAL STYLES — two-tier text scale, matching the rest of the site
   - Main text      (brand name, column headings): 18px, font-medium
   - Secondary text (body copy, links, contact info): 14px, leading-relaxed
============================================================ */
const LocalStyles = () => (
  <style>{`
    .ft-main {
      font-size: 18px;
      font-weight: 500;
      color: #FAF8F4;
    }
    .ft-secondary {
      font-size: 14px;
      line-height: 1.625;
      color: #D1D5DB;
    }
  `}</style>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const PHONE_NUMBER = "918891900699";

  // Pre-filled WhatsApp മെസ്സേജുകൾ
  const returnMsg = encodeURIComponent("Hi Martvexa, I have a query regarding Return & Exchange for my order.");
  const assistanceMsg = encodeURIComponent("Hi Martvexa, I need assistance regarding an order.");

  const footerLinks = {
    Shop: [
      { label: 'All Products', to: '/products' },
      { label: 'Trending', to: '/products' },
      { label: 'Best Seller', to: '/products' },
    ],
    Help: [
      { label: 'How to Order', to: '/howorder' },
      { 
        label: 'Return & Exchange', 
        href: `https://wa.me/${PHONE_NUMBER}?text=${returnMsg}`, 
        isExternal: true 
      },
      { 
        label: 'Order Assistance', 
        href: `https://wa.me/${PHONE_NUMBER}?text=${assistanceMsg}`, 
        isExternal: true 
      },
    ],
    Company: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Privacy Policy', to: '/contact' },
      { label: 'Terms of Service', to: '/contact' },
    ],
  };

  return (
    <footer className="bg-[#12100E] text-[#F3F4F6] border-t border-[#2A241E]">
      <LocalStyles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

          {/* ── Brand Block ─────────────────────────────────────────── */}
          <div className="md:col-span-5 flex flex-col gap-3">

            {/* Header Style Logo & Brand Name */}
            <Link to="/" className="flex items-center gap-3" aria-label="Martvexa home">
              <BrandMark className="w-8 h-8 text-[#FAF8F4]" />
              <span
                className="ft-main tracking-wider"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                MARTVEXA
              </span>
            </Link>

            {/* Store Description */}
            <p className="ft-secondary max-w-sm mt-1">
              Discover smart, innovative products designed to simplify your daily life. Quick and easy ordering via WhatsApp.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-2 mt-1">
              <a
                href={`https://wa.me/${PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-secondary flex items-center gap-2 hover:text-[#25D366] transition-colors font-medium"
              >
                <Phone size={15} className="text-[#D4AF37]" />
                <span>+91 88919 00699</span>
              </a>
              <a
                href="mailto:martvexastore@gmail.com"
                className="ft-secondary flex items-center gap-2 hover:text-white transition-colors font-medium"
              >
                <Mail size={15} className="text-[#D4AF37]" />
                <span>martvexastore@gmail.com</span>
              </a>
            </div>

            {/* Social Icons (Instagram, Facebook, WhatsApp) */}
            <div className="flex items-center gap-2 mt-1">
              {/* Instagram */}
              <a
                href="https://instagram.com/martvexa.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-[#221D18] border border-[#3A322B] flex items-center justify-center text-[#E5E7EB] hover:text-white hover:border-[#D4AF37] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-[#221D18] border border-[#3A322B] flex items-center justify-center text-[#E5E7EB] hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-[#221D18] border border-[#3A322B] flex items-center justify-center text-[#E5E7EB] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* ── Link Columns ─────────────────────────────────────────── */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#D4AF37] mb-3.5">
                  {heading}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ft-secondary hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group font-normal"
                        >
                          {link.label}
                          <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity duration-150" />
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="ft-secondary hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group font-normal"
                        >
                          {link.label}
                          <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity duration-150" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────── */}
        <div className="border-t border-[#2A241E] mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="ft-secondary">© {currentYear} Martvexa. All rights reserved.</p>
          <p className="ft-secondary">Direct WhatsApp Shopping</p>
        </div>
      </div>
    </footer>
  );
}