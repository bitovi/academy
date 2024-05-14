import { StyleSheet, Text } from "react-native"

export interface ListItemProps {
  name: string
}

const ListItem: React.FC<ListItemProps> = ({ name }) => {
  return <Text style={styles.text}>{name}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    color: "#ffffff",
    backgroundColor: "#007980",
    padding: 16,
    marginVertical: 8,
  },
})

export default ListItem
