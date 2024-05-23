import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { FC } from "react"
import { StyleSheet, Switch, View } from "react-native"

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
        <Typography variant="heading"></Typography>
      </Card>
      <Card>
        <View style={styles.row}>
          <Typography variant="heading">Dark mode</Typography>
          <Switch
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            value={mode === "dark"}
          />
        </View>
      </Card>
    </Screen>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export default Settings
