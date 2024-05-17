import { useNavigation } from "@react-navigation/native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

import { Restaurant, State, City } from "../../../../services/pmo/restaurant"

export interface MapProps {
  restaurants: Restaurant[]
  state: State
  city: City
}

const Map: React.FC<MapProps> = ({ restaurants, state, city }) => {
  const navigation = useNavigation()

  return (
    <MapView
      // needs a minHeight to display without error
      style={{ minHeight: "100%", height: 500 }}
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
              state: state,
              city: city,
              slug: restaurant.slug,
            })
          }
        />
      ))}
    </MapView>
  )
}

export default Map
