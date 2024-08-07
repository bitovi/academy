import AsyncStorage from "@react-native-async-storage/async-storage"

// Exercise: Implement the four `AsyncStorage` helpers.
export const getData = async <T>(key: string): Promise<T | undefined> => {}

export const getAllKeys = (): Promise<readonly string[]> => {}

export const storeData = <T>(key: string, value: T): Promise<void> => {}

export const clearStorage = (): Promise<void> => {}
