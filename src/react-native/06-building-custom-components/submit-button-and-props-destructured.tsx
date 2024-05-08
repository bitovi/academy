import type { FC } from "react"
import { Pressable, Text } from "react-native"

interface SubmitButtonProps {
  label: string
  onPress: () => void
}

const SubmitButton: FC<SubmitButtonProps> = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text>
        {label}
      </Text>
    </Pressable>
  )
}
