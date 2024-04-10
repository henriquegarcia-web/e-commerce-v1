'use client'

import { useEffect, useState } from 'react'

import { Header, ProductsList } from '@/components'

import { useStore } from '@/contexts/StoreProvider'

import { ICategory } from '@/@types/store'

interface Props {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: Props) {
  const { category } = params

  const { findCategoryBySlug } = useStore()

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null)

  useEffect(() => {
    const categoryFound = findCategoryBySlug(category)
    setActiveCategory(categoryFound)
  }, [category, findCategoryBySlug])

  return (
    <main className="page">
      <Header />
      <ProductsList activeCategory={activeCategory} />
    </main>
  )
}
