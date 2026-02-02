import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '../ui/IconButton';
import { COLORS } from '../../constants/colors';

type TopBarProps = {
  onHelpPress: () => void;
};

export function TopBar({ onHelpPress }: TopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top, backgroundColor: COLORS.darkBar }}
      className="flex-row items-center justify-between px-4 pb-3">
      <Text className="text-lg font-bold text-white">What&apos;s For Dinner</Text>
      <IconButton
        name="help-circle-outline"
        size={28}
        color={COLORS.white}
        onPress={onHelpPress}
        accessibilityLabel="Help"
      />
    </View>
  );
}
