import { View, Text, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { useRecipeSearch } from '../src/hooks/useRecipeSearch';
import { useRecipeDetails } from '../src/hooks/useRecipeDetails';
import { RecipesLoadingState } from '../src/components/recipes/RecipesLoadingState';
import { RecipeCard } from '../src/components/recipes/RecipeCard';

export default function Recipes() {
  const { ingredients } = useLocalSearchParams<{ ingredients: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { search, recipes, loading, error } = useRecipeSearch();
  const { fetchDetails, details, loadingId } = useRecipeDetails();

  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (ingredients) {
      const ingredientList = ingredients.split(',').map((i) => i.trim());
      search(ingredientList);
    }
  }, [ingredients, search]);

  const handleCardPress = (recipeId: number) => {
    if (expandedId === recipeId) {
      setExpandedId(null);
    } else {
      setExpandedId(recipeId);
      fetchDetails(recipeId);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <View style={{ paddingTop: insets.top }} className="flex-row items-center px-4 pb-3">
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" className="p-2">
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </Pressable>
        <Text className="ml-2 text-lg font-bold text-white">Recipes</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 20 }}>
        {loading && <RecipesLoadingState />}

        {error && (
          <View className="items-center py-8">
            <Text className="mb-4 text-center text-red-400">{error}</Text>
            <Pressable
              onPress={() => {
                if (ingredients) {
                  const ingredientList = ingredients.split(',').map((i) => i.trim());
                  search(ingredientList);
                }
              }}
              className="rounded-lg bg-blue-500 px-6 py-3">
              <Text className="font-semibold text-white">Try Again</Text>
            </Pressable>
          </View>
        )}

        {!loading && !error && recipes && (
          <View>
            <Text className="mb-4 text-lg font-semibold text-white">
              {recipes.length > 0 ? `Found ${recipes.length} recipes` : 'No recipes found'}
            </Text>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                expanded={expandedId === recipe.id}
                loading={loadingId === recipe.id}
                details={details[recipe.id]}
                onPress={() => handleCardPress(recipe.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
