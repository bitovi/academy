import AsyncStorage from "@react-native-async-storage/async-storage"

export async function clearStorage() {
  try {
    await AsyncStorage.clear()
    console.info("Storage successfully cleared!")
  } catch (error) {
    console.error("Failed to clear the storage", error)
  }
}
