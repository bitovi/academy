import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const InputExample = () => {
  const [text, setText] = useState('');

  return (
    <View>
      <Text nativeID={"name"}>Enter your name:</Text>
      <TextInput
        accessibilityLabel="input"
        accessibilityLabelledBy={"name"}
        onChangeText={newText => setText(newText)}
        value={text}
      />
    </View>
  );
}

export default InputExample