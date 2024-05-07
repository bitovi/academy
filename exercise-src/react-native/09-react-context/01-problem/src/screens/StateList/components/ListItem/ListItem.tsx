import type { FC } from "react"
import type { Theme } from "../../../../design/theme"

import { StyleSheet, Text } from "react-native"
import { useTheme } from "../../../../design/theme"

type ListItemProps = {
  name: string
}

const ListItem: FC<ListItemProps> = ({ name }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return <Text style={styles.text}>{name}</Text>
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    text: {
      fontSize: 21,
      color: "white",
      backgroundColor: "darkgreen",
      padding: 10,
      marginVertical: 5,
    },
  })
}

export default ListItem
