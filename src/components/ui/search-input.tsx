import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { Button } from './button'
import { useDebouncedCallback } from 'use-debounce'

export interface SearchInputProps
  extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  debounce?: number
}

export function SearchInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: SearchInputProps) {
  // local state for instant feedback
  const [value, setValue] = useState(initialValue)
  // debounced callback for the onChange to trigger the API call
  const debouncedOnChange = useDebouncedCallback(onChange, debounce)

  // sync the initial value with the local state after the component mounts
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedOnChange(newValue)
  }

  const handleClear = () => {
    setValue('')
    debouncedOnChange.cancel() // clear any pending debounced calls
    onChange('')
  }

  return (
    <div className="relative">
      <Input
        {...props}
        value={value}
        onChange={handleChange}
        className={`pr-10 ${props.className}`}
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0"
        >
          <X />
        </Button>
      )}
    </div>
  )
} 