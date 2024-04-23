import type { FC } from "react"
import type { State } from "../../StateList"
import Button from "../../../../design/Button"

type ListItemProps = {
  state: State
}

const ListItem: FC<ListItemProps> = ({ state }) => {
  return (
    <Button
      onPress={() => {
        console.warn(`Pressed ${state.short}`)
      }}
    >
      {state.name}
    </Button>
  )
}

export default ListItem
