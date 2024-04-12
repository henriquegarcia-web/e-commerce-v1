'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { api } from '@/api'

import { formatCurrency } from '@/utils/functions/formatCurrency'

import { IStoreContextData } from '@/@types/contexts'
import {
  IAlert,
  ICategoryGroup,
  IFavoriteProduct,
  IPrice,
  IProduct
} from '@/@types/store'

const installments = process.env.NEXT_PUBLIC_INSTALLMENTS || '10'
const cash_discount = process.env.NEXT_PUBLIC_CASH_DISCOUNT || '10'

export const StoreContext = createContext<IStoreContextData>(
  {} as IStoreContextData
)

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  // ========================================================================

  const [alertData, setAlertData] = useState<IAlert | null>(null)

  const [storeDataIsLoading, setStoreDataIsLoading] = useState<boolean>(false)

  const [categoriesData, setCategoryGroupData] = useState<
    ICategoryGroup[] | null
  >(null)
  const [productsData, setProductsData] = useState<IProduct[] | null>(null)

  const [favotitesItemsData, setFavoritesItemsData] = useState<
    IFavoriteProduct[]
  >([])

  // ======================================================================== ALERTS

  const handleShowAlert = ({ type, title, legend }: IAlert) => {
    setAlertData({ type, title, legend })
    setTimeout(() => {
      setAlertData(null)
    }, 3000)
  }

  // ======================================================================== PRODUCTS

  const handleFetchStoreData = async () => {
    try {
      setStoreDataIsLoading(true)

      const [categoriesResponse, productsResponse] = await Promise.all([
        api.get('/categories'),
        api.get('/products')
      ])

      setCategoryGroupData(categoriesResponse.data)
      setProductsData(productsResponse.data)
    } catch (error) {
      console.error('Erro ao obter dados da loja:', error)
      setCategoryGroupData(null)
      setProductsData(null)
    } finally {
      setStoreDataIsLoading(false)
    }
  }

  const handleFindCategoryBySlug = useCallback(
    (slug: string, categoriesData: ICategoryGroup[]) => {
      const categoryGroup = categoriesData.find((group) =>
        group.categories.find((c) => c.slug === slug)
      )

      if (categoryGroup) {
        const foundCategory = categoryGroup.categories.find(
          (c) => c.slug === slug
        )
        return foundCategory || null
      }

      return null
    },
    []
  )

  const handleFindProductsListByCategoryId = useCallback(
    (categoryId: string | null) => {
      if (!productsData || !categoryId) return []

      const products = productsData.filter((p) =>
        p.category.includes(categoryId)
      )

      return products
    },
    [productsData]
  )

  const handleFindProductBySlug = useCallback(
    (slug: string, productsData: IProduct[]) => {
      const foundProduct = productsData.find((p) => p.slug === slug)

      return foundProduct || null
    },
    []
  )

  const getBreadcrumb = useCallback(
    (categoryId: string | null) => {
      if (!categoriesData || !categoryId) return null

      const categoryGroup = categoriesData.find((g) =>
        g.categories.find((c) => c.id === categoryId)
      )

      if (categoryGroup) {
        const foundCategory = categoryGroup.categories.find(
          (c) => c.id === categoryId
        )
        return {
          categoryGroupName: categoryGroup.name,
          categoryName: foundCategory ? foundCategory.name : null
        }
      }

      return null
    },
    [categoriesData]
  )

  const handleFormatPrice = (priceInfos: IPrice) => {
    const isOffer = priceInfos.sale.active

    const discountMultiplier = (100 - priceInfos.sale.discount) / 100
    const mainPrice = isOffer
      ? priceInfos.price * discountMultiplier
      : priceInfos.price

    const installmentsPrice = mainPrice / parseInt(installments)
    const cashPrice = mainPrice - parseInt(cash_discount)

    return {
      isOffer,
      offerDiscount: priceInfos.sale.discount,
      offerDescription: priceInfos.sale.description,
      offerPrice: `De ${formatCurrency(priceInfos.price)} por`,
      mainPrice: formatCurrency(mainPrice),
      installmentsPrice: `${installments} x de ${formatCurrency(installmentsPrice)}`,
      cashPrice: `ou ${formatCurrency(cashPrice)} à vista`
    }
  }

  const handleFilterProducts = useCallback(
    (searchTerm: string) => {
      if (!productsData || !searchTerm) return null

      return productsData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    },
    [productsData]
  )

  // ======================================================================== FAVORITES

  const handleGetFavoritesItems = () => {
    let favoritesItems = []
    const storedCart = localStorage.getItem('favoritesItems')
    if (storedCart) {
      favoritesItems = JSON.parse(storedCart)
    }
    setFavoritesItemsData(favoritesItems)
  }

  const handleDeleteFavoriteItem = (productId: string) => {
    const storedCart = JSON.parse(
      localStorage.getItem('favoritesItems') || '[]'
    )

    const filteredFavorites = storedCart.filter(
      (item: IFavoriteProduct) => item.productId !== productId
    )

    localStorage.setItem('favoritesItems', JSON.stringify(filteredFavorites))

    setFavoritesItemsData(filteredFavorites)
  }

  const isProductInFavorites = (productId: string) => {
    const storedCart = JSON.parse(
      localStorage.getItem('favoritesItems') || '[]'
    )

    return storedCart.some(
      (item: IFavoriteProduct) => item.productId === productId
    )
  }

  const handleAddProductToFavorites = (activeProduct: IProduct | null) => {
    if (!activeProduct) {
      throw new Error('Produto inexistente')
    }

    const storedCart = JSON.parse(
      localStorage.getItem('favoritesItems') || '[]'
    )

    const isExistingFavorite = isProductInFavorites(activeProduct.id)

    if (isExistingFavorite) {
      handleDeleteFavoriteItem(activeProduct.id)
    } else {
      const updatedFavorites: IFavoriteProduct[] = [
        ...storedCart,
        { productId: activeProduct.id }
      ]
      localStorage.setItem('favoritesItems', JSON.stringify(updatedFavorites))
      setFavoritesItemsData(updatedFavorites)
    }
  }

  // ========================================================================

  useEffect(() => {
    handleFetchStoreData()
    handleGetFavoritesItems()
  }, [])

  // ========================================================================

  const StoreContextData: IStoreContextData = useMemo(() => {
    return {
      alertData,
      handleShowAlert,
      storeDataIsLoading,
      categoriesData,
      productsData,
      handleFindCategoryBySlug,
      handleFindProductsListByCategoryId,
      handleFindProductBySlug,
      handleFilterProducts,
      getBreadcrumb,
      handleFormatPrice,
      handleDeleteFavoriteItem,
      handleAddProductToFavorites,
      handleGetFavoritesItems,
      favotitesItemsData
    }
  }, [
    alertData,
    storeDataIsLoading,
    categoriesData,
    productsData,
    handleFindCategoryBySlug,
    handleFindProductsListByCategoryId,
    handleFindProductBySlug,
    handleFilterProducts,
    getBreadcrumb,
    favotitesItemsData
  ])

  return (
    <StoreContext.Provider value={StoreContextData}>
      {children}
    </StoreContext.Provider>
  )
}

function useStore(): IStoreContextData {
  const context = useContext(StoreContext)

  if (!context) throw new Error('useAuth must be used within a UserProvider')

  return context
}

export { StoreProvider, useStore }
