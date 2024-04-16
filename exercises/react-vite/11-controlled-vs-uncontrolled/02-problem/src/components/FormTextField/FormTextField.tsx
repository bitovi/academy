import { useId } from "react"

const FormTextField: React.FC<{}> = ({}) => {
  return (
    <div className="form-group">
      <label className="control-label">Label:</label>

      <input className="form-control" />
    </div>
  )
}

export default FormTextField
