import type { FC } from "react"
import type { PressableProps, ViewStyle, TextStyle } from "react-native"
import type { Theme } from "../theme"

import { StyleSheet, Pressable, Text } from "react-native"

import { useTheme } from "../theme"

type Variant = "primary" | "secondary" | "outline"

export interface ButtonProps extends PressableProps {
  variant?: Variant
  margin?: keyof Theme["spacing"]
  padding?: keyof Theme["spacing"]
  fontSize?: TextStyle["fontSize"]
  fontWeight?: TextStyle["fontWeight"]
  disabled?: boolean
  children: string
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  margin,
  padding,
  fontSize = 20,
  fontWeight = "400",
  disabled,
  children,
  ...props
}) => {
  const theme = useTheme()
  const styles = getStyles(theme, variant)

  return (
    <Pressable
      style={StyleSheet.compose(styles.pressable, {
        ...(margin ? { margin: theme.spacing[margin] } : {}),
        ...(padding ? { padding: theme.spacing[padding] } : {}),
        opacity: disabled ? 0.5 : 1,
      })}
      disabled={disabled}
      {...props}
    >
      <Text
        style={StyleSheet.compose(styles.text, {
          fontSize,
          fontWeight,
        })}
      >
        {children}
      </Text>
    </Pressable>
  )
}

export default Button

function getStyles(
  theme: Theme,
  variant: Variant,
): {
  pressable: ViewStyle
  text: TextStyle
} {
  if (variant === "primary") {
    return StyleSheet.create({
      pressable: {
        margin: theme.spacing.s,
        padding: theme.spacing.m,
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main,
      },
      text: {
        fontSize: 21,
        color: theme.palette.primary.contrast,
      },
    })
  }

  if (variant === "secondary") {
    return StyleSheet.create({
      pressable: {
        margin: theme.spacing.s,
        padding: theme.spacing.m,
        borderRadius: 5,
        backgroundColor: theme.palette.secondary.main,
      },
      text: {
        fontSize: 21,
        color: theme.palette.secondary.contrast,
      },
    })
  }

  if (variant === "outline") {
    return StyleSheet.create({
      pressable: {
        margin: theme.spacing.s,
        padding: theme.spacing.m - 1,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: theme.palette.screen.main,
        borderColor: theme.palette.screen.contrast,
      },
      text: {
        fontSize: 21,
        color: theme.palette.screen.contrast,
      },
    })
  }

  throw new Error(`Button: Unknown variant: ${variant}`)
}
