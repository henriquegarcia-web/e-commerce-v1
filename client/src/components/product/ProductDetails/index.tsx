'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Breadcrumb,
  OfferBadge,
  ProductDetailsSkeleton,
  ProductImageSlider,
  ProductMainInfos,
  ProductPrice,
  ProductVariations
} from '@/components'

import { ICategory, IVariation, IFilterSize, IProduct } from '@/@types/store'

interface IProductDetails {
  productPageLoading: boolean
  activeCategory: ICategory | null
  activeProduct: IProduct | null
}

const ProductDetails = ({
  productPageLoading,
  activeCategory,
  activeProduct
}: IProductDetails) => {
  const [filterSelectedColor, setFilterSelectedColor] =
    useState<IVariation | null>(null)
  const [filterSelectedSize, setFilterSelectedSize] =
    useState<IFilterSize | null>(null)

  useEffect(() => {
    const productVariations = activeProduct?.variations

    if (productVariations && productVariations?.length > 0) {
      setFilterSelectedColor(productVariations[0])
      setFilterSelectedSize(productVariations[0].sizes[0])
    }
  }, [activeProduct])

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

  if (productPageLoading || !activeProduct) return <ProductDetailsSkeleton />

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-y-8 mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Detalhes do Produto</h2>

        <Breadcrumb category={activeCategory} />

        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-2">
          <div className="relative flex flex-1">
            {activeProduct?.price.sale.active && (
              <OfferBadge offerValue={activeProduct?.price.sale.discount} />
            )}
            <ProductImageSlider imagesData={activeProduct?.images} />
          </div>
          <div className="flex flex-1 flex-col gap-y-6">
            <ProductMainInfos productMainInfos={productMainInfos} />
            <ProductPrice priceInfos={activeProduct?.price} />
            <ProductVariations
              activeProduct={activeProduct}
              filterSelectedColor={filterSelectedColor}
              setFilterSelectedColor={setFilterSelectedColor}
              filterSelectedSize={filterSelectedSize}
              setFilterSelectedSize={setFilterSelectedSize}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
