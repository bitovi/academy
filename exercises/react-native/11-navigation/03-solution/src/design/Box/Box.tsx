import type { FC } from "react"
import type { ViewProps, ViewStyle } from "react-native"
import type { Theme, ThemeMargin, ThemePadding } from "../theme"

import { StyleSheet, View } from "react-native"

import { useTheme } from "../theme"

export interface BoxProps extends ViewProps {
  margin?: ThemeMargin
  padding?: ThemePadding
  fullWidth?: boolean
}

const Box: FC<BoxProps> = ({
  margin,
  padding,
  fullWidth = false,
  style,
  children,
  ...props
}) => {
  const theme = useTheme()
  const styles = getStyles(theme, { margin, padding, fullWidth })

  return (
    <View style={StyleSheet.compose(styles.container, style)} {...props}>
      {children}
    </View>
  )
}

export default Box

function getStyles(
  theme: Theme,
  {
    margin,
    padding,
    fullWidth,
  }: {
    margin?: ThemeMargin
    padding?: ThemePadding
    fullWidth: boolean
  },
): {
  container: ViewStyle
} {
  return StyleSheet.create({
    container: StyleSheet.flatten([
      {
        display: "flex",
      },
      typeof margin === "string" && { margin: theme.spacing[margin] },
      Array.isArray(margin) && {
        marginVertical: theme.spacing[margin[0]],
        marginHorizontal: theme.spacing[margin[1]],
      },
      typeof padding === "string" && { padding: theme.spacing[padding] },
      Array.isArray(padding) && {
        paddingVertical: theme.spacing[padding[0]],
        paddingHorizontal: theme.spacing[padding[1]],
      },
      fullWidth && { width: "100%" },
    ]),
  })
}
