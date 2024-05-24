import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useEffect, useState } from "react"

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

  const [items, setItems] = useState<OrderItems>({})

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `Order from ${restaurant.name}` })
    }
  }, [restaurant, navigation])

  const handleOrder = () => {
    // eslint-disable-next-line no-console
    console.info("“Place My Order” button pressed!")
  }

  const setItem = (itemId: string, isChecked: boolean, itemPrice: number) => {
    return setItems((currentItems) => {
      const updatedItems = {
        ...currentItems,
      }
      if (isChecked) {
        updatedItems[itemId] = itemPrice
      } else {
        delete updatedItems[itemId]
      }
      return updatedItems
    })
  }

  const selectedCount = Object.values(items).length
  const subtotal = calculateTotal(items)

  if (error) {
    return (
      <Screen>
        <Typography variant="heading">
          Error loading restaurant order:{" "}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Screen>
    )
  }

  if (isPending) {
    return <Loading />
  }

  if (!restaurant) {
    return (
      <Screen>
        <Typography variant="heading">Restaurant not found</Typography>
      </Screen>
    )
  }

  return (
    <Screen>
      <Card title="Lunch Menu">
        {restaurant.menu.lunch.map(({ name, price }) => (
          <FormSwitch
            key={name}
            label={`${name} ($${price})`}
            onChange={(value) => setItem(name, value, price)}
            value={name in items}
          />
        ))}
      </Card>

      <Card title="Dinner Menu">
        {restaurant.menu.dinner.map(({ name, price }) => (
          <FormSwitch
            key={name}
            label={`${name} ($${price})`}
            onChange={(value) => setItem(name, value, price)}
            value={name in items}
          />
        ))}
      </Card>

      <Card title="Order Details"></Card>

      <Box padding="s">
        {subtotal === 0 ? (
          <Typography>Please choose an item.</Typography>
        ) : (
          <Typography>{selectedCount} items selected.</Typography>
        )}
      </Box>

      <Box padding="s">
        <Typography variant="heading">Total: ${subtotal.toFixed(2)}</Typography>
      </Box>

      <Box padding="s">
        <Button onPress={handleOrder}>Place My Order!</Button>
      </Box>
    </Screen>
  )
}

function calculateTotal(items: OrderItems) {
  return Object.values(items).reduce((total, itemPrice) => {
    return total + itemPrice
  }, 0)
}

export default RestaurantOrder
