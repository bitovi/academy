interface SubmitButtonProps {
  label: string
  onPress: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, onPress }) => {
  return <button onPress={onPress}>{label}</button>
}
