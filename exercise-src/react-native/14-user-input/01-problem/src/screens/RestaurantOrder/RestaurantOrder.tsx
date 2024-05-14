import type { FC } from "react"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RestaurantsStackParamList } from "../../App"

import { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useRestaurant } from "../../services/pmo/restaurant"
import Box from "../../design/Box"
import Typography from "../../design/Typography"
import Button from "../../design/Button"
import Loading from "../../components/Loading"
import Card from "../../design/Card"
import Screen from "../../design/Screen"
import FormSwitch from "../../components/FormSwitch"

type Props = StackScreenProps<RestaurantsStackParamList, "OrderCreate">

type OrderItems = Record<string, number>

const RestaurantOrder: FC<Props> = ({ route }) => {
  const navigation = useNavigation()
  const { slug } = route.params

  const { data: restaurant, error, isPending } = useRestaurant(slug)

  const [items, setItems] = useState<OrderItems>({})

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `Order from ${restaurant.name}` })
    }
  }, [restaurant, navigation])

  const handleSubmit = () => {
    alert("Order submitted!")
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

  function calculateTotal(items: OrderItems) {
    /*Exercise: Create subtotal based on selected items */
  }

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
          {/*Exercise: List food items with checkboxes */}
        </Card>

        <Card title="Dinner Menu">
          {/*Exercise: List food items with checkboxes */}
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
          <Typography variant="heading">
            Total: ${subtotal.toFixed(2)}
          </Typography>
        </Box>

        <Box padding="s">
          <Button onPress={handleSubmit}>Place My Order!</Button>
        </Box>
      </Screen>
    </ScrollView>
  )
}

export default RestaurantOrder
