import { View, Text, Image, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Results() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black">
      <View
        style={{ paddingTop: insets.top }}
        className="flex-row items-center px-4 pb-3"
      >
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" className="p-2">
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </Pressable>
        <Text className="ml-2 text-lg font-bold text-white">Results</Text>
      </View>

      <View className="flex-1 items-center justify-start px-6">
        {uri && (
          <Image
            source={{ uri }}
            className="w-full rounded-2xl"
            style={{ aspectRatio: 3 / 4 }}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
}
