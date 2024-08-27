import { ActivityIndicator } from "react-native"

import Box from "../../design/Box"
import { useTheme } from "../../design/theme"
import Typography from "../../design/Typography"

const Loading: React.FC = () => {
  const theme = useTheme()

  return (
    <Box padding="l">
      <ActivityIndicator size="large" color={theme.palette.primary.main} />
      <Typography variant="body" style={{ textAlign: "center", marginTop: 8 }}>
        Loading…
      </Typography>
    </Box>
  )
}

export default Loading
