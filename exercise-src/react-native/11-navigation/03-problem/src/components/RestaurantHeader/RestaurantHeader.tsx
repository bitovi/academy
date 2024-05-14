import { TextStyle, ViewStyle, ImageBackground, StyleSheet } from "react-native"

import Box from "../../design/Box"
import { Theme, useTheme } from "../../design/theme"
import Typography from "../../design/Typography"
import { Restaurant } from "../../services/pmo/restaurant"

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
