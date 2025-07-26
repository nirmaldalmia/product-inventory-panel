import * as React from 'react'
import { X } from 'lucide-react'
import { cn, humanize } from '@/lib/utils/utils'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface SelectFilterProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  className?: string
}

export function SelectFilter({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className,
}: SelectFilterProps) {
  const showClearButton = value !== 'all'

  return (
    <div className={cn('relative flex items-center', className)}>
      <Select value={value} onValueChange={onChange} disabled={options.length === 0}>
        <SelectTrigger className="cursor-pointer">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="cursor-pointer">All</SelectItem>
          {options.map(option => (
            <SelectItem key={option} value={option} className="cursor-pointer">
              {humanize(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showClearButton && (
        <Button
          variant="ghost"
          onClick={() => onChange('all')}
          className="absolute right-8 top-1/2 h-6 w-6 -translate-y-1/2 p-0 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 