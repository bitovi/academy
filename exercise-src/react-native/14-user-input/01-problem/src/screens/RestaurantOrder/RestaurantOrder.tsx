import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useEffect, useState } from "react"
import { ScrollView } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import FormSwitch from "../../components/FormSwitch"
import Loading from "../../components/Loading"
import Box from "../../design/Box"
import Button from "../../design/Button"
import Card from "../../design/Card"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import { useRestaurant } from "../../services/pmo/restaurant"

export interface RestaurantOrderProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantOrder"> {}

type OrderItems = Record<string, number>

const RestaurantOrder: React.FC<RestaurantOrderProps> = ({ route }) => {
  const navigation = useNavigation()
  const { slug } = route.params

  const { data: restaurant, error, isPending } = useRestaurant({ slug })

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `Order from ${restaurant.name}` })
    }
  }, [restaurant, navigation])

  const handleOrder = () => {
    console.info("“Place My Order” button pressed!")
  }

  const subtotal = 0 // Exercise: Use calculateTotal here.

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">
          Error loading restaurant order:{" "}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  if (!restaurant) {
    return (
      <Box padding="s">
        <Typography variant="heading">Restaurant not found</Typography>
      </Box>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <Screen>
        <Card title="Lunch Menu">
          {/* Exercise: List food items with checkboxes. */}
        </Card>

        <Card title="Dinner Menu">
          {/* Exercise: List food items with checkboxes. */}
        </Card>

        <Card title="Order Details"></Card>

        <Box padding="s">
          {subtotal === 0 && <Typography>Please choose an item.</Typography>}
        </Box>

        <Box padding="s">
          <Typography variant="heading">
            Total: ${subtotal.toFixed(2)}
          </Typography>
        </Box>

        <Box padding="s">
          <Button onPress={handleOrder}>Place My Order!</Button>
        </Box>
      </Screen>
    </ScrollView>
  )
}

function calculateTotal(items: OrderItems) {
  return Object.values(items).reduce((total, itemPrice) => {
    return total + itemPrice
  }, 0)
}

export default RestaurantOrder