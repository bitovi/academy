import { Switch } from "react-native"

import Card from "../../design/Card"
import Screen from "../../design/Screen"
import { useThemeMode } from "../../design/theme"
import Typography from "../../design/Typography"

const user = {
  name: "Your Name",
}

const Settings: React.FC = () => {
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
