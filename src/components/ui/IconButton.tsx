import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconButtonProps = {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress: () => void;
  accessibilityLabel: string;
};

export function IconButton({
  name,
  size = 24,
  color = '#fff',
  onPress,
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <Pressable onPress={onPress} accessibilityLabel={accessibilityLabel} className="p-2">
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}
