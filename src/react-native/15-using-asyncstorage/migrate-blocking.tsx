import React, { ReactNode, useState } from "react"
import { Text } from "react-native"

const MigrationLoader: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMigrating, setIsMigrating] = useState(true)

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
