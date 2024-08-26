import React, { useEffect, useState } from 'react';
import { RoundedCircleCard } from "@/components/Cards";
import { DarkButton } from "@/components/CustomButtons";
import Link from "next/link";

const NumbersAndResults = ({ heading, cardData = [] }) => {

    return (
        <div className='bg-[#f7f7f9] mt-10 flex flex-col justify-center items-center pt-[3rem] pb-[5rem] xl:w-11/12 m-auto rounded-t-[4rem]'>
            <h1 className='font-bold text-[1.5rem] text-center mx-5 leading-6'>{heading}</h1>

            <div className='flex flex-col justify-center items-center w-[100%] sm:px-[2rem] xl:flex-row'>

                <div className='md:grid md:grid-cols-3 md:gap-5 px-12'>
                    {
                        cardData.map((card, i) => (
                            <AnimatedCard key={i} value={parseInt(card.value)} descripiton={card.descripiton} />
                        ))
                    }
                </div>
                <div className='bg-[#e9e5fe] mt-[2rem] pt-[1rem] pb-[2rem] px-[3rem] rounded-[3rem] flex flex-col justify-center items-center sm:w-[100%] mx-6 xl:w-[30%] xl:h-[15rem]'>
                    <div className='font-bold text-[1.5rem]'>2<span className='text-[1.8rem]'>8</span>2,00+</div>
                    <span className='font-bold'>Leads generated so far…</span>
                    <Link href="/contact">
                        <DarkButton buttonText={'contact us'} />
                    </Link>
                </div>
            </div>

        </div>
    );
}

const AnimatedCard = ({ value, descripiton }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Animation duration in ms
        const increment = Math.ceil((value / duration) * 20);

        const animate = () => {
            if (start < value) {
                start += increment;
                setDisplayValue(Math.min(start, value));
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setDisplayValue(0);
                    start = 0;
                    interval = setInterval(animate, 20);
                }, 1500); // Reset after 1.5 seconds and start again
            }
        };

        let interval = setInterval(animate, 20);

        return () => clearInterval(interval);
    }, [value]);

    return (
        <div className='relative flex flex-col items-center justify-center text-center'>
            <div className='circle-animation'>
                <span className='text-[2rem] font-bold'>{displayValue}%</span>
            </div>
            <p className='mt-2'>{descripiton}</p>
            <style jsx>{`
                .circle-animation {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 5px solid #4a90e2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
};

export default NumbersAndResults;
