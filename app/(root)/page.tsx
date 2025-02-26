import React from 'react'
import { Button } from '@/components/ui/button'
import sampleData from '@/db/sample-data'
//const delay = (ms:number)=> new Promise((resolve)=>setTimeout(resolve,ms))
import ProductList from '@/components/shared/product/product-list'
const HomePage = async () => {
  console.log(sampleData);
  return (
    <>
      <div className='text-center'>
        <ProductList title='Newest Arrivals' data={sampleData.products} limit={4}></ProductList>
      </div>
    </>
  )
}

export default HomePage