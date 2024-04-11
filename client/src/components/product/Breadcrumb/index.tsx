'use client'

import { useMemo } from 'react'
import Link from 'next/link'

import { GoHome } from 'react-icons/go'
import { IoChevronForward } from 'react-icons/io5'

import { useStore } from '@/contexts/StoreProvider'

import { ICategory } from '@/@types/store'

interface IBreadcrumb {
  category: ICategory | null
}

const Breadcrumb = ({ category }: IBreadcrumb) => {
  const { getBreadcrumb } = useStore()

  const breadcrumbsData = useMemo(() => {
    if (!category) return
    const breadcrumbs = getBreadcrumb(category?.id)

    return breadcrumbs
  }, [category])

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        <li>
          <Link href="" className="block transition hover:text-gray-700">
            <span className="sr-only"> Home </span>

            <GoHome className="text-lg text-gray-500" />
          </Link>
        </li>

        <li className="rtl:rotate-180">
          <IoChevronForward className="text-sm text-gray-400" />
        </li>

        <li>
          <p className="block text-gray-400">
            {' '}
            {breadcrumbsData?.categoryGroupName}{' '}
          </p>
        </li>

        <li className="rtl:rotate-180">
          <IoChevronForward className="text-sm text-gray-400" />
        </li>

        <li>
          <Link
            href={`/${category?.slug}`}
            className="block transition hover:text-gray-700"
          >
            {' '}
            {breadcrumbsData?.categoryName}{' '}
          </Link>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb
