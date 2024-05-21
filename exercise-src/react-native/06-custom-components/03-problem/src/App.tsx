import { SafeAreaView, ScrollView, Text, View } from "react-native"
// Exercise: Make sure to properly update each `import` and to reference every component’s essential files.

const states = [
  {
    name: "Illinois",
    short: "IL",
  },
  {
    name: "Wisconsin",
    short: "WI",
  },
]

export interface ListItemProps {
  name: string
}

export const ListItem: React.FC<ListItemProps> = ({ name }) => {
  return <Text>{name}</Text>
}

export const StateList: React.FC = () => {
  return (
    <View>
      {states?.length ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Text>No states found</Text>
      )}
    </View>
  )
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StateList />
    </SafeAreaView>
  )
}

export default App
