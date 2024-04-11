interface IIconButton {
  label: string
  icon: React.ReactNode
  onClick?: () => void
}

const IconButton = ({ label, icon, onClick }: IIconButton) => {
  return (
    <button
      className="inline-block rounded-full border border-teal-600 p-2 text-teal-600 hover:bg-teal-600 hover:text-white focus:outline-none focus:ring active:bg-teal-500"
      onClick={onClick && onClick}
    >
      <span className="sr-only"> {label} </span>
      {icon}
    </button>
  )
}

export default IconButton
