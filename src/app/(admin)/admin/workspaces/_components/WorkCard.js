import React from 'react'

const WorkCard = ({heading}) => {
  return (
    <div className='flex justify-center items-center rounded-xl bg-white border border-black h-[10rem] w-[12rem]' >
        <h1 className='text-xl md:text-3xl'>{heading}</h1>
    </div>
  )
}

export default WorkCard