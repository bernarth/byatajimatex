import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertCurrencyToNumber(inputString: string) {
  const cleanedString = inputString.replace(/[^0-9,]/g, '');
  const numericPart = cleanedString.replace(',', '.');
  const number = parseFloat(numericPart);

  return (number * 10).toString();
}