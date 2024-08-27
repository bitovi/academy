import { useEffect, useState } from "react"

import Loading from "../../components/Loading"
import { CachedResponse, keyPrefix } from "../pmo/api"
import { getData, getAllKeys, storeData, clearStorage } from "../storage"

interface CachedResponseV1 {
  data: unknown
  dateTime: string
}

const migrateDataFromV1toV2 = async (): Promise<void> => {
  const keys = await getAllKeys()
  try {
    for (const key of keys) {
      if (key.startsWith(keyPrefix)) {
        const oldData = (await getData(key)) as CachedResponseV1
        await storeData<CachedResponse<unknown>>(key, {
          ...oldData,
          dateTime: new Date(oldData.dateTime).valueOf(),
        })
      }
    }
  } catch (error) {
    console.error("'migrateDataFromV1toV2' failed with error:", error)
    await clearStorage()
  }
}

export interface DataMigrationProps {
  children: React.ReactNode
}

const DataMigration: React.FC<DataMigrationProps> = ({ children }) => {
  const [isMigrating, setIsMigrating] = useState(true)

  useEffect(() => {
    const checkMigration = async () => {
      const appVersion = (await getData<number>("version")) || 1
      if (appVersion < 2) {
        await migrateDataFromV1toV2()
        await storeData<number>("version", 2)
      }

      setIsMigrating(false)
    }

    checkMigration()
  }, [])

  if (isMigrating) {
    return <Loading />
  }

  return <>{children}</>
}

export default DataMigration
