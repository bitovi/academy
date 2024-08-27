import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { StyleSheet, Switch, View } from "react-native"

import Loading from "../../components/Loading"
import Button from "../../design/Button"
import Card from "../../design/Card"
import Screen from "../../design/Screen"
import { useThemeMode } from "../../design/theme"
import Typography from "../../design/Typography"
import { useAuthentication, useUser } from "../../services/auth"

const Settings: React.FC = () => {
  // Exercise: use the Hooks from the Auth service to get: error, isPending, signIn, signOut.
  const { mode, setMode } = useThemeMode()

  return (
    <Screen>
      <Card>
        {/*
          Exercise:
          - If the user is logged out: Render a button using the GoogleSigninButton.
          - If the user is logged in: Render a button using the signOut callback along with a welcome message.
          - If the Hook isPending: Render the Loading view.
          - If the Hook has an error: Render the error message.
        */}
        <Typography variant="heading"></Typography>
      </Card>
      <Card>
        <View style={styles.row}>
          <Typography variant="heading">Dark mode</Typography>
          <Switch
            onValueChange={(value) => setMode(value ? "dark" : "light")}
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
