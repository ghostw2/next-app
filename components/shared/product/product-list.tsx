import React from 'react'
import ProductCard from './prouct-card';
import { Product } from '@/types';
const ProductList = ({ data, title,limit }: { data: Product[]; title?: string;limit?:number }) => {
    const toRenderData = limit ? data.slice(0, limit) : data;
    return (
    <div className='my-10'>
          <h2 className="h2-bold mb-4">
              {title}
          </h2>
          {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {toRenderData.map((product: Product) => (
                      <ProductCard key={product.slug} product={product}/>
                  ))}
          </div>
          ): (
              <div>
                  <p className="text-desctructive">No Products were found</p>
              </div>
          ) }
    </div>
  )
}

export default ProductList
