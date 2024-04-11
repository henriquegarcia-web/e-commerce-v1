import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ProductCardPrice } from '@/components'

import { IProduct } from '@/@types/store'

interface IProductCard {
  productInfos: IProduct
}

const ProductCard = ({ productInfos }: IProductCard) => {
  const offerDetails = useMemo(() => {
    return {
      offerActive: productInfos.price.sale.active,
      offerLabel: `${productInfos.price.sale.discount}% de desconto`,
      offerDescription: productInfos.price.sale.description
    }
  }, [])

  return (
    <Link
      href={`${productInfos.categorySlug}/${productInfos.slug}`}
      className="group"
    >
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        {offerDetails.offerActive && (
          <span className="absolute z-10 left-1 top-1 px-3 py-1 rounded-[6px] bg-orange-400 text-xs  text-white font-semibold">
            {offerDetails.offerLabel}
          </span>
        )}
        <Image
          src={productInfos.images[0].url}
          alt={productInfos.images[0].alt}
          width={500}
          height={500}
          className="transition duration-200 h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 mb-1 text-sm text-gray-700">{productInfos.name}</h3>
      <ProductCardPrice priceInfos={productInfos.price} />
    </Link>
  )
}

export default ProductCard
