import { Text } from "react-native"

type ListItemProps = {
  name: string
}

const ListItem: React.FC<ListItemProps> = ({ name }) => {
  return <Text>{name}</Text>
}

export default ListItem
