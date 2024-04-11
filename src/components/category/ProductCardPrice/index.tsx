'use client'

import { useStore } from '@/contexts/StoreProvider'

import { IPrice } from '@/@types/store'

interface IProductCardPrice {
  priceInfos: IPrice
}

const ProductCardPrice = ({ priceInfos }: IProductCardPrice) => {
  const { handleFormatPrice } = useStore()

  const formattedPrice = handleFormatPrice(priceInfos)

  return (
    <div className="flex flex-col gap-y-[2px]">
      <p className="text-lg font-extrabold text-gray-900">
        {formattedPrice.mainPrice}
      </p>
      <p className="text-xs font-medium text-gray-500">
        {formattedPrice.installmentsPrice}
      </p>
      <p className="text-sm font-medium text-gray-700">
        {formattedPrice.cashPrice}
      </p>
    </div>
  )
}

export default ProductCardPrice
