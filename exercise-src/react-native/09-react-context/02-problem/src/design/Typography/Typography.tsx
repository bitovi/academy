import { TextProps, Text, StyleSheet } from "react-native"

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
  // Exercise: Finish the Typography component using the same patterns used on the 'Box' component.
}

export default Typography

function getStyles(theme: Theme, variant: keyof Theme["typography"]) {
  return StyleSheet.create({
    text: {
      ...theme.typography[variant],
      color: theme.palette.screen.contrast,
    },
  })
}
