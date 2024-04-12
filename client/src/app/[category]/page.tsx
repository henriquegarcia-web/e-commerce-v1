'use client'

import { useEffect, useState } from 'react'

import {
  Header,
  NotFound,
  ProductListSkeleton,
  ProductsList
} from '@/components'

import { useStore } from '@/contexts/StoreProvider'

import { ICategory } from '@/@types/store'

interface Props {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: Props) {
  const { category } = params

  const { categoriesData, handleFindCategoryBySlug } = useStore()

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null)
  const [listingPageLoading, setListingPageLoading] = useState(true)

  useEffect(() => {
    setListingPageLoading(true)

    if (!category || !categoriesData || !categoriesData?.length) return

    const categoryFound = handleFindCategoryBySlug(category, categoriesData)
    setActiveCategory(categoryFound)

    setListingPageLoading(false)
  }, [category, categoriesData])

  return (
    <main className="page">
      <Header />

      {listingPageLoading ? (
        <ProductListSkeleton />
      ) : !!activeCategory && !listingPageLoading ? (
        <ProductsList activeCategory={activeCategory} />
      ) : (
        <NotFound />
      )}
    </main>
  )
}
