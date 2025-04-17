import AsyncStorage from "@react-native-async-storage/async-storage"

export const getData = async <T>(key: string): Promise<T | undefined> => {
  const value = await AsyncStorage.getItem(key)
  const jsonValue = value ? JSON.parse(value) : undefined
  return jsonValue
}

export const getAllKeys = (): Promise<readonly string[]> => {
  return AsyncStorage.getAllKeys()
}

export const storeData = <T>(key: string, value: T): Promise<void> => {
  const jsonValue = JSON.stringify(value)
  return AsyncStorage.setItem(key, jsonValue)
}

export const clearStorage = (): Promise<void> => {
  return AsyncStorage.clear()
}
