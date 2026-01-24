import { View, Text } from 'react-native';

import { COLORS } from '../../constants/colors';

const CORNER_SIZE = 40;
const BORDER_WIDTH = 3;
const BORDER_RADIUS = 16;

export function ViewfinderOverlay() {
  return (
    <View className="absolute inset-0 items-center justify-center">
      <View style={{ width: '80%', height: '80%' }} className="relative">
        {/* Top-left corner */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: CORNER_SIZE,
            height: CORNER_SIZE,
            borderTopWidth: BORDER_WIDTH,
            borderLeftWidth: BORDER_WIDTH,
            borderColor: COLORS.cornerBracket,
            borderTopLeftRadius: BORDER_RADIUS,
          }}
        />
        {/* Top-right corner */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: CORNER_SIZE,
            height: CORNER_SIZE,
            borderTopWidth: BORDER_WIDTH,
            borderRightWidth: BORDER_WIDTH,
            borderColor: COLORS.cornerBracket,
            borderTopRightRadius: BORDER_RADIUS,
          }}
        />
        {/* Bottom-left corner */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: CORNER_SIZE,
            height: CORNER_SIZE,
            borderBottomWidth: BORDER_WIDTH,
            borderLeftWidth: BORDER_WIDTH,
            borderColor: COLORS.cornerBracket,
            borderBottomLeftRadius: BORDER_RADIUS,
          }}
        />
        {/* Bottom-right corner */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: CORNER_SIZE,
            height: CORNER_SIZE,
            borderBottomWidth: BORDER_WIDTH,
            borderRightWidth: BORDER_WIDTH,
            borderColor: COLORS.cornerBracket,
            borderBottomRightRadius: BORDER_RADIUS,
          }}
        />
      </View>

      <Text className="mt-6 text-center text-base font-medium text-white/90">
        Align ingredients in frame
      </Text>
    </View>
  );
}
