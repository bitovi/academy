import type { FC } from "react"
import { Text } from "react-native"
import { useTheme } from "../../../../design/theme"

type ListItemProps = {
  name: string
}

const ListItem: FC<ListItemProps> = ({ name }) => {
  const theme = useTheme()
  return (
    <Text
      style={{
        fontSize: theme.typography.title.fontSize,
        color: theme.palette.primary.contrast,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing.m,
        marginVertical: theme.spacing.s,
      }}
    >
      {name}
    </Text>
  )
}

export default ListItem
