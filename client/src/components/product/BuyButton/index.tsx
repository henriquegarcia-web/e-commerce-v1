'use client'

import { useMemo, useState } from 'react'

import { IoHeartOutline } from 'react-icons/io5'

import { Button } from '@/components'

import { useCart } from '@/contexts/CartProvider'
import { useStore } from '@/contexts/StoreProvider'

import { mergeClasses } from '@/utils/functions/mergeClasses'

import { IFilterSize, IProduct, IVariation } from '@/@types/store'

interface IBuyButton {
  activeProduct?: IProduct | null
  filterSelectedColor: IVariation | null
  filterSelectedSize: IFilterSize | null
  disabled?: boolean
  loading?: boolean
}

const BuyButton = ({
  activeProduct,
  disabled = false,
  loading = false,
  filterSelectedColor,
  filterSelectedSize
}: IBuyButton) => {
  const { favotitesItemsData, handleAddProductToFavorites } = useStore()
  const { handleAddProductToCart } = useCart()

  const [addingProductToCart, setAddingProductToCart] = useState(false)

  const isFavorite = useMemo(() => {
    return favotitesItemsData.some(
      (item) => item.productId === activeProduct?.id
    )
  }, [activeProduct, favotitesItemsData])

  const addToCart = () => {
    if (!activeProduct || !filterSelectedColor || !filterSelectedSize) return

    setAddingProductToCart(true)
    setTimeout(() => {
      handleAddProductToCart(
        activeProduct,
        filterSelectedColor,
        filterSelectedSize
      )
      setAddingProductToCart(false)
    }, 2000)
  }

  const addToFavorite = () => {
    if (!activeProduct) return

    handleAddProductToFavorites(activeProduct)
  }

  return (
    <div className="flex gap-x-2 mt-10">
      <Button
        label="Comprar"
        loading={addingProductToCart}
        onClick={addToCart}
      />
      <button
        disabled={disabled || loading}
        className={mergeClasses(
          isFavorite
            ? 'border border-red-500 bg-red-500 hover:bg-red-600'
            : 'border border-transparent bg-gray-200 hover:bg-gray-300',
          'flex w-[50px] items-center justify-center rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:pointer-events-none'
        )}
        onClick={addToFavorite}
      >
        <IoHeartOutline
          className={mergeClasses(
            isFavorite ? 'text-white' : 'text-gray-800',
            'text-3xl'
          )}
        />
      </button>
    </div>
  )
}

export default BuyButton
