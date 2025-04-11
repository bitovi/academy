const response = await fetch("https://api.example.com/data", {
  method: "GET",
})

const data = await response.json()
const error = response.ok
  ? undefined
  : new Error(`${response.status} (${response.statusText})`)
