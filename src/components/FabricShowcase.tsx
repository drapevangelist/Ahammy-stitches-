import React, { useState } from 'react';
import { FABRIC_SWATCHES } from '../data/fashionData';
import { FabricSwatch } from '../types';
import { Sparkles, Globe, Layers, Feather, Check } from 'lucide-react';

interface FabricShowcaseProps {
  onSelectFabricForBrief?: (fabric: FabricSwatch) => void;
}

export const FabricShowcase: React.FC<FabricShowcaseProps> = ({
  onSelectFabricForBrief,
}) => {
  const [selectedSwatch, setSelectedSwatch] = useState<FabricSwatch>(FABRIC_SWATCHES[0]);

  return (
    <section id="swatches" className="py-24 bg-[#18130B] border-y border-[rgba(201,169,76,0.25)] relative">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-[12px] tracking-[0.22em] text-[#8C7A34] uppercase font-medium mb-3">
            Material Library
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#F3EAD2] tracking-tight">
            The Fabric Archive
          </h2>
          <p className="text-[#F3EAD2]/70 mt-3 text-base font-light">
            Luxury tailored wear begins at the loom. We source ethically from heritage European mills and premier West African artisan weavers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          
          {/* Swatch Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FABRIC_SWATCHES.map((swatch) => {
              const isSelected = selectedSwatch.id === swatch.id;
              return (
                <div
                  key={swatch.id}
                  onClick={() => setSelectedSwatch(swatch)}
                  className={`p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1F1810] border-[#C9A94C] shadow-lg ring-1 ring-[#C9A94C]'
                      : 'bg-[#141009] border-[rgba(201,169,76,0.2)] hover:border-[#C9A94C]/60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Swatch Visual Circle / Square with luxury texture preview */}
                    <div
                      className="w-12 h-12 rounded-none border border-[rgba(201,169,76,0.5)] shadow-inner relative flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: swatch.colorHex }}
                    >
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,169,76,0.15)_1px,transparent_1px)] bg-[size:4px_4px]" />
                      {isSelected && <Check className="w-4 h-4 text-[#C9A94C] drop-shadow-md" />}
                    </div>

                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-[#8C7A34] block">
                        {swatch.premiumTier}
                      </span>
                      <h4 className="text-sm font-serif font-medium text-[#F3EAD2] leading-snug mt-0.5">
                        {swatch.name}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[rgba(201,169,76,0.15)] flex items-center justify-between text-[11px] text-[#F3EAD2]/60">
                    <span>{swatch.weight}</span>
                    <span className="text-[#C9A94C]">{swatch.origin.split(',')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Fabric Spotlight Card */}
          <div className="bg-[#141009] border border-[#C9A94C]/50 p-8 relative shadow-2xl">
            {/* Header info */}
            <div className="flex items-start justify-between gap-4 border-b border-[rgba(201,169,76,0.2)] pb-6 mb-6">
              <div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#C9A94C] font-medium flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Textile Inspection
                </div>
                <h3 className="text-2xl font-serif text-[#F3EAD2] font-medium">
                  {selectedSwatch.name}
                </h3>
                <div className="text-xs text-[#8C7A34] mt-1">{selectedSwatch.material}</div>
              </div>

              <div
                className="w-16 h-16 border-2 border-[#C9A94C] shadow-lg flex-shrink-0"
                style={{ backgroundColor: selectedSwatch.colorHex }}
              />
            </div>

            <p className="text-sm text-[#F3EAD2]/80 font-light leading-relaxed mb-6">
              {selectedSwatch.description}
            </p>

            {/* Spec Matrix */}
            <div className="space-y-3.5 text-xs border-y border-[rgba(201,169,76,0.15)] py-5 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[#8C7A34] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Provenance
                </span>
                <span className="text-[#F3EAD2] font-medium">{selectedSwatch.origin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C7A34] flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5" /> Fabric Hand & Drape
                </span>
                <span className="text-[#F3EAD2]">{selectedSwatch.texture}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C7A34] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Weight Specification
                </span>
                <span className="text-[#C9A94C] font-mono">{selectedSwatch.weight}</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#8C7A34] mb-2 font-medium">
                Optimal Garment Pairings:
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedSwatch.suitableFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-[#1F1810] border border-[rgba(201,169,76,0.3)] text-[#F3EAD2]/90"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {onSelectFabricForBrief && (
                <button
                  onClick={() => onSelectFabricForBrief(selectedSwatch)}
                  className="w-full py-3 text-xs uppercase tracking-[0.12em] font-medium bg-[#C9A94C] text-[#141009] border border-[#C9A94C] hover:bg-transparent hover:text-[#C9A94C] transition-colors cursor-pointer"
                >
                  Use This Textile in My Design Brief &rarr;
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
