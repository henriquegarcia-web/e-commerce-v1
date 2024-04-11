import { ProductRate } from '@/components'

import { IProductMainInfo } from '@/@types/store'

interface IProductMainInfos {
  productMainInfos: IProductMainInfo | null
}

const ProductMainInfos = ({ productMainInfos }: IProductMainInfos) => {
  if (!productMainInfos) return <></>

  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex justify-between items-center w-full mb-2">
        <span className="text-sm font-semibold text-gray-600">
          {productMainInfos.brand}
        </span>
        <p className="text-xs text-gray-400">SKU {productMainInfos.sku}</p>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">
        {productMainInfos.name}
      </h2>
      <div className="flex items-center gap-x-2">
        <ProductRate rating={productMainInfos.rating.rate} />
        <p className="text-xs text-gray-400 leading-tight">
          {productMainInfos.rating.totalReviews} reviews
        </p>
      </div>
    </div>
  )
}

export default ProductMainInfos
