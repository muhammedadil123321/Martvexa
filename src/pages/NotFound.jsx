import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 – Page Not Found | Martvexa';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen
                    text-center px-4 bg-brand-white pt-16">
      <p className="font-display font-bold text-[120px] sm:text-[160px] leading-none
                    text-brand-smoke select-none">
        404
      </p>
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-black -mt-4 mb-3">
        Page Not Found
      </h1>
      <p className="text-brand-ash max-w-sm mb-8 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/" id="notfound-home-btn" className="btn-primary">
          <Home size={16} /> Back to Home
        </Link>
        <a
          href="https://wa.me/919876543210"
          id="notfound-whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Contact via WhatsApp <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
