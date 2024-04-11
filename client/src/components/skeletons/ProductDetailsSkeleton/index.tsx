import { IoChevronForward } from 'react-icons/io5'

const ProductDetailsSkeleton = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col gap-y-8 mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Detalhes do Produto</h2>

        <BreadcrumbSkeleton />

        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-2">
          <div className="relative flex flex-1">
            <div className="w-full pt-[100%] rounded-[4px] bg-gray-300 animate-pulse" />
          </div>
          <div className="flex flex-1 flex-col gap-y-6">
            <MainInfosSkeleton />
            <PriceSkeleton />
            <VariationsSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsSkeleton

// ============================================== BREADCRUMB SKELETON

const BreadcrumbSkeleton = () => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        <li>
          <div className="block transition hover:text-gray-700">
            <span className="sr-only"> Home </span>
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          </div>
        </li>

        <li className="rtl:rotate-180">
          <IoChevronForward className="text-sm text-gray-400" />
        </li>

        <li>
          <div className="block text-gray-400">
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
          </div>
        </li>

        <li className="rtl:rotate-180">
          <IoChevronForward className="text-sm text-gray-400" />
        </li>

        <li>
          <div className="block transition hover:text-gray-700">
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
          </div>
        </li>
      </ol>
    </nav>
  )
}

// ============================================== MAIN INFOS SKELETON

const MainInfosSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex justify-between items-center w-full mb-3">
        <div className="rounded-[4px] bg-gray-300 h-4 w-32 animate-pulse" />
        <div className="rounded-[4px] bg-gray-300 h-4 w-16 animate-pulse" />
      </div>
      <div className="rounded-[4px] bg-gray-300 h-8 w-[80%] animate-pulse" />
      <div className="flex items-center gap-x-2">
        <div className="rounded-[4px] h-4 w-12 bg-gray-300 animate-pulse" />
        <div className="rounded-[4px] bg-gray-300 h-4 w-12 animate-pulse" />
      </div>
    </div>
  )
}

// ============================================== MAIN INFOS SKELETON

interface IPriceSkeleton {
  mobile?: boolean
}

const PriceSkeleton = ({ mobile = false }: IPriceSkeleton) => {
  if (!mobile)
    return (
      <div className="flex flex-col gap-y-2">
        <div className="rounded-[4px] bg-gray-300 h-4 w-20 animate-pulse" />
        <div className="rounded-[4px] bg-gray-300 h-8 w-32 animate-pulse" />
        <div className="rounded-[4px] bg-gray-300 h-5 w-24 animate-pulse" />
      </div>
    )

  return (
    <div className="flex flex-col gap-y-2">
      <div className="rounded-[4px] bg-gray-300 h-3 w-10 animate-pulse" />
      <div className="rounded-[4px] bg-gray-300 h-6 w-24 animate-pulse" />
      <div className="rounded-[4px] bg-gray-300 h-3 w-16 animate-pulse" />
    </div>
  )
}

// ============================================== VARIATIONS SKELETON

const VariationsSkeleton = () => {
  const renderColorFilterSkeleton = () => {
    const filterOptions = []
    for (let i = 0; i < 3; i++) {
      filterOptions.push(
        <div
          key={`product-color-filter-${i}`}
          className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-300 animate-pulse"
        />
      )
    }
    return filterOptions
  }

  const renderSizeFilterSkeleton = () => {
    const filterOptions = []
    for (let i = 0; i < 4; i++) {
      filterOptions.push(
        <div
          key={`product-size-filter-${i}`}
          className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase bg-gray-200 text-gray-200 hover:bg-gray-200 focus:outline-none sm:flex-1 sm:py-6 animate-pulse select-none"
        >
          X
        </div>
      )
    }
    return filterOptions
  }

  return (
    <div className="mt-2">
      <div>
        <h3 className="text-sm font-medium text-gray-900">Cor</h3>

        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-3">
            {renderColorFilterSkeleton()}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
          <div className="text-sm font-medium text-teal-600 hover:text-teal-500">
            Guia de Tamanhos
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {renderSizeFilterSkeleton()}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="inline-flex justify-center w-full h-[50px] py-3 px-8 rounded-md text-gray-200 bg-gray-200 select-none" />
      </div>
    </div>
  )
}
