'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { IoSearchOutline } from 'react-icons/io5'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'

const searchSchema = Yup.object().shape({
  userSearch: Yup.string().required()
})

import { IStoreSearch } from '@/@types/forms'

interface ISearchBar {}

const SearchBar = ({}: ISearchBar) => {
  const router = useRouter()

  const { control, handleSubmit, reset, formState } = useForm<IStoreSearch>({
    defaultValues: { userSearch: '' },
    mode: 'onBlur',
    resolver: yupResolver(searchSchema)
  })

  const { isValid } = formState

  const handleSearchForm = async (data: IStoreSearch) => {
    if (!isValid) return

    router.push(`/busca/?busca=${data.userSearch}`)
  }

  return (
    <form
      className="flex w-full rounded-md border-gray-200 shadow-sm bg-gray-100"
      onSubmit={handleSubmit(handleSearchForm)}
    >
      <span className="flex justify-center items-center w-12">
        <button
          type="submit"
          className="text-gray-600 hover:text-gray-700"
          disabled={!isValid}
        >
          <IoSearchOutline className="text-lg" />
        </button>
      </span>

      <Controller
        name="userSearch"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="O que você procura?"
            className="w-full border-blue-200 py-2.5 pe-10 text-black bg-transparent focus-visible:outline-none sm:text-sm"
            autoComplete="off"
          />
        )}
      />
    </form>
  )
}

export default SearchBar
