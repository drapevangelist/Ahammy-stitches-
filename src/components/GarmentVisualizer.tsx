import React from 'react';
import { motion } from 'motion/react';

interface GarmentVisualizerProps {
  type: 'agbada' | 'kaftan' | 'suit' | 'gown' | 'twopiece';
  colorHex?: string;
  accentColor?: string;
  showLabels?: boolean;
  className?: string;
  interactive?: boolean;
}

export const GarmentVisualizer: React.FC<GarmentVisualizerProps> = ({
  type = 'agbada',
  colorHex = '#C9A94C',
  showLabels = true,
  className = '',
  interactive = true,
}) => {
  const [activeHotspot, setActiveHotspot] = React.useState<string | null>(null);

  const getHotspots = () => {
    switch (type) {
      case 'agbada':
        return [
          { id: 'neck', x: 50, y: 18, label: 'Regal Embroidered Neck' },
          { id: 'wing', x: 22, y: 32, label: '60" Flowing Drape Wing' },
          { id: 'chest', x: 50, y: 44, label: 'Hand-Guided Breastplate' },
          { id: 'hem', x: 50, y: 92, label: 'Weighted Ankle Hem' },
        ];
      case 'suit':
        return [
          { id: 'lapel', x: 50, y: 22, label: 'Hand Pick-Stitched Lapel' },
          { id: 'shoulder', x: 28, y: 18, label: 'Roped Neapolitan Shoulder' },
          { id: 'waist', x: 50, y: 48, label: 'Half-Canvas Suppression' },
          { id: 'trousers', x: 50, y: 88, label: 'Precision Tapered Crease' },
        ];
      case 'kaftan':
        return [
          { id: 'mandarin', x: 50, y: 14, label: 'High Mandarin Stand Collar' },
          { id: 'placket', x: 50, y: 36, label: 'Hidden Magnetic Placket' },
          { id: 'cuff', x: 18, y: 45, label: 'French Double-Stitch Cuff' },
          { id: 'slit', x: 28, y: 65, label: 'Side Movement Slit' },
        ];
      case 'gown':
        return [
          { id: 'corset', x: 50, y: 28, label: 'Architectural Corset Core' },
          { id: 'neckline', x: 50, y: 12, label: 'Sweetheart Sculpture' },
          { id: 'train', x: 50, y: 92, label: 'Cascading Fishtail Train' },
        ];
      case 'twopiece':
        return [
          { id: 'collar', x: 50, y: 16, label: 'Camp Collar Open Stance' },
          { id: 'pocket', x: 38, y: 34, label: 'Bespoke Inset Patch Pocket' },
          { id: 'drawstring', x: 50, y: 55, label: 'Tailored Drawstring Waist' },
        ];
      default:
        return [];
    }
  };

  const hotspots = getHotspots();

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {showLabels && (
        <>
          <div className="absolute top-2 right-4 text-[10px] tracking-[0.2em] uppercase text-[#C9A94C] opacity-80 font-medium">
            Atelier Silhouette
          </div>
          <div className="absolute bottom-2 left-4 text-[11px] tracking-[0.14em] text-[#F3EAD2]/60 font-light flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A94C] animate-pulse"></span>
            {type === 'agbada' && 'The Sovereign Agbada · V1 Cut'}
            {type === 'kaftan' && 'The Signature Kaftan · Pure Drape'}
            {type === 'suit' && 'The Obsidian Suit · Half-Canvas'}
            {type === 'gown' && 'The Empress Gown · Sculpted'}
            {type === 'twopiece' && 'The Riviera Two-Piece · Slub Linen'}
          </div>
        </>
      )}

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 320 440"
        className="w-full max-w-[340px] md:max-w-[380px] h-auto overflow-visible filter drop-shadow-[0_10px_30px_rgba(20,16,9,0.9)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0C77A" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#C9A94C" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#4A3B22" stopOpacity="0.02" />
          </linearGradient>
          <pattern id="stitchPattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 0 6 L 6 6" stroke="#C9A94C" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.3" />
          </pattern>
        </defs>

        {/* Ambient Subtle Grid */}
        <line x1="160" y1="20" x2="160" y2="420" stroke="rgba(201,169,76,0.12)" strokeDasharray="4,4" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="rgba(201,169,76,0.1)" strokeDasharray="4,4" />

        {type === 'agbada' && (
          <g className="transition-all duration-700">
            {/* Agbada Flowing Silhouette */}
            <path
              d="M160 35 L95 75 L65 125 L82 145 L100 130 L95 385 L112 405 L208 405 L225 385 L220 130 L238 145 L255 125 L225 75 Z"
              fill="url(#goldGlow)"
              className="transition-all duration-500"
            />
            {/* Outline with drawing animation */}
            <path
              d="M160 35 L95 75 L65 125 L82 145 L100 130 L95 385 L112 405 L208 405 L225 385 L220 130 L238 145 L255 125 L225 75 Z"
              stroke="#C9A94C"
              strokeWidth="1.6"
              fill="none"
              className="animate-garment-draw"
            />
            {/* Wingspan Drape Folds */}
            <path
              d="M95 75 L130 200 L95 385"
              stroke="#C9A94C"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="4,4"
            />
            <path
              d="M225 75 L190 200 L225 385"
              stroke="#C9A94C"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="4,4"
            />
            {/* Embroidered Neckpiece & Breastplate */}
            <path
              d="M160 35 C136 50 125 70 128 92 C131 114 146 126 160 126 C174 126 189 114 192 92 C195 70 184 50 160 35 Z"
              stroke="#C9A94C"
              strokeWidth="1.8"
              fill="rgba(201,169,76,0.12)"
              className="animate-garment-draw"
              style={{ animationDelay: '0.4s' }}
            />
            {/* Royal Geometric Diamond Motif */}
            <path
              d="M160 135 L145 155 L160 175 L175 155 Z M160 175 L150 190 L160 205 L170 190 Z"
              stroke="#C9A94C"
              strokeWidth="1.2"
              fill="rgba(201,169,76,0.15)"
            />
            {/* Center Crease */}
            <line x1="160" y1="205" x2="160" y2="380" stroke="#C9A94C" strokeWidth="1" strokeOpacity="0.5" />
          </g>
        )}

        {type === 'suit' && (
          <g className="transition-all duration-700">
            {/* Suit Jacket Body */}
            <path
              d="M160 40 L105 55 L75 80 L70 240 L100 245 L102 410 L145 410 L152 250 L160 250 L168 250 L175 410 L218 410 L220 245 L250 240 L245 80 L215 55 Z"
              fill="url(#goldGlow)"
            />
            <path
              d="M160 40 L105 55 L75 80 L70 240 L100 245 L102 410 L145 410 L152 250 L160 250 L168 250 L175 410 L218 410 L220 245 L250 240 L245 80 L215 55 Z"
              stroke="#C9A94C"
              strokeWidth="1.6"
              fill="none"
              className="animate-garment-draw"
            />
            {/* Peak Lapels */}
            <path
              d="M160 40 L135 90 L120 85 L142 165 L160 195 L178 165 L200 85 L185 90 Z"
              stroke="#C9A94C"
              strokeWidth="1.4"
              fill="rgba(201,169,76,0.15)"
              className="animate-garment-draw"
              style={{ animationDelay: '0.3s' }}
            />
            {/* Chest Pocket & Milanese Boutonnière */}
            <line x1="125" y1="125" x2="140" y2="125" stroke="#C9A94C" strokeWidth="1.8" />
            <circle cx="132" cy="78" r="2" fill="#C9A94C" />
            {/* Buttons */}
            <circle cx="160" cy="205" r="3" fill="#C9A94C" />
            <circle cx="160" cy="225" r="3" fill="#C9A94C" />
            {/* Trousers Crease Lines */}
            <line x1="124" y1="260" x2="124" y2="400" stroke="#C9A94C" strokeWidth="0.9" strokeDasharray="3,3" />
            <line x1="196" y1="260" x2="196" y2="400" stroke="#C9A94C" strokeWidth="0.9" strokeDasharray="3,3" />
          </g>
        )}

        {type === 'kaftan' && (
          <g className="transition-all duration-700">
            {/* Kaftan Tunics & Tapered Sokoto */}
            <path
              d="M160 30 L115 50 L88 75 L75 220 L108 220 L105 310 L95 410 L138 410 L150 315 L160 315 L170 315 L182 410 L225 410 L215 310 L212 220 L245 220 L232 75 L205 50 Z"
              fill="url(#goldGlow)"
            />
            <path
              d="M160 30 L115 50 L88 75 L75 220 L108 220 L105 310 L95 410 L138 410 L150 315 L160 315 L170 315 L182 410 L225 410 L215 310 L212 220 L245 220 L232 75 L205 50 Z"
              stroke="#C9A94C"
              strokeWidth="1.6"
              fill="none"
              className="animate-garment-draw"
            />
            {/* Mandarin Collar */}
            <path
              d="M142 38 C142 30 178 30 178 38 L180 50 C180 56 140 56 140 50 Z"
              stroke="#C9A94C"
              strokeWidth="1.4"
              fill="rgba(201,169,76,0.2)"
            />
            {/* Geometric Placket */}
            <path
              d="M154 50 L154 185 L166 185 L166 50 Z"
              stroke="#C9A94C"
              strokeWidth="1.2"
              fill="rgba(201,169,76,0.15)"
            />
            {/* Side Slits */}
            <line x1="108" y1="260" x2="108" y2="310" stroke="#C9A94C" strokeWidth="1.4" />
            <line x1="212" y1="260" x2="212" y2="310" stroke="#C9A94C" strokeWidth="1.4" />
          </g>
        )}

        {type === 'gown' && (
          <g className="transition-all duration-700">
            {/* Sculpted Evening Gown */}
            <path
              d="M160 45 C145 45 130 55 125 75 L120 120 C120 150 135 180 135 220 C135 270 90 350 75 415 L245 415 C230 350 185 270 185 220 C185 180 200 150 200 120 L195 75 C190 55 175 45 160 45 Z"
              fill="url(#goldGlow)"
            />
            <path
              d="M160 45 C145 45 130 55 125 75 L120 120 C120 150 135 180 135 220 C135 270 90 350 75 415 L245 415 C230 350 185 270 185 220 C185 180 200 150 200 120 L195 75 C190 55 175 45 160 45 Z"
              stroke="#C9A94C"
              strokeWidth="1.6"
              fill="none"
              className="animate-garment-draw"
            />
            {/* Sweetheart Neckline & Corsetry Stitches */}
            <path
              d="M130 75 Q145 90 160 75 Q175 90 190 75"
              stroke="#C9A94C"
              strokeWidth="1.4"
              fill="none"
            />
            <line x1="148" y1="90" x2="148" y2="180" stroke="#C9A94C" strokeWidth="0.8" strokeDasharray="3,3" />
            <line x1="172" y1="90" x2="172" y2="180" stroke="#C9A94C" strokeWidth="0.8" strokeDasharray="3,3" />
            {/* Flowing Hem Waves */}
            <path
              d="M75 415 Q160 395 245 415"
              stroke="#C9A94C"
              strokeWidth="1.2"
              fill="none"
            />
          </g>
        )}

        {type === 'twopiece' && (
          <g className="transition-all duration-700">
            {/* Resort Two Piece Shirt & Pants */}
            <path
              d="M160 45 L110 65 L85 90 L75 190 L110 195 L112 250 L100 410 L145 410 L152 260 L168 260 L175 410 L220 410 L208 250 L210 195 L245 190 L235 90 L210 65 Z"
              fill="url(#goldGlow)"
            />
            <path
              d="M160 45 L110 65 L85 90 L75 190 L110 195 L112 250 L100 410 L145 410 L152 260 L168 260 L175 410 L220 410 L208 250 L210 195 L245 190 L235 90 L210 65 Z"
              stroke="#C9A94C"
              strokeWidth="1.6"
              fill="none"
              className="animate-garment-draw"
            />
            {/* Camp Open Collar */}
            <path
              d="M160 45 L140 85 L125 75 M160 45 L180 85 L195 75"
              stroke="#C9A94C"
              strokeWidth="1.3"
              fill="none"
            />
            {/* Inset Pocket */}
            <rect x="180" y="115" width="22" height="24" stroke="#C9A94C" strokeWidth="1" rx="1" fill="none" />
            <line x1="160" y1="85" x2="160" y2="245" stroke="#C9A94C" strokeWidth="0.8" strokeDasharray="4,4" />
          </g>
        )}
      </svg>

      {/* Interactive Hotspot Pills */}
      {interactive &&
        hotspots.map((hs) => (
          <div
            key={hs.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
            onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
            onMouseEnter={() => setActiveHotspot(hs.id)}
            onMouseLeave={() => setActiveHotspot(null)}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[#C9A94C]/20 border border-[#C9A94C] flex items-center justify-center transition-transform group-hover:scale-125">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A94C] animate-ping" />
              </span>

              {/* Tooltip Tag */}
              <div
                className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 text-[11px] font-sans tracking-wider uppercase border border-[#C9A94C]/50 bg-[#141009]/95 text-[#F3EAD2] backdrop-blur-md transition-all duration-200 pointer-events-none shadow-xl ${
                  activeHotspot === hs.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
              >
                {hs.label}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
