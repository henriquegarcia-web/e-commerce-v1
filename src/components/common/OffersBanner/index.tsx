'use client'

import Image from 'next/image'
import Link from 'next/link'

const OffersBanner = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
          <Image src="/banner.webp" width={500} height={500} alt="Banner" />
        </div>

        <div className="lg:py-24">
          <h2 className="text-gray-800 text-3xl font-bold sm:text-4xl">
            Ofertas Imperdíveis!
          </h2>

          <p className="mt-4 text-gray-600">
            Encontre os melhores descontos em moda feminina, masculina e
            infantil. Não perca tempo, atualize seu guarda-roupa agora!
          </p>

          <Link
            href="/camisetas"
            className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            Ver camisetas
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OffersBanner
