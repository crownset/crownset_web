'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import img1 from '@/assets/images/img1.jpg'
import { FaArrowRight } from "react-icons/fa6";
import { RiSearch2Fill as SearchIcon } from "react-icons/ri";
import { TbTargetArrow as TargetArrowIcon } from "react-icons/tb";
import { MdEmail as EmailIcon } from "react-icons/md";
import { IoMdRocket as RocketIcon } from "react-icons/io";
import { HiSpeakerphone as AnnouncementIcon } from "react-icons/hi";
import { GiNetworkBars as NetworkIcon } from "react-icons/gi";
import { AiFillDollarCircle as DollarIcon } from "react-icons/ai";
import Icon from '../Icon';


const carddata = [
    {
        heading: "Better reach",
        "icon": "icon",
        descripiton: "Amplify your business with our expertise! We provide better reach through targeted strategies, maximizing your online presence and engaging your audience for lasting impact."
    },
    {
        heading: "Better solution",
        "icon": "TargetArrowIcon",
        descripiton: "Transform your business with our innovative solutions! We provide better solutions through digital marketing and IT services, driving growth, efficiency, and success for a thriving online presence."
    },
    {
        heading: "Better outcomes",
        "icon": "icon",
        descripiton: "Accelerate your business success! We deliver better outcomes through data-driven digital marketing, tailored marketing strategies, and expert IT services, driving revenue growth and long-term sustainability."
    }
]

const cardsecond = [
    {
        heading: "Paid search marketing",
        icon: "icon",
        description: "Craft campaigns — built just for your business — to ensure real and quantifiable ROI."
    },
    {
        heading: "Search engine optimization",
        icon: "icon",
        description: "Maintain your best spot on the search results page, so you can find new customers and re-engage loyal ones."
    },
    {
        heading: "Email marketing",
        icon: "icon",
        description: "When it comes to reaching your target audience, you can’t get much closer than direct to their inboxes."
    },
    {
        heading: "Conversion rate optimization",
        icon: "icon",
        description: "Craft campaigns — built just for your business — to ensure real and quantifiable ROI."
    }
]

const imageCard = [
    {
        "imageUrl": "image",
        "date": "MAY 2023",
        "title": "The evolution of live-stream content and short-form video: a look at the TikTok revolution"
    },
    {
        "imageUrl": "image",
        "date": "MAY 2023",
        "title": "The Metaverse boom: brands unite and Apple takes a rain check"
    },
    {
        "imageUrl": "image",
        "date": "MAY 2023",
        "title": "Verify your site is protecting your business"
    }
]

const HomePage = () => {


    return (
        <>
            <SectioOne />
            <SectionTwo />
            <SectionThird />
            <SectionFour />
            <SectionFive />
            <SectionSix />
        </>
    )
}

export default HomePage

const SectioOne = () => {
    return (
        <>

            <div className='bg-[#EAE8FF]'>
                <div className='flex-column w-full items-center justify-center text-center pt-20'>
                    <div className='text-5xl text-center m-auto font-bold max-md:text-2xl'>
                        <h1>
                            Strategic Marketing, Dynamic <br /> Branding, Real Results
                        </h1>
                    </div>
                    <div className='pt-5 font-xs max-md:w-80 max-md:m-auto  '>
                        <span>
                            Transform your business with our innovative, results-driven marketing and business solutions
                        </span>
                    </div>
                </div>
            </div>

            <div className='bg-[#EAE8FF]'>
                <div className='w-full flex items-center justify-center m-auto rounded-xl'>
                    <div className='bg-[#b0b1ff] w-80 h-100 rounded-3xl overflow-hidden clip-your-needful-style'>
                        <Image
                            src="https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1387685447-shadow.png"
                            className='w-48 h-100' width={100} height={100}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const SectionTwo = () => {
    return (
        <>
            <div className='p-5'>
                <div>

                    <h2 className='text-[1rem] font-bold '>WHAT WE DO</h2>
                    <div className='md:grid md:grid-cols-2'>
                        <div className='tracking-widest'>
                            <h1 className='text-[2rem] font-bold leading-8 my-5 xl:text-wrap'>We solve digital challenges</h1>
                        </div>
                        <div className='mt-5'>
                            <p className='text-[#615f5b]'>Together, we help our clients achieve tangible, measurable results. Focused on business outcomes — we bring a unique set of expertise and skills to the party.</p>
                            <button className='mt-10 underline decoration-blue-600 underline-offset-8 decoration-[2px] font-bold text-[0.8rem] tracking-widest'>MORE ABOUT US</button>
                        </div>
                    </div>
                </div>

                <div className='mt-[3rem] md:flex md:gap-[1rem]'>
                    <Cards

                        heading={carddata[0].heading}
                        icon={<Icon icon={<AnnouncementIcon className='text-blue-600 size-[1.5rem]' />} />}
                        description={carddata[0].descripiton} />
                    <Cards

                        heading={carddata[1].heading}
                        icon={<Icon icon={<NetworkIcon className='text-blue-600 size-[1.5rem]' />} />}
                        description={carddata[1].descripiton} />
                    <Cards

                        heading={carddata[2].heading}
                        icon={<Icon icon={<DollarIcon className='text-blue-600 size-[1.5rem]' />} />}
                        description={carddata[2].descripiton} />



                    {/* {
                        carddata.map((item, i) => (
                            <Cards
                                key={i}
                                heading={item.heading}
                                icon={<Icon icon={<RiSearch2Fill className='text-blue-600 size-[1.5rem]' />} />}
                                description={item.descripiton} />
                        ))
                    } */}

                </div>
            </div>
        </>
    )
}

const Cards = ({ heading, icon, description }) => {
    return (
        <>
            <div className='border py-4 pb-10 px-7 pt-12 rounded-[3rem] mt-7'>
                <div className='flex justify-between '>
                    <h1 className='text-[1.3rem] font-bold'>{heading}</h1>
                    <span>{icon}</span>
                </div>
                <p className='mt-5 text-[#615f5b]'>
                    {description}
                </p>
            </div>
        </>
    )
}

const SectionThird = () => {
    return (
        <>
            <div className='mt-[-3rem] '>
                <div className='relative top-[4rem] sm:top-[8rem] xl:flex xl:justify-center xl:items-center'>

                    <Image
                        className='rounded-[2.5rem] aspect-auto object-cover px-[1rem] sm:rounded-[3rem]'
                        src={img1}

                        alt="Picture of the author"
                    />
                </div>
                <div className='bg-[#efecff] px-[1rem] pt-[4rem] pb-[2rem]'>

                    <div className='pt-[5.5rem]'>
                        <h2 className='text-[1rem] font-[600]'>OUR CAPABILITIES</h2>
                        <div className='mt-5'>
                            <h1 className='flex flex-col font-bold text-[1.6rem] leading-10 md:text-[2.5rem] '>
                                Customer-centric innovation, delivering measurable success 🚀
                                <span>Icon</span>
                            </h1>
                        </div>
                    </div>

                    <button className='uppercase flex  justify-center gap-2 items-center mt-8 text-white bg-black py-[0.7rem] px-[1.5rem] rounded-[1rem]'>
                        <span className=''>View All Solutions</span>
                        <FaArrowRight className='text-white' />

                    </button>

                    <div className='md:grid md:grid-cols-2 gap-2 xl:grid-cols-4'>

                        <CardSecond
                            icon={<Icon icon={<SearchIcon className='text-blue-600 size-[1.5rem]' />} />}
                            heading={cardsecond[0].heading}
                            description={cardsecond[0].description}
                        />

                        <CardSecond
                            icon={<Icon icon={<TargetArrowIcon className='text-blue-600 size-[1.5rem]' />} />}
                            heading={cardsecond[1].heading}
                            description={cardsecond[1].description}
                        />

                        <CardSecond
                            icon={<Icon icon={<EmailIcon className='text-blue-600 size-[1.5rem]' />} />}
                            heading={cardsecond[2].heading}
                            description={cardsecond[2].description}
                        />
                        <CardSecond
                            icon={<Icon icon={<RocketIcon className='text-blue-600 size-[1.5rem]' />} />}
                            heading={cardsecond[3].heading}
                            description={cardsecond[3].description}
                        />


                        {/* {
                            cardsecond.map((item, i) => (
                                <CardSecond key={i}
                                    icon={item.icon}
                                    heading={item.heading}
                                    description={item.descripiton}
                                />
                            ))

                        } */}

                    </div>


                </div>
            </div>
        </>
    )
}

const CardSecond = ({ heading, icon, description }) => {
    return (
        <>
            <div className='border w-[100%] py-4 px-7 pb-[2.5rem] pt-12 rounded-[2.5rem] mt-7 bg-white'>


                <span>{icon}</span>

                <h1 className='text-[1.3rem] font-bold mt-5'>{heading}</h1>

                <p className='mt-5 text-[#615f5b]'>
                    {description}
                </p>
                <button className='uppercase underline decoration-blue-600 underline-offset-8 decoration-[2px] mt-8'>Leran More</button>
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
            <div className='px-5 xl:flex xl:flex-row-reverse xl:justify-center xl:items-center xl:gap-[7rem] '>
                <div className='mt-[4rem] xl:mt-[10rem]'>

                    <div className='flex flex-col text-[2rem] font-bold  mt-10 leading-8 xl:text-[3rem] xl:leading-[2.5rem]'>
                        <h1>Why Crownset is your top-choice</h1>

                    </div>

                    <div className='mt-10'>

                        <span className='text-[#615f5b]'>We offer comprehensive solutions! 📈 Marketing strategy, IT services, SMM, SMO, and more! 💻📊 Boost your business with our expert services, driving growth and success! 🚀</span>
                    </div>

                    <button className='uppercase flex  justify-center gap-2 items-center mt-8 text-white bg-black p-[0.5rem] px-[1.5rem] rounded-[1rem]'>
                        <span>get proposal</span>
                        <FaArrowRight className='text-white' />

                    </button>

                </div>

                <div className='mt-10 md:hidden'>

                    <div className='bg-[#e9e5fe] rounded-t-[3rem] border-t'>

                        <div className='pl-[2rem] py-[1.7rem] border-t  rounded-t-[3rem]'
                            onClick={handleTransparency}
                        >
                            <h1 className='text-[1rem] font-bold '>TRANSPARENCY</h1>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleTransparency ? 'block' : 'hidden'} mt-10`}>
                                <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                    <span>100% Campaign</span>
                                    <span>transparency</span>
                                </h1>
                                <p className='mt-5'>We cultivate an environment of transparency and communication in all we do. You don’t have to wonder what is going on with your campaign – we will keep you in the loop and in control.</p>
                                <div>image</div>
                            </div>
                        </div>

                        <div className='pl-[2rem] py-[1.7rem] border-t border-white rounded-t-[3rem] '
                            onClick={handleExpert}
                        >
                            <h1 className='text-[1rem] font-bold'>TEAM OF EXPERTS</h1>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleExperts ? 'block' : 'hidden'} mt-10`}>
                                <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                    <span>Frendly team of</span>
                                    <span>experts</span>
                                </h1>
                                <p className='mt-5'>Our experts and professionals are never more than an email or a phone call away. Or, if you prefer to talk face to face, drop by our office to discuss your plans and goals over a cup of coffee. We are here for you.</p>
                                <div>image</div>
                            </div>
                        </div>

                        <div className='pl-[2rem] py-[1.7rem] border-t  border-white rounded-t-[3rem]'
                            onClick={handleResult}
                        >
                            <h1 className='text-[1rem] font-bold'>RESULTS</h1>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleResults ? 'block' : 'hidden'} mt-10`}>

                                <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                    <span>Choose a partner</span>
                                    <span>that understands you </span>
                                </h1>

                                <p className='mt-5'>We cultivate an environment of transparency and communication in all we do. You don’t have to wonder what is going on with your campaign – we will keep you in the loop and in control.</p>

                                <div>image</div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='hidden md:block mt-10 space-y-0  p-[2rem]'>

                    <div className='flex justify-evenly items-center '>

                        <h1 className={`font-bold text-[1rem] rounded-[2rem] ${toggleTransparency ? 'bg-[#e9e5fe]' : 'bg-white'}  p-[2rem]`} onClick={handleTransparency}>TRANSPARENCY</h1>
                        <h1 className={`font-bold text-[1rem] rounded-[2rem] ${toggleExperts ? 'bg-[#e9e5fe]' : 'bg-white'} p-[2rem]`} onClick={handleExpert}>TEAM OF EXPERTS</h1>
                        <h1 className={`font-bold text-[1rem] rounded-[2rem] ${toggleResults ? 'bg-[#e9e5fe]' : 'bg-white'} p-[2rem]`} onClick={handleResult}>RESULTS</h1>
                    </div>

                    <div className='bg-[#e9e5fe] p-[0.5rem] px-[3rem] rounded-[2rem]'>

                        <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleTransparency ? 'block' : 'hidden'} mt-10`}>
                            <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                <span>100% Campaign</span>
                                <span>transparency</span>
                            </h1>

                            <p className='mt-5'>We cultivate an environment of transparency and communication in all we do. You don’t have to wonder what is going on with your campaign – we will keep you in the loop and in control.</p>

                            <div>image</div>
                        </div>

                        <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleExperts ? 'block' : 'hidden'} mt-10`}>
                            <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                <span>Frendly team of</span>
                                <span>experts</span>
                            </h1>
                            <p className='mt-5'>Our experts and professionals are never more than an email or a phone call away. Or, if you prefer to talk face to face, drop by our office to discuss your plans and goals over a cup of coffee. We are here for you.</p>
                            <div>image</div>
                        </div>

                        <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                ${toggleResults ? 'block' : 'hidden'} mt-10`}>
                            <h1 className='text-[1.2rem] flex flex-col font-bold'>
                                <span>Choose a partner</span>
                                <span>that understands you </span>
                            </h1>

                            <p className='mt-5'>We cultivate an environment of transparency and communication in all we do. You don’t have to wonder what is going on with your campaign – we will keep you in the loop and in control.</p>

                            <div>image</div>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

const SectionFive = () => {
    return (
        <>

            <div className='flex flex-col justify-center items-center p-[1rem] mt-8'>
                <h2 className='text-[1.5rem] font-bold'>Blog</h2>
                <h1 className='text-[1.8rem] text-center leading-7 mt-5 font-[600]'>Think further with our expert insights</h1>

                <div>


                    {
                        imageCard.map((item, i) => (
                            <ImageCard key={i}
                                imageUrl={item.imageUrl}
                                date={item.date}
                                title={item.title}
                            />
                        ))
                    }
                    <div className='flex gap-[0.5rem] justify-center items-center mt-6'>
                        <div className='w-[0.8rem] border rounded-[50%]'></div>
                        <div className='w-[0.8rem] border rounded-[50%]'></div>
                        <div className='w-[0.8rem] border rounded-[50%]'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ImageCard = ({ imageUrl, date, title }) => {
    return (
        <>
            <div className='border mt-[2rem] rounded-[2rem] pb-[2rem]'>
                <div className='text-center'>{imageUrl}</div>
                <div className='ml-[1.5rem]'>{date}</div>
                <div className='text-center px-[1.5rem] leading-5 mt-[1rem]'>{title}</div>


            </div>
        </>
    )

}

const SectionSix = () => {
    return (
        <div className='bg-[#f7f7f9] flex flex-col justify-center items-center p-[2rem]  rounded-t-[4rem]'>
            <h1 className='font-bold text-[1.5rem] text-center'>The proof is in the numbers</h1>

            <div className='flex flex-col justify-center items-center'>
                
                <div className='md:grid md:grid-cols-3 md:gap-5' >
                    <RoundedCircle value={'37'} descripiton={'Average increase in sales for our clients'}/>
                    <RoundedCircle value={'100'} descripiton={'Google and Facebook-certified team'}/>
                    <RoundedCircle value={'81'} descripiton={'Results improved compared to previous agencies'}/>

                </div>
                <div className='bg-[#e9e5fe] mt-[2rem]'>

                </div>
            </div>

        </div>

    )
}

const RoundedCircle = ({ value, descripiton }) => {
    return (
        <div className='flex flex-col justify-center items-center gap-6 mt-6'>
            <div className='w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] border rounded-[50%] flex justify-center items-center'>
                <div className='w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] border border-blue-600 rounded-[50%] flex justify-center items-center'>
                   <span className='text-[1.5rem] font-[600]'>{value}%</span> 
                </div>
            </div>
            <div className='font-bold text-center'>{descripiton}</div>
        </div>
    )
}