import { IoHeartOutline } from 'react-icons/io5'

interface IBuyButton {
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}

const BuyButton = ({
  disabled = false,
  loading = false,
  onClick
}: IBuyButton) => {
  return (
    <div className="flex gap-x-2 mt-10">
      <button
        type="submit"
        disabled={disabled || loading}
        className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:pointer-events-none"
        onClick={onClick}
      >
        Comprar
      </button>
      <button
        disabled={disabled || loading}
        className="flex w-[50px] items-center justify-center rounded-md border border-transparent bg-gray-200 text-xl font-medium text-white transition duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:pointer-events-none"
      >
        <IoHeartOutline className="text-3xl text-gray-800" />
      </button>
    </div>
  )
}

export default BuyButton
