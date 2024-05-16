import { useEffect, useState } from "react"

import Loading from "../../components/Loading"
import { LocalStorageApiRequest, keyPrefix } from "../pmo/api"
import { getData, getAllKeys, storeData, clearStorage } from "../storage"

interface LocalStorageApiRequestV1 {
  data: unknown
  dateTime: Date
}

const migrateDataFromV1toV2 = async (): Promise<void> => {}

export interface DataMigrationProps {
  children: React.ReactNode
}

const DataMigration: React.FC<DataMigrationProps> = ({ children }) => {}

export default DataMigration
