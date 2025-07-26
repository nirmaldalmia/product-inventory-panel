import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function humanize(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
}