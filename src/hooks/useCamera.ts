import { useCameraPermissions, CameraView } from 'expo-camera';
import { useRef, useCallback } from 'react';

export function useCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const takePicture = useCallback(async () => {
    if (!cameraRef.current) return null;
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });
    return photo;
  }, []);

  return {
    cameraRef,
    permission,
    requestPermission,
    takePicture,
  };
}
