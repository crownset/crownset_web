"use client"
import Image from 'next/image';
import { useState } from 'react';
import { FaInstagram, } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import Divider from './Divider';
import Link from 'next/link';

const solutions = [
    { id: 0, name: 'Website development' },
    { id: 1, name: 'App development' },
    { id: 2, name: 'Digital marketing' },
    { id: 3, name: 'Business solutions' },
    { id: 4, name: 'Paid search marketing' },
    { id: 5, name: 'Email marketing' },
    { id: 6, name: 'Social media Marketing' },
    { id: 7, name: 'Influencer marketing' },
    { id: 8, name: 'Search engine optimization' },
    { id: 9, name: 'Conversion rate optimization' },
    { id:10, name: 'Google shopping' },
    { id: 11, name: 'Amazon shopping' },
    
];


const Footer = () => {
    const [aboutInfo, setAboutInfo] = useState(false)

    const toggleAboutInfo = () => {
        setAboutInfo(!aboutInfo)
    }

    return (
        <footer className='w-full bottom-0'>
            <div className='w-11/12 max-lg:w-full bg-[#e9e5ff] text-black m-auto rounded-t-[50px]'>
                <div className='flex flex-row  justify-between items-center pt-10 px-20 max-lg:pt-2 max-lg:px-10 max-md:flex-col max-md:gap-4'>
                    <div className='text-4xl font-extrabold max-md:text-center max-lg:text-4xl max-md:text-3xl'>
                        <p>
                            See how we can help your business grow with digital marketing and IT
                        </p>
                    </div>
                    <div className='flex flex-col items-end gap-2 w-full max-md:items-center max-md:justify-center max-md:gap-3'>
                        <div className='text-right max-md:text-center max-sm:text-xs'>
                            <p>Ready to speak with a marketing expert? Give us a ring</p>
                        </div>
                        <div className='text-right font-semibold underline-from-left'>
                            <p>+91 816 869 5799</p>
                        </div>
                        <Link href="\freeAudit">
                            <button className='bg-black text-white p-3 rounded-[20px] w-48 flex flex-row justify-around items-center hover:bg-[#805CEB]'>
                                <span className='underline-from-left'>
                                    GET A FREE AUDIT
                                </span>
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
                <Divider />
                <div className='flex flex-row items-center justify-between px-20 max-lg:px-10 '>
                    <div className='flex flex-col gap-4 max-md:hidden '>
                        <div className='font-semibold'>
                            <p>A PARTNER, NOT A VENDOR</p>
                        </div>
                        {/* <div className='flex flex-wrap gap-10 items-center'>
                            <div>
                                <Image src="https://thecrownset.com/wp-content/uploads/2023/05/meta-partner.svg" alt="Meta Partner" width={100} height={100} />
                            </div>
                            <div>
                                <Image src="https://thecrownset.com/wp-content/uploads/2023/05/google-cloud.svg" alt="Google Cloud" width={100} height={100} />
                            </div>
                            <div>
                                <Image src="https://thecrownset.com/wp-content/uploads/2023/05/google-partner.svg" alt="Google Partner" width={100} height={100} />
                            </div>
                            <div>
                                <Image src="https://thecrownset.com/wp-content/uploads/2023/05/shopify.svg" alt="Shopify" width={100} height={100} />
                            </div>
                        </div> */}
                    </div>
                    <div className='flex flex-col justify-center items-center max-md:pr-0 max-md:w-full'>
                        <div className='font-extrabold text-lg'>
                            {/* <p>6.7/ Average ROAS</p> */}
                        </div>
                        <div className='text-center w-48  max-md:w-full'>
                            <p>127, Tower B, Logix Technova, Sector 132, Noida</p>
                        </div>
                    </div>
                </div>

                {/* section 2 */}

                <div className='bg-[#f7f7fa] text-black m-auto rounded-t-[50px] mt-10 py-5 px-20 max-lg:px-10'>
                    <div className='flex flex-col'>
                        <div className='text-xl pb-2 font-extrabold'>
                            <p>
                                solutions
                            </p>
                        </div>
                        <div className='grid grid-cols-4 gap-4 pb-5 max-md:flex max-md:flex-col'>
                            {solutions.map(solution => (
                                <div key={solution.id} className='flex flex-col items-center font-extralight '>
                                    <button className='lg:underline-from-left cursor-pointer text-center max-md:w-full max-md:text-start '>
                                        <Link href={`/services#${solution.id}`}>{solution.name}</Link>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className='pt-5 w-full m-auto max-md:hidden' />
                    <div className='hidden max-md:block' >
                        <button className='' onClick={toggleAboutInfo}>
                            {
                                aboutInfo ? (
                                    <RxCross2 className='size-8' />
                                ) : (
                                    <GoPlus className='size-8' />
                                )
                            }
                        </button>
                        {
                            aboutInfo ? (
                                <div className='flex flex-col py-5 gap-4'>
                                    <div >
                                        <Link href="/about"><p className='underline-from-left cursor-pointer'>About</p></Link>
                                    </div>

                                    <div >
                                    <Link href="/#blog"><p className='underline-from-left cursor-pointer'>Blog</p></Link>
                                    </div>

                                    <div >
                                        <Link href="/career"><p className='underline-from-left cursor-pointer'>Careers</p></Link>
                                    </div>


                                    <div>
                                        <Link href="/contact"><p className='underline-from-left cursor-pointer'>Contact</p></Link>
                                    </div>
                                </div>
                            ) : null

                        }
                    </div>
                    <div className='max-md:hidden flex flex-row justify-between items-center py-5'>
                        <div >
                            <Link href="/about"><p className='underline-from-left cursor-pointer'>About</p></Link>
                        </div>

                        <div >
                            <Link href="/#blog"><p className='underline-from-left cursor-pointer'>Blog</p></Link>
                        </div>

                        <div >
                        <Link href="/career"> <p className='underline-from-left cursor-pointer'>Careers</p></Link>
                        </div>


                        <div>
                            <Link href="/contact"> <p className='underline-from-left cursor-pointer'>Contact</p></Link>
                        </div>
                    </div>
                    <hr className='pt-5 w-full ' />
                    <div className='flex flex-row justify-between items-center pt-5 max-md:flex-col max-md:gap-3'>
                        <div className='max-md:w-full'>
                            <ul className='flex flex-row gap-3 cursor-pointer max-md:flex-col max-md:gap-1'>
                                <li className='hover:text-[#8080F5]'>© 2024 Crownset Marketing Agency</li>
                                <li className='hover:text-[#8080F5]'>Terms & Conditions</li>
                                <li className='hover:text-[#8080F5]'>Privacy Policy</li>
                            </ul>
                        </div>
                        <div className='flex flex-row items-center gap-6 max-md:w-full'>
                            <div>
                                <Link href="https://www.instagram.com/thecrownset/?igsh=MWJkdnMxbzNjMGQ1&utm_source=qr" target="_blank">
                                    <FaInstagram className='hover:text-[#8080F5] size-5' />
                                </Link>
                            </div>

                            <div>
                                <Link href="https://www.facebook.com/people/Crownset/61561915785950/?mibextid=LQQJ4d" target='_blank'>
                                    <FaFacebook className='hover:text-[#8080F5] size-5' />
                                </Link>
                            </div>
                            <div>
                                <Link href="https://www.linkedin.com/company/thecrownset/mycompany/" target="_blank">
                                    <FaLinkedin className='hover:text-[#8080F5] size-5' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
