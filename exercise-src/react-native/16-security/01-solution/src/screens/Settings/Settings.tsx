import type { FC } from "react"

import { GoogleSigninButton } from "@react-native-google-signin/google-signin"

import { useAuthentication, useUser } from "../../services/auth"
import Button from "../../design/Button"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import Card from "../../design/Card"
import FormSwitch from "../../components/FormSwitch"
import { useThemeMode } from "../../design/theme"

const Settings: FC = () => {
  const { signIn, signOut } = useAuthentication()
  const user = useUser()
  const { mode, setMode } = useThemeMode()

  return (
    <Screen>
      <Card>
        {user ? (
          <>
            <Typography variant="heading">Welcome back, {user.name}</Typography>
            <Button onPress={signOut}>Sign Out</Button>
          </>
        ) : (
          <GoogleSigninButton onPress={signIn} style={{ width: "100%" }} />
        )}
      </Card>

      <Card>
        <FormSwitch
          label="Dark Mode"
          value={mode === "dark"}
          onChange={(value) => setMode(value ? "dark" : "light")}
        />
      </Card>
    </Screen>
  )
}

export default Settings