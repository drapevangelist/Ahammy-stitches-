import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Scissors, Search, Sparkles, PhoneCall } from 'lucide-react';
import { Currency } from '../types';

interface HeaderProps {
  activeSection: string;
  currency: Currency;
  onToggleCurrency: (c: Currency) => void;
  onOpenDesignBrief: () => void;
  onOpenTracker: () => void;
  onOpenAdvisor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  currency,
  onToggleCurrency,
  onOpenDesignBrief,
  onOpenTracker,
  onOpenAdvisor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Explore', href: '#explore' },
    { label: 'The Swatches', href: '#swatches' },
    { label: 'Design Brief', href: '#design', action: onOpenDesignBrief },
    { label: 'Track Order', href: '#track', action: onOpenTracker },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#141009]/95 backdrop-blur-md border-b border-[rgba(201,169,76,0.35)] shadow-2xl py-3.5'
          : 'bg-[#141009]/80 backdrop-blur-sm border-b border-[rgba(201,169,76,0.2)] py-4'
      }`}
    >
      <nav className="max-w-[1180px] mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Ahammy Stitches Home"
        >
          <div className="w-8 h-8 border border-[#C9A94C] flex items-center justify-center bg-[#1F1810] group-hover:border-[#E0C77A] transition-colors">
            <span className="font-serif text-[#C9A94C] text-lg italic leading-none">A</span>
          </div>
          <div>
            <div className="font-serif text-xl md:text-2xl font-medium tracking-tight text-[#F3EAD2] flex items-baseline gap-1.5">
              Ahammy <span className="text-[#C9A94C] italic font-light font-serif">Stitches</span>
            </div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[#8C7A34] font-sans -mt-0.5">
              Port Harcourt Atelier
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.08em] uppercase font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.action) {
                  e.preventDefault();
                  link.action();
                  const target = document.querySelector(link.href);
                  target?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative py-1 text-[#F3EAD2]/80 hover:text-[#C9A94C] transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A94C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </div>

        {/* Right Tools & CTA */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Style Advisor trigger */}
          <button
            onClick={onOpenAdvisor}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-widest uppercase text-[#C9A94C] border border-[#C9A94C]/30 hover:border-[#C9A94C] bg-[#1F1810] transition-colors rounded-none"
            title="Style & Silhouette Advisor"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A94C]" />
            <span>AI Advisor</span>
          </button>

          {/* Currency Switcher */}
          <div className="flex items-center border border-[rgba(201,169,76,0.35)] bg-[#1F1810] text-[11px] font-sans font-medium">
            <button
              onClick={() => onToggleCurrency('NGN')}
              className={`px-2.5 py-1.5 tracking-wider transition-colors ${
                currency === 'NGN' ? 'bg-[#C9A94C] text-[#141009] font-semibold' : 'text-[#F3EAD2]/70 hover:text-[#C9A94C]'
              }`}
            >
              ₦ NGN
            </button>
            <button
              onClick={() => onToggleCurrency('USD')}
              className={`px-2.5 py-1.5 tracking-wider transition-colors ${
                currency === 'USD' ? 'bg-[#C9A94C] text-[#141009] font-semibold' : 'text-[#F3EAD2]/70 hover:text-[#C9A94C]'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Quick Track Order Icon Button */}
          <button
            onClick={onOpenTracker}
            className="p-2 border border-[#C9A94C]/30 text-[#F3EAD2]/80 hover:text-[#C9A94C] hover:border-[#C9A94C] transition-colors"
            title="Track Order Status"
            aria-label="Track Order Status"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenDesignBrief}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[12px] tracking-[0.1em] uppercase font-medium bg-[#C9A94C] text-[#141009] border border-[#C9A94C] hover:bg-transparent hover:text-[#C9A94C] transition-all duration-300 shadow-md cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Start Design</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 border border-[rgba(201,169,76,0.35)] text-[#C9A94C] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[62px] bg-[#141009]/98 backdrop-blur-xl z-50 flex flex-col p-8 border-b border-[rgba(201,169,76,0.35)] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6 text-center my-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.action) {
                    e.preventDefault();
                    link.action();
                    const target = document.querySelector(link.href);
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="font-serif text-2xl text-[#F3EAD2] hover:text-[#C9A94C] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvisor();
              }}
              className="font-serif text-2xl text-[#C9A94C] flex items-center justify-center gap-2 py-2"
            >
              <Sparkles className="w-5 h-5" />
              AI Style Advisor
            </button>
          </div>

          <div className="pt-8 border-t border-[rgba(201,169,76,0.2)] flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDesignBrief();
              }}
              className="w-full py-3.5 text-center text-xs tracking-[0.12em] uppercase font-medium bg-[#C9A94C] text-[#141009] border border-[#C9A94C]"
            >
              Start Design Brief
            </button>
            <div className="text-center text-xs text-[#F3EAD2]/50 tracking-wider">
              Studio: 14 King Perekule St, GRA Phase 2, Port Harcourt
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
