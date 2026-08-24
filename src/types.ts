export type Currency = 'NGN' | 'USD';

export interface GarmentSilhouette {
  id: string;
  name: string;
  category: 'traditional' | 'executive' | 'wedding' | 'everyday';
  tagline: string;
  description: string;
  basePriceNGN: number;
  basePriceUSD: number;
  turnaroundDays: number;
  tags: string[];
  fabricSuggestions: string[];
  svgType: 'agbada' | 'kaftan' | 'suit' | 'gown' | 'twopiece';
  details: {
    cut: string;
    embroidery: string;
    occasion: string;
    origin: string;
  };
}

export interface FabricSwatch {
  id: string;
  name: string;
  material: string;
  origin: string;
  texture: string;
  weight: string;
  colorHex: string;
  accentColor: string;
  description: string;
  suitableFor: string[];
  premiumTier: 'Standard' | 'Luxury' | 'Ultra-Bespoke';
}

export interface SmartMeasurements {
  unit: 'inches' | 'cm';
  profileType: 'custom' | 'standard' | 'book_fitting';
  standardSize?: 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
  chest?: number;
  shoulder?: number;
  sleeveLength?: number;
  neck?: number;
  bicep?: number;
  shirtLength?: number;
  waist?: number;
  hip?: number;
  thigh?: number;
  trouserLength?: number;
  agbadaSpan?: number;
  height?: string;
  notes?: string;
}

export interface DesignBrief {
  id: string;
  createdAt: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  city: string;
  garmentId: string;
  garmentName: string;
  occasion: string;
  eventDate?: string;
  urgency: 'standard' | 'express' | 'urgent';
  selectedFabricId: string;
  selectedColor: {
    name: string;
    hex: string;
  };
  embroideryLevel: 'minimal' | 'signature' | 'regal' | 'none';
  customNotes: string;
  referenceImages: string[];
  measurements: SmartMeasurements;
  estimatedTotalNGN: number;
  estimatedTotalUSD: number;
  status: OrderStatus;
  currentStepIndex: number;
  timelineNotes: {
    date: string;
    stage: string;
    note: string;
  }[];
}

export type OrderStatus =
  | 'brief_received'
  | 'design_confirmed'
  | 'measurements_verified'
  | 'fabric_sourced'
  | 'in_sewing'
  | 'hand_finishing'
  | 'final_fitting'
  | 'dispatched'
  | 'delivered';

export interface TrackingOrder {
  orderId: string;
  clientName: string;
  garmentTitle: string;
  category: string;
  fabricName: string;
  colorName: string;
  placedDate: string;
  estimatedDeliveryDate: string;
  status: OrderStatus;
  currentStepIndex: number;
  tailorAssigned: string;
  deliveryLocation: string;
  timeline: {
    title: string;
    subtitle: string;
    completed: boolean;
    active?: boolean;
    date?: string;
  }[];
  notes: string[];
  progressPercent: number;
}
