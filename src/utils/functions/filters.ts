import { ProductListType } from '@/@types/store'

const handleGetFilteredProducts = (
  productsList: ProductListType,
  selectedFilters: string[]
) => {
  const filteredProducts = productsList?.filter((product) => {
    return selectedFilters.every((filter) => {
      const [type, value] = filter.split('-')

      if (type === 'color') {
        return product.variations.some(
          (variation) => variation.variationId === filter
        )
      }

      if (type === 'size') {
        return product.variations.some((variation) => {
          return variation.sizes.some((size) => size.variationId === filter)
        })
      }

      return false
    })
  })

  return filteredProducts
}

export { handleGetFilteredProducts }
