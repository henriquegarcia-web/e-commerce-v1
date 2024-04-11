'use client'

import { useEffect, useState } from 'react'

import { Alert, Header, ProductDetails } from '@/components'

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

  const { alertData, handleFindCategoryBySlug, handleFindProductBySlug } =
    useStore()

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null)
  const [activeProduct, setActiveProduct] = useState<IProduct | null>(null)

  const [productPageLoading, setProductPageLoading] = useState(true)

  useEffect(() => {
    const categoryFound = handleFindCategoryBySlug(category)
    const productFound = handleFindProductBySlug(product)

    if (!categoryFound || !productFound) return

    setActiveCategory(categoryFound)
    setActiveProduct(productFound)

    setProductPageLoading(false)
  }, [category, product, handleFindCategoryBySlug, handleFindProductBySlug])

  return (
    <main className="page">
      <Header />
      <ProductDetails
        productPageLoading={productPageLoading}
        activeCategory={activeCategory}
        activeProduct={activeProduct}
      />

      {alertData && <Alert alertData={alertData} />}
    </main>
  )
}
