"use client"
import React from 'react'
import Image from 'next/image'

const HomePage = () => {
  return (
    <>
      <div className='bg-[#EAE8FF]'>
                <div className='flex-column w-full items-center justify-center text-center pt-20'>
                    <div className='text-5xl text-center m-auto font-bold max-md:text-2xl'>
                        <h1>
                            Strategic Marketing, Dynamic <br /> Branding, Real Results
                        </h1>
                    </div>
                    <div className='pt-5 font-xs max-md:w-80 max-md:m-auto  '>
                        <span>
                            Transform your business with our innovative, results-driven marketing and business solutions
                        </span>
                    </div>
                </div>
            </div>

            <div className='bg-[#EAE8FF]'>
                <div className='w-full flex items-center justify-center m-auto rounded-xl'>
                    <div className='bg-[#b0b1ff] w-80 h-100 rounded-3xl overflow-hidden clip-your-needful-style'>
                        <Image
                            src="https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1387685447-shadow.png"
                            className='w-48 h-100' width={100} height={100}
                        />
                    </div>
                </div>
            </div>
    </>
  )
}

export default HomePage
