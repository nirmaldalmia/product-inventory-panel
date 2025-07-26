export function getLocalStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null
  }
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error)
    return null
  }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error)
  }
}

export function appendToLocalStorageArray<T>(key: string, item: T): void {
  const array = getLocalStorageItem<T[]>(key) || []
  array.push(item)
  setLocalStorageItem(key, array)
} 