import { FunnelIcon } from '@heroicons/react/20/solid'

const ProductListSkeleton = () => {
  const renderProductListSkeleton = () => {
    const productCards = []
    for (let i = 0; i < 12; i++) {
      productCards.push(<ProductCardLoader key={`product-cards-${i}`} />)
    }
    return productCards
  }

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              <ProductListHeaderSkeleton />
            </h1>

            <div className="z-15 flex items-center">
              <div className="h-6 w-24 bg-gray-300 animate-pulse"></div>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-2">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <FiltersSkeleton />
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {renderProductListSkeleton()}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default ProductListSkeleton

// ============================================== FILTERS LOADER

const FiltersSkeleton = () => {
  return (
    <div className="hidden lg:block">
      {[1, 2].map((_, index) => (
        <div
          key={index}
          className="border-b border-gray-200 py-6 animate-pulse"
        >
          <div className="-my-3 flow-root">
            <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <div className="font-medium text-gray-900 h-6 w-2/3 bg-gray-300 rounded"></div>
              <div className="ml-6 flex items-center">
                <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="space-y-4">
              {[1, 2, 3].map((_, optionIdx) => (
                <div key={optionIdx} className="flex items-center">
                  <div className="h-4 w-4 rounded border-gray-300 bg-gray-300"></div>
                  <div className="ml-3 text-sm text-gray-600 h-4 w-20 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col w-full gap-y-2 mt-6">
        <div className="h-10 w-48 bg-gray-300 animate-pulse"></div>
        <div className="h-10 w-48 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  )
}

// ============================================== PRODUCT CARD LOADER

const ProductCardLoader = () => {
  return (
    <div className="group bg-gray-100 p-2 rounded-lg">
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 ">
        <div className="h-[200px] w-full bg-gray-300 animate-pulse"></div>
      </div>
      <div className="mt-4 mb-2 text-sm text-gray-700 bg-gray-300 h-5 w-[85%] animate-pulse"></div>
      <div className="mt-4 mb-1 text-sm text-gray-700 bg-gray-300 h-3 w-10 animate-pulse"></div>
      <div className="mt-1 mb-2 text-sm text-gray-700 bg-gray-300 h-6 w-24 animate-pulse"></div>
      <div className="mt-1 mb-2 text-sm text-gray-700 bg-gray-300 h-3 w-16 animate-pulse"></div>
    </div>
  )
}

// ============================================== PRODUCT LIST HEADER LOADER

const ProductListHeaderSkeleton = () => {
  return (
    <div className="rounded-[4px] text-transparent bg-gray-300 animate-pulse">
      Carregando
    </div>
  )
}

export { ProductListHeaderSkeleton }
