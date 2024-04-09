'use client'

import '@/utils/styles/globals.css'

import { StoreProvider } from '@/contexts/StoreProvider'

export function StoreProviders({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>
}
