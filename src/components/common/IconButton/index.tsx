interface IIconButton {
  label: string
  icon: React.ReactNode
  onClick?: () => void
}

const IconButton = ({ label, icon, onClick }: IIconButton) => {
  return (
    <button
      className="inline-block rounded-full border border-indigo-600 p-2 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
      onClick={onClick && onClick}
    >
      <span className="sr-only"> {label} </span>
      {icon}
    </button>
  )
}

export default IconButton
