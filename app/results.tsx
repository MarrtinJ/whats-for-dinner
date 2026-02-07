import { View, Text, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { useIngredientDetection } from '../src/hooks/useIngredientDetection';
import { LoadingState } from '../src/components/results/LoadingState';
import { IngredientTile } from '../src/components/results/IngredientTile';
import { AddIngredientInput } from '../src/components/results/AddIngredientInput';

export default function Results() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { detect, ingredients, loading, error, reset, addIngredient, removeIngredient } =
    useIngredientDetection();
  const [searchingRecipes, setSearchingRecipes] = useState(false);

  const handleSearchRecipes = () => {
    if (!ingredients || ingredients.length === 0) return;

    setSearchingRecipes(true);
    const ingredientNames = ingredients.map((i) => i.name).join(',');
    router.push(`/recipes?ingredients=${encodeURIComponent(ingredientNames)}`);
    setTimeout(() => setSearchingRecipes(false), 500);
  };

  useEffect(() => {
    if (uri) {
      detect(uri);
    }
    return () => reset();
  }, [uri, detect, reset]);

  return (
    <View className="flex-1 bg-black">
      <View style={{ paddingTop: insets.top }} className="flex-row items-center px-4 pb-3">
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" className="p-2">
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </Pressable>
        <Text className="ml-2 text-lg font-bold text-white">Results</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 100 }}>
        {uri && (
          <Image
            source={{ uri }}
            className="mb-6 w-full rounded-2xl"
            style={{ aspectRatio: 3 / 4 }}
            resizeMode="cover"
          />
        )}

        {loading && <LoadingState />}

        {error && (
          <View className="items-center py-8">
            <Text className="mb-4 text-center text-red-400">{error}</Text>
            <Pressable
              onPress={() => uri && detect(uri)}
              className="rounded-lg bg-blue-500 px-6 py-3">
              <Text className="font-semibold text-white">Try Again</Text>
            </Pressable>
          </View>
        )}

        {!loading && !error && ingredients && (
          <View>
            <Text className="mb-4 text-lg font-semibold text-white">
              {ingredients.length > 0
                ? `Ingredients (${ingredients.length})`
                : 'No ingredients detected'}
            </Text>
            {ingredients.map((ingredient, index) => (
              <IngredientTile
                key={`${ingredient.name}-${index}`}
                ingredient={ingredient}
                onDelete={() => removeIngredient(index)}
              />
            ))}
            <AddIngredientInput onAdd={addIngredient} />
          </View>
        )}
      </ScrollView>

      {!loading && !error && ingredients && ingredients.length > 0 && (
        <View
          style={{ paddingBottom: insets.bottom + 16 }}
          className="absolute bottom-0 left-0 right-0 px-6">
          <Pressable
            onPress={handleSearchRecipes}
            disabled={searchingRecipes}
            className="flex-row items-center justify-center rounded-full bg-blue-500 py-4">
            {searchingRecipes ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="search" size={20} color="#fff" />
                <Text className="ml-2 text-base font-semibold text-white">Search for Recipes</Text>
              </>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
}
