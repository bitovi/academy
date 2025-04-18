import Card from "@shared/design/Card"
import Screen from "@shared/design/Screen"
import { useThemeMode } from "@shared/design/theme"
import Typography from "@shared/design/Typography"
import { StyleSheet, Switch, View } from "react-native"

const user = {
  name: "Your Name",
}

const Settings: React.FC = () => {
  const { mode, setMode } = useThemeMode()

  return (
    <Screen>
      <Card>
        <Typography variant="heading">Welcome back</Typography>
        <Typography variant="body">{user.name || "Unknown name"}</Typography>
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
