import { useNavigation } from "@react-navigation/native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

import { Restaurant } from "../../../../services/pmo/restaurant"

export interface MapProps {
  restaurants: Restaurant[]
}

const Map: React.FC<MapProps> = ({ restaurants }) => {
  const navigation = useNavigation()

  return (
    <MapView
      // needs a minHeight to display without error
      style={{ minHeight: "100%" }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        ...restaurants[0].coordinate,
        latitudeDelta: 0.27,
        longitudeDelta: 0.5,
      }}
      loadingEnabled
    >
      {restaurants.map((restaurant, index) => (
        <Marker
          key={index}
          coordinate={restaurant.coordinate}
          title={restaurant.name}
          description={restaurant.address?.street}
          onCalloutPress={() =>
            navigation.navigate("RestaurantDetails", {
              state: restaurant.state,
              city: restaurant.city,
              slug: restaurant.slug,
            })
          }
        />
      ))}
    </MapView>
  )
}

export default Map
