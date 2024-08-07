import { useNetInfo } from "@react-native-community/netinfo"
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
  const { error, isPending, signIn, signOut } = useAuthentication()
  const user = useUser()
  const { mode, setMode } = useThemeMode()
  // Exercise: Get the current connection state with the `useNetInfo()` Hook.

  return (
    <Screen>
      <Card>
        {isPending ? (
          <Loading />
        ) : user ? (
          <>
            <Typography variant="heading">Welcome back</Typography>
            <Typography variant="body">
              {user.name || "Unknown name"}
            </Typography>
            <Button onPress={signOut}>Sign out</Button>
            {error ? (
              <Typography variant="body">Error: {error.message}</Typography>
            ) : null}
          </>
        ) : (
          <>
            <GoogleSigninButton onPress={signIn} style={{ width: "100%" }} />
            {error ? (
              <Typography variant="body">Error: {error.message}</Typography>
            ) : null}
          </>
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
