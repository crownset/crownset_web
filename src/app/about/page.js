
import { DarkButton, UnderlineButton } from '@/components/CustomButtons'
import Image from 'next/image'
import React from 'react'
import sampledata from '@/assets/sampledata/data.json';
import Icon from '@/components/Icon';
import { RiSearch2Fill as SearchIcon } from "react-icons/ri";
import { TbTargetArrow as TargetArrowIcon } from "react-icons/tb";
import { MdEmail as EmailIcon } from "react-icons/md";
import { IoMdRocket as RocketIcon } from "react-icons/io";
import { HiLightBulb as BulbIcon } from "react-icons/hi";


const ourValues = sampledata.ourValues;

const page = () => {

  return (
    <>
      <section style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}
        className='px-5 py-3'>
        <div>
          <div>
            <h2 className='text-[1rem] font-semibold'>ABOUT US</h2>
            <h1 className='text-[2rem] leading-8 font-[500] text-[#560a39] mt-3 tracking-wide'>Excellence is in our Blood,</h1>

          </div>
          <div className='mt-10'>
            <Image
              src="https://thecrownset.com/wp-content/uploads/2024/07/social-media-marketing-concept-marketing-with-applications-1024x683.webp"
              width={800}
              height={500}
              alt="image"
            />
          </div>

        </div>
      </section>

      <section className='mt-10 px-5'>
        <p className='text-center text-bodyTextColor text-[0.8rem]'>
          The Crownset Marketing Agency revolutionizes how brands connect with their audience. At Crownset, we don’t just market your brand, we create unforgettable experiences. Our innovative strategies and creative solutions are tailored to make your brand shine in a crowded marketplace. From captivating graphics to strategic social media campaigns, we ensure your brand’s story is told with impact and precision.
        </p>
      </section>

      <section className='mt-16'>
        <div className='mt-[-3rem] xl:mt-[-9]'>

          <div className='relative top-[4rem] sm:top-[8rem] lg:top-[12rem] xl:flex xl:justify-center xl:items-center
  '>
            <Image
              className='rounded-[3rem] aspect-auto object-cover px-[1rem]'
              src='https://thecrownset.com/wp-content/uploads/2023/05/pexels-moe-magners-7495294-1024x417.jpg'
              width={1280}
              height={417}
              alt="Picture of the author"
            />
          </div>

          <div className='px-[1rem] pt-[4rem] pb-[2rem]'
            style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}
          >

            <div className='mt-5 sm:mt-[6rem] lg:mt-[10rem]  xl:mr-[40rem] xl:ml-[10rem]  xl:w-1/3'>
              <h2 className='text-[1.4rem] font-[625] text-center'>OUR VALUES</h2>

            </div>



            <div className='md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:w-11/12 m-auto '>

              <CardTwo
                icon={<Icon icon={<BulbIcon className='text-primary-color size-[1.5rem]' />} />}
                heading={ourValues[0].heading}
                description={ourValues[0].description}
              />

              <CardTwo
                icon={<Icon icon={<TargetArrowIcon className='text-primary-color size-[1.5rem]' />} />}
                heading={ourValues[1].heading}
                description={ourValues[1].description}
              />

              <CardTwo
                icon={<Icon icon={<EmailIcon className='text-primary-color size-[1.5rem]' />} />}
                heading={ourValues[2].heading}
                description={ourValues[2].description}
              />
              <CardTwo
                icon={<Icon icon={<RocketIcon className='text-primary-color size-[1.5rem]' />} />}
                heading={ourValues[3].heading}
                description={ourValues[3].description}
              />

            </div>


          </div>
        </div>
      </section>

      <section className='px-5'>
        <div>
          <div>
            <h2 className='font-semibold'>MARKETING SOLUTIONS PROVIDER</h2>
            <h1 className='text-[1.8rem] font-bold leading-9 mt-6'> We’re a leader in digital marketing solutions</h1>
          </div>
          <div className='mt-6'>
            <p className='text-bodyTextColor'>After years of experience, we have learned that each marketing channel has its own unique advantages, but they work best when strategically combined with other channels. Therefore, we provide our clients with full-service strategies that utilize a comprehensive mix of digital channels to enhance visibility, boost conversions, and drive revenue.</p>
            <UnderlineButton buttonName={'MARKETING SOLUTIONS'} />
          </div>
        </div>
      </section>

      <section className='mt-10'>

        <div className='xl:w-11/12 m-auto'>

          <h1 className='text-center text-[1.2rem] font-semibold px-5'>Our Clients</h1>
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
        </div>

      </section>

      <section>
        
      </section>
    </>
  )
}

export default page

const CardTwo = ({ heading, icon, description }) => {
  return (
    <>
      <div className='w-[100%] py-4 pl-7 pr-16 pb-[2.5rem] pt-10 sm:pt-5 mt-7 rounded-[2.5rem]  bg-white'>

        <div className='xl:h-[18rem] md:h-[16rem]'>

          <span>{icon}</span>

          <h1 className='text-[1.3rem] font-bold mt-5 sm:mt-3'>{heading}</h1>

          <p className='mt-5 text-bodyTextColor'>
            {description}
          </p>
        </div>

      </div>
    </>
  )
}