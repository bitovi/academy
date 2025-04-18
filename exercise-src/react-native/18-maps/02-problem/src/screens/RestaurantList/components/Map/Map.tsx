import { useNavigation } from "@react-navigation/native"
import { Restaurant } from "@shared/services/pmo/restaurant"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

export interface MapProps {
  restaurants: Restaurant[]
}

const Map: React.FC<MapProps> = ({ restaurants }) => {
  return (
    <MapView
      style={{ minHeight: "100%" }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        ...restaurants[0].coordinate,
        latitudeDelta: 0.27,
        longitudeDelta: 0.5,
      }}
      loadingEnabled
    >
      {/* Exercise: Using the restaurants prop, create a Marker for each restaurant. */}
    </MapView>
  )
}

export default Map
