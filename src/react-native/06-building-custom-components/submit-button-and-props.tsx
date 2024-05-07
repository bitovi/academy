interface SubmitButtonProps {
  label: string
  onPress: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { label, onPress } = props
  return <Pressable onPress={onPress}>{label}</Pressable>
}
