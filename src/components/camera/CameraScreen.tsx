import { View, Text, Pressable, Linking } from 'react-native';
import { CameraView } from 'expo-camera';
import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';

import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
import { ViewfinderOverlay } from './ViewfinderOverlay';
import { useCamera } from '../../hooks/useCamera';

export function CameraScreen() {
  const router = useRouter();
  const { cameraRef, permission, requestPermission, takePicture } = useCamera();
  const [flashEnabled, setFlashEnabled] = useState(false);

  const handleCapture = useCallback(async () => {
    const photo = await takePicture();
    if (photo) {
      router.push({ pathname: '/results', params: { uri: photo.uri } });
    }
  }, [takePicture, router]);

  const handleFlashToggle = useCallback(() => {
    setFlashEnabled((prev) => !prev);
  }, []);

  const handleHelpPress = useCallback(() => {
    // TODO: Show help modal or navigate to help screen
  }, []);

  const permissionGranted = permission?.granted;
  const canAskAgain = !permissionGranted && (permission?.canAskAgain || permission?.status === 'undetermined');

  return (
    <View className="flex-1 bg-black">
      <TopBar onHelpPress={handleHelpPress} />

      <View className="relative flex-1">
        {permissionGranted ? (
          <>
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              facing="back"
              flash={flashEnabled ? 'on' : 'off'}
            />
            <ViewfinderOverlay />
          </>
        ) : (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="mb-4 text-center text-lg text-white">
              {canAskAgain
                ? 'Camera access is needed to scan your ingredients'
                : 'Camera permission was denied. Please enable it in Settings.'}
            </Text>
            <Pressable
              onPress={canAskAgain ? requestPermission : () => Linking.openSettings()}
              className="rounded-lg bg-blue-500 px-6 py-3"
            >
              <Text className="font-semibold text-white">
                {canAskAgain ? 'Grant Permission' : 'Open Settings'}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <BottomBar
        onCapture={handleCapture}
        flashEnabled={flashEnabled}
        onFlashToggle={handleFlashToggle}
      />
    </View>
  );
}
