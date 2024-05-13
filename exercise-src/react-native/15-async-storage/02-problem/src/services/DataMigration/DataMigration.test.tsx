import { render, screen, waitFor } from "@testing-library/react-native"
import DataMigration from "./DataMigration"
import Typography from "../../design/Typography"
import * as storage from "../storage/storage"

// Mocking the global fetch function
let mockStorageGetData: jest.SpyInstance<ReturnType<typeof storage.getData>>
let mockStorageStoreData: jest.SpyInstance<ReturnType<typeof storage.storeData>>
let mockStorageGetKeys: jest.SpyInstance<ReturnType<typeof storage.getAllKeys>>
let mockStorageClear: jest.SpyInstance<ReturnType<typeof storage.clearStorage>>

beforeEach(() => {
  mockStorageGetData = jest.spyOn(storage, "getData")
  mockStorageGetKeys = jest.spyOn(storage, "getAllKeys")
  mockStorageStoreData = jest.spyOn(storage, "storeData")
  mockStorageClear = jest.spyOn(storage, "clearStorage")

  mockStorageGetData.mockResolvedValue(undefined)
  mockStorageGetKeys.mockResolvedValue([
    "apiRequest-numberone",
    "otherkey-numbertwo",
    "apiRequest-numberthree",
  ])
})

afterEach(() => {
  jest.resetAllMocks()
})

describe("DataMigration component", () => {
  it("renders", async () => {
    mockStorageGetData.mockResolvedValueOnce(2)

    render(
      <DataMigration>
        <Typography>Hello!</Typography>
      </DataMigration>,
    )
    expect(screen.getByText(/Loading…/)).toBeOnTheScreen()
  })
  it("renders children after loading", async () => {
    mockStorageGetData.mockResolvedValueOnce(2)
    render(
      <DataMigration>
        <Typography>Hello!</Typography>
      </DataMigration>,
    )
    await waitFor(() => {
      expect(screen.getByText(/Hello!/)).toBeOnTheScreen()
    })
  })
  it("updates localStorage if storage version is less than 2", async () => {
    mockStorageGetData
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce({
        data: { text: "Not Important" },
        dateTime: new Date(),
      })
      .mockResolvedValueOnce({
        data: { text: "Still Not Important" },
        dateTime: new Date(),
      })

    render(
      <DataMigration>
        <Typography>Hello!</Typography>
      </DataMigration>,
    )
    await waitFor(() => {
      expect(screen.getByText(/Hello!/)).toBeOnTheScreen()
    })

    /*
      With the mock data as it is, getKeys should be called once to get all the necessary keys.
      getData will return three times, once for retrieving the version number, and twice for the two keys that need to be data migrated
      storeData will return three times, twice for the two keys that need to be data migrated, and once more to update the version number
      storageClear will return zero times, it's only called in the migration function if the migration function fails
    */
    expect(mockStorageGetKeys).toHaveReturnedTimes(1)
    expect(mockStorageGetData).toHaveReturnedTimes(3)
    expect(mockStorageStoreData).toHaveReturnedTimes(3)
    expect(mockStorageClear).toHaveReturnedTimes(0)
  })

  it("ignores local storage if version is 2 or more", async () => {
    mockStorageGetData.mockResolvedValueOnce(5)

    render(
      <DataMigration>
        <Typography>Hello!</Typography>
      </DataMigration>,
    )
    await waitFor(() => {
      expect(screen.getByText(/Hello!/)).toBeOnTheScreen()
    })

    //if the local storage doesn't run for data migration, GetData will only run once to check the version number
    expect(mockStorageGetKeys).toHaveReturnedTimes(0)
    expect(mockStorageGetData).toHaveReturnedTimes(1)
    expect(mockStorageStoreData).toHaveReturnedTimes(0)
    expect(mockStorageClear).toHaveReturnedTimes(0)
  })
})
