import {
  ViewProps,
  StyleSheet,
  ScrollView,
  View as StaticView,
} from "react-native"

import { Theme, ThemeMargin, ThemePadding, useTheme } from "../theme"

export interface BoxProps extends ViewProps {
  scrollable?: boolean
  margin?: ThemeMargin
  padding?: ThemePadding
}

const Box: React.FC<BoxProps> = ({
  scrollable = false,
  margin,
  padding,
  style,
  children,
  ...props
}) => {
  const theme = useTheme()
  const styles = getStyles(theme, { margin, padding })

  const View = scrollable ? ScrollView : StaticView

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
  }: {
    margin?: ThemeMargin
    padding?: ThemePadding
  },
) {
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
    ]),
  })
}
