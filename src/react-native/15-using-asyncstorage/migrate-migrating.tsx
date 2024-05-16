import React, { ReactNode, useEffect, useState } from "react"
import { Text } from "react-native"

const MigrationLoader: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMigrating, setIsMigrating] = useState(true)

  useEffect(() => {
    async function runMigration() {
      // Migration logic here
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
