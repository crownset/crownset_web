
"use client"
import { DarkButton, UnderlineButton } from '@/components/CustomButtons'
import Image from 'next/image'
import React, { useState } from 'react'
import sampledata from '@/assets/sampledata/data.json';
import Icon from '@/components/Icon';
import { TbTargetArrow as TargetArrowIcon } from "react-icons/tb";
import { MdEmail as EmailIcon } from "react-icons/md";
import { IoMdRocket as RocketIcon } from "react-icons/io";
import { HiLightBulb as BulbIcon } from "react-icons/hi";
import { FaLinkedinIn as LinkedinIcon } from "react-icons/fa6";
import { useSwipeable } from 'react-swipeable';
import Divider from '@/components/Divider';



const ourValues = sampledata.ourValues;
const teamData = sampledata.teamData;


const Page = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex === teamData.length - 1 ? 0 : prevIndex + 1));
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamData.length - 1 : prevIndex - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });


  return (

    <>
      <section style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}
        className='px-5 py-3 '>
        <div className='mt-8 md:grid md:grid-cols-2 md:gap-4'>
          <div>
            <h2 className='text-[1rem] font-semibold'>ABOUT US</h2>
            <h1 className='text-[2rem] md:text-[3rem] md:leading-[3rem]
            xl:text-[4.2rem] xl:leading-[4rem] leading-8 lg:leading-[3rem] font-[700] text-[#560a39] mt-3 tracking-wide'>Excellence is in our Blood,</h1>

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
        <Divider/>
      </section>

      <section className='xl:w-11/12 m-auto'>
      

        <p className='text-center text-bodyTextColor text-[0.8rem] md:px-[2rem] lg:text-[1.5rem] lg:w-3/4 lg:m-auto '>
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

          <div className='px-[1rem] pt-[4rem] pb-[2rem] '
            style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}
          >

            <div className='mt-5 sm:mt-[6rem] lg:mt-[10rem]  
            xl:w-11/12 m-auto'>
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

      <section className='px-5 mt-20 xl:w-11/12 m-auto'>
        <div className='sm:grid sm:grid-cols-2 sm:gap-5 xl:gap-[6rem]'>
          <div>
            <h2 className='font-semibold mr-10 '>MARKETING SOLUTIONS PROVIDER</h2>
            <h1 className='text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] 
            font-bold leading-9 mt-6 xl:text-[4rem] xl:leading-[4rem]'> We’re a leader in digital marketing solutions</h1>
          </div>
          <div className='mt-6'>
            <p className='text-bodyTextColor'>After years of experience, we have learned that each marketing channel has its own unique advantages, but they work best when strategically combined with other channels. Therefore, we provide our clients with full-service strategies that utilize a comprehensive mix of digital channels to enhance visibility, boost conversions, and drive revenue.</p>
            <UnderlineButton buttonName={'MARKETING SOLUTIONS'} />
          </div>
        </div>
      </section>

      <section className='mt-20 px-5 '>

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
        <Divider/>
      </section>

      <section className='px-5 mt-10 xl:w-11/12 m-auto'>
        <div className='md:grid md:grid-cols-2 md:gap-7 md:justify-center md:items-start'>
          <div>
            <h2 className='font-bold text-[1rem] md:mt-12 '>TEAM</h2>
            <h1 className='text-bold mt-4 pr-5 text-[1.8rem] leading-6 font-[700] 
            md:text-[2.5rem] md:leading-[2.3rem] lg:text-[4rem] lg:leading-[4rem]'>
              Meet the Numerique revenue revolutionaries</h1>
          </div>

          <div className='mt-6'>
            <div className="relative w-full overflow-hidden" data-carousel="slide" {...handlers}>

              <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {teamData.map((card, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full  flex items-center justify-center px-2 mt-5"
                  >
                    <div className="w-full h-full flex flex-col pb-[1rem]">
                      <div className='rounded-[3rem]' >
                        <Image
                          src={card.url}
                          width={500}
                          height={300}
                          alt="Picture of the author"
                          className='rounded-[3rem]'
                        />
                      </div>
                      <div className='flex flex-col gap-2 px-[2rem] mt-10 md:grid md:grid-cols-2 gap:4'>
                        <div>
                          <p className="text-bodyTextColor text-sm">{card.name}</p>

                          <h2 className="text-xl font-bold leading-6 ">{card.designation}</h2>
                        </div>
                        <div>
                          <span><Icon icon={<LinkedinIcon />} /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-3">
                {teamData.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-[0.3rem] h-[0.3rem] rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => setCurrentIndex(index)}
                  ></button>
                ))}
              </div>
            </div>

          </div>
        </div>
         <Divider/>
      </section>

      <section className='mt-10 px-5'>
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

      </section>
    </>
  )
}


export default Page
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