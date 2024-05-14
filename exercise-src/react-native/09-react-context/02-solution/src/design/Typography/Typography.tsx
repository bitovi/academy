import { TextProps, TextStyle, Text, StyleSheet } from "react-native"

import { Theme, useTheme } from "../theme"

export interface TypographyProps extends TextProps {
  variant?: keyof Theme["typography"]
}

const Typography: React.FC<TypographyProps> = ({
  style,
  variant = "body",
  children,
  ...props
}) => {
  const theme = useTheme()
  const styles = getStyles(theme, variant)

  return (
    <Text style={StyleSheet.compose(styles.text, style)} {...props}>
      {children}
    </Text>
  )
}

export default Typography

function getStyles(
  theme: Theme,
  variant: keyof Theme["typography"],
): {
  text: TextStyle
} {
  return StyleSheet.create({
    text: {
      ...theme.typography[variant],
      color: theme.palette.screen.contrast,
    },
  })
}
