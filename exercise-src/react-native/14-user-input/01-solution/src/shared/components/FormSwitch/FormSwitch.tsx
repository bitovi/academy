import Box from "@shared/design/Box"
import { useTheme } from "@shared/design/theme"
import Typography from "@shared/design/Typography"
import { Switch } from "react-native"

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
        value={value}
        thumbColor={theme.palette.primary.contrast}
        trackColor={{
          true: theme.palette.primary.strong,
          false: theme.palette.screen.soft,
        }}
      ></Switch>
    </Box>
  )
}

export default FormSwitch
