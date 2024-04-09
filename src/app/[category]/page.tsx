'use client'

import { Header } from '@/components'

interface Props {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: Props) {
  const { category } = params

  return (
    <main className="page">
      <Header />
    </main>
  )
}
