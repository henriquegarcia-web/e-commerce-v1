'use client'

import { Fragment, useEffect, useState } from 'react'

import { IoCartOutline } from 'react-icons/io5'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { IconButton } from '@/components'
import { Dialog, Transition } from '@headlessui/react'

import { useCart } from '@/contexts/CartProvider'

import { formatCurrency } from '@/utils/functions/formatCurrency'

import { ICartProduct } from '@/@types/store'

interface IMiniCart {
  mobile?: boolean
}

const MiniCart = ({ mobile = false }: IMiniCart) => {
  const {
    cartItemsData,
    handleGetCartItems,
    handleDeleteCartItem,
    cartTotalPrice
  } = useCart()

  const [miniCartIsOpen, setMiniCartIsOpen] = useState(false)

  useEffect(() => {
    handleGetCartItems()
  }, [miniCartIsOpen])

  return (
    <div className="">
      {!mobile ? (
        <IconButton
          label=""
          icon={<IoCartOutline className="text-xl" />}
          onClick={() => setMiniCartIsOpen(true)}
        />
      ) : (
        <button
          onClick={() => setMiniCartIsOpen(true)}
          className="flex items-center gap-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          <IoCartOutline className="text-2xl" />
          Carrinho
        </button>
      )}

      <Transition.Root show={miniCartIsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setMiniCartIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-xl text-xl font-bold text-gray-800">
                            Carrinho
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setMiniCartIsOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Fechar carrinho</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {!!cartItemsData.length ? (
                                cartItemsData.map((product: ICartProduct) => (
                                  <li
                                    key={`${product.productId}-${product.size}-${product.color}`}
                                    className="flex py-6"
                                  >
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between items-center text-base font-medium text-gray-900">
                                          <h3>{product.name}</h3>
                                          <p className="ml-4">
                                            {product.price}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.color.name} -{' '}
                                          {product.size.size}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          Quantidade: {product.quantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() =>
                                              handleDeleteCartItem(
                                                product.productId,
                                                product.color.variationId,
                                                product.size.variationId
                                              )
                                            }
                                          >
                                            Remover
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <p className="py-8 text-center text-sm text-gray-400">
                                  Carrinho vazio, adicione um produto
                                </p>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{formatCurrency(parseFloat(cartTotalPrice))}</p>
                        </div>

                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setMiniCartIsOpen(false)}
                            >
                              Continuar comprando
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default MiniCart
