import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/colors';

type BottomBarProps = {
  onCapture: () => void;
  flashEnabled: boolean;
  onFlashToggle: () => void;
  onGalleryPress: () => void;
};

export function BottomBar({
  onCapture,
  flashEnabled,
  onFlashToggle,
  onGalleryPress,
}: BottomBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: insets.bottom, backgroundColor: COLORS.darkBar }}
      className="flex-row items-center justify-center px-6 pb-2 pt-4">
      {/* Gallery button */}
      <View className="flex-1">
        <Pressable
          onPress={onGalleryPress}
          accessibilityLabel="Choose from gallery"
          className="h-11 w-11 items-center justify-center rounded-full bg-white/20">
          <Ionicons name="images" size={22} color={COLORS.white} />
        </Pressable>
      </View>

      {/* Capture button */}
      <Pressable
        onPress={onCapture}
        accessibilityLabel="Take photo"
        className="items-center justify-center">
        <View className="h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-white/30">
          <View className="h-[58px] w-[58px] rounded-full bg-white" />
        </View>
      </Pressable>

      {/* Flash toggle */}
      <View className="flex-1 items-end">
        <Pressable onPress={onFlashToggle} accessibilityLabel="Toggle flash" className="p-2">
          <Ionicons name={flashEnabled ? 'flash' : 'flash-off'} size={26} color={COLORS.white} />
        </Pressable>
      </View>
    </View>
  );
}
