'use client'

import { Header } from '@/components'

interface Props {
  params: {
    category: string
    product: string
  }
}

export default function ProductPage({ params }: Props) {
  const { category, product } = params

  return (
    <main className="page">
      <Header />
    </main>
  )
}
