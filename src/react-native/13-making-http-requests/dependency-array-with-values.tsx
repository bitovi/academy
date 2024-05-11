import { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

function NameStorage() {
    const [name, setName] = useState('');

    useEffect(() => {
        localStorage.setItem('name', name);
    }, [name]);

    return (
        <View>
            <Text>Name</Text>
            <TextInput
            onChangeText={setName}
            value={name}
            />
        </View>
    );
}

export default NameStorage;