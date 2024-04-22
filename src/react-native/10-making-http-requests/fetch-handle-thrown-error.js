try {
    const response = await fetch('https://api.example.com/data', {
        method: "GET",
    })

    const data = await response.json()
    const error = response.ok ? null : new Error(`${response.status} (${response.statusText})`)
    // Do something with data and error

} catch (error) {
    const parsedError = error instanceof Error ? error : new Error('An unknown error occurred')
    // Do something with parsedError
}