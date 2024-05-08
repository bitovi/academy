import type { FC } from "react"
import { StyleSheet, Text } from "react-native"

type ListItemProps = {
  name: string
}

const ListItem: FC<ListItemProps> = ({ name }) => {
  return <Text>{name}</Text>
}

export default ListItem
