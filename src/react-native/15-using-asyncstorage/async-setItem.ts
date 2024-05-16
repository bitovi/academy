import AsyncStorage from "@react-native-async-storage/async-storage"

export async function saveProfileData(profile) {
  try {
    const serializedData = JSON.stringify(profile)
    await AsyncStorage.setItem("profileData", serializedData)
  } catch (error) {
    console.error("Failed to save data", error)
  }
}
