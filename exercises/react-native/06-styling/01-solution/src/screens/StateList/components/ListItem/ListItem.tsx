import type { FC } from "react"
import { StyleSheet, Text } from "react-native"

type ListItemProps = {
  name: string
}

const ListItem: FC<ListItemProps> = ({ name }) => {
  return <Text style={styles.text}>{name}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    color: "white",
    backgroundColor: "darkgreen",
    padding: 10,
    marginVertical: 5,
  },
})

export default ListItem
