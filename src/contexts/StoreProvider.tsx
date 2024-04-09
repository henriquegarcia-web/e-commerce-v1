import React, { createContext, useContext, useEffect, useState } from 'react'

import { api } from '@/api'

import { IStoreContextData } from '@/@types/contexts'
import { ICategoryGroup, IProduct } from '@/@types/store'

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

  // ========================================================================

  useEffect(() => {
    fetchStoreData()
  }, [])

  // ========================================================================

  return (
    <StoreContext.Provider
      value={{
        storeDataIsLoading,
        categoriesData,
        productsData
      }}
    >
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
