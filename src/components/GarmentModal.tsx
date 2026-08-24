import React from 'react';
import { GarmentSilhouette, Currency } from '../types';
import { GarmentVisualizer } from './GarmentVisualizer';
import { X, Scissors, Clock, Sparkles, Check, Tag } from 'lucide-react';

interface GarmentModalProps {
  garment: GarmentSilhouette | null;
  currency: Currency;
  onClose: () => void;
  onSelectForBrief: (garment: GarmentSilhouette) => void;
}

export const GarmentModal: React.FC<GarmentModalProps> = ({
  garment,
  currency,
  onClose,
  onSelectForBrief,
}) => {
  if (!garment) return null;

  const priceFormatted =
    currency === 'USD'
      ? `$${garment.basePriceUSD.toLocaleString()}`
      : `₦${garment.basePriceNGN.toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#141009] border-2 border-[#C9A94C] text-[#F3EAD2] shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#F3EAD2]/60 hover:text-[#C9A94C] border border-transparent hover:border-[#C9A94C]/40 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8 items-center">
          {/* Left: Interactive Vector Visualizer */}
          <div className="bg-[#18130B] border border-[rgba(201,169,76,0.3)] p-4 flex items-center justify-center min-h-[320px]">
            <GarmentVisualizer type={garment.svgType} className="w-full max-w-[260px]" />
          </div>

          {/* Right: Garment Specifications & Tailoring Notes */}
          <div className="space-y-5">
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#C9A94C] font-semibold flex items-center gap-1.5">
                <span>{garment.category} Cut</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {garment.turnaroundDays} Days
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#F3EAD2] mt-1">
                {garment.name}
              </h3>

              <div className="text-xl font-serif text-[#C9A94C] mt-1 font-semibold">
                {priceFormatted} <span className="text-xs font-sans text-[#F3EAD2]/50 font-normal">base commission</span>
              </div>
            </div>

            <p className="text-sm text-[#F3EAD2]/75 font-light leading-relaxed">
              {garment.description}
            </p>

            {/* Atelier Specification Details */}
            <div className="space-y-2.5 text-xs border-y border-[rgba(201,169,76,0.2)] py-4 font-sans">
              <div>
                <span className="text-[#8C7A34] uppercase tracking-wider block text-[10px]">Cut & Structure:</span>
                <span className="text-[#F3EAD2]">{garment.details.cut}</span>
              </div>
              <div>
                <span className="text-[#8C7A34] uppercase tracking-wider block text-[10px]">Embroidery & Detail:</span>
                <span className="text-[#F3EAD2]">{garment.details.embroidery}</span>
              </div>
              <div>
                <span className="text-[#8C7A34] uppercase tracking-wider block text-[10px]">Ideal Occasions:</span>
                <span className="text-[#F3EAD2]">{garment.details.occasion}</span>
              </div>
            </div>

            {/* Recommended Fabrics */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#8C7A34] mb-2 font-medium">
                Recommended Textiles:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {garment.fabricSuggestions.map((fab, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 bg-[#1F1810] border border-[rgba(201,169,76,0.25)] text-[#F3EAD2]/90"
                  >
                    {fab}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectForBrief(garment);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#C9A94C] text-[#141009] text-xs uppercase tracking-[0.14em] font-semibold border border-[#C9A94C] hover:bg-[#E0C77A] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Scissors className="w-4 h-4" />
                <span>Customize This Look in Design Brief</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
