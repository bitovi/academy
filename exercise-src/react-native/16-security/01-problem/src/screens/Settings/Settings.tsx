import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { FC } from "react"
import { Switch } from "react-native"

import Button from "../../design/Button"
import Card from "../../design/Card"
import Screen from "../../design/Screen"
import { useThemeMode } from "../../design/theme"
import Typography from "../../design/Typography"
import { useAuthentication, useUser } from "../../services/auth"

const Settings: FC = () => {
  // Exercise: use the hooks from auth service to grab the 'user' state, and 'signIn' and 'signOut' callbacks.
  const { mode, setMode } = useThemeMode()

  return (
    <Screen>
      <Card>
        {/* Exercise: If the user is logged in: Render a button using the signOut callback along with a welcome message.
         If the user is logged in: Exercise: Render a button using the GoogleSigninButton. */}
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
