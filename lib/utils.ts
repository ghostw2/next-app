
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//convert to plain object
export function toPlainObject<T>(value: T): T{
  return JSON.parse(JSON.stringify(value))
}
//formate nubmer with decimal places

export function formatNumberWithDecimalPlaces(number: number): string {
  const rounded = Math.round(number * 100) / 100;
  return rounded.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}

//format errors function
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  //handle zod erorr
  if (error.name === "ZodError") { 
    const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].message)
    return fieldErrors.join('. ')
  } else if (error.name == "PrismaClientKnownRequestError" && error.code === 'P2002') {
    const field = error.meta?.target ? error.meta.target[0] : 'Field'
    return `${field.charAt(0).toUppercase() + field.slice(1) } already exists`
  } else {
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)
  }
  
}
//round number to two decimal places
export function round_to_2_decimal(value: number | string) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON)* 100)/100 ;
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }
  else {
    throw new Error('The value provided is neither a number or a string')
  }
}
export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-Us', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits:2
})

export function formatCurrency(value: number | string | null) {
  if (value === null) return ''
  if (typeof value === 'number') {
    return CURRENCY_FORMATTER.format(value)
  }
  if (typeof value === 'string') {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return ''
    return CURRENCY_FORMATTER.format(numValue)
  }
}