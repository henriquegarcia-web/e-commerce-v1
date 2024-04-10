// ======================================= CATEGORY TYPES

export type ProductListType = IProduct[] | null

export interface ISort {}

export interface IFilterColor {
  variationId: string
  name: string
  color: string
}

export interface IFilterSize {
  variationId: string
  size: string
}

export interface IFilterOption {
  value: string
  label: string
}

export interface IFilter {
  id: string
  name: string
  options: IFilterOption[]
}

export interface ICategory {
  id: string
  slug: string
  name: string
  active: boolean
}

export interface ICategoryGroup {
  id: string
  name: string
  categories: ICategory[]
  active: boolean
}

// ======================================= PRODUCT TYPES

export interface IBreadcrumbData {
  categoryGroupName: string
  categoryName: string | null
}

export interface IProductMainInfo {
  sku: string
  name: string
  brand: string
  rating: {
    rate: number
    totalReviews: number
  }
}

export interface IFormattedPrice {
  isOffer: boolean
  mainPrice: string
  installmentsPrice: string
  cashPrice: string
}

export interface IPrice {
  price: number
  sale: {
    active: boolean
    discount: number
    price: number
    description: string
  }
}

export interface IImage {
  id: string
  url: string
  alt: string
}

export interface IReview {
  id: string
  author: string
  rating: number
  review: string
}

export interface ISize {
  id: string
  variationId: string
  size: string
  stock: number
}

export interface IVariation {
  id: string
  variationId: string
  name: string
  color: string
  sizes: ISize[]
}

export interface IProduct {
  id: string
  category: string
  sku: string
  available: boolean
  name: string
  slug: string
  description: string
  price: IPrice
  images: IImage[]
  brand: string
  tags: string[]
  rating: number
  reviews: IReview[]
  variations: IVariation[]
}

// ======================================= COMMON TYPES

export interface ICartProduct {
  productId: string
  name: string
  image: string
  price: string
  color: IVariation
  size: IFilterSize
  quantity: 1
}

export interface IFavoriteProduct {
  productId: string
}
