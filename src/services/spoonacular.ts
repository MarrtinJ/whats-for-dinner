import { SpoonacularRecipe, Recipe, RecipeDetail } from '../types/recipe';

const API_BASE_URL = 'https://api.spoonacular.com/recipes';

function getApiKey(): string {
  const key = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;
  if (!key) {
    throw new Error('EXPO_PUBLIC_SPOONACULAR_API_KEY is not configured');
  }
  return key;
}

export interface FindByIngredientsOptions {
  ingredients: string[];
  number?: number;
  ignorePantry?: boolean;
  ranking?: 1 | 2; // 1 = maximize used, 2 = minimize missing
}

export async function findRecipesByIngredients(
  options: FindByIngredientsOptions
): Promise<Recipe[]> {
  const { ingredients, number = 20, ignorePantry = true, ranking = 1 } = options;

  const apiKey = getApiKey();
  const ingredientsParam = ingredients.join(',');

  const url = new URL(`${API_BASE_URL}/findByIngredients`);
  url.searchParams.set('ingredients', ingredientsParam);
  url.searchParams.set('number', String(number));
  url.searchParams.set('ignorePantry', String(ignorePantry));
  url.searchParams.set('ranking', String(ranking));
  url.searchParams.set('apiKey', apiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spoonacular API error (${response.status}): ${errorText}`);
  }

  const data: SpoonacularRecipe[] = await response.json();

  return data.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    usedIngredientCount: recipe.usedIngredientCount,
    missedIngredientCount: recipe.missedIngredientCount,
  }));
}

export async function getRecipeInformation(id: number): Promise<RecipeDetail> {
  const apiKey = getApiKey();

  const url = new URL(`${API_BASE_URL}/${id}/information`);
  url.searchParams.set('apiKey', apiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spoonacular API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    title: data.title,
    image: data.image,
    servings: data.servings,
    readyInMinutes: data.readyInMinutes,
    extendedIngredients: data.extendedIngredients.map(
      (ing: {
        id: number;
        amount: number;
        unit: string;
        unitLong: string;
        unitShort: string;
        aisle: string;
        name: string;
        original: string;
        image: string;
      }) => ({
        id: ing.id,
        amount: ing.amount,
        unit: ing.unit,
        unitLong: ing.unitLong,
        unitShort: ing.unitShort,
        aisle: ing.aisle,
        name: ing.name,
        original: ing.original,
        image: ing.image,
      })
    ),
    instructions: data.instructions || '',
  };
}
