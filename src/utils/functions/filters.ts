import {
  IFilterColor,
  IFilterSize,
  IProduct,
  ProductListType
} from '@/@types/store'

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

const handleConvertToFilters = (
  colors: IFilterColor[],
  sizes: IFilterSize[]
) => {
  const colorOptions = colors.map((color) => ({
    value: color.variationId,
    label: color.name
  }))
  const sizeOptions = sizes.map((size) => ({
    value: size.variationId,
    label: size.size
  }))
  return [
    { id: 'color', name: 'Cor', options: colorOptions },
    { id: 'size', name: 'Tamanho', options: sizeOptions }
  ]
}

const handleGetColorFilter = (productsList: ProductListType) => {
  const allColors = productsList?.reduce(
    (acc: IFilterColor[], product: IProduct) => {
      product.variations.forEach((variation) => {
        if (!acc.some((c) => c.variationId === variation.variationId)) {
          acc.push({
            variationId: variation.variationId,
            name: variation.name,
            color: variation.color
          })
        }
      })
      return acc
    },
    []
  )

  return allColors
}

const handleGetSizeFilter = (productsList: ProductListType) => {
  const allSizes = productsList?.reduce(
    (acc: IFilterSize[], product: IProduct) => {
      product.variations.forEach((variation) => {
        variation.sizes.forEach((size) => {
          if (!acc.some((s) => s.variationId === size.variationId)) {
            acc.push({
              variationId: size.variationId,
              size: size.size
            })
          }
        })
      })
      return acc
    },
    []
  )

  return allSizes
}

const handleSortProductsList = (
  a: IProduct,
  b: IProduct,
  selectedSortOption: string
) => {
  switch (selectedSortOption) {
    case 'name-az':
      return a.name.localeCompare(b.name)
    case 'name-za':
      return b.name.localeCompare(a.name)
    case 'rated-top':
      return b.rating - a.rating
    case 'price-low':
      return a.price.price - b.price.price
    case 'price-high':
      return b.price.price - a.price.price
    default:
      return 0
  }
}

export {
  handleGetFilteredProducts,
  handleConvertToFilters,
  handleGetColorFilter,
  handleGetSizeFilter,
  handleSortProductsList
}
