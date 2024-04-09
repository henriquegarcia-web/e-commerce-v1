import {
  ICategory,
  ICategoryGroup,
  IFormattedPrice,
  IPrice,
  IProduct
} from '@/@types/store'

// ======================================= STORE CONTEXT

export interface IStoreContextData {
  storeDataIsLoading: boolean
  categoriesData: ICategoryGroup[] | null
  productsData: IProduct[] | null
  findCategoryBySlug: (slug: string | null) => ICategory | null
  findProductsListByCategoryId: (categoryId: string | null) => IProduct[] | null
  findProductBySlug: (slug: string | null) => IProduct | null
  formatPrice: (priceInfos: IPrice) => IFormattedPrice
}
