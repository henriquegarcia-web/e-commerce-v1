import {
  IBreadcrumbData,
  ICartProduct,
  ICategory,
  ICategoryGroup,
  IFilterSize,
  IFormattedPrice,
  IPrice,
  IProduct,
  IVariation
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
  getBreadcrumb: (categoryId: string) => IBreadcrumbData | null
}

export interface ICartContextData {
  cartItemsData: ICartProduct[]
  handleAddProductToCart: (
    activeProduct: IProduct | null,
    filterSelectedColor: IVariation | null,
    filterSelectedSize: IFilterSize | null
  ) => void
  handleGetCartItems: () => void
  handleDeleteCartItem: (productId: string, color: string, size: string) => void
  cartTotalPrice: string
}
