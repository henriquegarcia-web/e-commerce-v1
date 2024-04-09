'use client'

import { useCallback, useEffect, useState } from 'react'

import { Header, ProductsList } from '@/components'

import { useStore } from '@/contexts/StoreProvider'

interface Props {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: Props) {
  const { category } = params

  const { categoriesData } = useStore()

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const findCategoryIdBySlug = useCallback(
    (slug: string) => {
      if (!categoriesData) return null

      const data = categoriesData.find((g) =>
        g.categories.find((c) => c.slug === slug)
      )?.id

      return data || null
    },
    [categoriesData]
  )

  useEffect(() => {
    const activeCategory = findCategoryIdBySlug(category)
    setActiveCategoryId(activeCategory)
  }, [category, findCategoryIdBySlug])

  return (
    <main className="page">
      <Header />
      <ProductsList activeCategoryId={activeCategoryId} />
    </main>
  )
}
