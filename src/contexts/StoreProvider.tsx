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
import { ICategoryGroup, IPrice, IProduct } from '@/@types/store'

const installments = process.env.NEXT_PUBLIC_INSTALLMENTS || '10'
const cash_discount = process.env.NEXT_PUBLIC_CASH_DISCOUNT || '10'

export const StoreContext = createContext<IStoreContextData>(
  {} as IStoreContextData
)

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  // ========================================================================

  const [storeDataIsLoading, setStoreDataIsLoading] = useState<boolean>(false)

  const [categoriesData, setCategoryGroupData] = useState<
    ICategoryGroup[] | null
  >(null)
  const [productsData, setProductsData] = useState<IProduct[] | null>(null)

  // ========================================================================

  const fetchStoreData = async () => {
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

  const findCategoryBySlug = useCallback(
    (slug: string | null) => {
      if (!categoriesData || !slug) return null

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
    [categoriesData]
  )

  const findProductsListByCategoryId = useCallback(
    (categoryId: string | null) => {
      if (!productsData || !categoryId) return []

      const products = productsData.filter((p) =>
        p.category.includes(categoryId)
      )

      return products
    },
    [productsData]
  )

  const findProductBySlug = useCallback(
    (slug: string | null) => {
      if (!productsData || !slug) return null

      const foundProduct = productsData.find((p) => p.slug === slug)

      return foundProduct || null
    },
    [productsData]
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

  const formatPrice = (priceInfos: IPrice) => {
    const isOffer = priceInfos.sale.active

    const discountMultiplier = (100 - priceInfos.sale.discount) / 100
    const mainPrice = isOffer
      ? priceInfos.price * discountMultiplier
      : priceInfos.price

    const installmentsPrice = mainPrice / parseInt(installments)
    const cashPrice = mainPrice - parseInt(cash_discount)

    return {
      isOffer,
      mainPrice: formatCurrency(mainPrice),
      installmentsPrice: `${installments} x de ${formatCurrency(installmentsPrice)}`,
      cashPrice: `ou ${formatCurrency(cashPrice)} à vista`
    }
  }

  // ========================================================================

  useEffect(() => {
    fetchStoreData()
  }, [])

  // ========================================================================

  const StoreContextData: IStoreContextData = useMemo(() => {
    return {
      storeDataIsLoading,
      categoriesData,
      productsData,
      findCategoryBySlug,
      findProductsListByCategoryId,
      findProductBySlug,
      getBreadcrumb,
      formatPrice
    }
  }, [
    storeDataIsLoading,
    categoriesData,
    productsData,
    findCategoryBySlug,
    findProductsListByCategoryId,
    findProductBySlug,
    getBreadcrumb
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
