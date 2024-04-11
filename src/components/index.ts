// ==> COMMON COMPONENTS

import Alert from './common/Alert'
import Header from './common/Header'
import Footer from './common/Footer'
import Logo from './common/Logo'
import SearchBar from './common/SearchBar'
import MiniCart from './common/MiniCart'
import UserSettings from './common/UserSettings'
import IconButton from './common/IconButton'
import Modal from './common/Modal'
import Button from './common/Button'
import HeroBanner from './common/HeroBanner'
import OffersBanner from './common/OffersBanner'
import OfferBadge from './common/OfferBadge'

// ==> CATEGORY COMPONENTS

import { MobileFilters, DesktopFilters } from './category/Filters'
import ProductCard from './category/ProductCard'
import ProductCardPrice from './category/ProductCardPrice'
import ProductsList from './category/ProductsList'
import ProductListEmpty from './category/ProductListEmpty'
import Sort from './category/Sort'

// ==> PRODUCT COMPONENTS

import ProductInfos from './product/ProductInfos'
import Breadcrumb from './product/Breadcrumb'
import ProductImageSlider from './product/ProductImageSlider'
import ProductMainInfos from './product/ProductMainInfos'
import ProductPrice from './product/ProductPrice'
import ProductVariations from './product/ProductVariations'
import ProductRate from './product/ProductRate'
import ProductDetails from './product/ProductDetails'
import ProductReviews from './product/ProductReviews'
import BuyButton from './product/BuyButton'

// ==> SKELETONS

import ProductListSkeleton, {
  ProductListHeaderSkeleton
} from './skeletons/ProductListSkeleton'
import HeaderNavigationSkeleton from './skeletons/HeaderNavigationSkeleton'
import ProductDetailsSkeleton from './skeletons/ProductDetailsSkeleton'

// ==> EXPORTS

export {
  Alert,
  Header,
  Footer,
  Logo,
  SearchBar,
  MiniCart,
  UserSettings,
  IconButton,
  Modal,
  Button,
  HeroBanner,
  OffersBanner,
  OfferBadge,
  MobileFilters,
  DesktopFilters,
  ProductCard,
  ProductCardPrice,
  ProductsList,
  ProductListEmpty,
  Sort,
  ProductInfos,
  Breadcrumb,
  ProductImageSlider,
  ProductMainInfos,
  ProductPrice,
  ProductVariations,
  ProductRate,
  ProductDetails,
  ProductReviews,
  BuyButton,
  ProductListSkeleton,
  ProductListHeaderSkeleton,
  HeaderNavigationSkeleton,
  ProductDetailsSkeleton
}
