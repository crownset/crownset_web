'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import { RiSearch2Fill as SearchIcon } from "react-icons/ri";
import { TbTargetArrow as TargetArrowIcon } from "react-icons/tb";
import { MdEmail as EmailIcon } from "react-icons/md";
import { IoMdRocket as RocketIcon } from "react-icons/io";
import { HiSpeakerphone as AnnouncementIcon } from "react-icons/hi";
import { GiNetworkBars as NetworkIcon } from "react-icons/gi";
import { AiFillDollarCircle as DollarIcon } from "react-icons/ai";
import Icon from '@/components/Icon';
import { DarkButton, UnderlineButton } from './CustomButtons';
import Carousel from './Carousel';
import img1 from '@/assets/images/socialmediapic.png'
import img2 from '@/assets/images/itpic.png'
import img3 from '@/assets/images/solutionspic.png'
import { CardOne, CardTwo, ExpertiseCard, RoundedCircleCard, ServicesCard } from './Cards';
import sampledata from '@/assets/sampledata/data.json';
import NumbersAndResults from './NumbersAndResults';
import Divider from './Divider';
import { homeone, hometwo, curveline } from '@/helpers/icons';
import Link from 'next/link';
import * as images from '@/helpers/icons'
import { CgWebsite } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";
import { FaSearchengin } from "react-icons/fa6";


const expertiseData = sampledata.expertise;
const cardone = sampledata.cardone;
const cardtwo = sampledata.cardtwo;

const imageCard = sampledata.imageCard;
const proofData = sampledata.proofData;

const iconMap = {
    0: <SearchIcon className='text-primary-color size-[1.5rem]' />,
    1: <TargetArrowIcon className='text-primary-color size-[1.5rem]' />,
    2: <EmailIcon className='text-primary-color size-[1.5rem]' />,
    3: <RocketIcon className='text-primary-color size-[1.5rem]' />
}
const index = {
    0: 4,
    1: 8,
    2: 5,
    3: 9
}

const businessIcon = {
    0: <AnnouncementIcon className='text-primary-color size-[1.5rem]' />,
    1: <NetworkIcon className='text-primary-color size-[1.5rem]' />,
    2: <DollarIcon className='text-primary-color size-[1.5rem]' />
}

const expertiseIcon = {
    0: <CgWebsite className='text-primary-color size-[1.5rem]' />,
    1: <FaMobileAlt className='text-primary-color size-[1.5rem]' />,
    2: <FaSearchengin className='text-primary-color size-[1.5rem]' />
}


const HomePage = () => {

    return (
        <>
            <section className='linear-gradient px-5 pt-10 '>
                <div className='xl:w-11/12 m-auto '>
                    <div className='xl:w-11/12 m-auto'>
                        <div className=''>
                            <h1 className='text-center mx-[1.2rem] font-bold text-[2rem] leading-9 
                            tracking-wider md:px-12 lg:text-[3.5rem] lg:leading-[4rem]'>
                                Strategic Marketing, Dynamic  Business Solutions, Real Results
                            </h1>
                        </div>
                        <div className=' mt-6 px-4 flex justify-center'>
                            <span className='text-center text-[1.2rem] text-bodyTextColor font-semibold'>
                                Transform your business with our innovative, results-driven IT services and business solutions
                            </span>
                        </div>
                    </div>

                    {/* for mobile */}
                    <div className='sm:flex sm:flex-col sm:justify-center sm:items-center  md:hidden'>
                        <div className='mt-[-5rem] sm:mt-[-9rem] sm:ml-[5rem]'>
                            <div>
                                <Image
                                    src={curveline}
                                    width={400}
                                    height={500}
                                    alt="Picture of the author"
                                />
                            </div>
                            <div className='bg-[#e9e5fe] rounded-[2rem] mt-[-5rem] sm:mt-[-7rem]'>
                                <div className='relative top-[-1rem]'>
                                    <Image
                                        src={images.award}
                                        width={60}
                                        height={24}
                                        alt="Picture of the author"
                                        className='relative left-[75%]'
                                    />
                                </div>
                                <p className='relative top-[-2rem] left-[1rem] text-[1.2rem]
                                 text-bodyTextColor font-semibold'>Award Wining Agency</p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='ml-[-2rem]'>
                                <Image
                                    src={homeone}
                                    width={500}
                                    height={500}
                                    alt="Picture of the author"
                                />

                            </div>
                            <div className='relative top-[-6.5rem] left-[60%] w-[100px] object-cover 
                            sm:w-[220px] sm:overflow-hidden sm:left-[60%] sm:top-[-12rem]'>
                                <Image
                                    src={hometwo}
                                    width={500}
                                    height={500}
                                    alt="Picture of the author"
                                />
                            </div>


                        </div>
                        <div className='bg-[#ffbe12] mt-[-5rem] px-10 py-5 rounded-[2rem]
                        flex flex-col justify-center items-center sm:mt-[-10rem]'>
                            <span>{`Let's talk
                                that matters.`}</span>
                            <Link href="\freeAudit"> <DarkButton buttonText={"Let's talk"} /></Link>
                        </div>
                    </div>

                    {/* for md and above */}

                    <div className='hidden md:block mt-16 relative w-11/12 m-auto 
                    lg:top-[4rem] xl:top-[5rem]'>


                        <div className='flex justify-center items-center h-[20rem]'>

                            {/* speaker box    */}
                            <div className=' w-[18rem] h-[18rem] lg:w-[28rem] lg:h-[25rem] xl:w-[30rem] xl:h-[28rem]
                             xl:top-[1rem] rounded-[2rem] relative mb-4'>

                                <Image src={homeone} alt="Description" layout="fill" objectFit="cover" />

                                {/* contact box */}
                                <div className='relative  bg-[#ffbe12] h-[8rem] w-[12rem] left-[69%] top-[60%]  rounded-[2rem] 
                       flex flex-col justify-center items-center lg:h-[10rem] lg:w-[14rem] lg:top-[60%] lg:left-[72%] xl:left-[69.5%] xl:top-[62.5%] xl:w-[18rem]'>

                                    <span>{`Let's talk
                                that matters.`}</span>
                                    <Link href="/freeAudit">   <DarkButton buttonText={"Let's talk"} /></Link>

                                </div>

                            </div>

                            {/* pattern box */}
                            <div className='w-[24rem] h-[18rem] lg:w-[31rem]  lg:h-[27rem] lg:top-[1rem] xl:w-[36rem]
                             xl:h-[29rem] rounded-[2rem] 
                             relative lg:px-2 '>

                                <div className='h-[3rem] relative top-[-14rem] xl:left-[8rem]'>
                                    <Image
                                        src={curveline}
                                        width={400}
                                        height={500}
                                        alt="Picture of the author"
                                        className='pb-[1rem]'

                                    />
                                </div>
                                <Image
                                    src={hometwo} alt="Description" layout="fill" objectFit="cover"
                                    className=' lg:mx-1 lg:mt-[-1rem] xl:mt-[0]' />

                                {/* award box  */}
                                <div className='relative bg-[#e9e5fe] h-[9rem] w-[6rem] top-[-2rem] lg:h-[10rem] m-auto  left-[34%] rounded-[2rem]
                        lg:left-[38%] lg:top-[0]  xl:w-[8rem] xl:h-[11.5rem]'>
                                    <div className='relative top-[-1rem] left-[1rem] xl:left-[2rem]'>
                                        <Image
                                            src={images.award}
                                            width={60}
                                            height={24}
                                            alt="Picture of the author"
                                        />
                                    </div>

                                    <div className='flex flex-col'>

                                        <span className='text-wrap px-5 text-center  text-bodyTextColor font-semibold'>Award</span>
                                        <span className='text-wrap px-5 text-center  text-bodyTextColor font-semibold'>Wining</span>
                                        <span className='text-wrap px-5 text-center  text-bodyTextColor font-semibold'>Agency</span>
                                    </div>
                                </div>
                            </div>

                        </div>




                    </div>
                </div>
            </section>
            <SectionTwo />
            <section className='p-5 xl:px-10 xl:w-11/12 m-auto  '>
                <div>
                    <h1 className='text-[2rem] md:text-[2.5rem] xl:text-[3rem] 
                    md:leading-[3rem] tracking-tighter font-bold leading-8 my-5 xl:text-wrap'>Our Expertise</h1>

                    <div className='mt-[3rem] md:grid md:grid-cols-3 md:gap-4 xl:gap-[3rem]'>


                        {
                            expertiseData.map((card, i) => (
                                <ExpertiseCard
                                    key={i}
                                    heading={card.heading}
                                    description={card.description}
                                    technologies={card.technologies}
                                    index={i}
                                    icon={expertiseIcon[i]} />

                            ))
                        }

                    </div>
                </div>
            </section>
            <SectionThird />
            <SectionFour />
            <SectionFive />
            <NumbersAndResults heading={'The proof is in the numbers'} cardData={proofData} />
        </>
    )
}

export default HomePage


const SectionTwo = () => {
    return (
        <>
            <div className='p-5 mt-10  x xl:px-10 xl:w-11/12 m-auto lg:mt-[10rem] xl:mt-[14rem]'>
                <div>

                    <h2 className='text-[1rem] font-bold tracking-tight'>WHAT WE DO</h2>
                    <div className='md:grid md:grid-cols-2 md:gap-[5rem] xl:gap-[10rem] '>
                        <div className='tracking-widest'>
                            <h1 className='text-[2rem] md:text-[2.5rem] xl:text-[3rem] md:leading-[3rem] tracking-tighter font-bold leading-8 my-5 xl:text-wrap'>We Offer Comprehensive Business Solution</h1>
                        </div>
                        <div className='mt-5'>
                            <p className='text-bodyTextColor'>Together, we help our clients achieve tangible, measurable results. Focused on business outcomes — we bring a unique set of expertise and skills to the party.</p>
                             
                             <div className='xl:mt-6'>
                             <Link href="\about">
                                <UnderlineButton buttonName={'more about us'} />
                            </Link>
                             </div>
                            

                        </div>
                    </div>
                </div>

                <div className='mt-[3rem] md:grid md:grid-cols-3 md:gap-[1rem] xl:gap-[3rem]'>
                    {
                        cardone.map((card, i) => (
                            <CardOne
                                key={i}
                                heading={card.heading}
                                icon={businessIcon[i]}
                                description={card.descripiton} />

                        ))
                    }


                </div>
            </div>
        </>
    )
}



const SectionThird = () => {
    return (
        <>
            <div className='mt-[-3rem] xl:mt-[-9]'>

                <div className='relative top-[4rem] sm:top-[8rem] lg:top-[12rem] xl:flex xl:justify-center xl:items-center
                  '>
                    <Image
                        className='rounded-[3rem] aspect-auto object-cover px-[1rem]'
                        src={images.homeimg}
                        width={1280}
                        height={417}
                        alt="Picture of the author"
                    />
                </div>

                <div className='px-[1rem] pt-[4rem] pb-[2rem]'
                    style={{ background: 'linear-gradient(0deg, white, rgb(234, 232, 255) 80%)' }}
                >

                    <div className='mt-5 sm:mt-[6rem] lg:mt-[10rem]  xl:mr-[40rem] xl:ml-[10rem]  xl:w-1/3'>
                        <h2 className='text-[1rem] font-[600]'>OUR CAPABILITIES</h2>
                        <div className='mt-3'>
                            <h1 className='flex flex-col font-bold text-[1.6rem] leading-10 md:text-[2.5rem] xl:text-[3.2rem] xl:leading-[3rem]'>
                                Customer-centric innovation, delivering measurable success
                            </h1>
                        </div>
                    </div>

                    <div className='xl:ml-[10rem]'>
                        <Link href="/services">
                            <DarkButton buttonText={'view all solutions'} />
                        </Link>
                    </div>


                    <div className='md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:w-11/12 m-auto '>

                        {
                            cardtwo.map((card, i) => (
                                <CardTwo
                                    key={i}
                                    icon={iconMap[i]}
                                    heading={card.heading}
                                    index={index[i]}
                                    description={card.description}
                                />

                            ))

                        }


                    </div>


                </div>
            </div>
        </>
    )
}

const SectionFour = () => {

    const [toggleTransparency, setToggleTransparency] = useState(true);
    const [toggleExperts, setToggleExperts] = useState(false);
    const [toggleResults, setToggleResults] = useState(false);

    const handleTransparency = () => {
        setToggleTransparency(true);
        setToggleExperts(false);
        setToggleResults(false);

    }

    const handleExpert = () => {
        setToggleTransparency(false);
        setToggleExperts(true);
        setToggleResults(false);
    }
    const handleResult = () => {
        setToggleTransparency(false);
        setToggleExperts(false);
        setToggleResults(true);
    }

    return (
        <>
            <div className='px-5 lg:flex lg:flex-row-reverse lg:justify-center lg:items-center lg:gap-[8rem]  xl:w-11/12 m-auto'>
                <div className=' xl:mt-[10rem] xl:px-4'>

                    <div className='flex flex-col text-[2rem] font-bold leading-8 xl:text-[3rem] xl:leading-[2.5rem] '>
                        <h1>Why Crownset is your top-choice</h1>

                    </div>

                    <div className='mt-10 lg:w-[30rem]'>

                        <span className='text-bodyTextColor'>
                            Crownset stands out as a key partner for your growth and success by providing complete solutions to your needs. Our services include basic marketing strategy, IT services, social media marketing (SMM), and social media optimization (SMO). With Crownset, you can grow your business, grow it, and achieve unparalleled success. Choose Crownset for a holistic approach to elevate your brand and reach new heights. 🚀📈
                        </span>
                    </div>
                    <Link href="/freeAudit">
                        <DarkButton buttonText={'get proposal'} />
                    </Link>


                </div>

                <div className='mt-10 md:hidden'>

                    <div className='bg-[#e9e5fe] rounded-t-[3rem] border-t'>

                        <div className='px-[2rem] py-[1.7rem] border-t  rounded-t-[3rem]'
                            onClick={handleTransparency}
                        >
                            <h1 className='text-[1rem] font-bold cursor-pointer '>TRANSPARENCY</h1>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleTransparency ? 'block' : 'hidden'} mt-10`}>
                                <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                    <span>100% Campaign</span>
                                    <span>transparency</span>
                                </h1>
                                <p className='mt-5'>We cultivate an environment of transparency and communication in all we do. You don’t have to wonder what is going on with your campaign – we will keep you in the loop and in control.</p>

                                <div className='mt-5 mb-7 flex justify-center items-center'>
                                    <Image
                                        src={images.transperancy}
                                        width={600}
                                        height={700}
                                        alt="Picture of the author"
                                        className='rounded-[0.5rem]'
                                    />


                                </div>

                            </div>
                        </div>

                        <div className='px-[2rem] py-[1.7rem] border-t border-white rounded-t-[3rem] '
                            onClick={handleExpert}
                        >
                            <h1 className='text-[1rem] font-bold cursor-pointer'>TEAM OF EXPERTS</h1>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleExperts ? 'block' : 'hidden'} mt-10`}>
                                <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                    <span>Friendly team of</span>
                                    <span>experts</span>
                                </h1>
                                <p className='mt-5'>Our experts and professionals are never more than an email or a phone call away. Or, if you prefer to talk face to face, drop by our office to discuss your plans and goals over a cup of coffee. We are here for you.</p>

                                <div className='mt-5 mb-7 flex justify-center items-center'>
                                    <Image
                                        src={images.team}
                                        width={600}
                                        height={700}
                                        alt="Picture of the author"
                                        className='rounded-[0.5rem]'
                                    />


                                </div>

                            </div>
                        </div>

                        <div className='px-[2rem] py-[1.7rem] border-t  border-white rounded-t-[3rem]'
                            onClick={handleResult}
                        >
                            <h1 className='text-[1rem] font-bold cursor-pointer'>RESULTS</h1>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleResults ? 'block' : 'hidden'} mt-10`}>

                                <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                    <span>Choose a partner</span>
                                    <span>that understands you </span>
                                </h1>

                                <p className='mt-5'>Choose a partner who truly understands your needs and goals. We offer personalized solutions in web development, app development, and SEO to help your business run smoothly. Our team is dedicated to delivering results that align with your vision and drive your success.</p>

                                <div className='mt-5 mb-7 flex justify-center items-center'>
                                    <Image
                                        src={images.result}
                                        width={600}
                                        height={700}
                                        alt="Picture of the author"
                                        className='rounded-[0.5rem]'
                                    />


                                </div>


                            </div>
                        </div>

                    </div>

                </div>

                <div className='hidden md:block  mt-10  rounded-[2rem]  xl:w-full '>
                    <div className='flex justify-evenly items-center'>

                        <h1 className={`font-bold text-[1rem] text-center rounded-t-[2rem] ${toggleTransparency ? 'bg-[#e9e5fe]' : 'bg-white'} 
                         py-[2rem] w-[100%] h-[100%] cursor-pointer`} onClick={handleTransparency}>TRANSPARENCY</h1>
                        <h1 className={`font-bold text-[1rem]  text-center rounded-t-[2rem] ${toggleExperts ? 'bg-[#e9e5fe]' : 'bg-white'}
                         py-[2rem] w-[100%] h-[100%] cursor-pointer`} onClick={handleExpert}>TEAM OF EXPERTS</h1>
                        <h1 className={`font-bold text-[1rem]  text-center rounded-t-[2rem] ${toggleResults ? 'bg-[#e9e5fe]' : 'bg-white'} 
                        py-[2rem] w-[100%] h-[100%] cursor-pointer`} onClick={handleResult}>RESULTS</h1>
                    </div>

                    <div className={`p-[0.5rem] border px-[2rem] bg-[#e9e5fe] rounded-b-[2rem] 
                      ${toggleTransparency ? ' rounded-r-[2rem]' : ''}
                      ${toggleExperts ? ' rounded-[2rem]' : ''}
                      ${toggleResults ? ' rounded-tl-[2rem]' : ''}
                    `}>

                        <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                             ${toggleTransparency ? 'block' : 'hidden'} mt-10`}>
                            <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                <span>100% Campaign</span>
                                <span>transparency</span>
                            </h1>

                            <p className='mt-5 text-bodyTextColor'>We cultivate an environment of transparency and communication in all we do. You don’t have to wonder what is going on with your campaign – we will keep you in the loop and in control.</p>

                            <div className='mt-5 mb-14 flex justify-center items-center'>
                                <Image
                                    src={images.transperancy}
                                    width={600}
                                    height={700}
                                    alt="Picture of the author"
                                    className='rounded-[2rem]'
                                />

                            </div>
                        </div>

                        <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleExperts ? 'block' : 'hidden'} mt-10`}>
                            <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                <span>Friendly team of</span>
                                <span>experts</span>
                            </h1>
                            <p className='mt-5 text-bodyTextColor'>Our experts and professionals are never more than an email or a phone call away. Or, if you prefer to talk face to face, drop by our office to discuss your plans and goals over a cup of coffee. We are here for you.</p>

                            <div className='mt-5 mb-14 flex justify-center items-center'>
                                <Image
                                    src={images.team}
                                    width={600}
                                    height={700}
                                    alt="Picture of the author"
                                    className='rounded-[2rem] h-[250px]'
                                />


                            </div>


                        </div>

                        <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                            ${toggleResults ? 'block' : 'hidden'} mt-10`}>
                            <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                <span>Choose a partner</span>
                                <span>that understands you </span>
                            </h1>

                            <p className='mt-5 text-bodyTextColor'>Choose a partner who truly understands your needs and goals. We offer personalized solutions in web development, app development, and SEO to help your business run smoothly. Our team is dedicated to delivering results that align with your vision and drive your success.</p>

                            <div className='mt-5 mb-14 flex justify-center items-center'>
                                <Image
                                    src={images.result}
                                    width={600}
                                    height={700}
                                    alt="Picture of the author"
                                    className='rounded-[2rem]'
                                />


                            </div>


                        </div>

                    </div>



                </div>
            </div>
        </>
    )
}

const SectionFive = () => {
    const images = [img1, img2, img3];
    return (
        <>
            <div className='flex flex-col justify-center items-center p-[1rem] mt-8 xl:mt-[5rem] xl:w-11/12 m-auto' id="blog">
                <h2 className='text-[1.5rem] font-[300]'>Blog</h2>
                <h1 className='text-[1.8rem] text-center leading-8 font-he mt-4 font-[600] px-5'>
                    Think further with our expert insights
                </h1>

                <Carousel />
                <div className='hidden lg:block'>

                    <div className='grid grid-cols-3 gap-5' >
                        {
                            imageCard.map((card, i) => (
                                <ImageCard key={i} imageUrl={images[i]} date={card.date} title={card.title} />
                            ))
                        }
                    </div>
                </div>

                {/* <Divider /> */}

            </div>
        </>
    )
}

const ImageCard = ({ imageUrl, date, title }) => {
    const [more, setMore] = useState(false);
    const handleMore = () => {
        setMore(!more);
    }
    return (
        <>
            <div className={` border mt-[2rem] rounded-[3rem] pb-[2rem]`}>
                <div  >
                    <Image
                        src={imageUrl}
                        width={500}
                        height={700}
                        alt="Picture of the author"
                        className='rounded-t-[3rem]'
                    />
                </div>
                <div className='flex flex-col gap-2 px-[2rem] mt-10'>
                    <p className=' text-bodyTextColor text-sm'>{date}</p>
                    <h2 className='text-xl leading-6 font-bold'>{title}</h2>
                </div>

                {/* <UnderlineButton buttonName={'More'} onClick={handleMore}/> */}
                <div className=' flex flex-col gap-2 px-[2rem] mt-6'>
                    <ul className={` ${more ? 'block' : 'hidden'}`}>
                        <li><span className='font-semibold'>Reaching a wider audience:</span>
                            <span className='text-bodyTextColor'> Social media enables businesses to connect with a wider audience, increase brand visibility and attract potential customers from different demographics.</span></li>
                        <li><span className='font-semibold'>Increase engagement and sales:</span>
                            <span className='text-bodyTextColor'> By creating engaging content and engaging with fans, businesses can drive traffic to their website, increase sales and build stronger customer relationships.</span></li>
                    </ul>
                </div>


            </div>
        </>
    )

}


