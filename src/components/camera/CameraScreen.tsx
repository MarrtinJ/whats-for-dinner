import { View, Text, Pressable, Linking, Modal } from 'react-native';
import { CameraView } from 'expo-camera';
import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';

import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
import { ViewfinderOverlay } from './ViewfinderOverlay';
import { useCamera } from '../../hooks/useCamera';
import { useImagePicker } from '../../hooks/useImagePicker';

export function CameraScreen() {
  const router = useRouter();
  const { cameraRef, permission, requestPermission, takePicture } = useCamera();
  const { pickImage } = useImagePicker();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);

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
    setHelpModalVisible(true);
  }, []);

  const handleGalleryPress = useCallback(async () => {
    const uris = await pickImage();
    if (uris.length > 0) {
      router.push({ pathname: '/results', params: { uri: uris[0] } });
    }
  }, [pickImage, router]);

  const permissionGranted = permission?.granted;
  const canAskAgain =
    !permissionGranted && (permission?.canAskAgain || permission?.status === 'undetermined');

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
              className="rounded-lg bg-blue-500 px-6 py-3">
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
        onGalleryPress={handleGalleryPress}
      />

      <Modal
        visible={helpModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setHelpModalVisible(false)}>
        <Pressable
          className="flex-1 items-center justify-center bg-black/70"
          onPress={() => setHelpModalVisible(false)}>
          <View className="mx-6 rounded-2xl bg-white p-6" onStartShouldSetResponder={() => true}>
            <Text className="mb-4 text-center text-xl font-bold">How It Works</Text>
            <Text className="mb-6 text-center text-base text-gray-600">
              Take a photo, and see what you can make from the detected ingredients.
            </Text>
            <Pressable
              onPress={() => setHelpModalVisible(false)}
              className="rounded-lg bg-blue-500 px-6 py-3">
              <Text className="text-center font-semibold text-white">Got it</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
