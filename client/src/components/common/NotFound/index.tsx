'use client'

import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="m-auto px-4 py-8 pb-24">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Ooops!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Parece que você encontrou um beco sem saída. Esta página não existe
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Voltar para o início
          </Link>
          <Link href="/ofertas" className="text-sm font-semibold text-gray-900">
            Ver ofertas <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
