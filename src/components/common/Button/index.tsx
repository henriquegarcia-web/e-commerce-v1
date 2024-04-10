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
          ? 'border-2 border-indigo-600 bg-transparent text-indigo-600 hover:bg-indigo-800 hover:text-white hover:border-indigo-800'
          : 'border-2 border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-800 hover:border-indigo-800',
        'flex flex-1 items-center justify-center w-full rounded-md px-8 py-3 text-base font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:pointer-events-none'
      )}
    >
      {label}
    </button>
  )
}

export default Button
