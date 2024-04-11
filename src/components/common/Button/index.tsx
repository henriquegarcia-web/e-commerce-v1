import { FiLoader } from 'react-icons/fi'

import { mergeClasses } from '@/utils/functions/mergeClasses'

interface IButton {
  inverted?: boolean
  type?: 'button' | 'submit'
  label: string
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

const Button = ({
  inverted = false,
  type = 'button',
  label,
  disabled = false,
  loading = false,
  onClick
}: IButton) => {
  return (
    <button
      type={type}
      onClick={onClick && onClick}
      disabled={disabled || loading}
      className={mergeClasses(
        inverted
          ? 'border-2 border-teal-600 bg-transparent text-teal-600 hover:bg-teal-800 hover:text-white hover:border-teal-800'
          : 'border-2 border-teal-600 bg-teal-600 text-white hover:bg-teal-800 hover:border-teal-800',
        'flex flex-1 items-center justify-center w-full rounded-md px-8 py-3 text-base font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:border-gray-500 disabled:pointer-events-none'
      )}
    >
      {loading && (
        <span className="animate-spin mr-1">
          <FiLoader className="text-lg" />
        </span>
      )}
      {label}
    </button>
  )
}

export default Button
