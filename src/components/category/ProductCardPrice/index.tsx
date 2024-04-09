import { useMemo } from 'react'

import { formatCurrency } from '@/utils/functions/formatCurrency'

import { IPrice } from '@/@types/store'

const installments = process.env.NEXT_PUBLIC_INSTALLMENTS || '10'
const cash_discount = process.env.NEXT_PUBLIC_CASH_DISCOUNT || '10'

interface IProductCardPrice {
  priceInfos: IPrice
}

const ProductCardPrice = ({ priceInfos }: IProductCardPrice) => {
  const formattedPrice = useMemo(() => {
    const isOffer = priceInfos.sale.active

    const discountMultiplier = (100 - priceInfos.sale.discount) / 100
    const mainPrice = isOffer
      ? priceInfos.price * discountMultiplier
      : priceInfos.price

    const installmentsPrice = mainPrice / parseInt(installments)
    const cashPrice = mainPrice - parseInt(cash_discount)

    return {
      isOffer,
      mainPrice: formatCurrency(mainPrice),
      installmentsPrice: `${installments} x de ${formatCurrency(installmentsPrice)}`,
      cashPrice: `ou ${formatCurrency(cashPrice)} à vista`
    }
  }, [])

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
