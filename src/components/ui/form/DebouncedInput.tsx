import Input, { type InputProps } from '@/components/ui/form/Input'
import { useEffect, useState, type FC } from 'react'

interface DebouncedInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

const DebouncedInput: FC<DebouncedInputProps> = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => { clearTimeout(timeout) }
  }, [value])

  return (
    <Input
      {...props}
      value={value}
      onChange={e => { setValue(e.target.value) }}
    />
  )
}

export default DebouncedInput
