import React from 'react'
import { cn } from '@/lib/utils'; 
const ProductPrice = ({ value, className }: { value: string; className?: string }) => {

const [intValue, floatValue] = value.split('.')
  return (
    <div className={cn('text-2xl flex',className)}> 
          <span className="text-xs algin-super">$</span>
          {intValue}
          <span className="text-xs algin-super">.{floatValue}</span>
    </div>
  )
}

export default ProductPrice
