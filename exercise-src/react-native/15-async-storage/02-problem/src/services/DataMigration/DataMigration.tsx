import type { FC, ReactNode } from "react"
import type { LocalStorageApiRequest } from "../pmo/api"
import { keyPrefix } from "../pmo/api"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { getData, getAllKeys, storeData, clearStorage } from "../storage"

interface LocalStorageApiRequestV1 {
  data: unknown
  dateTime: Date
}

const migrateDataV1toV2 = async (): Promise<void> => {}

const DataMigration: React.FC<{ children: ReactNode }> = ({ children }) => {}

export default DataMigration
