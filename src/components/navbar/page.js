"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import * as Icon from "../../helpers/icons"
// import { useRouter } from "next/navigation"
import Link from 'next/link'

const Navbar = () => {
    const [isClicked, setIsClicked] = useState(false)
    // const router = useRouter()

    const toggleNavbar = () => {
        setIsClicked(!isClicked)
    }

    // function checkClick(){
    //     console.log("button clicked")
    // }

    return (
        <>
            <nav className='bg-[#EAE8FF] max-lg:bg-white max-md:border-b-2'>
                <div className='hidden max-lg:block bg-black w-full h-10 text-white text-center'>
                    <div className='flex items-center justify-center h-full'>
                        <span>
                            GET A FREE AUDIT
                        </span>
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex items-center flex-grow justify-between'>
                            <div className='flex-shrink-0'>
                                <img
                                    src="https://thecrownset.com/wp-content/uploads/2024/07/cropped-crownsetfinalblackvector-removebg-preview-1.png"
                                    className='w-100 h-20'
                                />
                            </div>
                            <div className='hidden lg:flex justify-center items-center flex-grow gap-10'>
                                <div className='flex items-center space-x-4'>
                                    <a href='/' className='text-black underline-from-left'>Home</a>
                                    <a href='/' className='text-black underline-from-left'>About</a>
                                    <a href='/' className='text-black underline-from-left'>Services</a>
                                    <a href='/' className='text-black hover:underline-from-left'>Contact</a>
                                </div>
                            </div>
                            <div className='lg:hidden flex items-center'>
                                <button className='inline-flex items-center justify-center p-2 rounded-md text-white  hover:text-white' onClick={toggleNavbar}>
                                    {
                                        isClicked ? (
                                            <Image src={Icon.closeNav_icon} className="w-6 h-6" />
                                        ) : (
                                            <Image src={Icon.openNav_icon} className="w-6 h-6" />
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                        <div className='hidden lg:block'>
                            <Link href="./home/freeAudit">
                                <button className='bg-black text-white px-4 py-3 px-6 rounded-2xl flex items-center hover:bg-[#805CEB]'>

                                    <span className='underline-from-left'>
                                        Free Audit
                                    </span>
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
                {
                    isClicked && (
                        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 rounded-b-lg w-80'>
                            <a href='/' className='text-black block  hover:bg-white hover:text-black py-1 pl-5'>Home</a>
                            <a href='/' className='text-black block hover:bg-white hover:text-black py-1 pl-5'>About</a>
                            <a href='/' className='text-black block hover:bg-white hover:text-black py-1 pl-5'>Services</a>
                            <a href='/' className='text-black block hover:bg-white hover:text-black py-1 pl-5'>Contact</a>
                        </div>
                    )
                }
            </nav>

        </>

    )
}

export default Navbar
