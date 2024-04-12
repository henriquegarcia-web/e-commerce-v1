'use client'

import { useEffect, useState } from 'react'

import {
  Alert,
  Header,
  NotFound,
  ProductDetails,
  ProductDetailsSkeleton
} from '@/components'

import { useStore } from '@/contexts/StoreProvider'

import { ICategory, IProduct } from '@/@types/store'

interface Props {
  params: {
    category: string
    product: string
  }
}

export default function ProductPage({ params }: Props) {
  const { category, product } = params

  const {
    alertData,
    categoriesData,
    productsData,
    handleFindCategoryBySlug,
    handleFindProductBySlug
  } = useStore()

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null)
  const [activeProduct, setActiveProduct] = useState<IProduct | null>(null)

  const [productPageLoading, setProductPageLoading] = useState(true)

  useEffect(() => {
    setProductPageLoading(true)

    if (
      !category ||
      !categoriesData ||
      !categoriesData?.length ||
      !productsData ||
      !productsData?.length
    )
      return

    const categoryFound = handleFindCategoryBySlug(category, categoriesData)
    const productFound = handleFindProductBySlug(product, productsData)

    setActiveCategory(categoryFound)
    setActiveProduct(productFound)

    setProductPageLoading(false)
  }, [category, product, categoriesData, productsData])

  return (
    <main className="page">
      <Header />

      {productPageLoading ? (
        <ProductDetailsSkeleton />
      ) : !!activeCategory && !!activeProduct && !productPageLoading ? (
        <ProductDetails
          activeCategory={activeCategory}
          activeProduct={activeProduct}
        />
      ) : (
        <NotFound />
      )}

      {alertData && <Alert alertData={alertData} />}
    </main>
  )
}
