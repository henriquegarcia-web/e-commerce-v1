'use client'

import { useEffect, useState } from 'react'

import { Header, NotFound, ProductsList } from '@/components'

import { useStore } from '@/contexts/StoreProvider'

import { ICategory } from '@/@types/store'

interface Props {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: Props) {
  const { category } = params

  const { handleFindCategoryBySlug } = useStore()

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null)

  const [listingPageLoading, setListingPageLoading] = useState(true)

  useEffect(() => {
    const categoryFound = handleFindCategoryBySlug(category)

    setActiveCategory(categoryFound)
    setListingPageLoading(false)
  }, [category, handleFindCategoryBySlug])

  return (
    <main className="page">
      <Header />

      {!activeCategory && !listingPageLoading ? (
        <NotFound />
      ) : (
        <ProductsList activeCategory={activeCategory} />
      )}
    </main>
  )
}
