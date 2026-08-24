import React, { useState } from 'react';
import { EDITS_DATA, GARMENTS } from '../data/fashionData';
import { GarmentSilhouette, Currency } from '../types';
import { ArrowUpRight, Sparkles, Clock, Tag } from 'lucide-react';

interface CollectionExploreProps {
  currency: Currency;
  onSelectGarmentForBrief: (garment: GarmentSilhouette) => void;
  onViewGarmentDetails: (garment: GarmentSilhouette) => void;
}

export const CollectionExplore: React.FC<CollectionExploreProps> = ({
  currency,
  onSelectGarmentForBrief,
  onViewGarmentDetails,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredEdits =
    selectedFilter === 'all'
      ? EDITS_DATA
      : EDITS_DATA.filter((e) => e.id === selectedFilter);

  const formatPrice = (priceNGN: number, priceUSD: number) => {
    if (currency === 'USD') {
      return `$${priceUSD.toLocaleString()}`;
    }
    return `₦${priceNGN.toLocaleString()}`;
  };

  return (
    <section id="explore" className="py-24 relative bg-[#141009]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-[12px] tracking-[0.22em] text-[#C9A94C] uppercase font-medium mb-3">
              Explore The Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#F3EAD2] tracking-tight">
              The Edit
            </h2>
            <p className="text-[#F3EAD2]/70 mt-4 text-base leading-relaxed font-light">
              Every commission belongs to a story. Browse our signature editorial cuts curated by occasion, tailored to your exact measurements.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {['all', 'wedding', 'executive', 'traditional', 'everyday'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#C9A94C] text-[#141009] border-[#C9A94C] font-semibold'
                    : 'bg-[#1F1810] text-[#F3EAD2]/60 border-[rgba(201,169,76,0.25)] hover:border-[#C9A94C] hover:text-[#F3EAD2]'
                }`}
              >
                {cat === 'all' ? 'All Edits' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* The 4 Signature Edits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[rgba(201,169,76,0.35)] border border-[rgba(201,169,76,0.35)] shadow-2xl mb-16">
          {filteredEdits.map((edit) => {
            const relatedGarment = GARMENTS.find((g) => g.category === edit.id) || GARMENTS[0];
            return (
              <div
                key={edit.id}
                className="bg-[#141009] hover:bg-[#18130B] p-8 md:p-12 relative flex flex-col justify-between transition-colors duration-300 group cursor-pointer"
                onClick={() => onViewGarmentDetails(relatedGarment)}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8C7A34] tracking-[0.2em] font-sans font-medium">
                      {edit.num} · ARCHIVE
                    </span>
                    <span className="text-[11px] tracking-wider text-[#C9A94C] flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <Clock className="w-3 h-3" />
                      {edit.leadTime}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#F3EAD2] mt-4 mb-3 group-hover:text-[#C9A94C] transition-colors">
                    {edit.title}
                  </h3>

                  <p className="text-sm text-[#F3EAD2]/65 font-light leading-relaxed max-w-md">
                    {edit.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {edit.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 bg-[#1F1810] border border-[rgba(201,169,76,0.2)] text-[#F3EAD2]/80"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-[rgba(201,169,76,0.15)] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#8C7A34]">Starting From</div>
                    <div className="text-lg font-serif text-[#C9A94C]">
                      {formatPrice(relatedGarment.basePriceNGN, relatedGarment.basePriceUSD)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectGarmentForBrief(relatedGarment);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase font-medium bg-[#1F1810] text-[#C9A94C] border border-[#C9A94C]/40 hover:bg-[#C9A94C] hover:text-[#141009] transition-all"
                  >
                    <span>Build Brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Signature Stitch Underline */}
                <div className="w-12 h-[1px] bg-[#C9A94C] mt-6 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Curated Garment Silhouettes Row */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C9A94C]">Tailored Silhouettes</div>
              <h3 className="text-2xl font-serif text-[#F3EAD2]">Individual Garment Blueprints</h3>
            </div>
            <div className="text-xs text-[#F3EAD2]/60 hidden sm:block">
              Click any garment to inspect tailoring & fabric suggestions
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GARMENTS.map((garment) => (
              <div
                key={garment.id}
                className="bg-[#18130B] border border-[rgba(201,169,76,0.25)] p-6 hover:border-[#C9A94C] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C7A34] uppercase tracking-widest mb-2">
                    <span>{garment.category}</span>
                    <span className="text-[#C9A94C]">{garment.turnaroundDays} Days</span>
                  </div>

                  <h4 className="text-lg font-serif text-[#F3EAD2] font-medium group-hover:text-[#C9A94C] transition-colors">
                    {garment.name}
                  </h4>

                  <p className="text-xs text-[#F3EAD2]/65 font-light mt-2 line-clamp-2">
                    {garment.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[rgba(201,169,76,0.15)] text-xs text-[#F3EAD2]/70 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Tag className="w-3 h-3 text-[#C9A94C]" />
                      <span className="text-[#8C7A34]">Fabric:</span> {garment.fabricSuggestions[0]}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[rgba(201,169,76,0.15)] flex items-center justify-between">
                  <span className="font-serif text-[#C9A94C] text-base">
                    {formatPrice(garment.basePriceNGN, garment.basePriceUSD)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewGarmentDetails(garment)}
                      className="px-2.5 py-1.5 text-[11px] uppercase tracking-wider text-[#F3EAD2]/70 hover:text-[#C9A94C]"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => onSelectGarmentForBrief(garment)}
                      className="px-3 py-1.5 text-[11px] uppercase tracking-wider bg-[#C9A94C] text-[#141009] font-medium hover:bg-[#E0C77A]"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
