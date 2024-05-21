import { useNavigation } from "@react-navigation/native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

import { Restaurant } from "../../../../services/pmo/restaurant"

export interface MapProps {
  restaurants: Restaurant[]
}

const Map: React.FC<MapProps> = ({ restaurants }) => {
  return (
    <MapView
      style={{ minHeight: "100%", height: 500 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        ...restaurants?.[0].coordinate,
        latitudeDelta: 0.27,
        longitudeDelta: 0.5,
      }}
      loadingEnabled
    >
      {/* Exercise: Using the restaurants property, create a Marker for each restaurant. */}
    </MapView>
  )
}

export default Map
