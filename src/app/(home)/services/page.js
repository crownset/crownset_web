"use client"
import React, { useState } from 'react'
import Image from 'next/image'

import { RiSearch2Fill as SearchIcon } from "react-icons/ri";
import { TbTargetArrow as TargetArrowIcon } from "react-icons/tb";
import { MdEmail as EmailIcon } from "react-icons/md";
import { IoMdRocket as RocketIcon } from "react-icons/io";
import { RiMessage3Fill as MessageIcon } from "react-icons/ri";
import { TfiGoogle as GoogleIcon } from "react-icons/tfi";
import { IoIosPeople as PeopleIcon } from "react-icons/io";
import { FaAmazon as AmazonIcon, FaSearchengin } from "react-icons/fa";
import { FaGoogle as BigGoogleIcon } from "react-icons/fa6";
import { BsTranslate } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";
import { GrCloudSoftware } from "react-icons/gr";

import { ServicesCard } from '@/components/Cards';
import Icon from '@/components/Icon';
import NumbersAndResults from '@/components/NumbersAndResults';
import Divider from '@/components/Divider';
import Link from 'next/link';
import * as images from '@/helpers/icons';
import { DarkButton, UnderlineButton } from '@/components/CustomButtons'
import sampledata from '@/assets/sampledata/data.json';

const featureCardData = sampledata.featureCardData;
const resultData = sampledata.resultsData;
const services = sampledata.serviceCard;

const serviceIcon = {
  0: <CgWebsite className='text-primary-color size-[1.5rem]' />,
  1: <FaMobileAlt className='text-primary-color size-[1.5rem]' />,
  2: <GrCloudSoftware className='text-primary-color size-[1.5rem]' />,
  3: <SearchIcon className='text-primary-color size-[1.5rem]' />,
  4: <FaSearchengin className='text-primary-color size-[1.5rem]' />,
  5: <EmailIcon className='text-primary-color size-[1.5rem]' />,
  6: <RocketIcon className='text-primary-color size-[1.5rem]' />,
  7: <MessageIcon className='text-primary-color size-[1.5rem]' />,
  8: <GoogleIcon className='text-primary-color size-[1.5rem]' />,
  9: <PeopleIcon className='text-primary-color size-[1.5rem]' />,
  10: <AmazonIcon className='text-primary-color size-[1.5rem]' />,
  11: <BsTranslate className='text-primary-color size-[1.5rem]' />
}

const Page = () => {

  return (
    <>
      <section style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}
        className='pt-10 px-5  '
      >
        <div className='xl:w-11/12 m-auto md:grid md:grid-cols-2 md:gap-10'>

          <div>
            <h2 className='font-bold'>BUSINESS SOLUTIONS</h2>
            <h1 className='mt-6 text-[2rem] leading-9 mr-10 font-[600] md:mr-28 md:text-[2.5rem] lg:mr-12'>Solutions for business growth</h1>
            <p className='mt-6 font-semibold text-[1.2rem] text-bodyTextColor'>
              We provide versatile marketing, trending business solutions, and IT services, blending creative and paid media expertise to maximize results.
            </p>

            <Link href="/freeAudit">
              <DarkButton buttonText={'get a free audit'} />
            </Link>
          </div>

          <div className='mt-10 w-full object-cover'>
            <Image
              src={images.serviceimg1}
              width={800}
              height={500}
              alt="image"
              className='rounded-[2rem] aspect-auto'
            />

          </div>
        </div>
      </section>

      <section className=' mt-10 lg:mt-[6rem]' >

        <div className=''>

          <div className=''>
            <h1 className='text-[2rem] font-[600] leading-7 text-center xl:text-[3rem] '>We lead with customer-first strategies:</h1>
            <p className='mt-6 text-bodyTextColor text-center px-5'>Driving growth through personalized experiences for truly end-to-end business building.</p>

          </div>

          <div style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}>
            <div className='py-1 px-5 mt-4 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:w-11/12 m-auto'>

              {/* software soltions */}
              {
                featureCardData.map((card, i) => (
                  <ServicesCard key={i} heading={card.heading} description={card.description}
                    icon={serviceIcon[i]} />

                ))
              }

            </div>
          </div>
          <Divider />
        </div>

      </section>

      <section  >
        <div >
          <h1 className='text-center font-bold text-[2rem] lg:text-[3.5rem] lg:mb-[5rem] px-4 leading-9 mb-6'>Discover Our Comprehensive Services</h1>
          <div className='' style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}>

            <div className=' xl:w-11/12 m-auto pt-5 ' >
              {services.map((service, index) => (
                <ServiceItem key={service.name} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='pt-10 px-5'>

        <div className='xl:w-11/12 m-auto lg:grid lg:grid-cols-2 gap-10'>
          <div className='w-full object-cover'>
            <Image
              src={images.serviceimg2}
              width={1024}
              height={500}
              alt="image"
              className='rounded-[3rem]'
            />
          </div>
          <div className='mt-10'>
            <h1 className='text-[1.5rem] font-[600] leading-6'>We are committed to your strategy</h1>
            <p className='text-bodyTextColor mt-8'>We are committed to providing business solutions that deliver value in the digital economy. At Renaissance, we seamlessly implement the most effective business and digital marketing solutions, including website and app development. Every day, we help brands think big, execute smart, and achieve growth. Our intelligent digital marketing strategy consistently unlocks value from digital investments in a rapidly advancing world, from simple to infinitely complex solutions.</p>
            <Link href="/about">
              <UnderlineButton buttonName={'more about our company'} />
            </Link>
          </div>
        </div>


      </section>

      <section className='mt-16'>
        <NumbersAndResults heading={'Driving Real Results'} cardData={resultData} />
        <Divider />
      </section>

      <section className='mt-20 hidden'>
        <div className='xl:w-11/12 m-auto'>

          <h1 className='text-center text-[1.2rem] font-semibold px-5 xl:[1.5rem]'>The Best Brands Choose Numerique</h1>
          <div className='flex flex-col justify-center items-center gap-4 mt-10 lg:flex-row'>

            <div className='flex flex-col gap-4 sm:flex-row lg:flex-row'>

              <Image
                src="https://thecrownset.com/wp-content/uploads/2023/06/jolie-1.svg"
                width={171}
                height={34}
                alt="logo"

              />
              <Image
                src="https://thecrownset.com/wp-content/uploads/2023/06/caridad.svg"
                width={171}
                height={34}
                alt="logo"

              />
              <Image
                src="https://thecrownset.com/wp-content/uploads/2023/06/F7.svg"
                width={61}
                height={34}
                alt="logo"

              />
            </div>

            <div className='flex flex-col gap-4 sm:flex-row lg:flex-row'>

              <Image
                src="https://thecrownset.com/wp-content/uploads/2023/06/Scuola_Logo_OnlyTop-1.svg"
                width={171}
                height={34}
                alt="logo"

              />
              <Image
                src="https://thecrownset.com/wp-content/uploads/2023/06/petmania.svg"
                width={171}
                height={34}
                alt="logo"

              />
              <Image
                src="https://thecrownset.com/wp-content/uploads/2023/06/tecnologia.svg"
                width={171}
                height={34}
                alt="logo"

              />
            </div>

          </div>
          <Divider />
        </div>
      </section>

      <section className='mt-16 px-5 mb-10 hidden'>
        <div className='xl:w-11/12 m-auto'>
          <div className='bg-[#f7f7f9] rounded-[2rem] px-4 pb-8 '>



            <div className=' relative inline-block top-[-3rem] left-[12rem] -rotate-45 sm:left-[90%]'>
              <Image
                src="https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1367732506-1-542x1024.png"
                width={60}
                height={34}
                alt="logo"

              />
            </div>


            <div className='flex flex-col justify-center items-center mt-[-5rem] '>

              <div className='flex justify-center items-center gap-[1rem]'>
                <BigGoogleIcon className='text-[3rem]' />
                <span className='font-bold'>Google Partner</span>
              </div>
              <h1 className='text-center text-[1.5rem] mt-4 font-bold leading-6'>Get started with a Free consultation</h1>
              <DarkButton buttonText={'get a proposal'} />

            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Page;

export const ServiceItem = ({ service, index }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" mb-4 bg-white rounded-[3rem] px-8 py-8 mx-4" id={index}>
      <h2 className="text-xl font-semibold text-gray-800 mb-2 md:text-[1.5rem] lg:text-[1.7rem]">{service.name}</h2>
      <p className="text-gray-600 mb-4 mt-5">{service.description}</p>
      <button
        onClick={handleToggle}
        className="mb-4 px-1  border-b-2 border-b-primary-color  hover:border-b-blue-300
        underline-from-left text-bodyTextColor font-semibold "
      >
        {isOpen ? 'Show Less' : 'Show More'}
      </button>
      {isOpen && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Services Offered:</h3>
          <ul className="list-disc pl-5 mb-4">
            {service.services.map((item, index) => (
              <li key={index} className="text-gray-600">{item}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Why It Is Important:</h3>
          <p className="text-gray-600 mb-4">{service.whyItIsImportant}</p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">How It Helps Your Business:</h3>
          <ul className="list-disc pl-5 mb-4">
            {service.howItHelpsYourBusiness.map((item, index) => (
              <li key={index} className="text-gray-600">{item}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">How We Do It:</h3>
          <div>
            {Object.entries(service.howWeDoIt).map(([step, details]) => (
              <div key={step} className="mb-4">
                <h4 className="font-semibold text-gray-700">{step}</h4>
                <ul className="list-disc pl-5">
                  {Object.entries(details).map(([subStep, description]) => (
                    <li key={subStep} className="text-gray-600">{description}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


