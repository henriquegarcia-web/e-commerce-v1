import { Dispatch, RefObject, SetStateAction } from 'react'

export type StateType = Dispatch<SetStateAction<boolean>>

export type RefType = RefObject<HTMLButtonElement>
