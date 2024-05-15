import { StyleSheet, Text } from "react-native"

export interface ListItemProps {
  name: string
}

const ListItem: React.FC<ListItemProps> = ({ name }) => {
  return <Text>{name}</Text>
}

export default ListItem
