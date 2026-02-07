import { View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

function SkeletonBar({ width, height = 16 }: { width: string | number; height?: number }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width,
        height,
        backgroundColor: '#4b5563',
        borderRadius: 4,
        opacity,
      }}
    />
  );
}

export function RecipeDetailsSkeleton() {
  return (
    <View className="mt-4 border-t border-gray-700 pt-4">
      {/* Cook time */}
      <SkeletonBar width="40%" height={14} />

      {/* Servings */}
      <View className="mt-3">
        <SkeletonBar width="35%" height={14} />
      </View>

      {/* Ingredients header */}
      <View className="mt-4">
        <SkeletonBar width="30%" height={16} />
      </View>

      {/* Ingredient lines */}
      <View className="mt-3">
        <SkeletonBar width="90%" height={14} />
      </View>
      <View className="mt-2">
        <SkeletonBar width="85%" height={14} />
      </View>
      <View className="mt-2">
        <SkeletonBar width="75%" height={14} />
      </View>
      <View className="mt-2">
        <SkeletonBar width="80%" height={14} />
      </View>

      {/* Instructions header */}
      <View className="mt-4">
        <SkeletonBar width="30%" height={16} />
      </View>

      {/* Numbered instruction steps */}
      <View className="mt-3 flex-row">
        <SkeletonBar width={16} height={14} />
        <View className="ml-2 flex-1">
          <SkeletonBar width="95%" height={14} />
        </View>
      </View>
      <View className="mt-2 flex-row">
        <SkeletonBar width={16} height={14} />
        <View className="ml-2 flex-1">
          <SkeletonBar width="90%" height={14} />
        </View>
      </View>
      <View className="mt-2 flex-row">
        <SkeletonBar width={16} height={14} />
        <View className="ml-2 flex-1">
          <SkeletonBar width="85%" height={14} />
        </View>
      </View>
    </View>
  );
}
