import type { JSX } from "react"
import { ScrollView, Text, View } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context"

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
