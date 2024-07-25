"use client"
import Image from 'next/image';
import { useState } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import Divider from './Divider';

const solutions = [
    { id: 1, name: 'Paid search marketing' },
    { id: 2, name: 'Email marketing' },
    { id: 3, name: 'Social media Marketing' },
    { id: 4, name: 'Influencer marketing' },
    { id: 5, name: 'Search engine optimization' },
    { id: 6, name: 'Conversion rate optimization' },
    { id: 7, name: 'Google shopping' },
    { id: 8, name: 'Amazon shopping' },
    { id: 9, name: 'Website development' },
    { id: 10, name: 'App development' },
    { id: 11, name: 'Digital marketing' },
    { id: 12, name: 'Business solutions' },
];
const footerContent = [
    { id: 1, name: 'About' },
    { id: 2, name: 'Blog' },
    { id: 3, name: 'careers' },
    { id: 4, name: 'Team' },
    // { id: 5, name: 'Success Stories' },
    // { id: 6, name: 'Awards' },
    { id: 5, name: 'Contact' },
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
                            See how we can help your business grow with digital marketing
                        </p>
                    </div>
                    <div className='flex flex-col items-end gap-2 w-full max-md:items-center max-md:justify-center max-md:gap-3'>
                        <div className='text-right max-md:text-center max-sm:text-xs'>
                            <p>Ready to speak with a marketing expert? Give us a ring</p>
                        </div>
                        <div className='text-right font-semibold underline-from-left'>
                            <p>+91 816 869 5799</p>
                        </div>
                        <button className='bg-black text-white p-3 rounded-[20px] w-48 flex flex-row justify-around items-center hover:bg-[#805CEB]'>
                            <span className='underline-from-left'>
                                GET A FREE AUDIT
                            </span>
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
               <Divider/>
                <div className='flex flex-row items-center justify-between px-20 max-lg:px-10 '>
                    <div className='flex flex-col gap-4 max-md:hidden '>
                        <div className='font-semibold'>
                            <p>A PARTNER, NOT A VENDOR</p>
                        </div>
                        <div className='flex flex-wrap gap-10 items-center'>
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
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center max-md:pr-0 max-md:w-full'>
                        <div className='font-extrabold text-lg'>
                            <p>6.7/ Average ROAS</p>
                        </div>
                        <div className='text-center w-48  max-md:w-full'>
                            <p>across our 100+ Global Clients on SEO, PPC & Social</p>
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
                                    <p className='lg:underline-from-left cursor-pointer text-center max-md:w-full max-md:text-start '>{solution.name}</p>
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
                                    {
                                        footerContent.map(content => (
                                            <div key={content.id}>
                                                <p className='underline-from-left cursor-pointer w-full'>{content.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : null

                        }
                    </div>
                    <div className='max-md:hidden flex flex-row justify-between items-center py-5'>
                        {
                            footerContent.map(content => (
                                <div key={content.id}>
                                    <p className='underline-from-left cursor-pointer'>{content.name}</p>
                                </div>
                            ))
                        }
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
                                <FaInstagram className='hover:text-[#8080F5] size-5' />
                            </div>
                            <div>
                                <FaTwitter className='hover:text-[#8080F5] size-5' />
                            </div>
                            <div>
                                <FaFacebook className='hover:text-[#8080F5] size-5' />
                            </div>
                            <div>
                                <FaYoutube className='hover:text-[#8080F5] size-5' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
