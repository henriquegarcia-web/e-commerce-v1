import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { mergeClasses } from '@/utils/functions/mergeClasses'

const sortOptions = [
  { name: 'Nome A-Z', sortId: 'name-az' },
  { name: 'Nome Z-A', sortId: 'name-za' },
  { name: 'Melhor avaliados', sortId: 'rated-top' },
  { name: 'Menores preços', sortId: 'price-low' },
  { name: 'Maiores preços', sortId: 'price-high' }
]

interface ISort {
  selectedSortOption: string
  handleSortChange: (sortId: string) => void
}

const Sort = ({ selectedSortOption, handleSortChange }: ISort) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Ordenar
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-[15] mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => {
              const isSelectedSort = option.sortId === selectedSortOption

              return (
                <Menu.Item key={option.name}>
                  <button
                    className={mergeClasses(
                      isSelectedSort
                        ? 'bg-gray-200 font-medium text-gray-900'
                        : 'text-gray-500',
                      'w-full block px-4 py-2 text-sm transition duration-200 hover:bg-gray-100'
                    )}
                    onClick={() => handleSortChange(option.sortId)}
                  >
                    {option.name}
                  </button>
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Sort
