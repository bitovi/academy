import { apiRequest, stringifyQuery } from "./api"
import * as storage from "../../storage/storage"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

const oldFetch = global.fetch
const mockFetch = jest.fn()
beforeAll(() => {
  global.fetch = mockFetch
})
afterAll(() => {
  global.fetch = oldFetch
})

let mockStorage: jest.SpyInstance<ReturnType<typeof storage.getData>>
beforeEach(() => {
  mockStorage = jest.spyOn(storage, "getData")
  mockStorage.mockResolvedValue(undefined)
})

describe("apiRequest function", () => {
  it("should handle a successful request", async () => {
    // Mock the fetch response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "success" }),
      statusText: "OK",
      status: 200,
    })

    const response = await apiRequest({
      method: "GET",
      path: "/test",
    })

    expect(response).toEqual({ data: { message: "success" }, error: null })
    expect(mockFetch).toHaveBeenCalledWith(`${process.env.PMO_API}/test?`, {
      method: "GET",
      body: undefined,
      headers: {
        "Content-Type": "application/json",
      },
    })
  })

  it("should handle a failed request", async () => {
    // Mock the fetch response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "error" }),
      statusText: "Bad Request",
      status: 400,
    })

    const response = await apiRequest({
      method: "GET",
      path: "/test",
    })

    expect(response).toEqual({
      data: { message: "error" },
      error: new Error("400 (Bad Request)"),
    })
  })

  it("should handle network errors", async () => {
    // Mock a network error
    mockFetch.mockRejectedValueOnce(new Error("Network Error"))

    const response = await apiRequest({
      method: "GET",
      path: "/test",
    })

    expect(response).toEqual({ data: null, error: new Error("Network Error") })
  })

  describe("requests and cache", () => {
    it("should make a request if cache contain no related key", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "success" }),
        statusText: "OK",
        status: 200,
      })

      mockStorage.mockResolvedValueOnce(undefined)

      const response = await apiRequest({
        method: "GET",
        path: "/test",
      })

      expect(response).toEqual({ data: { message: "success" }, error: null })
      expect(mockFetch).toHaveBeenCalledWith(`${process.env.PMO_API}/test?`, {
        method: "GET",
        body: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      })
    })

    it("should not make a request if cache has related key that is less than a minute old", async () => {
      const mockNewStorage = {
        data: {
          name: "great data",
        },
        dateTime: new Date(),
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "success" }),
        statusText: "OK",
        status: 200,
      })

      mockStorage.mockResolvedValueOnce(mockNewStorage)

      const response = await apiRequest({
        method: "GET",
        path: "/test",
      })

      expect(response).toEqual({ data: mockNewStorage.data, error: null })
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("should make a request if cache has related key that is more than a minute old", async () => {
      const mockNewStorage = {
        data: {
          name: "great data",
        },
        dateTime: new Date("12/31/1999"),
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "success" }),
        statusText: "OK",
        status: 200,
      })

      mockStorage.mockResolvedValueOnce(mockNewStorage)

      const response = await apiRequest({
        method: "GET",
        path: "/test",
      })

      expect(response).toEqual({ data: { message: "success" }, error: null })
      expect(mockFetch).toHaveBeenCalledWith(`${process.env.PMO_API}/test?`, {
        method: "GET",
        body: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      })
    })
  })
})

describe("stringifyQuery function", () => {
  it("should correctly stringify query parameters", () => {
    const query = stringifyQuery({ foo: "bar", baz: "qux" })
    expect(query).toBe("foo=bar&baz=qux")
  })

  it("should omit undefined and null values", () => {
    const query = stringifyQuery({ foo: "bar", baz: null, qux: undefined })
    expect(query).toBe("foo=bar")
  })
})
