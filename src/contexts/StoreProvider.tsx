import React, { createContext, useContext, useState } from 'react'

import { IStoreContextData } from '@/@types/contexts'

export const StoreContext = createContext<IStoreContextData>(
  {} as IStoreContextData
)

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [storeData, setStoreData] = useState(false)

  return (
    <StoreContext.Provider
      value={{
        storeData
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
