import type { FC } from "react"
import { Text } from "react-native"

type ListItemProps = {
  name: string
}

const ListItem: FC<ListItemProps> = ({ name }) => {
  return <Text>{name}</Text>
}

export default ListItem
