import {
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoCloseCircleOutline
} from 'react-icons/io5'

import { IAlert } from '@/@types/store'

interface IAlertComponent {
  alertData: IAlert
}

const Alert = ({ alertData }: IAlertComponent) => {
  let icon
  let textColor
  let borderColor

  switch (alertData.type) {
    case 'success':
      icon = <IoCheckmarkCircleOutline className="text-xl" />
      textColor = 'text-green-600'
      borderColor = 'border-green-300'
      break
    case 'alert':
      icon = <IoAlertCircleOutline className="text-xl" />
      textColor = 'text-yellow-600'
      borderColor = 'border-yellow-300'
      break
    case 'error':
      icon = <IoCloseCircleOutline className="text-xl" />
      textColor = 'text-red-600'
      borderColor = 'border-red-300'
      break
    default:
      icon = null
      textColor = ''
      borderColor = ''
      break
  }

  return (
    <div
      role="alert"
      className={`z-[100] fixed right-2 top-2 rounded-xl border ${borderColor} bg-white p-4 animate-fade-in`}
    >
      <div className="flex items-start gap-2">
        <span className={textColor}>{icon}</span>

        <div className="flex-1">
          <p
            className={`${textColor} -mt-[2px] block text-sm font-semibold text-gray-900`}
          >
            {alertData.title}
          </p>
          <p className="text-xs text-gray-500">{alertData.legend}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
