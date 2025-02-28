import React from 'react'
import { cn } from '@/lib/utils'; 
const ProductPrice = ({ value, className }: { value: number; className?: string }) => {
    const stringValue = value.toFixed(2);
const [intValue, floatValue] = stringValue.split('.')
  return (
    <div className={cn('text-2xl',className)}> 
          <span className="text-xs algin-super">$</span>
          {intValue}
          <span className="text-xs algin-super">.{floatValue}</span>
    </div>
  )
}

export default ProductPrice
