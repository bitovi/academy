import { useId } from "react"

const FormSelect: React.FC<{
  children: React.ReactNode
  label: string
  onChange: (data: string) => void
  value: string
}> = ({ children, label, onChange, value }) => {
  const id = useId()

  return (
    <div className="form-group">
      <label htmlFor={id} className="control-label">
        {label}:
      </label>

      <select
        className="form-control"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {children}
      </select>
    </div>
  )
}

export default FormSelect
