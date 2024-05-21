import { StyleSheet, Text } from "react-native"

export interface ListItemProps {
  name: string
}

const ListItem: React.FC<ListItemProps> = ({ name }) => {
  // Exercise: Apply the given CSS styles to the `Text` view inside the `ListItem`.
  return <Text>{name}</Text>
}

export default ListItem
