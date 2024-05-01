import type { FC, ReactNode } from "react"
import { Switch } from "react-native"
import Box from "../../design/Box"
import Typography from "../../design/Typography"
import { useTheme } from "../../design/theme"

type Props = {
  label: ReactNode
  value: boolean
  onChange: (value: boolean) => void
}

const FormSwitch: FC<Props> = ({ label, value, onChange }) => {
  const { palette } = useTheme()

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
        value={value}
        onValueChange={onChange}
        thumbColor={palette.primary.contrast}
        trackColor={{
          true: palette.primary.strong,
          false: palette.screen.soft,
        }}
      ></Switch>
    </Box>
  )
}

export default FormSwitch
