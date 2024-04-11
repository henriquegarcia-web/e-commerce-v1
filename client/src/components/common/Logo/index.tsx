'use client'

import Image from 'next/image'

const Logo = () => {
  return (
    <div className="">
      <Image src="/logo.png" width={75} height={75} alt="Logo" />
    </div>
  )
}

export default Logo
