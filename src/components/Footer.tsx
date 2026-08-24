import React from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Clock } from 'lucide-react';

interface FooterProps {
  onOpenDesignBrief: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDesignBrief,
  onOpenTracker,
}) => {
  return (
    <footer className="bg-[#141009] border-t border-[rgba(201,169,76,0.3)] text-[#F3EAD2] pt-16 pb-12">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[rgba(201,169,76,0.2)]">
          
          {/* Col 1: Brand Wordmark & Philosophy */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 border border-[#C9A94C] flex items-center justify-center bg-[#1F1810]">
                <span className="font-serif text-[#C9A94C] text-sm italic">A</span>
              </div>
              <div className="font-serif text-xl font-medium tracking-tight text-[#F3EAD2]">
                Ahammy <span className="text-[#C9A94C] italic">Stitches</span>
              </div>
            </div>
            <p className="text-xs text-[#F3EAD2]/65 leading-relaxed font-light">
              Digital-First bespoke fashion studio based in Port Harcourt, Nigeria. Translating individuality into monumental tailoring without the back-and-forth.
            </p>
            <div className="text-[11px] text-[#8C7A34] uppercase tracking-widest font-mono">
              Est. in the Garden City · 2024
            </div>
          </div>

          {/* Col 2: Atelier Studio Address & Hours */}
          <div className="space-y-3 text-xs">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#C9A94C] font-semibold">
              The Flagship Atelier
            </div>
            <div className="flex items-start gap-2 text-[#F3EAD2]/75 font-light">
              <MapPin className="w-4 h-4 text-[#8C7A34] flex-shrink-0 mt-0.5" />
              <span>14 King Perekule Street, GRA Phase 2, Port Harcourt, Rivers State, Nigeria</span>
            </div>
            <div className="flex items-center gap-2 text-[#F3EAD2]/75 font-light pt-1">
              <Clock className="w-4 h-4 text-[#8C7A34] flex-shrink-0" />
              <span>Mon – Sat: 9:00 AM – 6:30 PM WAT</span>
            </div>
          </div>

          {/* Col 3: Direct Navigation */}
          <div className="space-y-3 text-xs">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#C9A94C] font-semibold">
              Client Portal
            </div>
            <ul className="space-y-2 text-[#F3EAD2]/75 font-light">
              <li>
                <a href="#explore" className="hover:text-[#C9A94C] transition-colors">
                  The Edit Catalog
                </a>
              </li>
              <li>
                <a href="#swatches" className="hover:text-[#C9A94C] transition-colors">
                  Textile Swatch Archive
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenDesignBrief}
                  className="hover:text-[#C9A94C] transition-colors text-left"
                >
                  Start Custom Design Brief
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-[#C9A94C] transition-colors text-left"
                >
                  Live Order Tracker (Dashboard)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Direct Line & Social */}
          <div className="space-y-3 text-xs">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#C9A94C] font-semibold">
              Direct Inquiries
            </div>
            <div className="space-y-2">
              <a
                href="https://wa.me/2348039655829"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F3EAD2]/80 hover:text-[#C9A94C] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: +234 803 965 5829</span>
              </a>
              <a
                href="mailto:concierge@ahammystitches.com"
                className="flex items-center gap-2 text-[#F3EAD2]/80 hover:text-[#C9A94C] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#8C7A34]" />
                <span>concierge@ahammystitches.com</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F3EAD2]/80 hover:text-[#C9A94C] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#C9A94C]" />
                <span>@ahammystitches</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F3EAD2]/50 font-light gap-4">
          <div>
            &copy; {new Date().getFullYear()} Ahammy Stitches Studio. All rights reserved. Crafted with distinction.
          </div>
          <div className="flex gap-6 uppercase tracking-wider text-[11px]">
            <a href="#privacy" className="hover:text-[#C9A94C] transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-[#C9A94C] transition-colors">Bespoke Terms</a>
            <a href="#shipping" className="hover:text-[#C9A94C] transition-colors">Worldwide Shipping</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
