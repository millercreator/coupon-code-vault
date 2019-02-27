import { useState, useEffect } from "react";

interface UseLocalStorageOptions<T> {
  key: string;
  defaultValue: T;
  validate?: (value: unknown) => value is T;
}

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  mounted: boolean;
}

/**
 * Generic hook to manage localStorage with type safety and hydration handling
 * @param key - localStorage key
 * @param defaultValue - Default value if key doesn't exist or parsing fails
 * @param validate - Optional validator function to ensure type safety
 */
export function useLocalStorage<T>({
  key,
  defaultValue,
  validate,
}: UseLocalStorageOptions<T>): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let loadedValue: T = defaultValue;

    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Use validator if provided, otherwise trust the parsed value
        if (validate ? validate(parsed) : true) {
          loadedValue = parsed;
        }
      }
    } catch (e) {
      console.error(`Failed to load ${key} from localStorage:`, e);
      loadedValue = defaultValue;
    }

    setValue(loadedValue);
  }, [key, defaultValue, validate]);

  // Sync value changes to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(`Failed to save ${key} to localStorage:`, e);
      }
    }
  }, [key, value, mounted]);

  return {
    value,
    setValue,
    mounted,
  };
}
