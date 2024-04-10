'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import Modal from '@/components/common/Modal'
import { RadioGroup } from '@headlessui/react'

import { mergeClasses } from '@/utils/functions/mergeClasses'

import { IVariation } from '@/@types/store'

interface IProductVariations {
  productVariations?: IVariation[] | null
}

const ProductVariations = ({ productVariations }: IProductVariations) => {
  const [isOpenSizeGuideModal, setIsOpenSizeGuideModal] = useState(false)

  const [selectedColor, setSelectedColor] = useState(
    productVariations ? productVariations[0] : null
  )
  const [selectedSize, setSelectedSize] = useState(
    selectedColor && selectedColor.sizes ? selectedColor.sizes[0] : null
  )

  const handleOpenSizeGuideModal = () =>
    setIsOpenSizeGuideModal(!isOpenSizeGuideModal)

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    if (productVariations && productVariations.length > 0) {
      setSelectedColor(productVariations[0])
    }
  }, [productVariations])

  return (
    <form className="mt-2">
      <div>
        <h3 className="text-sm font-medium text-gray-900">Cor</h3>

        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
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
                      variation.color,
                      active && checked ? 'ring ring-offset-1' : '',
                      !active && checked ? 'ring-2' : '',
                      'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                    )
                  }
                >
                  <RadioGroup.Label as="span" className="sr-only">
                    {variation.name}
                  </RadioGroup.Label>
                  <span
                    aria-hidden="true"
                    className={mergeClasses(
                      variation.color,
                      'h-8 w-8 rounded-full border border-black border-opacity-10'
                    )}
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
          value={selectedSize}
          onChange={setSelectedSize}
          className="mt-4"
        >
          <RadioGroup.Label className="sr-only">
            Escolha o tamanho
          </RadioGroup.Label>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
            {selectedColor &&
              selectedColor.sizes &&
              selectedColor.sizes.map((size) => (
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
    </form>
  )
}

export default ProductVariations
