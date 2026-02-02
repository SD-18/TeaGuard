
export type Language = 'en' | 'as';

export interface PredictionResult {
  success: boolean;
  latency_ms: number;
  prediction: {
    disease: string;
    confidence: number;
    all_probabilities: Record<string, number>;
  };
}

export interface InterpretationResponse {
  interpretation: string;
}

export interface TranslationSet {
  navHome: string;
  navAnalyze: string;
  navGuide: string;
  navAbout: string;
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  btnStart: string;
  statsAccuracy: string;
  statsSamples: string;
  statsLatency: string;
  statsFocus: string;
}
