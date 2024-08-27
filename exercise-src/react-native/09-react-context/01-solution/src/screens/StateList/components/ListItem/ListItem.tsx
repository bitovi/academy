import { StyleSheet, Text } from "react-native"

import { Theme, useTheme } from "../../../../design/theme"

export interface ListItemProps {
  name: string
}

const ListItem: React.FC<ListItemProps> = ({ name }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return <Text style={styles.text}>{name}</Text>
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    text: {
      fontSize: theme.typography.title.fontSize,
      color: theme.palette.primary.contrast,
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing.m,
      marginVertical: theme.spacing.s,
    },
  })
}

export default ListItem
