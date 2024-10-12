import React from 'react'
import { TbLoader3 } from 'react-icons/tb'

export default function loading() {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
         <TbLoader3 className=" animate-spin text-blue-500 size-10" />
    </div>
  )
}
