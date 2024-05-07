import type { FC } from "react"
import type { TextProps, TextStyle } from "react-native"
import type { Theme } from "../theme"

import { Text, StyleSheet } from "react-native"

import { useTheme } from "../theme"

export interface TypographyProps extends TextProps {
  variant?: keyof Theme["typography"]
}

const Typography: FC<TypographyProps> = ({
  style,
  variant = "body",
  children,
  ...props
}) => {}

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