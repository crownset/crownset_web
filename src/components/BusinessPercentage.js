import { useState, useEffect, useRef } from 'react';

export default function PercentageCounter() {
    const [percentage, setPercentage] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const counterRef = useRef(null);
    useEffect(() => {
        if (!isInView || percentage === 500) return;

        let start = 0;
        const end = 500;

        const animate = () => {
            start += 5;
            if (start <= end) {
                setPercentage(start);
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsInView(entry.isIntersecting);
            },
            { threshold: 1.0 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);

    return (
        <div className='flex flex-col justify-center items-center bg-[#f7f7f9]  gap-2 py-8 rounded-md md:flex-row md:justify-around w-11/12 m-auto mt-3 mb-3'>
            <div className='font-bold text-[2rem] lg:text-[3rem] text-center px-5 py-5 rounded-[2rem]'>
                <h1>We have Worked with</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div ref={counterRef}>
                    <p className='text-[2rem] font-bold' >{percentage}+</p>
                </div>
                <p className='lg:text-[24px] italic'>Businesses</p>
            </div>

        </div>
    );
}

// border-[5px] border-[#4a90e2] rounded-[50%] w-[100px] h-[100px] flex flex-col justify-center items-center
