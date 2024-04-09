import { ProductImageSlider } from '@/components'

import { ICategory, IProduct } from '@/@types/store'

interface IProductDetails {
  activeCategory: ICategory | null
  activeProduct: IProduct | null
}

const ProductDetails = ({ activeCategory, activeProduct }: IProductDetails) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Detalhes do Produto</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2">
          <div className="flex flex-1">
            <ProductImageSlider imagesData={activeProduct?.images} />
          </div>
          <div className="flex flex-1 border-2 border-blue-800"></div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
