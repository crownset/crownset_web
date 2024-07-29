"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import * as Icon from "@/helpers/icons"
import Link from 'next/link'
import { motion } from "framer-motion"

const Navbar = () => {
    const [isClicked, setIsClicked] = useState(false)

    const toggleNavbar = () => {
        setIsClicked(!isClicked)
    }

    return (
        <>
            <nav className='bg-[#EAE8FF] max-lg:bg-white max-md:border-b-2 relative'>
                <div className='hidden max-lg:block bg-black w-full h-10 text-white text-center'>
                    <Link href="/freeAudit">
                        <div className='flex items-center justify-center h-full'>
                            <span>
                                GET A FREE CALL
                            </span>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7-7"></path>
                            </svg>
                        </div>
                    </Link>
                </div>
                <div className='w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex items-center flex-grow justify-between'>
                            <div className='flex-shrink-0'>
                                <Link href='/'>
                                    <Image
                                        src="https://thecrownset.com/wp-content/uploads/2024/07/cropped-crownsetfinalblackvector-removebg-preview-1.png"
                                        alt='crownsetlogo'
                                        width={150} height={20}
                                    // className='lg:w-[15rem] lg:h-[15rem]'
                                    />
                                </Link>
                            </div>
                            <div className='hidden lg:flex justify-center items-center flex-grow'>
                                <div className='flex items-center space-x-12'>
                                    <Link href='/services' className='text-black underline-from-left'>OUR SERVICES</Link>
                                    <Link href='/about' className='text-black underline-from-left'>WHO WE ARE</Link>
                                    <Link href="/work" className='text-black underline-from-left'>WORK</Link>
                                    <Link href="/contact" className='text-black underline-from-left'>Contact</Link>
                                </div>
                            </div>
                            <div className='lg:hidden flex items-center'>
                                <button className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white' onClick={toggleNavbar}>
                                    {isClicked ? (
                                        <Image src={Icon.closeNav_icon} alt='close' className="w-6 h-6" />
                                    ) : (
                                        <Image src={Icon.openNav_icon} alt='open' className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className='max-lg:hidden'>
                            <Link href="/freeAudit">
                                <button className='bg-black text-white py-3 px-6 rounded-2xl flex items-center hover:bg-[#805CEB]'>
                                    <span className='underline-from-left'>
                                        GET A FREE CALL
                                    </span>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isClicked ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`absolute top-26 left-0 w-full rounded-b-[2rem] bg-white shadow-lg ${isClicked ? 'block' : 'hidden'}`}
            >
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 rounded-b-lg'>
                    <Link href='/services' className='text-black block hover:bg-white hover:text-black py-1 pl-5'>OUR SERVICES</Link>
                    <Link href='/about'  className='text-black block hover:bg-white hover:text-black py-1 pl-5'>WHO WE ARE</Link>
                    <Link href="/work"  className='text-black block hover:bg-white hover:text-black py-1 pl-5'>Work</Link>
                    <Link href="/contact"className='text-black block hover:bg-white hover:text-black py-1 pl-5'>Contact</Link>
                </div>
            </motion.div>
        </>
    )
}

export default Navbar
