import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';

function WebSocketComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('wss://chat.donejs.com/');

    socket.onmessage = (event) => {
      setMessages(previousMessages => {
        return [ ...previousMessages, event.data ];
      });
    };

    return () => {
      // Clean up (tear down) the socket connection
      return socket.close();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default WebSocketComponent;
