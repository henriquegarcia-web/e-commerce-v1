import {
  IAlert,
  IBreadcrumbData,
  ICartProduct,
  ICategory,
  ICategoryGroup,
  IFavoriteProduct,
  IFilterSize,
  IFormattedPrice,
  IPrice,
  IProduct,
  IVariation
} from '@/@types/store'

// ======================================= STORE CONTEXT

export interface IStoreContextData {
  alertData: IAlert | null
  handleShowAlert: ({ type, title, legend }: IAlert) => void
  storeDataIsLoading: boolean
  categoriesData: ICategoryGroup[] | null
  productsData: IProduct[] | null
  handleFindCategoryBySlug: (
    slug: string,
    categoriesData: ICategoryGroup[]
  ) => ICategory | null
  handleFindProductsListByCategoryId: (
    categoryId: string | null
  ) => IProduct[] | null
  handleFindProductBySlug: (
    slug: string,
    productsData: IProduct[]
  ) => IProduct | null
  handleFilterProducts: (searchTerm: string) => IProduct[] | null
  handleFormatPrice: (priceInfos: IPrice) => IFormattedPrice
  getBreadcrumb: (categoryId: string) => IBreadcrumbData | null
  handleAddProductToFavorites: (activeProduct: IProduct | null) => void
  handleDeleteFavoriteItem: (productId: string) => void
  handleGetFavoritesItems: () => void
  favotitesItemsData: IFavoriteProduct[]
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
