import { SafeAreaView, StyleSheet, Text } from "react-native"

const styles = StyleSheet.create({
  base: {
    color: "black",
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  redText: {
    color: "red",
  },
})

const combinedStyle = StyleSheet.compose(styles.base, styles.bold)

const App: React.FC = () => {
  return (
    <SafeAreaView style={combinedStyle}>
      <Text>This is bold text with base styles.</Text>
    </SafeAreaView>
  )
}

export default App
