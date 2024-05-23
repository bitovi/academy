import { StyleSheet } from "react-native"

import Box, { BoxProps } from "../Box"
import { Theme, useTheme } from "../theme"
import Typography from "../Typography"

export interface CardProps extends BoxProps {
  title?: string
}

const Card: React.FC<CardProps> = ({ title, children, ...props }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <Box margin={["m", "none"]} style={styles.container} {...props}>
      {title && (
        <Box padding="m" style={styles.title}>
          <Typography variant="title">{title}</Typography>
        </Box>
      )}

      <Box padding="m">{children}</Box>
    </Box>
  )
}

export default Card

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      width: "100%",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,

      backgroundColor: theme.palette.screen.main,
      shadowColor: theme.palette.screen.contrast,
    },
    title: {
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.screen.contrast,
    },
  })
}
