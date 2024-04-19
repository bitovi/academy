import type { FC } from "react"

import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import Card from "../../design/Card"

const user = {
  name: "Your Name",
}

const Settings: FC = () => {
  return (
    <Screen>
      <Card>
        <Typography variant="heading">Welcome back, {user.name}</Typography>
      </Card>
    </Screen>
  )
}

export default Settings
