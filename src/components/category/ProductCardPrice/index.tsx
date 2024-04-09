import { IPrice } from '@/@types/store'

interface IProductCardPrice {
  priceInfos: IPrice
}

const ProductCardPrice = ({ priceInfos }: IProductCardPrice) => {
  return (
    <div className="flex flex-col">
      <p className="mt-1 text-lg font-medium text-gray-900">
        {/* {productInfos.price} */}
        R$ 199.00
      </p>
    </div>
  )
}

export default ProductCardPrice
