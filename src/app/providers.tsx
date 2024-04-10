'use client'

import '@/utils/styles/globals.css'

import { StoreProvider } from '@/contexts/StoreProvider'
import { CartProvider } from '@/contexts/CartProvider'

export function StoreProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <CartProvider>{children}</CartProvider>
    </StoreProvider>
  )
}
