'use client'

import { IoHeartOutline } from 'react-icons/io5'

import { useStore } from '@/contexts/StoreProvider'
import { useMemo } from 'react'
import { mergeClasses } from '@/utils/functions/mergeClasses'

interface IBuyButton {
  productId?: string
  disabled?: boolean
  loading?: boolean
  onClickBuy: () => void
  onClickFavorite: () => void
}

const BuyButton = ({
  productId,
  disabled = false,
  loading = false,
  onClickBuy,
  onClickFavorite
}: IBuyButton) => {
  const { favotitesItemsData } = useStore()

  const isFavorite = useMemo(() => {
    return favotitesItemsData.some((item) => item.productId === productId)
  }, [productId, favotitesItemsData])

  return (
    <div className="flex gap-x-2 mt-10">
      <button
        type="submit"
        disabled={disabled || loading}
        className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white transition duration-200 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:pointer-events-none"
        onClick={onClickBuy}
      >
        Comprar
      </button>
      <button
        disabled={disabled || loading}
        className={mergeClasses(
          isFavorite
            ? 'border border-red-500 bg-red-500 hover:bg-red-600'
            : 'border border-transparent bg-gray-200 hover:bg-gray-300',
          'flex w-[50px] items-center justify-center rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:pointer-events-none'
        )}
        onClick={onClickFavorite}
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
