import { useState, useCallback } from 'react';
import { RecipeDetail } from '../types/recipe';
import { getRecipeInformation } from '../services/spoonacular';

interface UseRecipeDetailsReturn {
  fetchDetails: (recipeId: number) => Promise<RecipeDetail | undefined>;
  details: Record<number, RecipeDetail>;
  loadingId: number | null;
  error: string | null;
}

export function useRecipeDetails(): UseRecipeDetailsReturn {
  const [details, setDetails] = useState<Record<number, RecipeDetail>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(
    async (recipeId: number): Promise<RecipeDetail | undefined> => {
      // Return cached if available
      if (details[recipeId]) {
        return details[recipeId];
      }

      setLoadingId(recipeId);
      setError(null);

      try {
        const result = await getRecipeInformation(recipeId);
        setDetails((prev) => ({ ...prev, [recipeId]: result }));
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch recipe details';
        setError(message);
        return undefined;
      } finally {
        setLoadingId(null);
      }
    },
    [details]
  );

  return {
    fetchDetails,
    details,
    loadingId,
    error,
  };
}
