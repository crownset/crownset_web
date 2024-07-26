import React from 'react'
import Image from 'next/image'
import { DarkButton, UnderlineButton } from '@/components/CustomButtons'
import sampledata from '@/assets/sampledata/data.json';

import { RiSearch2Fill as SearchIcon } from "react-icons/ri";
import { TbTargetArrow as TargetArrowIcon } from "react-icons/tb";
import { MdEmail as EmailIcon } from "react-icons/md";
import { IoMdRocket as RocketIcon } from "react-icons/io";
import { RiMessage3Fill as MessageIcon } from "react-icons/ri";
import { TfiGoogle as GoogleIcon } from "react-icons/tfi";
import { IoIosPeople as PeopleIcon } from "react-icons/io";
import { FaAmazon as AmazonIcon } from "react-icons/fa";
import { FaGoogle as BigGoogleIcon } from "react-icons/fa6";
import { CardTwo } from '@/components/Cards';
import Icon from '@/components/Icon';
import NumbersAndResults from '@/components/NumbersAndResults';
import Divider from '@/components/Divider';

const featureCardData = sampledata.featureCardData;
const resultData = sampledata.resultsData;


const Page = () => {

  return (
    <>
      <section style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}
        className='pt-10 px-5  '
      >
        <div className='xl:w-11/12 m-auto md:grid md:grid-cols-2 md:gap-10'>

          <div>
            <h2 className='font-bold'>MARKETING SOLUTIONS</h2>
            <h1 className='mt-6 text-[2rem] leading-9 mr-10 font-[600] md:mr-28 md:text-[2.5rem] lg:mr-12'>Solutions for business growth</h1>
            <p className='mt-6 font-semibold text-[1.2rem]'>Numerique Marketing is the intersection between creative and performance. Our team delivers the perfect combination of creative and paid media expertise to maximize results.</p>
            <DarkButton buttonText={'get a free audit'} />
          </div>

          <div className='mt-10 w-full object-cover'>
            <Image
              src="https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1406332084.jpg"
              width={800}
              height={500}
              alt="image"
              className='rounded-[2rem] aspect-auto'
            />

          </div>
        </div>
      </section>


      <section className='mt-12 ' >

        <div className=''>

          <div className=''>
            <h1 className='text-[2rem] font-[600] leading-7 text-center xl:text-[3rem] '>We lead with customer-first strategies:</h1>
            <p className='mt-6 text-bodyTextColor text-center px-5'>Driving growth through personalized experiences for truly end-to-end business building.</p>

          </div>

          <div style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}>
            <div className='py-1 px-5 mt-4 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:w-11/12 m-auto'>

              <CardTwo heading={featureCardData[0].heading} description={featureCardData[0].description}
                icon={<Icon icon={<SearchIcon className='text-primary-color size-[1.5rem]' />} />}
              />

              <CardTwo heading={featureCardData[1].heading} description={featureCardData[1].description}
                icon={<Icon icon={<TargetArrowIcon className='text-primary-color size-[1.5rem]' />} />} />

              <CardTwo heading={featureCardData[2].heading} description={featureCardData[2].description}
                icon={<Icon icon={<EmailIcon className='text-primary-color size-[1.5rem]' />} />} />

              <CardTwo heading={featureCardData[3].heading} description={featureCardData[3].description}
                icon={<Icon icon={<RocketIcon className='text-primary-color size-[1.5rem]' />} />} />

              <CardTwo heading={featureCardData[4].heading} description={featureCardData[4].description}
                icon={<Icon icon={<MessageIcon className='text-primary-color size-[1.5rem]' />} />} />

              <CardTwo heading={featureCardData[5].heading} description={featureCardData[5].description}
                icon={<Icon icon={<GoogleIcon className='text-primary-color size-[1.5rem]' />} />} />

              <CardTwo heading={featureCardData[6].heading} description={featureCardData[6].description}
                icon={<Icon icon={<PeopleIcon className='text-primary-color size-[1.5rem]' />} />} />

              <CardTwo heading={featureCardData[7].heading} description={featureCardData[7].description}
                icon={<Icon icon={<AmazonIcon className='text-primary-color size-[1.5rem]' />} />} />


            </div>
          </div>
          <Divider />
        </div>

      </section>

      <section className='pt-10 px-5'>

        <div className='xl:w-11/12 m-auto lg:grid lg:grid-cols-2 gap-10'>
          <div className='w-full object-cover'>
            <Image
              src="https://thecrownset.com/wp-content/uploads/2023/05/pexels-pavel-danilyuk-7675014-1024x750.jpg"
              width={1024}
              height={500}
              alt="image"
              className='rounded-[3rem]'
            />
          </div>
          <div className='mt-10'>
            <h1 className='text-[1.5rem] font-[600] leading-6'>We are committed to your strategy</h1>
            <p className='text-bodyTextColor mt-8'>We are committed to your strategy and intuitively understand how to deliver value in the digital economy. Through the most effective digital marketing options, Renaissance makes it happen seamlessly. Every day, we help brands think big, execute smart and deliver growth. We employ an intelligent digital marketing strategy to consistently unlock value from digital investments in a rapidly advancing world. From simple to the infinitely complex.</p>
            <UnderlineButton buttonName={'more about our company'} />
          </div>
        </div>


      </section>

      <section className='mt-16'>
        <NumbersAndResults heading={'Driving Real Results'} cardData={resultData} />
      </section>

      <section className='mt-20'>
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

      <section className='mt-16 px-5 mb-10'>
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


