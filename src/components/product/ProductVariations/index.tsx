'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

import { BuyButton, Modal } from '@/components'
import { RadioGroup } from '@headlessui/react'

import { mergeClasses } from '@/utils/functions/mergeClasses'

import { IFilterColor, IFilterSize, IVariation } from '@/@types/store'
import {
  SetStateFilterSizeType,
  SetStateFilterColorType
} from '@/@types/globals'

interface IProductVariations {
  productId?: string
  productVariations?: IVariation[] | null
  filterSelectedColor: IVariation | null
  setFilterSelectedColor: SetStateFilterColorType
  filterSelectedSize: IFilterSize | null
  setFilterSelectedSize: SetStateFilterSizeType
  handleAddProductToCart: () => void
  handleAddProductToFavorites: () => void
}

const ProductVariations = ({
  productId,
  productVariations,
  filterSelectedColor,
  setFilterSelectedColor,
  filterSelectedSize,
  setFilterSelectedSize,
  handleAddProductToCart,
  handleAddProductToFavorites
}: IProductVariations) => {
  const cancelButtonRef = useRef(null)

  const [isOpenSizeGuideModal, setIsOpenSizeGuideModal] = useState(false)

  const handleOpenSizeGuideModal = () =>
    setIsOpenSizeGuideModal(!isOpenSizeGuideModal)

  return (
    <div className="mt-2">
      <div>
        <h3 className="text-sm font-medium text-gray-900">Cor</h3>

        <RadioGroup
          value={filterSelectedColor}
          onChange={(value) => {
            setFilterSelectedColor(value)
            setFilterSelectedSize(null)
          }}
          className="mt-4"
        >
          <RadioGroup.Label className="sr-only">Escolha a cor</RadioGroup.Label>
          <div className="flex items-center space-x-3">
            {productVariations &&
              productVariations.map((variation) => (
                <RadioGroup.Option
                  key={variation.id}
                  value={variation}
                  className={({ active, checked }) =>
                    mergeClasses(
                      active && checked ? 'ring ring-offset-1' : '',
                      !active && checked ? 'ring-2' : '',
                      'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                    )
                  }
                  style={{ backgroundColor: variation.color }}
                >
                  <RadioGroup.Label as="span" className="sr-only">
                    {variation.name}
                  </RadioGroup.Label>
                  <span
                    aria-hidden="true"
                    className="h-8 w-8 rounded-full border border-black border-opacity-10"
                    style={{ backgroundColor: variation.color }}
                  />
                </RadioGroup.Option>
              ))}
          </div>
        </RadioGroup>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
          <button
            type="button"
            onClick={handleOpenSizeGuideModal}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Guia de Tamanhos
          </button>
        </div>

        <RadioGroup
          value={filterSelectedSize}
          onChange={setFilterSelectedSize}
          className="mt-4"
        >
          <RadioGroup.Label className="sr-only">
            Escolha o tamanho
          </RadioGroup.Label>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
            {filterSelectedColor &&
              filterSelectedColor.sizes &&
              filterSelectedColor.sizes.map((size) => (
                <RadioGroup.Option
                  key={size.id}
                  value={size}
                  disabled={size.stock === 0}
                  className={({ active }) =>
                    mergeClasses(
                      size.stock > 0
                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                      active ? 'ring-2 ring-indigo-500' : '',
                      'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <RadioGroup.Label as="span">{size.size}</RadioGroup.Label>
                      {size.stock > 0 ? (
                        <span
                          className={mergeClasses(
                            active ? 'border' : 'border-2',
                            checked
                              ? 'border-indigo-500'
                              : 'border-transparent',
                            'pointer-events-none absolute -inset-px rounded-md'
                          )}
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                          >
                            <line
                              x1={0}
                              y1={100}
                              x2={100}
                              y2={0}
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </RadioGroup.Option>
              ))}
          </div>
        </RadioGroup>
      </div>

      <BuyButton
        productId={productId}
        disabled={!filterSelectedColor || !filterSelectedSize}
        onClickBuy={handleAddProductToCart}
        onClickFavorite={handleAddProductToFavorites}
      />

      <Modal
        isOpen={isOpenSizeGuideModal}
        setIsOpen={setIsOpenSizeGuideModal}
        cancelButtonRef={cancelButtonRef}
      >
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <Image
            src="/camiseta-high-medidas.jpg"
            width={500}
            height={500}
            alt="Guia de Medidas"
          />
        </div>
        <div className="bg-gray-50 p-4 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setIsOpenSizeGuideModal(false)}
            ref={cancelButtonRef}
          >
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ProductVariations
