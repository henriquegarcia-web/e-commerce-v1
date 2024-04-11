'use client'

import { useState } from 'react'

import { IImage } from '@/@types/store'

interface IProductImageSlider {
  imagesData?: IImage[]
}

const ProductImageSlider = ({ imagesData }: IProductImageSlider) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index)
  }

  if (!imagesData) return <div></div>

  return (
    <div className="grid gap-4 w-full">
      <div className="flex items-center justify-center rounded-lg border border-gray-200">
        <img
          className="h-auto w-full max-w-[90%] rounded-lg object-contain object-center md:h-[480px]"
          src={imagesData[activeImageIndex].url}
          alt={imagesData[activeImageIndex].alt}
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {imagesData.map((image, index) => (
          <div
            key={image.id}
            className={`flex items-center justify-center rounded-lg cursor-pointer border border-gray-200 ${
              index === activeImageIndex ? 'border-4 border-teal-500' : ''
            }`}
          >
            <img
              src={image.url}
              className="object-contain object-center h-20 max-w-[85%]"
              alt={image.alt}
              onClick={() => handleThumbnailClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImageSlider
