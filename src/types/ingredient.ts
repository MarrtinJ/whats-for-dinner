export interface DetectedIngredient {
  name: string;
  confidence?: 'high' | 'medium' | 'low';
  wasManuallyAdded?: boolean;
}
