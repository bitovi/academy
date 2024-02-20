const ControlledInput: React.FC = () => {
  const [name, setName] = useState("");
  return (
    <label>
      Name:
      <input
        onChange={(event) => setName(event.target.value)}
        type="text"
        value={name}
      />
    </label>
  )
}