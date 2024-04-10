import { Dispatch, RefObject, SetStateAction } from 'react'

export type SetStateBooleanType = Dispatch<SetStateAction<boolean>>

export type RefType = RefObject<HTMLButtonElement>
