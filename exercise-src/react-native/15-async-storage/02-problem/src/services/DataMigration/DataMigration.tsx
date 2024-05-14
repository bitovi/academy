import { useEffect, useState } from "react"

import Loading from "../../components/Loading"
import { LocalStorageApiRequest, keyPrefix } from "../pmo/api"
import { getData, getAllKeys, storeData, clearStorage } from "../storage"

interface LocalStorageApiRequestV1 {
  data: unknown
  dateTime: Date
}

const migrateDataV1toV2 = async (): Promise<void> => {}

const DataMigration: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {}

export default DataMigration
