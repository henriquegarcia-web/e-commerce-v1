import React, { createContext, useContext, useEffect, useState } from 'react'

import { api } from '@/api'

import { IStoreContextData } from '@/@types/contexts'
import { ICategoryGroup } from '@/@types/store'

export const StoreContext = createContext<IStoreContextData>(
  {} as IStoreContextData
)

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryGroupData, setCategoryGroupData] = useState<
    ICategoryGroup[] | null
  >(null)

  const fetchCategories = async () => {
    await api
      .get('/categories')
      .then((response) => {
        setCategoryGroupData(response.data)
      })
      .catch(() => {
        setCategoryGroupData(null)
      })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <StoreContext.Provider
      value={{
        categoryGroupData
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
