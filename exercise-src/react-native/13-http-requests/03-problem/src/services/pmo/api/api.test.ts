import { apiRequest, stringifyQuery } from "./api"

const oldFetch = global.fetch
const mockFetch = jest.fn()
beforeAll(() => {
  global.fetch = mockFetch
})
afterAll(() => {
  global.fetch = oldFetch
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

    expect(response).toEqual({ data: { message: "success" }, error: undefined })
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

    expect(response).toEqual({ data: undefined, error: new Error("Network Error") })
  })
})

describe("stringifyQuery function", () => {
  it("should correctly stringify query parameters", () => {
    const query = stringifyQuery({ foo: "bar", baz: "qux" })
    expect(query).toBe("foo=bar&baz=qux")
  })

  it("should omit undefined and null values", () => {
    const query = stringifyQuery({ foo: "bar", baz: undefined, qux: undefined })
    expect(query).toBe("foo=bar")
  })
})
