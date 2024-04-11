'use client'

import { Button } from '@/components'
import { Disclosure } from '@headlessui/react'

import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

import { IFilter } from '@/@types/store'

// ============================================== DESKTOP FILTERS

interface IDesktopFilters {
  filters: IFilter[]
  selectedFilters: string[]
  handleFilterSelect: (filterValue: string) => void
  clearFilters: () => void
  applyFilters: () => void
}

const DesktopFilters = ({
  filters,
  selectedFilters,
  handleFilterSelect,
  clearFilters,
  applyFilters
}: IDesktopFilters) => {
  return (
    <form className="hidden lg:block">
      {filters?.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        onChange={() => handleFilterSelect(option.value)}
                        checked={selectedFilters.includes(option.value)}
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}

      <div className="flex flex-col w-full gap-y-2 mt-6">
        {!!selectedFilters.length && (
          <Button label="Remover filtros" inverted onClick={clearFilters} />
        )}
        <Button label="Aplicar" onClick={applyFilters} />
      </div>
    </form>
  )
}

// ============================================== MOBILE FILTERS

interface IMobileFilters {
  filters: IFilter[]
  selectedFilters: string[]
  handleFilterSelect: (filterValue: string) => void
  clearFilters: () => void
  applyFilters: () => void
}

const MobileFilters = ({
  filters,
  selectedFilters,
  handleFilterSelect,
  clearFilters,
  applyFilters
}: IMobileFilters) => {
  return (
    <form className="mt-4 border-t border-gray-200">
      {filters?.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-t border-gray-200 px-4 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-mx-2 -my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-6">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-mobile-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        onChange={() => handleFilterSelect(option.value)}
                        checked={selectedFilters.includes(option.value)}
                      />
                      <label
                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}

      <div className="flex flex-col w-full gap-y-2 p-4">
        {!!selectedFilters.length && (
          <Button label="Remover filtros" inverted onClick={clearFilters} />
        )}
        <Button label="Aplicar" onClick={applyFilters} />
      </div>
    </form>
  )
}

export { DesktopFilters, MobileFilters }
