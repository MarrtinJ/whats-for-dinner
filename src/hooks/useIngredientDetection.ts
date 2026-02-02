import { useState, useCallback } from 'react';
import { DetectedIngredient } from '../types/ingredient';
import { prepareImageForApi } from '../utils/image';
import { detectIngredients } from '../services/anthropic';

interface UseIngredientDetectionReturn {
  detect: (imageUri: string) => Promise<DetectedIngredient[]>;
  ingredients: DetectedIngredient[] | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
  addIngredient: (name: string) => void;
  removeIngredient: (index: number) => void;
}

export function useIngredientDetection(): UseIngredientDetectionReturn {
  const [ingredients, setIngredients] = useState<DetectedIngredient[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detect = useCallback(async (imageUri: string): Promise<DetectedIngredient[]> => {
    setLoading(true);
    setError(null);
    setIngredients(null);

    try {
      const { base64, mimeType } = await prepareImageForApi(imageUri);
      const result = await detectIngredients(base64, mimeType);
      setIngredients(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to detect ingredients';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIngredients(null);
    setLoading(false);
    setError(null);
  }, []);

  const addIngredient = useCallback((name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newIngredient: DetectedIngredient = {
      name: trimmedName.toLowerCase(),
      wasManuallyAdded: true,
    };

    setIngredients((prev) => (prev ? [...prev, newIngredient] : [newIngredient]));
  }, []);

  const removeIngredient = useCallback((index: number) => {
    setIngredients((prev) => {
      if (!prev) return null;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  return {
    detect,
    ingredients,
    loading,
    error,
    reset,
    addIngredient,
    removeIngredient,
  };
}
