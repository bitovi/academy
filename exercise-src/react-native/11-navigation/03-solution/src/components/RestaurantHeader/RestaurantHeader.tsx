import type { Theme } from "../../design/theme"
import type { Restaurant } from "../../services/pmo/restaurant"
import type { TextStyle, ViewStyle } from "react-native"

import { ImageBackground, StyleSheet } from "react-native"
import Typography from "../../design/Typography"
import Box from "../../design/Box"
import { useTheme } from "../../design/theme"

const assetsUrl = process.env.PMO_ASSETS

type Props = {
  restaurant: Restaurant | null
}

const RestaurantHeader: React.FC<Props> = ({ restaurant }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <Box>
      <ImageBackground
        style={styles.heroBackground}
        source={{ uri: `${assetsUrl}/${restaurant?.images.banner}` }}
      >
        <Box padding={["xs", "m"]} margin={["s", "none"]} style={styles.hero}>
          <Typography variant="heading" style={styles.heroText}>
            {restaurant?.name}
          </Typography>
        </Box>
      </ImageBackground>

      <Box padding="m">
        {restaurant?.address && (
          <Typography variant="body">
            {restaurant.address.street}
            {restaurant.address.city}, {restaurant.address.state}{" "}
            {restaurant.address.zip}
          </Typography>
        )}

        <Typography variant="body">
          $$$ Hours: M-F 10am-11pm Open Now
        </Typography>
      </Box>
    </Box>
  )
}

function getStyles(theme: Theme): {
  heroBackground: ViewStyle
  hero: ViewStyle
  heroText: TextStyle
} {
  return StyleSheet.create({
    heroBackground: {
      width: "100%",
      maxWidth: 768,
      height: 180,
      margin: "auto",
      justifyContent: "flex-end",
      alignItems: "flex-start",
    },
    hero: {
      backgroundColor: theme.palette.secondary.main + "bb",
    },
    heroText: {
      color: theme.palette.secondary.contrast,
      fontSize: 32,
    },
  })
}

export default RestaurantHeader
