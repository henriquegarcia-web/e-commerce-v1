'use client'

import React, { Fragment, useEffect, useMemo, useState } from 'react'

import {
  DesktopFilters,
  MobileFilters,
  ProductCard,
  ProductListEmpty,
  ProductListHeaderSkeleton,
  ProductListSkeleton,
  Sort
} from '@/components'
import { Dialog, Transition } from '@headlessui/react'

import { FunnelIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'

import {
  handleConvertToFilters,
  handleGetColorFilter,
  handleGetFilteredProducts,
  handleGetSizeFilter,
  handleSortProductsList
} from '@/utils/functions/filters'

import { useStore } from '@/contexts/StoreProvider'

import { ICategory, IProduct, ProductListType } from '@/@types/store'
import { SetStateBooleanType } from '@/@types/globals'

interface IProductsList {
  activeCategory?: ICategory | null
  searchTerm?: string | null
}

const ProductsList = ({ activeCategory, searchTerm }: IProductsList) => {
  const { handleFilterProducts, handleFindProductsListByCategoryId } =
    useStore()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [loadingFilters, setLoadingFilters] = useState(false)

  const [productsList, setProductsList] = useState<ProductListType>(null)
  const [currentProductsList, setCurrentProductsList] =
    useState<ProductListType>(null)

  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedSortOption, setSelectedSortOption] = useState('name-az')

  useEffect(() => {
    if (!!searchTerm) {
      const filteredProductsList = handleFilterProducts(searchTerm)
      setProductsList(filteredProductsList)
      return
    }

    if (!activeCategory) {
      setProductsList([])
      return
    }

    const products = handleFindProductsListByCategoryId(activeCategory.id)
    setProductsList(products)
  }, [
    searchTerm,
    activeCategory,
    handleFilterProducts,
    handleFindProductsListByCategoryId
  ])

  useEffect(() => {
    setCurrentProductsList(productsList)
  }, [productsList])

  // ============================================================ FILTROS

  const handleApplyFilters = () => {
    setLoadingFilters(true)
    setTimeout(() => {
      const filteredProducts = handleGetFilteredProducts(
        productsList,
        selectedFilters
      )
      setCurrentProductsList(filteredProducts || productsList)
      setLoadingFilters(false)
    }, 2000)
  }

  const handleClearFilters = () => {
    setLoadingFilters(true)
    setTimeout(() => {
      setSelectedFilters([])
      setCurrentProductsList(productsList)
      setLoadingFilters(false)
    }, 2000)
  }

  const handleFilterSelect = (filterValue: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filterValue)) {
        return prevFilters.filter((filter) => filter !== filterValue)
      } else {
        return [...prevFilters, filterValue]
      }
    })
  }

  const filters = useMemo(() => {
    const filterColors = handleGetColorFilter(productsList)
    const filterSizes = handleGetSizeFilter(productsList)

    return handleConvertToFilters(filterColors || [], filterSizes || [])
  }, [productsList])

  const sortedProductsList = useMemo(() => {
    if (!currentProductsList) return null

    return currentProductsList
      .slice()
      .sort((a, b) => handleSortProductsList(a, b, selectedSortOption))
  }, [currentProductsList, selectedSortOption])

  const handleSortChange = (sortId: string) => {
    setSelectedSortOption(sortId)
  }

  // ============================================================

  const isProductListLoading =
    (!activeCategory && !searchTerm) || !currentProductsList

  console.log(isProductListLoading)

  return (
    <div className="bg-white">
      <div>
        <MobileModalFilters
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        >
          <MobileFilters
            loadingFilters={loadingFilters}
            filters={filters}
            selectedFilters={selectedFilters}
            handleFilterSelect={handleFilterSelect}
            handleClearFilters={handleClearFilters}
            handleApplyFilters={handleApplyFilters}
          />
        </MobileModalFilters>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {isProductListLoading ? (
                <ProductListHeaderSkeleton />
              ) : !!searchTerm ? (
                'Resultados'
              ) : (
                activeCategory?.name
              )}
            </h1>

            <div className="z-15 flex items-center">
              <Sort
                selectedSortOption={selectedSortOption}
                handleSortChange={handleSortChange}
              />

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-2">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilters
                loadingFilters={loadingFilters}
                filters={filters}
                selectedFilters={selectedFilters}
                handleFilterSelect={handleFilterSelect}
                handleClearFilters={handleClearFilters}
                handleApplyFilters={handleApplyFilters}
              />
              <div className="lg:col-span-3">
                {isProductListLoading ? (
                  <ProductListSkeleton />
                ) : !!sortedProductsList?.length ? (
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {sortedProductsList?.map((product: IProduct) => (
                      <ProductCard key={product.id} productInfos={product} />
                    ))}
                  </div>
                ) : (
                  <ProductListEmpty />
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default ProductsList

// ============================================== MOBILE MODAL FILTERS

interface IMobileModalFilters {
  mobileFiltersOpen: boolean
  setMobileFiltersOpen: SetStateBooleanType
  children: React.ReactNode
}

const MobileModalFilters = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  children
}: IMobileModalFilters) => {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
