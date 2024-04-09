'use client'

import { useState } from 'react'

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
  const [searchIsLoading, setSearchIsLoading] = useState(false)

  const { control, handleSubmit, reset } = useForm<IStoreSearch>({
    defaultValues: { userSearch: '' },
    mode: 'onBlur',
    resolver: yupResolver(searchSchema)
  })

  const handleSearchForm = async (data: IStoreSearch) => {
    setSearchIsLoading(true)

    try {
      // const response = await handleSignin(data)
      const response = true

      if (response) {
        // navigate('/chat')
        reset()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSearchIsLoading(false)
    }
  }

  return (
    <form
      className="flex w-full rounded-md border-gray-200 shadow-sm bg-gray-100"
      onSubmit={handleSubmit(handleSearchForm)}
    >
      <span className="flex justify-center items-center w-12">
        <button
          type="submit"
          disabled={searchIsLoading}
          className="text-gray-600 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
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
            disabled={searchIsLoading}
          />
        )}
      />
    </form>
  )
}

export default SearchBar
