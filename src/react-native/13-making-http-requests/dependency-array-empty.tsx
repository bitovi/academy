import { useEffect, useState } from "react"
import { View, Text } from "react-native"

const GeolocationComponent: React.FC = () => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    // Effect callback function
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords)
      },
      (error) => {
        console.error(error)
      },
    )
  }, []) // Dependency array

  return (
    <View>
      {location ? (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text>Requesting location…</Text>
      )}
    </View>
  )
}

export default GeolocationComponent
