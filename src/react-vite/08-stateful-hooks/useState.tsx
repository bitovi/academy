import { useState } from "react"

const Settings: React.FC = () => {
  const [theme, setTheme] = useState("Auto")

  const updateTheme = (newTheme) => {
    console.info("Updating theme:", newTheme)
    setTheme(newTheme)
  }

  return (
    <main>
      <p>Current theme: {theme}</p>
      <button onClick={() => updateTheme("Light")}>Set light mode</button>
      <button onClick={() => updateTheme("Dark")}>Set dark mode</button>
      <button onClick={() => updateTheme("Auto")}>Set theme to auto</button>
    </main>
  )
}

export default Settings
