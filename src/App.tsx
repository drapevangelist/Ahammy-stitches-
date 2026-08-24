/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionExplore } from './components/CollectionExplore';
import { FabricShowcase } from './components/FabricShowcase';
import { DesignBriefBuilder } from './components/DesignBriefBuilder';
import { OrderTracker } from './components/OrderTracker';
import { GarmentModal } from './components/GarmentModal';
import { StyleAdvisorModal } from './components/StyleAdvisorModal';
import { Footer } from './components/Footer';
import { GarmentSilhouette, FabricSwatch, DesignBrief, Currency } from './types';
import { GARMENTS, FABRIC_SWATCHES } from './data/fashionData';
import { Scissors, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Modals & Selected items
  const [inspectedGarment, setInspectedGarment] = useState<GarmentSilhouette | null>(null);
  const [advisorOpen, setAdvisorOpen] = useState(false);

  // Selected for brief pre-filling
  const [briefGarment, setBriefGarment] = useState<GarmentSilhouette | null>(null);
  const [briefFabric, setBriefFabric] = useState<FabricSwatch | null>(null);

  // User submitted custom briefs (persisted locally)
  const [customBriefs, setCustomBriefs] = useState<DesignBrief[]>(() => {
    try {
      const saved = localStorage.getItem('ahammy_custom_briefs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTrackingId, setActiveTrackingId] = useState<string>('AS-8820');

  // Save custom briefs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ahammy_custom_briefs', JSON.stringify(customBriefs));
    } catch {
      // ignore
    }
  }, [customBriefs]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartDesign = (silhouetteType?: string) => {
    if (silhouetteType) {
      const found = GARMENTS.find((g) => g.svgType === silhouetteType);
      if (found) setBriefGarment(found);
    }
    scrollToSection('design');
  };

  const handleSelectGarmentForBrief = (garment: GarmentSilhouette) => {
    setBriefGarment(garment);
    scrollToSection('design');
  };

  const handleSelectFabricForBrief = (fabric: FabricSwatch) => {
    setBriefFabric(fabric);
    scrollToSection('design');
  };

  const handleBriefSubmitted = (newBrief: DesignBrief) => {
    setCustomBriefs((prev) => [newBrief, ...prev]);
    setActiveTrackingId(newBrief.id);
  };

  const handleTrackOrderFromBrief = (orderId: string) => {
    setActiveTrackingId(orderId);
    scrollToSection('track');
  };

  const handleApplyAdvisor = (garment: GarmentSilhouette, fabric: FabricSwatch) => {
    setBriefGarment(garment);
    setBriefFabric(fabric);
    scrollToSection('design');
  };

  return (
    <div className="min-h-screen bg-[#141009] text-[#F3EAD2] font-sans selection:bg-[#C9A94C] selection:text-[#141009]">
      
      {/* Top Header Navigation */}
      <Header
        activeSection={activeSection}
        currency={currency}
        onToggleCurrency={setCurrency}
        onOpenDesignBrief={() => scrollToSection('design')}
        onOpenTracker={() => scrollToSection('track')}
        onOpenAdvisor={() => setAdvisorOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onStartDesign={handleStartDesign}
          onExploreCollection={() => scrollToSection('explore')}
          onOpenAdvisor={() => setAdvisorOpen(true)}
        />

        {/* Signature Stitch Divider */}
        <div className="stitch" />

        {/* The Edit (Collection Explore) */}
        <CollectionExplore
          currency={currency}
          onSelectGarmentForBrief={handleSelectGarmentForBrief}
          onViewGarmentDetails={(g) => setInspectedGarment(g)}
        />

        {/* Signature Stitch Divider */}
        <div className="stitch" />

        {/* Fabric Swatches Archive */}
        <FabricShowcase
          onSelectFabricForBrief={handleSelectFabricForBrief}
        />

        {/* Signature Stitch Divider */}
        <div className="stitch" />

        {/* Interactive Guided Design Brief Studio */}
        <DesignBriefBuilder
          currency={currency}
          preselectedGarment={briefGarment}
          preselectedFabric={briefFabric}
          onBriefSubmitted={handleBriefSubmitted}
          onTrackOrder={handleTrackOrderFromBrief}
        />

        {/* Signature Stitch Divider */}
        <div className="stitch" />

        {/* Live Order Tracking Dashboard */}
        <OrderTracker
          initialOrderId={activeTrackingId}
          customBriefs={customBriefs}
        />

        {/* Signature Stitch Divider */}
        <div className="stitch" />

        {/* Final Luxury CTA Banner */}
        <section className="py-24 text-center bg-[#18130B] relative overflow-hidden">
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 relative z-10">
            <div className="text-[12px] tracking-[0.25em] text-[#C9A94C] uppercase font-medium mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Ready When You Are</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#F3EAD2] max-w-2xl mx-auto tracking-tight mb-6">
              Start your design brief in under two minutes.
            </h2>
            
            <p className="text-[#F3EAD2]/70 max-w-lg mx-auto text-sm font-light leading-relaxed mb-8">
              No endless WhatsApp back-and-forth. Provide your style preferences, select your textile, and let our Port Harcourt master cutters craft your piece.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('design')}
                className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.14em] uppercase font-semibold bg-[#C9A94C] text-[#141009] border border-[#C9A94C] hover:bg-transparent hover:text-[#C9A94C] transition-all duration-300 shadow-2xl cursor-pointer"
              >
                <Scissors className="w-4 h-4" />
                <span>Launch Design Brief Builder</span>
              </button>

              <button
                onClick={() => scrollToSection('track')}
                className="inline-flex items-center gap-2 px-6 py-4 text-xs tracking-[0.14em] uppercase font-medium bg-transparent text-[#F3EAD2] border border-[rgba(243,234,210,0.3)] hover:border-[#C9A94C] hover:text-[#C9A94C] transition-colors cursor-pointer"
              >
                <span>Track Existing Order</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onOpenDesignBrief={() => scrollToSection('design')}
        onOpenTracker={() => scrollToSection('track')}
      />

      {/* Garment Detail Inspection Modal */}
      {inspectedGarment && (
        <GarmentModal
          garment={inspectedGarment}
          currency={currency}
          onClose={() => setInspectedGarment(null)}
          onSelectForBrief={handleSelectGarmentForBrief}
        />
      )}

      {/* AI Style Advisor Modal */}
      {advisorOpen && (
        <StyleAdvisorModal
          onClose={() => setAdvisorOpen(false)}
          onApplyRecommendation={handleApplyAdvisor}
        />
      )}

    </div>
  );
}
