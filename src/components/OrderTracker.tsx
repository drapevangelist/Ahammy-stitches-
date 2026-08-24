import React, { useState } from 'react';
import { SAMPLE_ORDERS } from '../data/fashionData';
import { TrackingOrder, DesignBrief } from '../types';
import { 
  Search, CheckCircle2, Clock, Scissors, PackageCheck, 
  Truck, User, Calendar, MapPin, Sparkles, MessageCircle, AlertCircle 
} from 'lucide-react';

interface OrderTrackerProps {
  initialOrderId?: string;
  customBriefs?: DesignBrief[];
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  initialOrderId = 'AS-8820',
  customBriefs = [],
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialOrderId);
  const [activeOrderId, setActiveOrderId] = useState<string>(initialOrderId);

  // Sync if initialOrderId prop changes
  React.useEffect(() => {
    if (initialOrderId) {
      setSearchQuery(initialOrderId);
      setActiveOrderId(initialOrderId);
    }
  }, [initialOrderId]);

  // Combine default sample orders with any dynamically created briefs by the client
  const allOrders: TrackingOrder[] = [
    ...SAMPLE_ORDERS,
    ...customBriefs.map((b) => ({
      orderId: b.id,
      clientName: b.clientName,
      garmentTitle: b.garmentName,
      category: b.occasion,
      fabricName: b.selectedFabricId,
      colorName: b.selectedColor.name,
      placedDate: b.createdAt.split('T')[0],
      estimatedDeliveryDate: 'In 10–12 Days',
      status: b.status,
      currentStepIndex: 1,
      tailorAssigned: 'Atelier Cutting Master',
      deliveryLocation: `${b.city}, Nigeria`,
      progressPercent: 20,
      timeline: [
        { title: 'Design & Brief Confirmed', subtitle: 'Brief generated via website studio', completed: true, date: 'Today' },
        { title: 'Smart Measurements Verification', subtitle: 'Tailor reviewing measurements profile', completed: false, active: true, date: 'In Review' },
        { title: 'Fabric Sourced & Cut', subtitle: 'Premium yardage allocated from atelier', completed: false },
        { title: 'Sewing & Tailoring', subtitle: 'Precision assembly and lining placement', completed: false },
        { title: 'Hand Finishing & Pressing', subtitle: 'Signature stitch details and buttons', completed: false },
        { title: 'Ready for Dispatch', subtitle: 'Garment packaged in luxury vault bag', completed: false },
      ],
      notes: [
        `Urgency: ${b.urgency.toUpperCase()} schedule`,
        `Client styling note: ${b.customNotes || 'None specified'}`,
      ],
    })),
  ];

  const currentOrder =
    allOrders.find(
      (o) => o.orderId.toLowerCase() === activeOrderId.trim().toLowerCase()
    ) || allOrders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveOrderId(searchQuery.trim());
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_sewing':
        return { label: 'In Sewing / Tailoring', bg: 'bg-[#8C7A34]', text: 'text-white' };
      case 'final_fitting':
        return { label: 'Final Fitting / Pressing', bg: 'bg-[#C9A94C]', text: 'text-[#141009]' };
      case 'fabric_sourced':
        return { label: 'Fabric Sourced & Cut', bg: 'bg-[#4A3B22]', text: 'text-[#F3EAD2]' };
      case 'dispatched':
      case 'delivered':
        return { label: 'Dispatched for Delivery', bg: 'bg-emerald-700', text: 'text-white' };
      default:
        return { label: 'Brief Confirmed / Queue', bg: 'bg-[#1F1810]', text: 'text-[#C9A94C]' };
    }
  };

  const badge = getStatusBadge(currentOrder.status);

  return (
    <section id="track" className="py-24 bg-[#141009] relative text-[#F3EAD2]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Head */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="text-[12px] tracking-[0.22em] text-[#C9A94C] uppercase font-medium mb-3">
            Real-Time Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#F3EAD2] tracking-tight">
            One dashboard, from confirmed to delivered.
          </h2>
          <p className="text-[#F3EAD2]/70 mt-3 text-base font-light">
            Once your commission is logged, your private dashboard replaces "how far is my outfit?" with a crystal-clear live atelier timeline.
          </p>
        </div>

        {/* Search / Order Lookup Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. AS-8820, AS-001)..."
                className="w-full py-3.5 pl-11 pr-4 bg-[#18130B] border border-[rgba(201,169,76,0.35)] text-sm text-[#F3EAD2] placeholder-[#F3EAD2]/40 focus:outline-none focus:border-[#C9A94C] uppercase tracking-wider"
              />
              <Search className="w-4 h-4 text-[#C9A94C] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#C9A94C] text-[#141009] text-xs font-semibold uppercase tracking-wider hover:bg-[#E0C77A] transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Quick preset selector buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-[#F3EAD2]/60">
            <span className="text-[11px] text-[#8C7A34] uppercase tracking-wider">Try Demo Orders:</span>
            {allOrders.slice(0, 4).map((ord) => (
              <button
                key={ord.orderId}
                onClick={() => {
                  setSearchQuery(ord.orderId);
                  setActiveOrderId(ord.orderId);
                }}
                className={`px-2.5 py-1 text-[11px] font-mono border transition-colors ${
                  activeOrderId.toLowerCase() === ord.orderId.toLowerCase()
                    ? 'border-[#C9A94C] text-[#C9A94C] bg-[#1F1810]'
                    : 'border-[rgba(201,169,76,0.2)] text-[#F3EAD2]/70 hover:border-[#C9A94C]'
                }`}
              >
                {ord.orderId} ({ord.garmentTitle.split(' ')[1] || ord.garmentTitle})
              </button>
            ))}
          </div>
        </div>

        {/* The Tracking Dashboard Card */}
        <div className="max-w-2xl mx-auto bg-[#18130B] border border-[rgba(201,169,76,0.35)] p-6 sm:p-10 shadow-2xl relative">
          
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[rgba(201,169,76,0.2)] pb-6 mb-8 gap-4">
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#8C7A34] font-medium">
                Atelier Order: <span className="text-[#C9A94C] font-mono font-bold">{currentOrder.orderId}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F3EAD2] font-medium mt-1">
                {currentOrder.garmentTitle}
              </h3>
              <div className="text-xs text-[#F3EAD2]/60 mt-1 flex items-center gap-2">
                <span>Client: {currentOrder.clientName}</span>
                <span>•</span>
                <span>{currentOrder.deliveryLocation}</span>
              </div>
            </div>

            <div className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold self-start sm:self-auto border border-white/10 ${badge.bg} ${badge.text}`}>
              {badge.label}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-[#F3EAD2]/70 mb-2">
              <span className="text-[11px] uppercase tracking-wider text-[#8C7A34]">Atelier Completion Rate</span>
              <span className="text-[#C9A94C] font-mono font-medium">{currentOrder.progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#141009] border border-[rgba(201,169,76,0.2)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8C7A34] to-[#C9A94C] transition-all duration-700"
                style={{ width: `${currentOrder.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Detailed Step-by-Step Vertical Timeline */}
          <div className="space-y-6 relative mb-8">
            {currentOrder.timeline.map((step, idx) => {
              return (
                <div key={idx} className="flex gap-4 items-start relative group">
                  {/* Vertical connector line */}
                  {idx < currentOrder.timeline.length - 1 && (
                    <div
                      className={`absolute left-[11px] top-6 w-[2px] h-[calc(100%+8px)] ${
                        step.completed ? 'bg-[#C9A94C]' : 'bg-[rgba(201,169,76,0.15)]'
                      }`}
                    />
                  )}

                  {/* Icon Indicator */}
                  <div className="relative z-10 flex-shrink-0 mt-0.5">
                    {step.completed ? (
                      <div className="w-6 h-6 rounded-full bg-[#C9A94C] text-[#141009] flex items-center justify-center text-xs font-bold shadow-md">
                        ✓
                      </div>
                    ) : step.active ? (
                      <div className="w-6 h-6 rounded-full bg-[#18130B] border-2 border-[#C9A94C] text-[#C9A94C] flex items-center justify-center text-xs animate-gold-pulse shadow-md">
                        ●
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#141009] border border-[rgba(201,169,76,0.25)] text-[#F3EAD2]/30 flex items-center justify-center text-xs">
                        ○
                      </div>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <div
                        className={`text-sm font-medium ${
                          step.completed
                            ? 'text-[#C9A94C]'
                            : step.active
                            ? 'text-[#F3EAD2] font-semibold'
                            : 'text-[#F3EAD2]/40'
                        }`}
                      >
                        {step.title}
                      </div>
                      {step.date && (
                        <span className="text-[11px] text-[#8C7A34] font-mono">
                          {step.date}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-0.5 ${
                        step.active ? 'text-[#F3EAD2]/80 font-normal' : 'text-[#F3EAD2]/50 font-light'
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tailor & Atelier Notes Card */}
          <div className="bg-[#141009] border border-[rgba(201,169,76,0.2)] p-4 text-xs space-y-2 mb-6">
            <div className="text-[11px] uppercase tracking-wider text-[#8C7A34] font-medium flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C9A94C]" />
              <span>Assigned Craftsman: {currentOrder.tailorAssigned}</span>
            </div>
            {currentOrder.notes.map((note, i) => (
              <div key={i} className="text-[#F3EAD2]/75 font-light pl-5 relative">
                <span className="absolute left-1 top-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A94C]" />
                {note}
              </div>
            ))}
          </div>

          {/* Quick WhatsApp Inquiry with Order ID */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[rgba(201,169,76,0.2)] gap-4 text-xs">
            <div className="text-[#F3EAD2]/60 font-light text-center sm:text-left">
              Need to adjust sleeve length or delivery address?
            </div>
            <a
              href={`https://wa.me/2348039655829?text=Hello%20Ahammy%20Stitches,%20inquiry%20regarding%20my%20Order%20${currentOrder.orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F1810] border border-[#C9A94C] text-[#C9A94C] hover:bg-[#C9A94C] hover:text-[#141009] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Message Studio Tailor</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
