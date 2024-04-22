import type { FC } from "react"
import type { ViewStyle } from "react-native"
import type { Theme } from "../theme"
import type { BoxProps } from "../Box"

import { StyleSheet } from "react-native"

import { useTheme } from "../theme"
import Box from "../Box"
import Typography from "../Typography"

export interface CardProps extends BoxProps {
  title?: string
}

const Card: FC<CardProps> = ({ title, children, ...props }) => {
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

function getStyles(theme: Theme): {
  container: ViewStyle
  title: ViewStyle
} {
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
