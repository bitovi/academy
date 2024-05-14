import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const InputExample = () => {
  const [text, setText] = useState('');

  return (
    <View>
      <Text>Enter your name:</Text>
      <TextInput
        onChangeText={newText => setText(newText)}
        value={text}
      />
    </View>
  );
}

export default InputExample