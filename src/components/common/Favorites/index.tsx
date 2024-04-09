'use client'

import { useState } from 'react'

import { IconButton } from '@/components'
import { Dialog } from '@headlessui/react'

import { IoHeartOutline } from 'react-icons/io5'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface IFavorites {
  mobile?: boolean
}

const Favorites = ({ mobile = false }: IFavorites) => {
  const [favoritesIsOpen, setFavoritesIsOpen] = useState(false)

  return (
    <div className="">
      {!mobile ? (
        <IconButton
          label=""
          icon={<IoHeartOutline className="text-xl" />}
          onClick={() => setFavoritesIsOpen(true)}
        />
      ) : (
        <button
          onClick={() => setFavoritesIsOpen(true)}
          className="flex items-center gap-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          <IoHeartOutline className="text-2xl" />
          Favoritos
        </button>
      )}

      <Dialog as="div" open={favoritesIsOpen} onClose={setFavoritesIsOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              Favoritos
            </h2>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setFavoritesIsOpen(false)}
            >
              <span className="sr-only">Fechar Favoritos</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}

export default Favorites
