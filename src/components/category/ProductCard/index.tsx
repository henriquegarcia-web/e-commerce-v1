import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ProductCardPrice } from '@/components'

import { IProduct } from '@/@types/store'

interface IProductCard {
  productInfos: IProduct
}

const ProductCard = ({ productInfos }: IProductCard) => {
  const pathname = usePathname()

  return (
    <Link href={`${pathname}/${productInfos.slug}`} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={productInfos.images[0].url}
          alt={productInfos.images[0].alt}
          className="transition duration-200 h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 mb-1 text-sm text-gray-700">{productInfos.name}</h3>
      <ProductCardPrice priceInfos={productInfos.price} />
    </Link>
  )
}

export default ProductCard
