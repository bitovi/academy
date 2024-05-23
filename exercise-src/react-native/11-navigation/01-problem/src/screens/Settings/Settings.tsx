import { StyleSheet, Switch, View } from "react-native"

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
