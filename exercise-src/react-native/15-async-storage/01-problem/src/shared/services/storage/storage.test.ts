import AsyncStorage from "@react-native-async-storage/async-storage"

import { getData, getAllKeys, storeData, clearStorage } from "./storage" // Import your functions here

let mockStorageGetData: jest.SpyInstance<
  ReturnType<typeof AsyncStorage.getItem>
>
let mockStorageStoreData: jest.SpyInstance<
  ReturnType<typeof AsyncStorage.setItem>
>
let mockStorageGetKeys: jest.SpyInstance<
  ReturnType<typeof AsyncStorage.getAllKeys>
>
let mockStorageClear: jest.SpyInstance<ReturnType<typeof AsyncStorage.clear>>

jest.unmock("./storage")

describe("Services/Storage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockStorageGetData = jest.spyOn(AsyncStorage, "getItem")
    mockStorageGetKeys = jest.spyOn(AsyncStorage, "getAllKeys")
    mockStorageStoreData = jest.spyOn(AsyncStorage, "setItem")
    mockStorageClear = jest.spyOn(AsyncStorage, "clear")
  })

  describe("getData", () => {
    it("returns the parsed value from AsyncStorage", async () => {
      mockStorageGetData.mockResolvedValueOnce(
        JSON.stringify({ example: "data" }),
      )

      const data = await getData("testKey")

      expect(data).toEqual({ example: "data" })
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("testKey")
    })

    it("returns undefined if key does not exist", async () => {
      mockStorageGetData.mockResolvedValueOnce(JSON.stringify(undefined))

      const data = await getData("nonExistingKey")

      expect(data).toBeUndefined()
      expect(mockStorageGetData).toHaveBeenCalledWith("nonExistingKey")
    })
  })

  describe("getAllKeys", () => {
    it("returns keys from AsyncStorage", async () => {
      const keys = ["key1", "key2", "key3"]
      mockStorageGetKeys.mockResolvedValueOnce(keys)

      const result = await getAllKeys()

      expect(result).toEqual(keys)
      expect(mockStorageGetKeys).toHaveBeenCalled()
    })
  })

  describe("storeData", () => {
    it("stores data in AsyncStorage", async () => {
      const data = { example: "data" }
      const key = "testKey"

      await storeData(key, data)

      expect(mockStorageStoreData).toHaveBeenCalledWith(
        key,
        JSON.stringify(data),
      )
    })
  })

  describe("clearStorage", () => {
    it("clears AsyncStorage", async () => {
      await clearStorage()

      expect(mockStorageClear).toHaveBeenCalled()
    })
  })
})
