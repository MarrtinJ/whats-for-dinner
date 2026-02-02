import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';

interface PickImageOptions {
  allowMultiple?: boolean;
}

interface UseImagePickerReturn {
  pickImage: (options?: PickImageOptions) => Promise<string[]>;
}

export function useImagePicker(): UseImagePickerReturn {
  const pickImage = useCallback(async (options?: PickImageOptions): Promise<string[]> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: options?.allowMultiple ?? false,
      quality: 0.8,
    });

    if (result.canceled || result.assets.length === 0) {
      return [];
    }

    return result.assets.map((asset) => asset.uri);
  }, []);

  return { pickImage };
}
