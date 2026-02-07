import { useState, useCallback } from 'react';
import { Recipe } from '../types/recipe';
import { findRecipesByIngredients } from '../services/spoonacular';

interface UseRecipeSearchReturn {
  search: (ingredientNames: string[]) => Promise<Recipe[]>;
  recipes: Recipe[] | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useRecipeSearch(): UseRecipeSearchReturn {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (ingredientNames: string[]): Promise<Recipe[]> => {
    setLoading(true);
    setError(null);
    setRecipes(null);

    try {
      const result = await findRecipesByIngredients({
        ingredients: ingredientNames,
        ignorePantry: true,
        ranking: 1,
        number: 20,
      });
      setRecipes(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search recipes';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setRecipes(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    search,
    recipes,
    loading,
    error,
    reset,
  };
}
