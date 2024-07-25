'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import img1 from '@/assets/images/imcard1.jpg'
import img2 from '@/assets/images/imcard2.jpg'
import img3 from '@/assets/images/imcard3.jpg'
import { useSwipeable } from 'react-swipeable';

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

const images = [img1,img2,img3];
const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

    return (
        <div className="relative w-full overflow-hidden lg:hidden" data-carousel="slide" {...handlers}>

            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {imageCard.map((card, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full  flex items-center justify-center px-2 mt-5"
                    >
                        <div className="rounded-[3rem] shadow-md w-full h-full flex flex-col pb-[3rem]">
                            <div >
                                <Image
                                    src={images[index]}
                                
                                    height={700}
                                    alt="Picture of the author"
                                    className='rounded-t-[3rem]'
                                />
                            </div>
                            <div className='flex flex-col gap-2 px-[2rem] mt-10'>
                                <p className="text-bodyTextColor text-sm">{card.date}</p>
                                <h2 className="text-xl font-bold leading-6 ">{card.title}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4 space-x-3">
                {imageCard.map((_, index) => (
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
    )
}

export default Carousel

