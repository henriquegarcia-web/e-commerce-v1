'use client'

import { useMemo } from 'react'

import {
  ProductImageSlider,
  ProductMainInfos,
  ProductPrice,
  ProductVariations,
  BuyButton
} from '@/components'

import { ICategory, IProduct } from '@/@types/store'

interface IProductDetails {
  activeCategory: ICategory | null
  activeProduct: IProduct | null
}

const ProductDetails = ({ activeCategory, activeProduct }: IProductDetails) => {
  const productMainInfos = useMemo(() => {
    if (!activeProduct) return null

    return {
      sku: activeProduct.sku,
      name: activeProduct.name,
      brand: activeProduct.brand,
      rating: {
        rate: activeProduct.rating,
        totalReviews: activeProduct.reviews.length
      }
    }
  }, [activeProduct])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Detalhes do Produto</h2>

        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-2">
          <div className="flex flex-1">
            <ProductImageSlider imagesData={activeProduct?.images} />
          </div>
          <div className="flex flex-1 flex-col gap-y-6">
            <ProductMainInfos productMainInfos={productMainInfos} />
            <ProductPrice priceInfos={activeProduct?.price} />
            <ProductVariations productVariations={activeProduct?.variations} />
            <BuyButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
