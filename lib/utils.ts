import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkExists(array: string[], value: string, current?: string) {
  if (value.toLowerCase() === current?.toLowerCase()) {
    return 0;
  }
  return array.indexOf(value) >= 0 ? true : false;
}
