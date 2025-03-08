import React from 'react'
import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductPrice from '@/components/shared/product/product-price';
import ProductImages from '@/components/shared/product/product-images';
const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
    const { slug } = await props.params;
    const product = await getProductBySlug(slug)
    if (!product) {
        notFound()
    }
    return (
        <><section>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-1'>
                <div className="col-span-2">
                    <ProductImages images={product.images} />
                </div>
                <div className="col-span-2 p-2">
                    <div className="flex flex-col gap-6">
                        <p>
                            {product.brand} / {product.category}
                        </p>
                        <h1 className="h3-bold">
                            {product.name}
                        </h1>
                        <p>
                            {product.rating.toString()} of {product.numReviews} Reviews
                        </p>
                        <div className="flex flex-col sm:flex-row sm:flex:items-center gap-3 ">
                            <ProductPrice value={product.price.toString()} className='bg-green-200 text-green-400 rounded-full w-24 px-5 py-2' />
                        </div>
                        <div className="mt-10">
                            <div className="font-semibold">
                                Description
                            </div>
                            <div>{product.description}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <Card className='p-2'>
                        <CardContent className='p-4'>
                            <div className="flex justify-between mb-2">
                                <div>Price:</div>
                                <div>
                                    <ProductPrice value={product.price.toString()} />
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div>Status:</div>
                                {product.stock > 0 ? (
                                    <Badge variant='outline' >In Stock </Badge>
                                ) :
                                    (
                                        <Badge variant='destructive'>Out of Stock</Badge>
                                    )}
                            </div>
                            {product.stock > 0 && (
                                <div className="flex-center">
                                    <Button className='w-full'>Add to Cart</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        </>
    )
}

export default ProductDetailsPage
