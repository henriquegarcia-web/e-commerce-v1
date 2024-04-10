'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Breadcrumb,
  ProductImageSlider,
  ProductMainInfos,
  ProductPrice,
  ProductVariations
} from '@/components'

import { useStore } from '@/contexts/StoreProvider'

import {
  ICategory,
  IVariation,
  IFilterSize,
  IProduct,
  ICartProduct
} from '@/@types/store'

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
  const { formatPrice } = useStore()

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

  const handleAddProductToCart = () => {
    if (!activeProduct || !filterSelectedColor || !filterSelectedSize) {
      console.error(
        'Por favor, selecione uma cor e um tamanho antes de adicionar ao carrinho.'
      )
      return
    }

    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]')

    const existingIndex = storedCart.findIndex(
      (item: ICartProduct) =>
        item.productId === activeProduct.id &&
        item.color.variationId === filterSelectedColor.variationId &&
        item.size.variationId === filterSelectedSize.variationId
    )

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity++
      console.log('Item já existe no carrinho. Quantidade aumentada em 1.')
    } else {
      const formattedPrice = formatPrice(activeProduct.price)

      const newItem = {
        productId: activeProduct.id,
        name: activeProduct.name,
        image: activeProduct.images[0].url,
        price: formattedPrice.mainPrice,
        color: filterSelectedColor,
        size: filterSelectedSize,
        quantity: 1
      }
      storedCart.push(newItem)
    }

    localStorage.setItem('cartItems', JSON.stringify(storedCart))
  }

  if (productPageLoading) return <></>

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-y-8 mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Detalhes do Produto</h2>

        <Breadcrumb category={activeCategory} />

        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-2">
          <div className="flex flex-1">
            <ProductImageSlider imagesData={activeProduct?.images} />
          </div>
          <div className="flex flex-1 flex-col gap-y-6">
            <ProductMainInfos productMainInfos={productMainInfos} />
            <ProductPrice priceInfos={activeProduct?.price} />
            <ProductVariations
              productVariations={activeProduct?.variations}
              filterSelectedColor={filterSelectedColor}
              setFilterSelectedColor={setFilterSelectedColor}
              filterSelectedSize={filterSelectedSize}
              setFilterSelectedSize={setFilterSelectedSize}
              handleAddProductToCart={handleAddProductToCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
