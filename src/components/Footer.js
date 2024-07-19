import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <div className='w-full bottom-0'>
            <div className='w-3/4 max-lg:w-full p-6 bg-[#e9e5ff] text-black m-auto rounded-t-3xl'>
                <div className='flex flex-row  justify-between pt-10 px-10 max-md:flex-col'>
                    <div className='text-4xl font-extrabold w-full mb-3 lg:mb-0 max-md:text-center'>
                        <p>
                            See how we can help your business grow with digital marketing
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 items-end w-full max-md:items-center max-md:justify-center'>
                        <div className='text-right max-md:text-center max-sm:text-xs'>
                        <p>Ready to speak with a marketing expert? Give us a ring</p>
                        </div>
                        <div className='text-right'>
                            <p>+91 816 869 5799</p>
                        </div>
                        <button className='bg-black text-white p-3 rounded-2xl w-48'>
                            GET A FREE AUDIT
                        </button>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between pt-16'>
                    <div className='flex flex-col gap-4 max-md:hidden'>
                        <div className='font-semibold pl-12'>
                            <p>A PARTNER, NOT A VENDOR</p>
                        </div>
                        <div className='flex flex-wrap gap-10 items-center pl-10'>
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
                    <div className='flex flex-col justify-center items-center items-end pr-12 max-md:pr-0 max-md:w-full'>
                        <div className='font-semibold text-2xl'>
                            <p>6.7/ Average ROAS</p>
                        </div>
                        <div className='text-center w-48'>
                            <p>across our 100+ Global Clients on SEO, PPC & Social</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
