import type { FC } from "react"
import { Switch } from "react-native"

import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import Card from "../../design/Card"
import { useThemeMode } from "../../design/theme"

const user = {
  name: "Your Name",
}

const Settings: FC = () => {
  const { mode, setMode } = useThemeMode()

  return (
    <Screen>
      <Card>
        <Typography variant="heading">Welcome back, {user.name}</Typography>
      </Card>
      <Card>
        <Typography variant="heading">Dark Mode</Typography>
        <Switch
          value={mode === "dark"}
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
        />
      </Card>
    </Screen>
  )
}

export default Settings
