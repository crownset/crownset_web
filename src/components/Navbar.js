"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import * as Icon from "@/helpers/icons"
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
                    <Link href="/freeAudit">
                        <div className='flex items-center justify-center h-full'>
                            <span>
                                GET A FREE AUDIT
                            </span>
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </Link>
                </div>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex items-center flex-grow justify-between'>

                            <div className='flex-shrink-0'>
                                <Link href='/'>
                                    <Image
                                        src="https://thecrownset.com/wp-content/uploads/2024/07/cropped-crownsetfinalblackvector-removebg-preview-1.png"
                                        alt='crownsetlogo'
                                        width={150} height={20}
                                    />
                                </Link>
                            </div>
                            <div className='hidden lg:flex justify-center items-center flex-grow gap-10'>
                                <div className='flex items-center space-x-4'>
                                    <Link href='/services' className='text-black underline-from-left'>OUR SERVICES</Link>
                                    <Link href='/about' className='text-black underline-from-left'>WHO WE ARE</Link>
                                    <Link href="/work">
                                        <span className='text-black underline-from-left'>
                                            WORK
                                        </span>
                                    </Link>
                                    <Link href="/contact">
                                        <span className='text-black underline-from-left'>
                                            Contact
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className='lg:hidden flex items-center'>
                                <button className='inline-flex items-center justify-center p-2 rounded-md text-white  hover:text-white' onClick={toggleNavbar}>
                                    {
                                        isClicked ? (
                                            <Image src={Icon.closeNav_icon} alt='close' className="w-6 h-6" />
                                        ) : (
                                            <Image src={Icon.openNav_icon} alt='open' className="w-6 h-6" />
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                        <div className='hidden md:block'>
                            <Link href="./home/freeAudit">
                                <button className='bg-black text-white  py-3 px-6 rounded-2xl flex items-center hover:bg-[#805CEB]'>

                                    <span className='underline-from-left'>
                                        Free Audit
                                    </span>
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
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
                            <Link href='/services' className='text-black block  hover:bg-white hover:text-black py-1 pl-5'>OUR SERVICES</Link>
                            <Link href='/about' className='text-black block hover:bg-white hover:text-black py-1 pl-5'>WHO WE ARE</Link>
                            <Link href="/work">
                                <span className='text-black block hover:bg-white hover:text-black py-1 pl-5'>
                                    Work
                                </span>
                            </Link>
                            <Link href="/contact">
                                <span className='text-black block hover:bg-white hover:text-black py-1 pl-5'>
                                    Contact
                                </span>
                            </Link>
                        </div>
                    )
                }
            </nav>

        </>

    )
}

export default Navbar
