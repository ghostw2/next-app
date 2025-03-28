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

export function formatNumberWithDecimalPlaces(number: number): string{
  const [int, decimal] = number.toString().split('.');
  return decimal ? `${int}.${decimal.slice(0, 2)}` : `${int}.00`;
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