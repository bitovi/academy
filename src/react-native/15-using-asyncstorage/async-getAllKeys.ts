import AsyncStorage from "@react-native-async-storage/async-storage"

export async function listAllKeys() {
  try {
    const keys = await AsyncStorage.getAllKeys()
    console.info("Stored keys:", keys)
  } catch (error) {
    console.error("Failed to fetch keys", error)
  }
}
