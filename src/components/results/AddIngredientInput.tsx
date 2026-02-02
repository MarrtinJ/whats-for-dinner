import { useState } from 'react';
import { View, TextInput } from 'react-native';

interface AddIngredientInputProps {
  onAdd: (name: string) => void;
}

export function AddIngredientInput({ onAdd }: AddIngredientInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <View className="mt-2 rounded-xl bg-gray-900 px-4 py-3">
      <TextInput
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        placeholder="Add new ingredient"
        placeholderTextColor="#6b7280"
        returnKeyType="done"
        className="text-base text-white"
      />
    </View>
  );
}
