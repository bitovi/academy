import { useId } from "react"
import { Switch } from "react-native"

import Box from "../../design/Box"
import { useTheme } from "../../design/theme"
import Typography from "../../design/Typography"

export interface FormSwitchProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

const FormSwitch: React.FC<FormSwitchProps> = ({ label, value, onChange }) => {
  const theme = useTheme()

  return (
    <Box
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <Typography variant="label">{label}</Typography>
      <Switch
        onValueChange={onChange}
        thumbColor={theme.palette.primary.contrast}
        trackColor={{
          true: theme.palette.primary.strong,
          false: theme.palette.screen.soft,
        }}
        value={value}
      ></Switch>
    </Box>
  )
}

export default FormSwitch
