"use client";
import Divider from '@/components/Divider';
import Image from 'next/image';
import React, {useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import * as Icon from "@/helpers/icons"
import axios from 'axios';

const FreeAudit = () => {

  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [businessName,setBusinessName] = useState("");
  const [contact,setContact] = useState("");
  const [queryContent,setQueryContent] = useState("");
  const [leadBy,setLeadBy] = useState("hello");

  const handleSubmit = ()=>{
    axios.post('/api/teams/addQuery', {
      fullName,
      email,
      businessName,
      contact,
      queryContent,
      leadBy
    })
    .then(function (response) {
      
    })
    .catch(function (error) {
      
    });
    setFullName("");
    setEmail("");
    setBusinessName("");
    setContact("");
    setQueryContent("");
    

  }
  
  return (
    <>
      <div className='flex flex-col  md:items-center md:justify-center py-5 px-5 linear-gradient md:flex-row'>
        <div className='md:w-1/2'>
          <div className='flex flex-col gap-4'>
            <p className='font-bold text-lg text-black'>FREE AUDIT</p>
            <h1 className='font-extrabold text-4xl text-black lg:text-6xl lg:w-1/2'>Ready to grow your revenue?</h1>
            <p className='font-bold text-base lg:w-3/4'>When you partner with Numerique, we take care of the heavy lifting, so you can enjoy more website traffic, leads, and revenue.</p>
          </div>
          <hr className="w-9/12 mt-5 mb-5" />
          <div className='flex flex-col gap-4 lg:w-9/12'>
            <div className='flex gap-2 lg:gap-3'>
              <div>
                <FaCheckCircle className='text-[#6754e9] mt-2 lg:text-lg ' />
              </div>
              <div>
                <p className='text-black text-lg'>Review your marketing goals: Begin by reviewing your marketing goals and objectives.</p>
              </div>
            </div>
            <div className='flex items-start gap-2  lg:gap-3'>
              <div>
                <FaCheckCircle className='text-[#6754e9] mt-2 lg:text-lg' />
              </div>
              <div>
                <p className='text-black text-lg'>Evaluate your target audience to see if they have changed or if you need to adjust your messaging to better reach them.</p>
              </div>
            </div>
            <div className='flex items-start gap-2  lg:gap-3'>
              <div>
                <FaCheckCircle className='text-[#6754e9] mt-2 lg:text-lg' />
              </div>
              <div>
                <p className='text-black text-lg'>Analyze your website to ensure it is user-friendly, mobile-responsive, and optimized for search engines.</p>
              </div>
            </div>
            <div className='flex items-start gap-2  lg:gap-3'>
              <div>
                <FaCheckCircle className='text-[#6754e9] mt-2 lg:text-lg' />
              </div>
              <div>
                <p className='text-black text-lg'>Review your content marketing efforts, including your blog posts, social media, and email marketing.</p>
              </div>
            </div>
          </div>

        </div>
        <div className=" bg-white rounded-3xl px-10 py-10 mt-10 mb-10 border-shadow md:w-1/3">
          {/* <div className=''>
            <img src='https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1367732506-159x300.png' className='rotate-45 w-[3rem] absolute left-[8rem] bottom-3' />
          </div> */}
          <form className="space-y-4 max-lg:m-auto">

            <div>
              <input
                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Name"
                type="text"
                placeholder="Name"
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
              />
            </div>

            <div>
              <input
                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="business"
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e)=>setBusinessName(e.target.value)}
              />
            </div>

            <div>
              <input
                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={contact}
                onChange={(e)=>setContact(e.target.value)}
              />
            </div>

            <div>
              <textarea
                className="border mb-4 rounded-xl w-full h-[7rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="what can we help you?"
                value={queryContent}
                onChange={(e)=>setQueryContent(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <button
                className="bg-black text-white w-full font-bold py-3 px-5 rounded-2xl focus:outline-none focus:shadow-outline hover:bg-[#805CEB]"
                type="button"
                onClick={handleSubmit}
              >
                <span className='underline-from-left'>
                  GET IN TOUCH
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <Divider />
      {/* <div className='flex items-center justify-center gap-5 py-10 max-md:flex-col'>
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
      </div> */}
    </>

  );
}

export default FreeAudit;