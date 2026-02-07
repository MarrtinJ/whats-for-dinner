import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe, RecipeDetail } from '../../types/recipe';
import { RecipeDetailsSkeleton } from './RecipeDetailsSkeleton';

interface RecipeCardProps {
  recipe: Recipe;
  expanded?: boolean;
  loading?: boolean;
  details?: RecipeDetail;
  onPress?: () => void;
}

function parseInstructions(text: string): string[] {
  if (!text || !text.trim()) return [];

  // Try HTML format first: extract <li> content
  const liMatches = text.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  if (liMatches && liMatches.length > 0) {
    return liMatches.map((li) => li.replace(/<[^>]*>/g, '').trim()).filter(Boolean);
  }

  // Plain text format: split on long whitespace runs (4+ spaces or newlines)
  const steps = text
    .split(/\s{4,}|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return steps.length > 0 ? steps : [text.trim()];
}

export function RecipeCard({
  recipe,
  expanded = false,
  loading = false,
  details,
  onPress,
}: RecipeCardProps) {
  return (
    <Pressable onPress={onPress} className="mb-3 rounded-xl bg-gray-800 p-3">
      <View className="flex-row items-center">
        <Image source={{ uri: recipe.image }} className="h-16 w-16 rounded-lg" resizeMode="cover" />
        <View className="ml-4 flex-1">
          <Text
            className="text-base font-semibold text-white"
            numberOfLines={expanded ? undefined : 2}>
            {recipe.title}
          </Text>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color="#9ca3af" />
      </View>

      {expanded && loading && <RecipeDetailsSkeleton />}

      {expanded && !loading && details && (
        <View className="mt-4 border-t border-gray-700 pt-4">
          {/* Cook time */}
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#9ca3af" />
            <Text className="ml-2 text-sm text-gray-400">{details.readyInMinutes} min</Text>
          </View>

          {/* Servings */}
          <View className="mt-2 flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#9ca3af" />
            <Text className="ml-2 text-sm text-gray-400">{details.servings} servings</Text>
          </View>

          {/* Ingredients */}
          <Text className="mt-4 text-sm font-semibold text-white">Ingredients</Text>
          <View className="mt-2">
            {details.extendedIngredients.map((ingredient, index) => (
              <View key={ingredient.id || index} className="mb-1 flex-row">
                <Text className="text-sm text-gray-400">•</Text>
                <Text className="ml-2 flex-1 text-sm text-gray-300">{ingredient.original}</Text>
              </View>
            ))}
          </View>

          {/* Instructions */}
          {details.instructions && parseInstructions(details.instructions).length > 0 && (
            <>
              <Text className="mt-4 text-sm font-semibold text-white">Instructions</Text>
              <View className="mt-2">
                {parseInstructions(details.instructions).map((step, index) => (
                  <View key={index} className="mb-2 flex-row">
                    <Text className="w-6 text-sm text-gray-400">{index + 1}.</Text>
                    <Text className="flex-1 text-sm leading-5 text-gray-300">{step}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      )}
    </Pressable>
  );
}
