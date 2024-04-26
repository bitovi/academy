import type { FC } from "react"
import { useId } from "react"
import { TextInput } from "react-native"
import Box from "../../design/Box"
import { useTheme } from "../../design/theme"
import Typography from "../../design/Typography"

type Props = {
  label: string
  placeholder?: string
  type?: "text"
  value: string
  onChange?: (value: string) => void
}

const FormTextField: FC<Props> = ({ label, placeholder, value, onChange }) => {
  const id = useId()
  const theme = useTheme()

  return (
    <Box style={{ marginVertical: 8 }}>
      <Typography nativeID={id} variant="label">
        {label}
      </Typography>
      <TextInput
        accessibilityLabel="input"
        accessibilityLabelledBy={id}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        style={{
          flex: 1,
          paddingVertical: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.palette.screen.contrast,
          color: theme.palette.screen.contrast,
        }}
      />
    </Box>
  )
}

export default FormTextField
