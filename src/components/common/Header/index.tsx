'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { Logo, MiniCart, SearchBar } from '@/components'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'

import { useStore } from '@/contexts/StoreProvider'

import { mergeClasses } from '@/utils/functions/mergeClasses'

import { ICategory, ICategoryGroup } from '@/@types/store'
import { SetStateBooleanType } from '@/@types/globals'

const Header = () => {
  const { categoriesData } = useStore()

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  return (
    <header className="z-[100] flex flex-col items-center bg-transparent">
      <nav
        className="flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8"
        aria-label="Main Header"
      >
        {/* ================================================= LOGO */}

        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HIGH Company</span>
            <Logo />
          </Link>
        </div>

        {/* ================================================= MOBILE TOGGLE */}

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* ================================================= DESKTOP NAVIGATION */}

        <div className="hidden lg:flex w-full max-w-[380px]">
          <SearchBar />
        </div>

        {/* ================================================= DESKTOP OPTIONS */}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-2">
          <MiniCart />
        </div>
      </nav>

      <nav
        className="hidden lg:flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Navigation Header"
      >
        <DesktopNavigation categoriesData={categoriesData} />
      </nav>

      {/* ================================================= MOBILE HEADER */}

      <HeaderMobile
        mobileMenuIsOpen={mobileMenuIsOpen}
        setMobileMenuIsOpen={setMobileMenuIsOpen}
        categoriesData={categoriesData}
      />
    </header>
  )
}

export default Header

// ============================================== DESKTOP NAVIGATION

interface IDesktopNavigation {
  categoriesData: ICategoryGroup[] | null
}

const DesktopNavigation = ({ categoriesData }: IDesktopNavigation) => {
  return (
    <Popover.Group className="flex lg:gap-x-8">
      {categoriesData?.map((categoryGroup: ICategoryGroup) => {
        const isDisabledCategoryGroup =
          !categoryGroup.categories.length || !categoryGroup.active

        return (
          <Popover key={categoryGroup.id} className="relative">
            <Popover.Button
              disabled={isDisabledCategoryGroup}
              className={mergeClasses(
                isDisabledCategoryGroup ? 'text-gray-400' : 'text-gray-900',
                'flex items-center gap-x-1 text-sm font-semibold leading-6 focus-visible:outline-none'
              )}
            >
              {categoryGroup.name}
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-full z-10 mt-2 w-auto min-w-[240px] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-2">
                  {categoryGroup?.categories?.map((category: ICategory) => {
                    const isDisabledCategory = !category.active

                    return (
                      <div
                        key={category.id}
                        className="group relative flex items-center rounded-lg p-2 pl-3 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <Link
                            href={`/${category.slug}`}
                            className={mergeClasses(
                              isDisabledCategory
                                ? 'text-gray-400 pointer-events-none'
                                : 'text-gray-900',
                              'block font-semibold'
                            )}
                          >
                            {category.name}
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        )
      })}

      <Link
        href="/ofertas"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Ofertas
      </Link>
    </Popover.Group>
  )
}

// ============================================== HEADER MOBILE

interface IHeaderMobile {
  mobileMenuIsOpen: boolean
  setMobileMenuIsOpen: SetStateBooleanType
  categoriesData: ICategoryGroup[] | null
}

export const HeaderMobile = ({
  mobileMenuIsOpen,
  setMobileMenuIsOpen,
  categoriesData
}: IHeaderMobile) => {
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuIsOpen}
      onClose={setMobileMenuIsOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HIGH Company</span>
            <Logo />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuIsOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <SearchBar />

              {categoriesData?.map((categoryGroup: ICategoryGroup) => {
                const isDisabledCategoryGroup =
                  !categoryGroup.categories.length || !categoryGroup.active

                return (
                  <Disclosure
                    key={categoryGroup.name}
                    as="div"
                    className="-mx-3"
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          disabled={isDisabledCategoryGroup}
                          className={mergeClasses(
                            isDisabledCategoryGroup
                              ? 'text-gray-400'
                              : 'text-gray-900',
                            'flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50'
                          )}
                        >
                          {categoryGroup.name}
                          <ChevronDownIcon
                            className={mergeClasses(
                              open ? 'rotate-180' : '',
                              'h-5 w-5 flex-none'
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {categoryGroup?.categories?.map(
                            (category: ICategory) => {
                              const isDisabledCategory = !category.active

                              return (
                                <Disclosure.Button
                                  key={category.name}
                                  as="a"
                                  href={`/${category.slug}`}
                                  disabled={isDisabledCategory}
                                  className={mergeClasses(
                                    isDisabledCategory
                                      ? 'text-gray-400 pointer-events-none'
                                      : 'text-gray-900',
                                    'block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50'
                                  )}
                                >
                                  {category.name}
                                </Disclosure.Button>
                              )
                            }
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              })}
              <Link
                href="/ofertas"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Ofertas
              </Link>
            </div>
            <div className="py-6">
              <MiniCart mobile />
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
