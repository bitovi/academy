import { ReactNode, useEffect, useState } from "react"
import { Text } from "react-native"

async function getDataVersion() {
  // Get the data’s version number
}

async function storeDataVersion() {
  // Store the data’s version number
}

const MigrationLoader: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMigrating, setIsMigrating] = useState(true)

  useEffect(() => {
    async function runMigration() {
      const appVersion = (await getDataVersion()) || 1
      if (appVersion < 2) {
        // Migration logic here
        await storeDataVersion(2)
      }
      setIsMigrating(false)
    }

    runMigration()
  }, [])

  if (isMigrating) {
    return <Text>Loading…</Text>
  }

  return children
}

function App() {
  return (
    <MigrationLoader>
      <Text>This will render after the migration is done.</Text>
    </MigrationLoader>
  )
}

export default App
