"use client"
import { useState } from 'react';
import { IoArrowForward } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti"
import Image from 'next/image';

const ReviewCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const goToPrevious = () => {
        setFade(true);
        setTimeout(() => {
            const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
            setFade(false);
        }, 300);
    };

    const goToNext = () => {
        setFade(true);
        setTimeout(() => {
            const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
            setFade(false);
        }, 300);
    };

    return (
        <div className="relative w-full  mx-auto bg-[#f7f7fa] rounded-t-[3rem] lg:rounded-[3rem] px-3 py-3 lg:px-12 lg:w-11/12 ">
            <div>
                <BiSolidQuoteAltRight className='w-20 h-20 text-[#6754e9] ' />
            </div>
            <div className={`ml-3 transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'} lg:w-1/2`}>
                <h2 className="text-2xl lg:py-5 lg:text-3xl">{items[currentIndex].review1} {items[currentIndex].review2}</h2>
                <div className='flex flex-col gap-0 py-3'>
                    <p className='font-bold'>{items[currentIndex].reviewerName}</p>
                    <p>{items[currentIndex].designation}</p>
                </div>
            </div>
            <div className='flex flex-col gap-1  md:flex-row md:justify-between md:items-center '>
                <div className="flex gap-1">
                    <div>
                        <IoMdArrowBack onClick={goToPrevious} className='bg-[#FFFFFF] w-8 h-8 rounded-[50%] py-1 px-1 cursor-pointer text-[#6754e9]' />
                    </div>
                    <div>
                        <IoArrowForward onClick={goToNext} className='bg-[#FFFFFF] w-8 h-8 rounded-[50%] py-1 px-1 cursor-pointer text-[#6754e9]' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:flex-row md:gap-16'>
                    <div className='flex flex-col gap-1 py-3 md:py-8'>
                        <div className='flex flex-row gap-1'>
                            <TiStarFullOutline className='text-yellow-400 text-2xl' />
                            <TiStarFullOutline className='text-yellow-400 text-2xl' />
                            <TiStarFullOutline className='text-yellow-400 text-2xl' />
                            <TiStarFullOutline className='text-yellow-400 text-2xl' />
                            <TiStarFullOutline className='text-yellow-400 text-2xl' />
                        </div>
                        <div>
                            <p>5000+ client reviews</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='flex flex-row '>
                            <div>
                                <Image src="https://thecrownset.com/wp-content/uploads/2023/05/happy-carefree-dark-skinned-rebellious-young-woman-enjoys-awesome-music-makes-rock-n-roll-gesture-has-fun-on-music-festival-or-cool-event-wears-casual-jumper-poses-against-pink-wall-300x300.jpg" height={30} width={30} alt="image" className='rounded-full' />
                            </div>
                            <div>
                                <Image src="https://thecrownset.com/wp-content/uploads/2023/05/pexels-andrea-piacquadio-3799837-300x300.jpg" height={30} width={30} className='rounded-full' alt="image"/>
                            </div>
                            <div>
                                <Image src="https://thecrownset.com/wp-content/uploads/2023/05/pexels-mikhail-nilov-9301512-300x300.jpg" height={30} width={30} className='rounded-full' alt="image"/>
                            </div>
                        </div>
                        <div>
                            <p className='underline-from-left:hover cursor-pointer'>View all reviews</p>
                        </div>
                        <div>
                            <IoArrowForward />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewCarousel;
