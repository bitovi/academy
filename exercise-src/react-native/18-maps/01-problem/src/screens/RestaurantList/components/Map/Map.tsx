import { Restaurant } from "@shared/services/pmo/restaurant"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"

export interface MapProps {
  restaurants: Restaurant[]
}

const Map: React.FC<MapProps> = ({ restaurants }) => {
  // Exercise: Implement MapView to accept an initialRegion based on the coordinates of one of the restaurants passed.
}

export default Map
