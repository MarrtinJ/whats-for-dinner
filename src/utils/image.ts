import * as ImageManipulator from 'expo-image-manipulator';
import { readAsStringAsync, EncodingType } from 'expo-file-system/legacy';

const TARGET_WIDTH = 951;
const TARGET_HEIGHT = 1268;

export interface PreparedImage {
  base64: string;
  mimeType: 'image/jpeg';
}

async function preprocessImage(uri: string): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: TARGET_WIDTH, height: TARGET_HEIGHT } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
}

async function encodeImageToBase64(uri: string): Promise<string> {
  const base64 = await readAsStringAsync(uri, {
    encoding: EncodingType.Base64,
  });
  return base64;
}

export async function prepareImageForApi(uri: string): Promise<PreparedImage> {
  const resizedUri = await preprocessImage(uri);
  const base64 = await encodeImageToBase64(resizedUri);
  return { base64, mimeType: 'image/jpeg' };
}
