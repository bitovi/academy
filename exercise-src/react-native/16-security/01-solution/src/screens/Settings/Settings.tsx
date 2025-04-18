import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import Loading from "@shared/components/Loading"
import Button from "@shared/design/Button"
import Card from "@shared/design/Card"
import Screen from "@shared/design/Screen"
import { useThemeMode } from "@shared/design/theme"
import Typography from "@shared/design/Typography"
import { useAuthentication, useUser } from "@shared/services/auth"
import { StyleSheet, Switch, View } from "react-native"

const Settings: React.FC = () => {
  const { error, isPending, signIn, signOut } = useAuthentication()
  const user = useUser()
  const { mode, setMode } = useThemeMode()

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
