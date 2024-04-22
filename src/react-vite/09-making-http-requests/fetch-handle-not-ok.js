const response = await fetch("https://api.example.com/data", {
  method: "GET",
})

const data = await response.json()
const error = response.ok
  ? null
  : new Error(`${response.status} (${response.statusText})`)
