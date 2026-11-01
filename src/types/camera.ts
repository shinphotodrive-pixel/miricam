export type CategoryType = 
  | 'optics-exposure' 
  | 'sensor-architecture' 
  | 'autofocus' 
  | 'cinema-dr' 
  | 'lens-mechanics' 
  | 'computational-ai';

export type DifficultyLevel = '기초 (Fundamental)' | '심화 (Advanced)' | '전문 (Expert)';

export interface CameraTerm {
  id: string;
  nameKr: string;
  nameEn: string;
  category: CategoryType;
  difficulty: DifficultyLevel;
  shortDesc: string;
  fullExplanation: string;
  keyMechanism: string[];
  formula?: string;
  formulaDescription?: string;
  appliedCameras: string[];
  keyAdvantages: string[];
  limitationsOrTradeoffs: string[];
}

export type TabKey = 
  | 'dashboard' 
  | 'compare'
  | 'exposure' 
  | 'sensor' 
  | 'cinema' 
  | 'lens' 
  | 'computational' 
  | 'dictionary';

export interface NoiseSimState {
  photons: number;
  readNoise: number;
  quantumEfficiency: number;
  darkCurrent: number;
  exposureTime: number; // in seconds
  gainIso: number;
}

export interface DofCalcState {
  sensorFormat: 'medium-format' | 'full-frame' | 'aps-c' | 'micro-four-thirds';
  focalLength: number; // mm
  aperture: number; // F-number
  subjectDistance: number; // meters
}

export interface MtfSimState {
  aperture: number;
  lensType: 'standard-prime' | 'telephoto-prime' | 'wide-zoom' | 'kit-zoom';
  frequency: 10 | 30; // 10 lp/mm (contrast) or 30 lp/mm (resolution)
}

export interface CodecCalcState {
  resolution: '4k-uhd' | '4k-dci' | '6k' | '8k';
  frameRate: 24 | 30 | 60 | 120;
  codecType: 'all-i' | 'long-gop' | 'prores-422hq' | 'raw';
  bitDepth: 8 | 10 | 12;
}
