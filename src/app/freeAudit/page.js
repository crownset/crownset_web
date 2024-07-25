"use client";
import Divider from '@/components/Divider';
import Image from 'next/image';
import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

const FreeAudit = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen linear-gradient pt-16 max-lg:flex-col">
        <div className="flex w-full max-w-6xl space-x-8 max-lg:space-x-0 max-lg:flex-col ">
          {/* Content section */}
          <div className="flex flex-col justify-center w-1/2 px-8 pt-6 pb-8 mb-4 max-lg:w-full">
            <div className="flex flex-col mb-4">
              <p className="text-xl pb-5">Free Audit</p>
              <h1 className="text-7xl font-extrabold pb-5 max-lg:text-4xl">Ready to grow your revenue?</h1>
              <p className="text-xl pb-4">When you partner with Numerique, we take care of the heavy lifting, so you can enjoy more website traffic, leads, and revenue.</p>
            </div>
            <hr className="w-full mb-4" />
            <div className="space-y-4">
              <div className='flex gap-3 items-center'>
                <FaCheckCircle className='text-[#6754e9] w-6 h-6'/>
                <p className="text-base">Review your marketing goals: Begin by reviewing your marketing goals and objectives.</p>
              </div>
              <div className='flex gap-3'>
                <FaCheckCircle className='text-[#6754e9]  w-6 h-6'/>
                <p className="text-base">Evaluate your target audience to see if they have changed or if you need to adjust your messaging to better reach them.</p>
              </div>
              <div className='flex gap-3'>
                <FaCheckCircle className='text-[#6754e9]  w-6 h-6'/>
                <p className="text-base">Analyze your website to ensure it is user-friendly, mobile-responsive, and optimized for search engines.</p>
              </div>
              <div className='flex gap-3'>
                <FaCheckCircle className='text-[#6754e9]  w-6 h-6'/>
                <p className="text-base">Review your content marketing efforts, including your blog posts, social media, and email marketing.</p>
              </div>
            </div>
          </div>

          {/* Form section */}

          <div className="w-1/2 bg-white rounded-3xl px-8 pt-6 pb-8 mb-4 border-shadow max-lg:w-5/6">
            <h2 className="text-2xl font-bold mb-6">Get your free audit</h2>
            <form className="space-y-4 max-lg:m-auto">
              <div>
                <input
                  className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Name"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Company-Name"
                  type="email"
                  placeholder="Business Name"
                />
              </div>
              <div>
                <input
                  className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <textarea
                  className="border mb-4 rounded-xl w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  placeholder="Your message here..."
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <button
                  className="bg-black text-white w-full font-bold py-3 px-5 rounded-2xl focus:outline-none focus:shadow-outline hover:bg-[#805CEB]"
                  type="button"
                >
                  <span className='underline-from-left'>
                    SEND ME A PROPOSAL
                  </span>
                </button>
              </div>
            </form>
            {/* <div className='absolute right-64 top-20 w-20'>
              <img src='https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1367732506-159x300.png' className='rotate-45' />
            </div> */}
          </div>
        </div>
      </div>
      <Divider/>
      <div className='flex items-center justify-center gap-5 py-10 max-md:flex-col'>
        <div className='text-xl font-extrabold'>
          <p>Credentials & recognition:</p>
        </div>
        <div className='flex items-center justify-center gap-8  max-md:flex-wrap'>
            <div>
              <Image src="https://thecrownset.com/wp-content/uploads/elementor/thumbs/56cf51c7d935aba26a8f553867bf878b-qql2z74lvkd216ad5m0wcz170nmakss1bbb0a7qwps.png" alt='logo' width={70} height={70} />
            </div>
            <div>
              <Image src="https://thecrownset.com/wp-content/uploads/elementor/thumbs/new-badge20220412-1161242-19o8jy5-qql30lvw4majg48mx7yr3m833go44gdjiaj875nnds.png" alt='logo1' width={70} height={70} />
            </div>
            <div>
              <Image src="https://thecrownset.com/wp-content/uploads/elementor/thumbs/new-badge20211006-5432-t7lh3l-qql30ky1xs994ia02pk4j4gmi2sqwr9t65vqpvp1k0.png" alt='logo2' width={70} height={70} />
            </div>
            <div>
              <Image src="https://thecrownset.com/wp-content/uploads/elementor/thumbs/new-badge20211005-28345-8m8kvp-qql30ky1xs994ia02pk4j4gmi2sqwr9t65vqpvp1k0.png" alt='logo3' width={70} height={70} />
            </div>
            <div>
              <Image src="https://thecrownset.com/wp-content/uploads/elementor/thumbs/logo_hubspot-qql30k095dt7mir8bgo0ky5rnpjx6t3am36ozba0v4.png" alt='logo3' width={70} height={70} />
            </div>
        </div>
      </div>
    </>

  );
}

export default FreeAudit;