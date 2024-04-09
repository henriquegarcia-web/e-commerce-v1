'use client'

import { useCallback, useEffect, useState } from 'react'

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

  const { categoriesData } = useStore()

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null)

  const findCategoryBySlug = useCallback(
    (slug: string | null) => {
      if (!categoriesData || !slug) return null

      const categoryGroup = categoriesData.find((group) =>
        group.categories.find((c) => c.slug === slug)
      )

      if (categoryGroup) {
        const foundCategory = categoryGroup.categories.find(
          (c) => c.slug === slug
        )
        return foundCategory || null
      }

      return null
    },
    [categoriesData]
  )

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
