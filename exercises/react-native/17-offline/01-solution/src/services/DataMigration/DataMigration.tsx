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

const migrateDataV1toV2 = async (): Promise<void> => {
  const keys = await getAllKeys()
  try {
    keys.forEach(async (key: string) => {
      if (key.startsWith(keyPrefix)) {
        const oldData = (await getData(key)) as LocalStorageApiRequestV1
        storeData<LocalStorageApiRequest<unknown>>(key, {
          ...oldData,
          dateTime: oldData.dateTime.valueOf(),
        })
      }
    })
  } catch (error) {
    console.error("'migrateDataV1toV2' failed with error:", error)
    await clearStorage()
  }
}

const DataMigration: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDone, setMigrationDone] = useState<boolean>(false)

  useEffect(() => {
    const checkMigration = async () => {
      const appVersion = (await getData<number>("version")) || 1
      if (appVersion < 2) {
        await migrateDataV1toV2()
        await storeData<number>("version", 2)
      }

      setMigrationDone(true)
    }

    checkMigration()
  }, [])

  if (!isDone) {
    return <Loading />
  }

  return children
}

export default DataMigration
