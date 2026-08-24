import React, { useState } from 'react';
import { GARMENTS, FABRIC_SWATCHES, PALETTE_OPTIONS } from '../data/fashionData';
import { GarmentSilhouette, FabricSwatch, DesignBrief, Currency, SmartMeasurements } from '../types';
import { 
  Scissors, Sparkles, Check, ChevronRight, ChevronLeft, 
  Upload, Ruler, Send, FileText, Phone, User, MapPin, 
  Calendar, CheckCircle2, AlertCircle, Copy, MessageCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DesignBriefBuilderProps {
  currency: Currency;
  preselectedGarment?: GarmentSilhouette | null;
  preselectedFabric?: FabricSwatch | null;
  onBriefSubmitted: (brief: DesignBrief) => void;
  onTrackOrder: (orderId: string) => void;
}

export const DesignBriefBuilder: React.FC<DesignBriefBuilderProps> = ({
  currency,
  preselectedGarment,
  preselectedFabric,
  onBriefSubmitted,
  onTrackOrder,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedBrief, setSubmittedBrief] = useState<DesignBrief | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form State
  const [selectedGarmentId, setSelectedGarmentId] = useState<string>(
    preselectedGarment?.id || GARMENTS[0].id
  );
  const [occasion, setOccasion] = useState<string>('Wedding (Groom / Guest)');
  const [eventDate, setEventDate] = useState<string>('');
  const [urgency, setUrgency] = useState<'standard' | 'express' | 'urgent'>('standard');
  const [fabricId, setFabricId] = useState<string>(
    preselectedFabric?.id || FABRIC_SWATCHES[0].id
  );
  const [selectedColor, setSelectedColor] = useState(PALETTE_OPTIONS[0]);
  const [embroideryLevel, setEmbroideryLevel] = useState<'minimal' | 'signature' | 'regal' | 'none'>('signature');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  
  // Measurements
  const [measurements, setMeasurements] = useState<SmartMeasurements>({
    unit: 'inches',
    profileType: 'standard',
    standardSize: 'L',
    chest: 42,
    shoulder: 19,
    sleeveLength: 26,
    waist: 34,
    trouserLength: 41,
    neck: 16.5,
  });

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCity, setClientCity] = useState('Port Harcourt');

  // Sync if props change
  React.useEffect(() => {
    if (preselectedGarment) {
      setSelectedGarmentId(preselectedGarment.id);
    }
  }, [preselectedGarment]);

  React.useEffect(() => {
    if (preselectedFabric) {
      setFabricId(preselectedFabric.id);
    }
  }, [preselectedFabric]);

  const selectedGarment = GARMENTS.find((g) => g.id === selectedGarmentId) || GARMENTS[0];
  const selectedFabricObj = FABRIC_SWATCHES.find((f) => f.id === fabricId) || FABRIC_SWATCHES[0];

  // Price Calculation
  const calculatePrice = () => {
    let baseNGN = selectedGarment.basePriceNGN;
    let baseUSD = selectedGarment.basePriceUSD;

    // Fabric surcharge
    if (selectedFabricObj.premiumTier === 'Luxury') {
      baseNGN += 25000;
      baseUSD += 22;
    } else if (selectedFabricObj.premiumTier === 'Ultra-Bespoke') {
      baseNGN += 50000;
      baseUSD += 45;
    }

    // Embroidery surcharge
    if (embroideryLevel === 'regal') {
      baseNGN += 35000;
      baseUSD += 30;
    } else if (embroideryLevel === 'signature') {
      baseNGN += 15000;
      baseUSD += 14;
    }

    // Urgency multiplier
    if (urgency === 'express') {
      baseNGN *= 1.15;
      baseUSD *= 1.15;
    } else if (urgency === 'urgent') {
      baseNGN *= 1.3;
      baseUSD *= 1.3;
    }

    return {
      ngn: Math.round(baseNGN),
      usd: Math.round(baseUSD),
    };
  };

  const currentPrice = calculatePrice();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setReferenceImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `AS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBrief: DesignBrief = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      clientName: clientName || 'Distinguished Client',
      clientPhone: clientPhone || '+234 800 000 0000',
      clientEmail: clientEmail || 'client@ahammy.com',
      city: clientCity || 'Port Harcourt',
      garmentId: selectedGarment.id,
      garmentName: selectedGarment.name,
      occasion,
      eventDate,
      urgency,
      selectedFabricId: selectedFabricObj.id,
      selectedColor,
      embroideryLevel,
      customNotes,
      referenceImages,
      measurements,
      estimatedTotalNGN: currentPrice.ngn,
      estimatedTotalUSD: currentPrice.usd,
      status: 'brief_received',
      currentStepIndex: 0,
      timelineNotes: [
        {
          date: 'Just now',
          stage: 'Brief Generated & Logged',
          note: 'Digital brief submitted directly to studio cutting room queue.',
        },
      ],
    };

    setSubmittedBrief(newBrief);
    onBriefSubmitted(newBrief);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A94C', '#F3EAD2', '#8C7A34'],
      });
    } catch {
      // fallback
    }
  };

  const generateWhatsAppMessage = () => {
    if (!submittedBrief) return '';
    const text = `*NEW DESIGN BRIEF — AHAMMY STITCHES*\n` +
      `*Brief ID:* ${submittedBrief.id}\n` +
      `*Client:* ${submittedBrief.clientName} (${submittedBrief.city})\n` +
      `*Garment:* ${submittedBrief.garmentName}\n` +
      `*Occasion:* ${submittedBrief.occasion}\n` +
      `*Fabric:* ${selectedFabricObj.name}\n` +
      `*Color:* ${submittedBrief.selectedColor.name}\n` +
      `*Embroidery:* ${submittedBrief.embroideryLevel.toUpperCase()}\n` +
      `*Sizing Mode:* ${measurements.profileType.toUpperCase()} ${measurements.profileType === 'standard' ? `(Size ${measurements.standardSize})` : ''}\n` +
      `*Estimated Total:* ₦${submittedBrief.estimatedTotalNGN.toLocaleString()} / $${submittedBrief.estimatedTotalUSD}\n` +
      `*Notes:* ${submittedBrief.customNotes || 'None'}\n\n` +
      `Please confirm quote & atelier production slot!`;
    return encodeURIComponent(text);
  };

  return (
    <section id="design" className="py-20 bg-[#F3EAD2] text-[#141009] relative">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* If already submitted, show the confirmation vault */}
        {submittedBrief ? (
          <div className="bg-[#141009] text-[#F3EAD2] p-8 md:p-14 border-2 border-[#C9A94C] shadow-2xl animate-in fade-in duration-500 max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A94C]/20 border border-[#C9A94C] text-[#C9A94C] mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#C9A94C] font-semibold">
                Brief Logged in Atelier Queue
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#F3EAD2]">
                Your Commission is Structured.
              </h2>
              <p className="text-sm text-[#F3EAD2]/75 max-w-lg mx-auto font-light">
                Brief <span className="font-mono text-[#C9A94C] font-medium font-serif">{submittedBrief.id}</span> has been formatted and placed in the studio queue for Master Tailor review.
              </p>
            </div>

            {/* Brief Snapshot Card */}
            <div className="bg-[#18130B] border border-[rgba(201,169,76,0.3)] p-6 mb-8 text-xs space-y-3 font-sans">
              <div className="flex justify-between border-b border-[rgba(201,169,76,0.15)] pb-2.5">
                <span className="text-[#8C7A34] uppercase tracking-wider">Garment Silhouette</span>
                <span className="text-[#F3EAD2] font-medium font-serif text-sm">{submittedBrief.garmentName}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(201,169,76,0.15)] pb-2.5">
                <span className="text-[#8C7A34] uppercase tracking-wider">Selected Textile</span>
                <span className="text-[#F3EAD2]">{selectedFabricObj.name}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(201,169,76,0.15)] pb-2.5">
                <span className="text-[#8C7A34] uppercase tracking-wider">Color & Tone</span>
                <span className="flex items-center gap-2 text-[#F3EAD2]">
                  <span className="w-3 h-3 border border-[#C9A94C]" style={{ backgroundColor: submittedBrief.selectedColor.hex }} />
                  {submittedBrief.selectedColor.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-[rgba(201,169,76,0.15)] pb-2.5">
                <span className="text-[#8C7A34] uppercase tracking-wider">Sizing Method</span>
                <span className="text-[#C9A94C] font-medium">
                  {measurements.profileType === 'standard'
                    ? `Standard Size ${measurements.standardSize}`
                    : measurements.profileType === 'book_fitting'
                    ? 'In-Studio Fitting Booked'
                    : 'Custom Tape Profile'}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-[#8C7A34] uppercase tracking-wider font-semibold">Estimated Quote</span>
                <span className="text-[#C9A94C] font-serif text-base font-semibold">
                  ₦{submittedBrief.estimatedTotalNGN.toLocaleString()} (≈ ${submittedBrief.estimatedTotalUSD})
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/2348039655829?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 bg-[#25D366] text-white flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-medium hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Brief to WhatsApp Tailor</span>
              </a>

              <button
                onClick={() => onTrackOrder(submittedBrief.id)}
                className="flex-1 py-3.5 px-6 bg-[#C9A94C] text-[#141009] flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-medium hover:bg-[#E0C77A] transition-colors cursor-pointer"
              >
                <Scissors className="w-4 h-4" />
                <span>View in Live Order Tracker &rarr;</span>
              </button>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setSubmittedBrief(null);
                  setCurrentStep(1);
                }}
                className="text-xs text-[#F3EAD2]/60 hover:text-[#C9A94C] uppercase tracking-widest underline cursor-pointer"
              >
                Create Another Design Brief
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            
            {/* Left Side: Brief Purpose & Real-time Live Price Summary */}
            <div className="space-y-8 sticky top-24">
              <div>
                <div className="text-[12px] tracking-[0.22em] text-[#8C7A34] uppercase font-semibold mb-2">
                  Interactive Brief Builder
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#141009] leading-tight">
                  Tell us what you're building — we'll turn it into a brief.
                </h2>
                <p className="text-sm text-[#141009]/75 mt-3 leading-relaxed">
                  A short guided form replaces the 17-message WhatsApp thread. The studio receives a structured, calibrated brief ready to cut.
                </p>
              </div>

              {/* Progress Steps Overview */}
              <div className="space-y-3 font-sans border-l-2 border-[#141009]/20 pl-4 text-xs">
                {[
                  { step: 1, title: 'Concept & Silhouette', subtitle: selectedGarment.name },
                  { step: 2, title: 'Occasion & Urgency', subtitle: `${occasion} · ${urgency.toUpperCase()}` },
                  { step: 3, title: 'Textile, Color & Accents', subtitle: `${selectedFabricObj.name.split('(')[0]} · ${selectedColor.name}` },
                  { step: 4, title: 'Smart Measurements', subtitle: measurements.profileType === 'standard' ? `Size ${measurements.standardSize}` : measurements.profileType },
                  { step: 5, title: 'Studio Details & Review', subtitle: clientName || 'Pending details' },
                ].map((s) => (
                  <div
                    key={s.step}
                    onClick={() => setCurrentStep(s.step)}
                    className={`cursor-pointer transition-all ${
                      currentStep === s.step
                        ? 'text-[#141009] font-semibold translate-x-1'
                        : currentStep > s.step
                        ? 'text-[#8C7A34]'
                        : 'text-[#141009]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px]">0{s.step}.</span>
                      <span>{s.title}</span>
                      {currentStep > s.step && <Check className="w-3.5 h-3.5 text-[#8C7A34]" />}
                    </div>
                    {currentStep === s.step && (
                      <div className="text-[11px] font-normal text-[#141009]/60 mt-0.5">
                        {s.subtitle}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Live Dynamic Price Estimator Card */}
              <div className="bg-[#141009] text-[#F3EAD2] p-6 border border-[#4A3B22] shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[rgba(201,169,76,0.2)] pb-3">
                  <span className="text-[11px] uppercase tracking-widest text-[#C9A94C] font-medium">
                    Estimated Atelier Quote
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#1F1810] border border-[#C9A94C]/40 text-[#F3EAD2]/80">
                    Live Calculation
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-serif text-[#C9A94C] font-semibold">
                      ₦{currentPrice.ngn.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#F3EAD2]/60 mt-0.5">
                      Approx. ${currentPrice.usd} USD
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#F3EAD2]/70">
                    <div>Turnaround:</div>
                    <div className="text-[#C9A94C] font-medium">
                      {urgency === 'urgent' ? '3–4 Days (Rush)' : urgency === 'express' ? '6–7 Days' : `${selectedGarment.turnaroundDays} Working Days`}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-[#F3EAD2]/50 border-t border-[rgba(201,169,76,0.15)] pt-2 leading-relaxed">
                  Includes premium inner lining, shoulder pads, monogramming, and studio garment bag.
                </div>
              </div>
            </div>

            {/* Right Side: Step-by-Step Interactive Form */}
            <div className="bg-white/70 backdrop-blur-md p-6 sm:p-10 border border-[#141009]/15 shadow-xl">
              
              {/* STEP 1: Silhouette Concept */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <div className="text-[11px] tracking-widest text-[#8C7A34] uppercase font-semibold">Step 1 of 5</div>
                    <h3 className="text-2xl font-serif text-[#141009] mt-1 font-medium">
                      What are you creating?
                    </h3>
                    <p className="text-xs text-[#141009]/70 mt-1">
                      Choose a foundational silhouette. Each cut can be further customized.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {GARMENTS.map((g) => {
                      const isSelected = selectedGarmentId === g.id;
                      return (
                        <div
                          key={g.id}
                          onClick={() => setSelectedGarmentId(g.id)}
                          className={`p-4 border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#141009] bg-[#141009] text-[#F3EAD2] shadow-md'
                              : 'border-[#141009]/20 bg-white/60 text-[#141009] hover:border-[#141009]/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider text-[#C9A94C]">
                              {g.category}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-[#C9A94C]" />}
                          </div>
                          <div className="font-serif text-base font-medium mt-1">{g.name}</div>
                          <p className={`text-xs mt-1.5 line-clamp-2 ${isSelected ? 'text-[#F3EAD2]/70' : 'text-[#141009]/65'}`}>
                            {g.tagline}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Occasion & Urgency */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <div className="text-[11px] tracking-widest text-[#8C7A34] uppercase font-semibold">Step 2 of 5</div>
                    <h3 className="text-2xl font-serif text-[#141009] mt-1 font-medium">
                      What's the occasion & timeline?
                    </h3>
                    <p className="text-xs text-[#141009]/70 mt-1">
                      Helps the cutting room recommend the proper lining weight and prioritize schedule.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider">
                      Event / Occasion Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Wedding (Groom / Aso-Ebi)',
                        'Boardroom / Executive',
                        'Traditional Ceremony',
                        'Sunday Service / Milestone',
                        'Casual Luxury / Travel',
                        'Other Special Event',
                      ].map((occ) => (
                        <button
                          type="button"
                          key={occ}
                          onClick={() => setOccasion(occ)}
                          className={`p-3 text-xs text-left border transition-all ${
                            occasion === occ
                              ? 'bg-[#141009] text-[#F3EAD2] border-[#141009] font-medium'
                              : 'bg-white/50 text-[#141009] border-[#141009]/20 hover:border-[#141009]/50'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider mb-2">
                        Event Date (If applicable)
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full p-3 bg-white border border-[#141009]/30 text-xs text-[#141009] focus:outline-none focus:border-[#141009]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider mb-2">
                        Production Urgency
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value as any)}
                        className="w-full p-3 bg-white border border-[#141009]/30 text-xs text-[#141009] focus:outline-none focus:border-[#141009]"
                      >
                        <option value="standard">Standard Atelier Schedule ({selectedGarment.turnaroundDays} Days)</option>
                        <option value="express">Express Speed (+15% fee, 6–7 Days)</option>
                        <option value="urgent">Urgent Priority (+30% fee, 3–4 Days)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Fabric & Custom Color Accents */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <div className="text-[11px] tracking-widest text-[#8C7A34] uppercase font-semibold">Step 3 of 5</div>
                    <h3 className="text-2xl font-serif text-[#141009] mt-1 font-medium">
                      Textile, Color & Embroidery
                    </h3>
                    <p className="text-xs text-[#141009]/70 mt-1">
                      Choose from our curated mill archive or pick your signature colorway.
                    </p>
                  </div>

                  {/* Fabric Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider">
                      Selected Textile Base
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {FABRIC_SWATCHES.map((f) => {
                        const isSelected = fabricId === f.id;
                        return (
                          <div
                            key={f.id}
                            onClick={() => setFabricId(f.id)}
                            className={`p-3 border flex items-center gap-3 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#141009] text-[#F3EAD2] border-[#141009]'
                                : 'bg-white/60 text-[#141009] border-[#141009]/20 hover:border-[#141009]'
                            }`}
                          >
                            <span
                              className="w-7 h-7 border border-[#C9A94C] flex-shrink-0"
                              style={{ backgroundColor: f.colorHex }}
                            />
                            <div className="text-xs overflow-hidden">
                              <div className="font-serif font-medium truncate">{f.name}</div>
                              <div className={`text-[10px] ${isSelected ? 'text-[#C9A94C]' : 'text-[#8C7A34]'}`}>
                                {f.premiumTier} · {f.weight}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider">
                      Primary Garment Tone: <span className="font-serif text-[#8C7A34]">{selectedColor.name}</span>
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {PALETTE_OPTIONS.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`w-9 h-9 border flex items-center justify-center transition-all ${
                            selectedColor.name === c.name ? 'ring-2 ring-[#141009] scale-110' : 'opacity-85 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColor.name === c.name && (
                            <Check className={`w-4 h-4 ${c.hex === '#FAFAFA' || c.hex === '#F3EAD2' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Embroidery Level */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider">
                      Embroidery & Stitch Complexity
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'none', label: 'Clean / No Embroidery' },
                        { id: 'signature', label: 'Signature Geometric' },
                        { id: 'regal', label: 'Regal Breastplate (+₦35k)' },
                      ].map((emb) => (
                        <button
                          key={emb.id}
                          type="button"
                          onClick={() => setEmbroideryLevel(emb.id as any)}
                          className={`p-3 text-xs border text-center transition-all ${
                            embroideryLevel === emb.id
                              ? 'bg-[#141009] text-[#F3EAD2] border-[#141009] font-medium'
                              : 'bg-white/60 text-[#141009] border-[#141009]/20'
                          }`}
                        >
                          {emb.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Smart Measurements */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <div className="text-[11px] tracking-widest text-[#8C7A34] uppercase font-semibold">Step 4 of 5</div>
                    <h3 className="text-2xl font-serif text-[#141009] mt-1 font-medium">
                      Smart Measurements Guide
                    </h3>
                    <p className="text-xs text-[#141009]/70 mt-1">
                      Choose standard sizing, enter your tape measurements, or schedule an in-person measurement fitting.
                    </p>
                  </div>

                  {/* Sizing Method Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'standard', label: 'Standard Sizing (S-3XL)' },
                      { id: 'custom', label: 'Custom Tape Profile' },
                      { id: 'book_fitting', label: 'Book Studio Fitting' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setMeasurements({ ...measurements, profileType: mode.id as any })}
                        className={`p-3 text-xs border transition-all ${
                          measurements.profileType === mode.id
                            ? 'bg-[#141009] text-[#F3EAD2] border-[#141009] font-medium'
                            : 'bg-white/60 text-[#141009] border-[#141009]/20'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* Standard Sizing Mode */}
                  {measurements.profileType === 'standard' && (
                    <div className="space-y-4 bg-white/80 p-5 border border-[#141009]/15">
                      <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider">
                        Select Standard Fit Size
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setMeasurements({ ...measurements, standardSize: size as any })}
                            className={`py-3 text-xs font-bold border transition-all ${
                              measurements.standardSize === size
                                ? 'bg-[#141009] text-[#F3EAD2] border-[#141009]'
                                : 'bg-white text-[#141009] border-[#141009]/20 hover:border-[#141009]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>

                      <div className="text-[11px] text-[#141009]/60 leading-relaxed pt-2">
                        Size <span className="font-semibold text-[#141009]">{measurements.standardSize}</span> is calibrated for: Chest 40-42", Shoulder 18.5", Waist 34-36", Trouser Length 41". Our tailor will verify fit after submission.
                      </div>
                    </div>
                  )}

                  {/* Custom Measurements Mode */}
                  {measurements.profileType === 'custom' && (
                    <div className="space-y-4 bg-white/80 p-5 border border-[#141009]/15">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-[#141009] uppercase tracking-wider">
                          Custom Tape Dimensions ({measurements.unit})
                        </label>
                        <div className="flex gap-1 text-[10px]">
                          <button
                            type="button"
                            onClick={() => setMeasurements({ ...measurements, unit: 'inches' })}
                            className={`px-2 py-0.5 border ${measurements.unit === 'inches' ? 'bg-[#141009] text-white' : 'bg-white'}`}
                          >
                            Inches
                          </button>
                          <button
                            type="button"
                            onClick={() => setMeasurements({ ...measurements, unit: 'cm' })}
                            className={`px-2 py-0.5 border ${measurements.unit === 'cm' ? 'bg-[#141009] text-white' : 'bg-white'}`}
                          >
                            CM
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block text-[11px] text-[#141009]/70 mb-1">Chest / Bust</label>
                          <input
                            type="number"
                            value={measurements.chest || ''}
                            onChange={(e) => setMeasurements({ ...measurements, chest: Number(e.target.value) })}
                            placeholder="e.g. 42"
                            className="w-full p-2 bg-white border border-[#141009]/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#141009]/70 mb-1">Shoulder Width</label>
                          <input
                            type="number"
                            value={measurements.shoulder || ''}
                            onChange={(e) => setMeasurements({ ...measurements, shoulder: Number(e.target.value) })}
                            placeholder="e.g. 19"
                            className="w-full p-2 bg-white border border-[#141009]/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#141009]/70 mb-1">Sleeve Length</label>
                          <input
                            type="number"
                            value={measurements.sleeveLength || ''}
                            onChange={(e) => setMeasurements({ ...measurements, sleeveLength: Number(e.target.value) })}
                            placeholder="e.g. 26"
                            className="w-full p-2 bg-white border border-[#141009]/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#141009]/70 mb-1">Waist Circumference</label>
                          <input
                            type="number"
                            value={measurements.waist || ''}
                            onChange={(e) => setMeasurements({ ...measurements, waist: Number(e.target.value) })}
                            placeholder="e.g. 34"
                            className="w-full p-2 bg-white border border-[#141009]/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#141009]/70 mb-1">Trouser / Skirt Length</label>
                          <input
                            type="number"
                            value={measurements.trouserLength || ''}
                            onChange={(e) => setMeasurements({ ...measurements, trouserLength: Number(e.target.value) })}
                            placeholder="e.g. 41"
                            className="w-full p-2 bg-white border border-[#141009]/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#141009]/70 mb-1">Neck Circumference</label>
                          <input
                            type="number"
                            value={measurements.neck || ''}
                            onChange={(e) => setMeasurements({ ...measurements, neck: Number(e.target.value) })}
                            placeholder="e.g. 16.5"
                            className="w-full p-2 bg-white border border-[#141009]/20"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Book Studio Fitting Mode */}
                  {measurements.profileType === 'book_fitting' && (
                    <div className="bg-white/80 p-5 border border-[#141009]/15 text-xs space-y-2">
                      <div className="font-serif font-medium text-sm text-[#141009]">
                        In-Studio Measurement Session
                      </div>
                      <p className="text-[#141009]/70 leading-relaxed">
                        Visit our Port Harcourt Atelier at King Perekule Street, GRA Phase 2. Our Master Tailor will take 18 precise body measurements, examine posture, and test fabric drapes.
                      </p>
                      <div className="text-[11px] text-[#8C7A34] font-medium pt-1">
                        ✓ No extra fee · Tea & consultation included
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5: Contact Details, Notes & Submit */}
              {currentStep === 5 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <div className="text-[11px] tracking-widest text-[#8C7A34] uppercase font-semibold">Step 5 of 5</div>
                    <h3 className="text-2xl font-serif text-[#141009] mt-1 font-medium">
                      Review & Submit Brief
                    </h3>
                    <p className="text-xs text-[#141009]/70 mt-1">
                      Enter your details to generate your unique Atelier Brief Code and track your piece live.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Barrister Emeka Dan-Jumbo"
                        className="w-full p-3 bg-white border border-[#141009]/30 text-xs text-[#141009] focus:outline-none focus:border-[#141009]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. +234 803 123 4567"
                        className="w-full p-3 bg-white border border-[#141009]/30 text-xs text-[#141009] focus:outline-none focus:border-[#141009]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="client@example.com"
                        className="w-full p-3 bg-white border border-[#141009]/30 text-xs text-[#141009] focus:outline-none focus:border-[#141009]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider mb-1">
                        Delivery City / State
                      </label>
                      <input
                        type="text"
                        value={clientCity}
                        onChange={(e) => setClientCity(e.target.value)}
                        placeholder="e.g. Port Harcourt / Lagos / London"
                        className="w-full p-3 bg-white border border-[#141009]/30 text-xs text-[#141009] focus:outline-none focus:border-[#141009]"
                      />
                    </div>
                  </div>

                  {/* Reference Image Upload & Design Notes */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-semibold text-[#141009] block uppercase tracking-wider">
                      Specific Styling Notes / Reference Photo
                    </label>
                    <textarea
                      rows={3}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Add any specific preferences (e.g., contrast piping on collar, monogram initials 'E.D', double vents on suit jacket)..."
                      className="w-full p-3 bg-white border border-[#141009]/30 text-xs text-[#141009] focus:outline-none focus:border-[#141009]"
                    />

                    <div className="border border-dashed border-[#141009]/30 p-4 text-center bg-white/40 relative cursor-pointer hover:bg-white/80 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-[#141009]/70">
                        <Upload className="w-4 h-4 text-[#8C7A34]" />
                        <span>Upload style inspiration image (optional)</span>
                        <span className="text-[10px] text-[#141009]/50">PNG, JPG, WEBP up to 10MB</span>
                      </div>
                    </div>

                    {referenceImages.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {referenceImages.map((img, i) => (
                          <div key={i} className="w-14 h-14 border border-[#141009] overflow-hidden">
                            <img src={img} alt="Inspiration preview" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-xs uppercase tracking-[0.14em] font-semibold bg-[#141009] text-[#F3EAD2] border border-[#141009] hover:bg-[#1F1810] hover:text-[#C9A94C] transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <Scissors className="w-4 h-4 text-[#C9A94C]" />
                    <span>Submit & Generate Atelier Brief</span>
                  </button>
                </form>
              )}

              {/* Navigation Controls */}
              {currentStep < 5 && (
                <div className="flex items-center justify-between pt-6 mt-8 border-t border-[#141009]/15">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-[#141009] border border-[#141009]/30 hover:bg-[#141009]/5 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#141009] text-[#F3EAD2] hover:bg-[#1F1810] hover:text-[#C9A94C] flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Proceed to Step {currentStep + 1}</span>
                    <ChevronRight className="w-4 h-4 text-[#C9A94C]" />
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
