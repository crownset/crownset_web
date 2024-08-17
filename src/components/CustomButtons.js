import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

export const DarkButton = ({ buttonText }) => {
    return (

        <button className='uppercase flex  justify-center gap-2 items-center 
        mt-4 text-white bg-black py-[0.7rem] px-[1.5rem] rounded-[1rem]
        hover:bg-primary-color '>
            <span className='underline-from-left'>{buttonText}</span>
            <FaArrowRight className='text-white' />

        </button>
    )
}


export const UnderlineButton = ({buttonName}) => {
  return (
    <button className='mt-10 sm:mt-6 xl:mt-0 uppercase px-6 py-4
    font-bold text-[0.8rem] tracking-widest bg-[#e9e5ff] rounded-full
    '>
        {buttonName}
    </button>
  )
}

