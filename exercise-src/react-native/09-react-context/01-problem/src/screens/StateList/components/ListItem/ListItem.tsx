import { StyleSheet, Text } from "react-native"

import { Theme, useTheme } from "../../../../design/theme"

type ListItemProps = {
  name: string
}

const ListItem: React.FC<ListItemProps> = ({ name }) => {
  const styles = getStyles(theme)

  return <Text style={styles.text}>{name}</Text>
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    text: {
      fontSize: 21,
      color: "#ffffff",
      backgroundColor: "#007980",
      padding: 16,
      marginVertical: 8,
    },
  })
}

export default ListItem
