import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { GarmentVisualizer } from './GarmentVisualizer';

interface HeroProps {
  onStartDesign: (silhouette?: string) => void;
  onExploreCollection: () => void;
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartDesign,
  onExploreCollection,
  onOpenAdvisor,
}) => {
  const [selectedSilhouette, setSelectedSilhouette] = useState<'agbada' | 'kaftan' | 'suit' | 'gown' | 'twopiece'>('agbada');

  const silhouetteOptions: { id: 'agbada' | 'kaftan' | 'suit' | 'gown' | 'twopiece'; label: string; tag: string }[] = [
    { id: 'agbada', label: '3-Piece Agbada', tag: 'Wedding' },
    { id: 'kaftan', label: 'Signature Kaftan', tag: 'Traditional' },
    { id: 'suit', label: 'Executive Suit', tag: 'Boardroom' },
    { id: 'gown', label: 'Sculpted Gown', tag: 'Couture' },
    { id: 'twopiece', label: 'Resort Linen', tag: 'Everyday' },
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(201,169,76,0.08),transparent_70%)] pointer-events-none blur-3xl -z-10" />
      
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 border border-[#C9A94C]/40 bg-[#1F1810]/80 backdrop-blur-sm text-[11px] uppercase tracking-[0.22em] text-[#C9A94C] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A94C] animate-ping" />
              Digital-First Fashion Studio
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-serif font-medium leading-[1.04] tracking-tight text-[#F3EAD2]">
              Your fashion,<br />
              <em className="text-[#C9A94C] italic font-serif font-normal">stitched</em> to fit —<br />
              from idea to delivery.
            </h1>

            <p className="max-w-xl text-base md:text-lg text-[#F3EAD2]/75 leading-relaxed font-light">
              Ahammy Stitches designs and tailors bespoke commissions for weddings, boardrooms, and everyday distinction. Guided every step through a structured digital brief, eliminating the chaotic 17-message WhatsApp thread.
            </p>

            {/* Quick Silhouette Switcher Bar */}
            <div className="pt-1">
              <div className="text-[11px] tracking-[0.16em] uppercase text-[#8C7A34] font-medium mb-3 flex items-center gap-2">
                <span>Select Blueprint to preview</span>
                <span className="h-px flex-1 bg-[rgba(201,169,76,0.2)]"></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {silhouetteOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSilhouette(item.id)}
                    className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
                      selectedSilhouette === item.id
                        ? 'bg-[#C9A94C] text-[#141009] border-[#C9A94C] font-semibold shadow-lg shadow-[#C9A94C]/10'
                        : 'bg-[#1F1810]/70 text-[#F3EAD2]/70 border-[rgba(201,169,76,0.25)] hover:border-[#C9A94C] hover:text-[#F3EAD2]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onStartDesign(selectedSilhouette)}
                className="inline-flex items-center gap-3 px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium bg-[#C9A94C] text-[#141009] border border-[#C9A94C] hover:bg-transparent hover:text-[#C9A94C] transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>Start Your Design Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs tracking-[0.12em] uppercase font-medium bg-transparent text-[#F3EAD2] border border-[rgba(243,234,210,0.35)] hover:border-[#C9A94C] hover:text-[#C9A94C] transition-all duration-300 cursor-pointer"
              >
                <span>Explore The Edit</span>
              </button>
            </div>

            {/* Studio Trust Signals */}
            <div className="pt-4 border-t border-[rgba(201,169,76,0.2)] flex flex-wrap gap-6 text-xs text-[#F3EAD2]/60 tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A94C]"></span>
                <span>Custom Fit Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A94C]"></span>
                <span>Live Milestone Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A94C]"></span>
                <span>Crafted in Port Harcourt</span>
              </div>
            </div>
          </div>

          {/* Right Column: Garment Visualizer Card */}
          <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-[#18130B] border border-[rgba(201,169,76,0.35)] shadow-2xl">
            {/* Corner Stitch Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C9A94C]" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C9A94C]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C9A94C]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C9A94C]" />

            <div className="w-full flex items-center justify-between border-b border-[rgba(201,169,76,0.2)] pb-3 mb-4">
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#8C7A34] font-medium">
                Blueprint / Spec: {selectedSilhouette.toUpperCase()}
              </div>
              <span className="text-[10px] px-2 py-0.5 border border-[#C9A94C]/40 text-[#C9A94C] bg-[#1F1810]">
                Interactive Blueprint
              </span>
            </div>

            <GarmentVisualizer
              type={selectedSilhouette}
              className="my-2 min-h-[380px] w-full"
            />

            <div className="w-full pt-4 mt-2 border-t border-[rgba(201,169,76,0.2)] flex items-center justify-between text-xs">
              <div className="text-[#F3EAD2]/70 font-light">
                Click hotspots for tailoring specifications
              </div>
              <button
                onClick={() => onStartDesign(selectedSilhouette)}
                className="text-[#C9A94C] hover:text-[#E0C77A] text-[11px] tracking-wider uppercase font-medium flex items-center gap-1"
              >
                Configure This Cut &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
