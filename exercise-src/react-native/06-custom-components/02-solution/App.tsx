import { SafeAreaView, ScrollView, Text, View } from "react-native"

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
    <ScrollView>
      <View>
        <Text>Place My Order: Coming Soon!</Text>
      </View>
      <View>
        {states?.length ? (
          states.map((state) => (
            <ListItem key={state.short} name={state.name} />
          ))
        ) : (
          <Text>No states found</Text>
        )}
      </View>
    </ScrollView>
  )
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <StateList />
    </SafeAreaView>
  )
}

export default App
