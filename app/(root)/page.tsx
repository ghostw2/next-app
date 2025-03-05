import React from 'react'
//import { Button } from '@/components/ui/button'
import { getLatestProducts } from '@/lib/actions/product.actions';
//const delay = (ms:number)=> new Promise((resolve)=>setTimeout(resolve,ms))
import ProductList from '@/components/shared/product/product-list'


const HomePage = async () => {
  const sampleData = await getLatestProducts();
  //console.log(sampleData);
  return(  <>
      <div className='text-center'>
        <ProductList title='Newest Arrivals' data={sampleData} limit={4}></ProductList>
      </div>
    </>
  )
}

export default HomePage