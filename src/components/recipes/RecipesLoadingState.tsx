import { View, Text, ActivityIndicator } from 'react-native';

export function RecipesLoadingState() {
  return (
    <View className="items-center justify-center py-8">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="mt-4 text-base text-gray-400">Searching for recipes...</Text>
    </View>
  );
}
