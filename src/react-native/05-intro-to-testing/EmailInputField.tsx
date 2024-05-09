const EmailInputField: FC<Props> = ({ label, value }) => {
  const [formValue, setFormValue] = useState(value)

  return (
    <Box>
      <Text nativeID="formLabel">
        {label}:
      </Text>
      <TextInput
        accessibilityLabel="input"
        accessibilityLabelledBy="formLabel"
        value={formValue}
        onChangeText={setFormValue}
      />
    </Box>
  )
}

const content = (
  <EmailInputField label="Email" value="test@example.com" />
)