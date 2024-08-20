
"use client"
import { DarkButton, UnderlineButton } from '@/components/CustomButtons'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import sampledata from '@/assets/sampledata/data.json';
import Icon from '@/components/Icon';
import { TbTargetArrow as TargetArrowIcon } from "react-icons/tb";
import { MdEmail as EmailIcon } from "react-icons/md";
import { IoMdRocket as RocketIcon } from "react-icons/io";
import { HiLightBulb as BulbIcon } from "react-icons/hi";
import { FaLinkedinIn as LinkedinIcon } from "react-icons/fa6";
import { BsTranslate } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { useSwipeable } from 'react-swipeable';
import Divider from '@/components/Divider';
import * as images from '@/helpers/icons';
import Link from 'next/link';
import { CardFour, CardThree } from '@/components/Cards';

const ourValues = sampledata.ourValues;
const teamData = sampledata.teamData;
const ourProficiencyData = sampledata.ourProficiency;
const teamPic = [images.garvit, images.priyam];
const linkedinUrl = ["https://www.linkedin.com/in/garvit-chawla-25084b20b", "https://www.linkedin.com/in/priyampathak"]
const ourValuesIcon = {
  0: <BulbIcon className='text-primary-color size-[1.5rem]' />,
  1: <TargetArrowIcon className='text-primary-color size-[1.5rem]' />,
  2: <EmailIcon className='text-primary-color size-[1.5rem]' />,
  3: <RocketIcon className='text-primary-color size-[1.5rem]' />
}
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

  useEffect(() => {
    const updateIndex = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamData.length);
    };

    const intervalId = setInterval(updateIndex, 2000);


    return () => clearInterval(intervalId);
  }, [])

  const goToPrevious = () => {

    setTimeout(() => {
      const newIndex = currentIndex === 0 ? teamData.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);

    }, 300);
  };

  const goToNext = () => {

    setTimeout(() => {
      const newIndex = currentIndex === teamData.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);

    }, 300);
  };

  return (

    <>
      <section style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}
        className='px-5 py-3 '>
        <div className='mt-8 md:grid md:grid-cols-2 md:gap-4 xl:w-11/12 m-auto'>

          <div>
            <h2 className='text-[1rem] font-semibold'>ABOUT US</h2>
            <h1 className='text-[2rem] md:text-[3rem] md:leading-[3rem]
            xl:text-[4.2rem] xl:leading-[4rem] leading-8 lg:leading-[3rem] font-[700] text-[#560a39] mt-3 tracking-wide'>Excellence is in our Blood,</h1>
            <p className='mt-4 pr-3 lg:pr-9 lg:text-[1.2rem] text-bodyTextColor'>At Crownset, we empower businesses to not just participate in the market but to lead it. With our innovative business solutions and IT services, we transform your ideas into a powerful brand presence. Our expertise in marketing, coupled with cutting-edge technology, ensures that you don&apos;t just follow trends—you set them. Join us and let Crownset turn your business into a brand that stands out and thrives.</p>
          </div>

          <div className='mt-10'>
            <Image
              src={images.aboutimg1}
              width={800}
              height={500}
              className='rounded-[2rem]'
              alt="image"
            />
          </div>
        </div>
        
        <Divider />
      </section>

      <section className='xl:w-11/12 m-auto'>


        <p className='text-center px-[1rem] text-bodyTextColor text-[0.8rem] md:px-[2rem] lg:text-[1.5rem] lg:w-3/4 lg:m-auto font-semibold '>
          Our mission at Crownset Marketing Agency is to revolutionize companies by providing outstanding customer service and creative solutions. With more than six years of expertise, we are experts in offering complete business solutions that are customized to your particular requirements.

        </p>

      </section>

      <section className=' hidden xl:pt-1 px-[1rem]  pb-[2rem] mt-10' style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}>

        <div className=''>

          <div className='mt-5 xl:w-11/12 m-auto'>
            <h2 className='text-[1.4rem] font-[625] text-center'>OUR PROFICIENCY</h2>

          </div>



          <div className='md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:w-11/12 m-auto '>

            <CardFour
              icon={<Icon icon={<BulbIcon className='text-primary-color size-[1.5rem]' />} />}
              heading={ourProficiencyData[0].heading}
              description={ourProficiencyData[0].description}
            />

            <CardFour
              icon={<Icon icon={<TargetArrowIcon className='text-primary-color size-[1.5rem]' />} />}
              heading={ourProficiencyData[1].heading}
              description={ourProficiencyData[1].description}
            />

            <CardFour
              icon={<Icon icon={<CgWebsite className='text-primary-color size-[1.5rem]' />} />}
              heading={ourProficiencyData[2].heading}
              description={ourProficiencyData[2].description}
            />
            <CardFour
              icon={<Icon icon={<BsTranslate className='text-primary-color size-[1.5rem]' />} />}
              heading={ourProficiencyData[3].heading}
              description={ourProficiencyData[3].description}
            />

          </div>


        </div>

      </section>

      <section className='mt-16'>
        <div className='mt-[-3rem] xl:mt-[-9]'>

          <div className='relative top-[4rem] sm:top-[8rem] lg:top-[12rem] xl:flex xl:justify-center xl:items-center
  '>
            <Image
              className='rounded-[3rem] aspect-auto object-cover px-[1rem] h-[120px] sm:h-[200px] md:h-[300px] lg:h-[417px] xl:w-11/12 m-auto'
              src={images.aboutimg2}
              width={1280}
              height={417}
              alt="Picture of the author "
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

              {
                ourValues.map((card, i) => (
                  <CardThree
                  key={i}
                    icon={ourValuesIcon[i]}
                    heading={card.heading}
                    description={card.description}
                  />

                ))
              }
            </div>
          </div>
        </div>
      </section>

      <section className='px-5 mt-20 xl:mt-[10rem] xl:w-11/12 m-auto'>
        <div className='sm:grid sm:grid-cols-2 sm:gap-5 xl:gap-[6rem]'>
          <div>
            <h2 className='font-semibold mr-10 '>BUSINESS SOLUTIONS PROVIDER</h2>
            <h1 className='text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] 
            font-bold leading-9 mt-6 xl:text-[4rem] xl:leading-[4rem]'> We&apos;re a leader in IT services and Business solutions</h1>
          </div>
          <div className='mt-6'>
            <p className='text-bodyTextColor'>After years of experience, we&apos;ve learned that each service area offers unique advantages. To maximize these benefits, we strategically combine them to create comprehensive solutions. We provide our clients with full-service strategies that include business solutions, IT services, and digital marketing, enhancing visibility, boosting conversions, and driving revenue.</p>
            <div className='xl:mt-6'>
            <Link href="/services">
              <UnderlineButton buttonName={'Business SOLUTIONS'} />
            </Link>
            </div>
            
          </div>
        </div>
      </section>

      <section className='mt-20 px-5'>
        <div className='xl:w-11/12 m-auto'>
          <h1 className='text-center text-[1.2rem] font-semibold px-5'>Our Clients</h1>
          <div className='overflow-hidden'>
            <div className='flex gap-4 mt-10 animate-scroll'>
              {/* First set of images */}
              <div className='flex gap-6'>
                <Image
                  src={images?.boat_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.amazon_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.benz_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.haldirams_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.hyundai_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.kfc_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.lv_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.nestle_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.netflix_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
                <Image
                  src={images?.nike_logo}
                  width={171}
                  height={34}
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </section>

      <section className='px-5 mt-10 xl:w-11/12 m-auto'>
        <div className=''>
          <div>
            <h2 className='font-bold text-[1rem] md:mt-12 '>TEAM</h2>
            <h1 className='text-bold mt-4 pr-5 text-[1.8rem] leading-8 font-[700] 
            md:text-[2.5rem] md:leading-[2.3rem] lg:text-[4rem] lg:leading-[4rem]'>
              Founding Member Spotlight</h1>
          </div>

          {/* mobile view */}
          <div className='mt-6 md:hidden'>
            <div className="relative w-full overflow-hidden" data-carousel="slide" {...handlers}>

              <div className="flex w-full   transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {teamData.map((card, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full  flex items-center justify-center px-2 mt-5 "
                  >
                    <div className="w-full h-full flex flex-col pb-[1rem]">
                      <div className='rounded-[3rem]' >
                        <Image
                          src={teamPic[index]}
                          width={700}
                          height={300}
                          alt="Picture of the author"
                          className='rounded-[3rem]'
                        />
                      </div>
                      <div className='flex flex-row items-center gap-2 px-[2rem] mt-10 md:grid md:grid-cols-2 gap:10'>
                        <div>
                          <p className="text-xl font-bold leading-6 ">{card.name}</p>
                          <h2 className="text-bodyTextColor text-sm">{card.designation}</h2>
                        </div>
                        <div className="flex flex-row gap-5 items-center">

                          <div>
                            <Link href={linkedinUrl[index]} target="_blank"><Icon icon={<LinkedinIcon />} /></Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            {/* <div className='flex justify-center items-center space-x-3'>
              <button onClick={goToPrevious}><GrFormPreviousLink className='text-[2rem]' /></button>
              <button onClick={goToNext}><GrFormNextLink className='text-[2rem]' />   </button>
            </div> */}
          </div>

          <div className='hidden md:block'>
            <div className='flex justify-between items-center mt-5'>
              {teamData.map((card, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center px-2 mt-5 "
                >
                  <div className=" flex flex-col pb-[1rem]">
                    <div className='rounded-[3rem]' >
                      <Image
                        src={teamPic[index]}
                        width={300}
                        height={300}
                        alt="Picture of the author"
                        className='rounded-[3rem] lg:w-[400px] xl:w-[450px]'
                      />
                    </div>
                    <div className='flex flex-row items-center gap-2 px-[2rem] mt-10 md:grid md:grid-cols-2 gap:10'>
                      <div>
                        <p className="text-xl font-bold leading-6 ">{card.name}</p>
                        <h2 className="text-bodyTextColor text-sm">{card.designation}</h2>
                      </div>
                      <div className="flex flex-row gap-5 items-center">

                        <div>
                          <Link href={linkedinUrl[index]} target="_blank"><Icon icon={<LinkedinIcon />} /></Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>



      </section>

      <section className='mt-10 px-5 hidden'>
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
