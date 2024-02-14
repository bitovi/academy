import { useId } from "react"

const FormTextField: React.FC<{
    label: string
    onChange: (data: string) => void
    type: string
    value: string
}> = ({ label, type, value, onChange }) => {
    const id = useId()

    return (
        <div className="form-group">
            <label className="control-label" htmlFor={id}>
                {label}:
            </label>

            <input
                className="form-control"
                id={id}
                onChange={(event) => onChange(event.target.value)}
                type={type}
                value={value}
            />
        </div>
    )
}

export default FormTextField