import { useStore } from '@/contexts/StoreProvider'

import { IPrice } from '@/@types/store'

interface IProductPrice {
  priceInfos?: IPrice | null
}

const ProductPrice = ({ priceInfos }: IProductPrice) => {
  const { formatPrice } = useStore()

  if (!priceInfos) return <></>

  const formattedPrice = formatPrice(priceInfos)

  return (
    <div className="flex flex-col gap-y-[2px]">
      <p className="text-3xl font-extrabold text-gray-900 mb-1">
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

export default ProductPrice
