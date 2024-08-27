import { useState } from "react"
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"

const EmailInputField: React.FC<Props> = ({ label, value }) => {
  const [formValue, setFormValue] = useState(value)

  return (
    <View>
      <Text nativeID="formLabel">{label}:</Text>
      <TextInput
        accessibilityLabel="input"
        accessibilityLabelledBy="formLabel"
        value={formValue}
        onChangeText={setFormValue}
      />
    </View>
  )
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <EmailInputField label="Email" value="test@example.com" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
