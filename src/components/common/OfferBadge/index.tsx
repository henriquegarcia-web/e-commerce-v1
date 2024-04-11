import { BiSolidOffer } from 'react-icons/bi'

interface IOfferBadge {
  offerValue: number
}

const OfferBadge = ({ offerValue }: IOfferBadge) => {
  return (
    <span className="z-10 absolute left-1 top-1 inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
      <BiSolidOffer className="text-lg" />
      <p className="ml-1 whitespace-nowrap text-sm">
        <b className="whitespace-nowrap text-sm">{offerValue}%</b> de desconto
      </p>
    </span>
  )
}

export default OfferBadge
