import { Dispatch, RefObject, SetStateAction } from 'react'

import { IVariation, IFilterSize } from '@/@types/store'

export type SetStateBooleanType = Dispatch<SetStateAction<boolean>>
export type SetStateStringType = Dispatch<SetStateAction<string>>
export type SetStateFilterSizeType = Dispatch<
  SetStateAction<IFilterSize | null>
>
export type SetStateFilterColorType = Dispatch<
  SetStateAction<IVariation | null>
>

export type RefType = RefObject<HTMLButtonElement>
