'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { Header, ProductsList } from '@/components'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get('busca')

  return (
    <main className="page">
      <Header />
      <Suspense fallback={<div>Carregando...</div>}>
        <ProductsList searchTerm={search} />
      </Suspense>
    </main>
  )
}
