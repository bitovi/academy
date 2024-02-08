import { useId } from "react";

const FormTextField: React.FC<React.PropsWithChildren<{
  label: string;
  help?: string;
  disabled?: boolean;
  value: string;
  onChange: (data: string) => void;
}>> = ({ children, label, help, disabled = false, value, onChange }) => {
  const id = useId();

  return (
    <div className="form-group">
      <label htmlFor={id} className="control-label">
        {label}:
      </label>

      <select
        id={id}
        className="form-control"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>

      {help && <p className="help-text">{help}</p>}
    </div>
  );
};

export default FormTextField;
