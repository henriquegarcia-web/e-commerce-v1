'use client'

import { useEffect, useState } from 'react'

import { Header, ProductDetails } from '@/components'

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

  const { findCategoryBySlug, findProductBySlug } = useStore()

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null)
  const [activeProduct, setActiveProduct] = useState<IProduct | null>(null)

  useEffect(() => {
    const categoryFound = findCategoryBySlug(category)
    const productFound = findProductBySlug(product)
    setActiveCategory(categoryFound)
    setActiveProduct(productFound)
  }, [category, findCategoryBySlug])

  return (
    <main className="page">
      <Header />
      <ProductDetails
        activeCategory={activeCategory}
        activeProduct={activeProduct}
      />
    </main>
  )
}
