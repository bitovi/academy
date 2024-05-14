import { useId } from "react"
import { TextInput } from "react-native"

import Box from "../../design/Box"
import { useTheme } from "../../design/theme"
import Typography from "../../design/Typography"

type Props = {
  label: string
  type?: "text"
  value: string
  onChange?: (value: string) => void
}

const FormTextField: React.FC<Props> = ({ label, value, onChange }) => {
  const id = useId()
  const theme = useTheme()

  return (
    <Box style={{ marginVertical: 8 }}>
      {/* Exercise: Create Text Label and update TextInput to work with label. */}
      <TextInput
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
