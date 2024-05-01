import { ChangeEvent, useState } from 'react'

const NameField: React.FC = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <label>
      Name
      <input onChange={handleChange} type="text" value={value} />
    </label>
  )
}