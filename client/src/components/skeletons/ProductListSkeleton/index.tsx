const ProductListSkeleton = () => {
  const renderProductListSkeleton = () => {
    const productCards = []
    for (let i = 0; i < 12; i++) {
      productCards.push(<ProductCardLoader key={`product-cards-${i}`} />)
    }
    return productCards
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {renderProductListSkeleton()}
    </div>
  )
}

export default ProductListSkeleton

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

const ProductListHeaderSkeleton = () => {
  return (
    <div className="rounded-[4px] text-transparent bg-gray-300 animate-pulse">
      Carregando
    </div>
  )
}

export { ProductListHeaderSkeleton }
