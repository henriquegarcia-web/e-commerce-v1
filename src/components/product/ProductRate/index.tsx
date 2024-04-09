import { IoStar, IoStarHalfOutline, IoStarOutline } from 'react-icons/io5'

interface IProductRate {
  rating: number
}

const ProductRate = ({ rating }: IProductRate) => {
  const renderStars = () => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<IoStar key={i} className="text-lg text-yellow-400" />)
      } else if (rating + 0.5 === i) {
        stars.push(
          <IoStarHalfOutline key={i} className="text-lg text-yellow-400" />
        )
      } else {
        stars.push(<IoStarOutline key={i} className="text-lg text-gray-400" />)
      }
    }

    return stars
  }

  return <div className="flex">{renderStars()}</div>
}

export default ProductRate
