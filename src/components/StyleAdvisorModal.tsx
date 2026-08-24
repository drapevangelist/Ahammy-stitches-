import React, { useState } from 'react';
import { GARMENTS, FABRIC_SWATCHES } from '../data/fashionData';
import { GarmentSilhouette, FabricSwatch } from '../types';
import { Sparkles, X, Check, ArrowRight, Wand2, Compass } from 'lucide-react';

interface StyleAdvisorModalProps {
  onClose: () => void;
  onApplyRecommendation: (garment: GarmentSilhouette, fabric: FabricSwatch) => void;
}

export const StyleAdvisorModal: React.FC<StyleAdvisorModalProps> = ({
  onClose,
  onApplyRecommendation,
}) => {
  const [eventVibe, setEventVibe] = useState<string>('wedding');
  const [presence, setPresence] = useState<string>('regal');
  const [paletteVibe, setPaletteVibe] = useState<string>('gold');
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultResult, setConsultResult] = useState<{
    garment: GarmentSilhouette;
    fabric: FabricSwatch;
    rationale: string;
    stylingTip: string;
  } | null>(null);

  const handleConsult = () => {
    setIsConsulting(true);
    setTimeout(() => {
      let matchedGarment = GARMENTS[0]; // Agbada
      let matchedFabric = FABRIC_SWATCHES[0]; // Cashmere

      if (eventVibe === 'corporate' || presence === 'understated') {
        matchedGarment = GARMENTS.find((g) => g.id === 'executive-suit') || GARMENTS[1];
        matchedFabric = FABRIC_SWATCHES.find((f) => f.id === 'wool-sandgold') || FABRIC_SWATCHES[1];
      } else if (eventVibe === 'traditional') {
        matchedGarment = GARMENTS.find((g) => g.id === 'senator-minimal') || GARMENTS[2];
        matchedFabric = FABRIC_SWATCHES.find((f) => f.id === 'swiss-emerald') || FABRIC_SWATCHES[2];
      } else if (eventVibe === 'casual') {
        matchedGarment = GARMENTS.find((g) => g.id === 'twopiece-resort') || GARMENTS[4];
        matchedFabric = FABRIC_SWATCHES.find((f) => f.id === 'linen-slate') || FABRIC_SWATCHES[5];
      } else if (eventVibe === 'wedding') {
        if (presence === 'sculpted') {
          matchedGarment = GARMENTS.find((g) => g.id === 'gown-sculpted') || GARMENTS[3];
          matchedFabric = FABRIC_SWATCHES.find((f) => f.id === 'crepe-cream') || FABRIC_SWATCHES[4];
        } else {
          matchedGarment = GARMENTS.find((g) => g.id === 'agbada-regal') || GARMENTS[0];
          matchedFabric = FABRIC_SWATCHES.find((f) => f.id === 'brocade-wine') || FABRIC_SWATCHES[3];
        }
      }

      setConsultResult({
        garment: matchedGarment,
        fabric: matchedFabric,
        rationale: `For your ${eventVibe} presence, we recommend ${matchedGarment.name} cut in ${matchedFabric.name}. This balances dignified structural drape with optimal thermal comfort.`,
        stylingTip: `Pair with polished oxfords or bespoke velvet slippers, a matching cap, and minimal gold cuff accents.`,
      });
      setIsConsulting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#141009] border-2 border-[#C9A94C] text-[#F3EAD2] shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#F3EAD2]/60 hover:text-[#C9A94C] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A94C] font-semibold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Atelier Style & Silhouette Advisor</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#F3EAD2] mb-2">
          Discover Your Ideal Cut
        </h3>
        <p className="text-xs text-[#F3EAD2]/70 mb-6 font-light leading-relaxed">
          Calibrated to your event setting, body presence, and textural aesthetic.
        </p>

        {!consultResult ? (
          <div className="space-y-5 text-xs">
            {/* Occasion */}
            <div>
              <label className="block text-[#8C7A34] uppercase tracking-wider font-medium mb-2">
                1. What is the occasion?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'wedding', label: 'Grand Traditional Wedding' },
                  { id: 'corporate', label: 'Boardroom / State Keynote' },
                  { id: 'traditional', label: 'Heritage Ceremony / Friday' },
                  { id: 'casual', label: 'Weekend Getaway / Resort' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEventVibe(item.id)}
                    className={`p-3 text-left border transition-all ${
                      eventVibe === item.id
                        ? 'bg-[#C9A94C] text-[#141009] border-[#C9A94C] font-semibold'
                        : 'bg-[#18130B] text-[#F3EAD2]/80 border-[rgba(201,169,76,0.2)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Presence */}
            <div>
              <label className="block text-[#8C7A34] uppercase tracking-wider font-medium mb-2">
                2. What presence do you want to command?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'regal', label: 'Monumental & Regal (Grand Flow)' },
                  { id: 'understated', label: 'Sharp, Quiet Architectural Authority' },
                  { id: 'sculpted', label: 'Couture Sculpted & Floor Skimming' },
                  { id: 'relaxed', label: 'Effortless, Lightweight Modern Ease' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPresence(item.id)}
                    className={`p-3 text-left border transition-all ${
                      presence === item.id
                        ? 'bg-[#C9A94C] text-[#141009] border-[#C9A94C] font-semibold'
                        : 'bg-[#18130B] text-[#F3EAD2]/80 border-[rgba(201,169,76,0.2)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConsult}
              disabled={isConsulting}
              className="w-full py-3.5 bg-[#C9A94C] text-[#141009] uppercase tracking-[0.14em] text-xs font-semibold border border-[#C9A94C] hover:bg-[#E0C77A] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-4"
            >
              <Wand2 className="w-4 h-4" />
              <span>{isConsulting ? 'Consulting Atelier Archives...' : 'Generate Recommended Silhouette'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#18130B] border border-[#C9A94C] p-6 space-y-4">
              <div className="text-[11px] uppercase tracking-widest text-[#C9A94C] font-semibold">
                Curated Recommendation
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-serif font-medium text-[#F3EAD2]">
                    {consultResult.garment.name}
                  </h4>
                  <div className="text-xs text-[#8C7A34] mt-0.5">
                    Textile: {consultResult.fabric.name}
                  </div>
                </div>
                <div
                  className="w-10 h-10 border border-[#C9A94C]"
                  style={{ backgroundColor: consultResult.fabric.colorHex }}
                />
              </div>

              <p className="text-xs text-[#F3EAD2]/80 leading-relaxed font-light border-y border-[rgba(201,169,76,0.2)] py-3">
                {consultResult.rationale}
              </p>

              <div className="text-xs text-[#8C7A34] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A94C]" />
                <span>Styling Direction: {consultResult.stylingTip}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onApplyRecommendation(consultResult.garment, consultResult.fabric);
                  onClose();
                }}
                className="flex-1 py-3 bg-[#C9A94C] text-[#141009] text-xs uppercase tracking-wider font-semibold hover:bg-[#E0C77A] transition-colors cursor-pointer"
              >
                Apply to Design Brief &rarr;
              </button>
              <button
                onClick={() => setConsultResult(null)}
                className="py-3 px-4 border border-[rgba(243,234,210,0.3)] text-xs uppercase tracking-wider text-[#F3EAD2] hover:border-[#C9A94C]"
              >
                Change Preferences
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
