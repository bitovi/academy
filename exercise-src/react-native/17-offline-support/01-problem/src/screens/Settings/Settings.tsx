import { useNetInfo } from "@react-native-community/netinfo"
import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { StyleSheet, Switch, View } from "react-native"

import Button from "../../design/Button"
import Card from "../../design/Card"
import Screen from "../../design/Screen"
import { useThemeMode } from "../../design/theme"
import Typography from "../../design/Typography"
import { useAuthentication, useUser } from "../../services/auth"

const Settings: React.FC = () => {
  const { signIn, signOut } = useAuthentication()
  const user = useUser()
  const { mode, setMode } = useThemeMode()
  // Exercise: Get the current connection state with the `useNetInfo()` Hook.

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
        <View style={styles.row}>
          <Typography variant="heading">Dark mode</Typography>
          <Switch
            onValueChange={(value) => setMode(value ? "dark" : "light")}
            value={mode === "dark"}
          />
        </View>
      </Card>
      {/* Exercise: Display the connection state in the Settings view. */}
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
