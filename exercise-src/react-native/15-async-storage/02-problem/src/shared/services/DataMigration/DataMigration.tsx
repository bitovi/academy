import { useEffect, useState } from "react"

import Loading from "@shared/components/Loading"
import { CachedResponse, keyPrefix } from "@shared/services/pmo/api"
import { getData, getAllKeys, storeData, clearStorage } from "@shared/services/storage"

interface CachedResponseV1 {
  data: unknown
  dateTime: string
}

const migrateDataFromV1toV2 = async (): Promise<void> => {
  // Exercise: Implement the data migration logic here.
}

export interface DataMigrationProps {
  children: React.ReactNode
}

const DataMigration: React.FC<DataMigrationProps> = ({ children }) => {
  // Exercise: Run the migration in a `useEffect`.
  // Exercise: While the migration is running, show a `Loading` component.
  // Exercise: When the migration is all done, render the `children`.
}

export default DataMigration
