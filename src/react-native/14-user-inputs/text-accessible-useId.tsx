import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const InputExample = () => {
  const id = useId()
  const [text, setText] = useState('');

  return (
    <View>
      <Text nativeID={id}>Enter your name:</Text>
      <TextInput
        accessibilityLabel="input"
        accessibilityLabelledBy={id}
        onChangeText={newText => setText(newText)}
        value={text}
      />
    </View>
  );
}

export default InputExample