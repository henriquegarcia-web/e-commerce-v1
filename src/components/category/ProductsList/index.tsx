'use client'

import { useCallback, useEffect, useState } from 'react'

import { ProductCard } from '@/components'

import { useStore } from '@/contexts/StoreProvider'

import { IProduct } from '@/@types/store'

interface IProductsList {
  activeCategoryId: string | null
}

const ProductsList = ({ activeCategoryId }: IProductsList) => {
  const { productsData } = useStore()

  const [productsList, setProductsList] = useState<IProduct[] | null>(null)

  const findProductByCategoryId = useCallback(
    (categoryId: string | null) => {
      if (!productsData || !categoryId) return []

      const products = productsData.filter((product) =>
        product.category.includes(categoryId)
      )

      return products
    },
    [productsData]
  )

  useEffect(() => {
    const products = findProductByCategoryId(activeCategoryId)
    setProductsList(products)
  }, [activeCategoryId, findProductByCategoryId])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Listagem de Produtos</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productsList?.map((product: IProduct) => (
            <ProductCard key={product.id} productInfos={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsList
