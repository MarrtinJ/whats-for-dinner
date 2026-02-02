import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DetectedIngredient } from '../../types/ingredient';

interface IngredientTileProps {
  ingredient: DetectedIngredient;
  onDelete: () => void;
}

const CONFIDENCE_COLORS = {
  high: 'bg-green-500',
  medium: 'bg-yellow-500',
  low: 'bg-gray-500',
};

export function IngredientTile({ ingredient, onDelete }: IngredientTileProps) {
  const bgColor = ingredient.wasManuallyAdded ? 'bg-gray-700' : 'bg-gray-800';

  return (
    <View className={`mb-2 flex-row items-center rounded-xl ${bgColor} px-4 py-3`}>
      <View className="flex-1">
        <Text className="text-base capitalize text-white">{ingredient.name}</Text>
        {ingredient.confidence && (
          <View className="mt-1 flex-row items-center">
            <View
              className={`h-2 w-2 rounded-full ${CONFIDENCE_COLORS[ingredient.confidence]} mr-2`}
            />
            <Text className="text-xs capitalize text-gray-400">{ingredient.confidence}</Text>
          </View>
        )}
      </View>
      <Pressable onPress={onDelete} accessibilityLabel="Delete ingredient" className="p-2">
        <Ionicons name="close-circle" size={22} color="#9ca3af" />
      </Pressable>
    </View>
  );
}
