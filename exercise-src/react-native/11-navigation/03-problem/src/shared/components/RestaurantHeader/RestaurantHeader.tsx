import Box from "@shared/design/Box"
import { Theme, useTheme } from "@shared/design/theme"
import Typography from "@shared/design/Typography"
import { ImageBackground, StyleSheet } from "react-native"

export interface RestaurantHeaderProps {
  restaurant?: {
    _id: string
    address?: {
      city: string
      state: string
      street: string
      zip: string
    }
    images: {
      banner: string
    }
    name: string
    slug: string
  }
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <Box>
      <ImageBackground
        style={styles.heroBackground}
        source={{ uri: restaurant?.images.banner }}
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

function getStyles(theme: Theme) {
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
