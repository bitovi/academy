import { useToggle } from "./useToggle"

const Toggle: React.FC = () => {
  const [active, toggleActive] = useToggle(true)

  return (
    <form>
      <label className="toggle">
        <input
          className="toggle-checkbox"
          checked={active}
          onChange={toggleActive}
          type="checkbox"
        />
        <div className="toggle-switch"></div>
        <span className="toggle-label">{active ? "On" : "Off"}</span>
      </label>
    </form>
  )
}

export default Toggle
