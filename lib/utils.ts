import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// make an array of COLORS with hex values for tailwind
const COLORS = [
  //give me 6 randome hex values
  '#5DADE2',
  '#F8C471',
  '#FF5733',
  '#734073',
  '#FA8072',
  '#D8572A',
  '#D5B942',
  '#F7A1C4',
  '#94BFA7',
  '#222E50',
  '#2A4849',
  '#C2E812',
  '#FF934F',
   

] 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {

  return COLORS[connectionId % COLORS.length]

}