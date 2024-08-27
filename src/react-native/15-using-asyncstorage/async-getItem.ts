import AsyncStorage from "@react-native-async-storage/async-storage"

export async function loadProfileData() {
  try {
    const serializedData = await AsyncStorage.getItem("profileData")
    return serializedData ? JSON.parse(serializedData) : null
  } catch (error) {
    console.error("Failed to load data", error)
  }
}
