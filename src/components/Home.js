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
import img1 from '@/assets/images/imcard1.jpg'
import img2 from '@/assets/images/imcard2.jpg'
import img3 from '@/assets/images/imcard3.jpg'
import { CardOne, CardTwo, RoundedCircleCard } from './Cards';
import sampledata from '@/assets/sampledata/data.json';
import NumbersAndResults from './NumbersAndResults';
import Divider from './Divider';
import { homeone, hometwo, curveline } from '@/helpers/icons';


const cardone = sampledata.cardone;
const cardtwo = sampledata.cardtwo;

const imageCard = sampledata.imageCard;
const proofData = sampledata.proofData;



const HomePage = () => {

    return (
        <>
            <section className='linear-gradient px-5 pt-10 '>
                <div className='xl:w-11/12 m-auto '>
                    <div className=''>
                        <div className=''>
                            <h1 className='text-center mx-[1.2rem] font-bold text-[2rem] leading-9 
                            tracking-wider md:px-12 lg:text-[4rem] lg:leading-[3.5rem]'>
                                Strategic Marketing, Dynamic  Branding, Real Results
                            </h1>
                        </div>
                        <div className=' mt-6 px-4 flex justify-center'>
                            <span className='text-center text-[1.2rem] text-bodyTextColor font-semibold'>
                                Transform your business with our innovative, results-driven marketing and business solutions
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
                                        src="https://thecrownset.com/wp-content/uploads/2023/06/GettyImages-1404633864-Converted.png"
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
                            <DarkButton buttonText={"Let's talk"} />
                        </div>
                    </div>

                    {/* for md and above */}

                    <div className='hidden md:block mt-16 relative w-11/12 m-auto'>


                        <div className='flex h-[20rem] '>

                            {/* speaker box    */}
                            <div className=' w-[18rem] h-[18rem] lg:w-[28rem] lg:h-[25rem] xl:w-[30rem] xl:h-[28rem]
                             rounded-[2rem] relative mb-4'>

                                <Image src={homeone} alt="Description" layout="fill" objectFit="cover" />

                                {/* contact box */}
                                <div className='relative  bg-[#ffbe12] h-[10rem] w-[14rem] left-[63.5%] top-[60%]  rounded-[2rem] 
                       flex flex-col justify-center items-center lg:top-[60%] lg:left-[72%] '>

                                    <span>{`Let's talk
                                that matters.`}</span>
                                    <DarkButton buttonText={"Let's talk"} />

                                </div>

                            </div>

                            {/* pattern box */}
                            <div className='w-[24rem] h-[18rem] lg:w-[31rem]  lg:h-[27rem] xl:w-[35rem] xl:h-[29rem] rounded-[2rem] 
                             relative lg:px-2 '>

                                <div className='h-[3rem] relative top-[-14rem]'>
                                    <Image
                                        src={curveline}
                                        width={400}
                                        height={500}
                                        alt="Picture of the author"

                                    />
                                </div>
                                <Image
                                    src={hometwo} alt="Description" layout="fill" objectFit="cover"
                                    className=' lg:mx-1 lg:mt-[-1rem] xl:mt-[0]' />

                                {/* award box  */}
                                <div className='relative bg-[#e9e5fe] h-[9rem] w-[6rem] top-[-2rem] lg:h-[11rem] m-auto  left-[34%] rounded-[2rem]
                        lg:left-[38%] lg:top-[0] '>
                                    <div className='relative top-[-1rem] left-[1rem]'>
                                        <Image
                                            src="https://thecrownset.com/wp-content/uploads/2023/06/GettyImages-1404633864-Converted.png"
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
            <div className='p-5 mt-10  xl:px-10 xl:w-11/12 m-auto lg:mt-[8rem] xl:[10rem]'>
                <div>

                    <h2 className='text-[1rem] font-bold tracking-tight'>WHAT WE DO</h2>
                    <div className='md:grid md:grid-cols-2 md:gap-[5rem] xl:gap-[10rem] '>
                        <div className='tracking-widest'>
                            <h1 className='text-[2rem] md:text-[2.5rem] xl:text-[3rem] md:leading-10 tracking-tighter font-bold leading-8 my-5 xl:text-wrap'>We solve digital challenges</h1>
                        </div>
                        <div className='mt-5'>
                            <p className='text-bodyTextColor'>Together, we help our clients achieve tangible, measurable results. Focused on business outcomes — we bring a unique set of expertise and skills to the party.</p>

                            <UnderlineButton buttonName={'more about us'} />

                        </div>
                    </div>
                </div>

                <div className='mt-[3rem] md:flex md:gap-[1rem] xl:gap-[3rem]'>
                    <CardOne

                        heading={cardone[0].heading}
                        icon={<Icon icon={<AnnouncementIcon className='text-primary-color size-[1.5rem]' />} />}
                        description={cardone[0].descripiton} />
                    <CardOne

                        heading={cardone[1].heading}
                        icon={<Icon icon={<NetworkIcon className='text-primary-color size-[1.5rem]' />} />}
                        description={cardone[1].descripiton} />
                    <CardOne

                        heading={cardone[2].heading}
                        icon={<Icon icon={<DollarIcon className='text-primary-color size-[1.5rem]' />} />}
                        description={cardone[2].descripiton} />

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
                        src='https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1193505273-1024x417.jpg'
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

                        <DarkButton buttonText={'view all solutions'} />
                    </div>


                    <div className='md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:w-11/12 m-auto '>

                        <CardTwo
                            icon={<Icon icon={<SearchIcon className='text-primary-color size-[1.5rem]' />} />}
                            heading={cardtwo[0].heading}
                            description={cardtwo[0].description}
                        />

                        <CardTwo
                            icon={<Icon icon={<TargetArrowIcon className='text-primary-color size-[1.5rem]' />} />}
                            heading={cardtwo[1].heading}
                            description={cardtwo[1].description}
                        />

                        <CardTwo
                            icon={<Icon icon={<EmailIcon className='text-primary-color size-[1.5rem]' />} />}
                            heading={cardtwo[2].heading}
                            description={cardtwo[2].description}
                        />
                        <CardTwo
                            icon={<Icon icon={<RocketIcon className='text-primary-color size-[1.5rem]' />} />}
                            heading={cardtwo[3].heading}
                            description={cardtwo[3].description}
                        />

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
            <div className='px-5 xl:flex xl:flex-row-reverse xl:justify-center xl:items-center xl:gap-[8rem]  xl:w-11/12 m-auto'>
                <div className=' xl:mt-[10rem] xl:px-4'>

                    <div className='flex flex-col text-[2rem] font-bold leading-8 xl:text-[3rem] xl:leading-[2.5rem] '>
                        <h1>Why Crownset is your top-choice</h1>

                    </div>

                    <div className='mt-10'>

                        <span className='text-bodyTextColor'>We offer comprehensive solutions! 📈 Marketing strategy, IT services, SMM, SMO, and more! 💻📊 Boost your business with our expert services, driving growth and success! 🚀</span>
                    </div>

                    <DarkButton buttonText={'get proposal'} />

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
                                        src='https://thecrownset.com/wp-content/uploads/2023/06/Stats.svg'
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
                                    <span>Frendly team of</span>
                                    <span>experts</span>
                                </h1>
                                <p className='mt-5'>Our experts and professionals are never more than an email or a phone call away. Or, if you prefer to talk face to face, drop by our office to discuss your plans and goals over a cup of coffee. We are here for you.</p>

                                <div className='mt-5 mb-7 flex justify-center items-center'>
                                    <Image
                                        src='https://thecrownset.com/wp-content/uploads/2023/06/pexels-kindel-media-7688169-copy.png'
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

                                <p className='mt-5'>We cultivate an environment of transparency and communication in all we do. You don’t have to wonder what is going on with your campaign – we will keep you in the loop and in control.</p>

                                <div className='mt-5 mb-7 flex justify-center items-center'>
                                    <Image
                                        src='https://thecrownset.com/wp-content/uploads/2023/06/Stats2.svg'
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
                                    src='https://thecrownset.com/wp-content/uploads/2023/06/Stats.svg'
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
                                <span>Frendly team of</span>
                                <span>experts</span>
                            </h1>
                            <p className='mt-5 text-bodyTextColor'>Our experts and professionals are never more than an email or a phone call away. Or, if you prefer to talk face to face, drop by our office to discuss your plans and goals over a cup of coffee. We are here for you.</p>

                            <div className='mt-5 mb-14 flex justify-center items-center'>
                                <Image
                                    src='https://thecrownset.com/wp-content/uploads/2023/06/pexels-kindel-media-7688169-copy.png'
                                    width={600}
                                    height={700}
                                    alt="Picture of the author"
                                    className='rounded-[2rem]'
                                />


                            </div>


                        </div>

                        <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                            ${toggleResults ? 'block' : 'hidden'} mt-10`}>
                            <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                <span>Choose a partner</span>
                                <span>that understands you </span>
                            </h1>

                            <p className='mt-5 text-bodyTextColor'>We cultivate an environment of transparency and communication in all we do. You don’t have to wonder what is going on with your campaign – we will keep you in the loop and in control.</p>

                            <div className='mt-5 mb-14 flex justify-center items-center'>
                                <Image
                                    src={'https://thecrownset.com/wp-content/uploads/2023/06/Stats2.svg'}
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
            <div className='flex flex-col justify-center items-center p-[1rem] mt-8 xl:mt-[5rem] xl:w-11/12 m-auto'>
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

                <Divider />

            </div>
        </>
    )
}

const ImageCard = ({ imageUrl, date, title }) => {
    return (
        <>
            <div className={` border mt-[2rem] rounded-[3rem] pb-[2rem]`}>
                <div >
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



            </div>
        </>
    )

}


