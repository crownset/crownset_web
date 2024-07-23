// components/WorkCards.js
import Image from 'next/image';
import React from 'react';

const WorkCards = ({ imageUrl, text, text2, text3, btn1, btn2, btn3 }) => {
    return (
        <div className="relative bg-white shadow-md rounded-3xl overflow-hidden h-96 lg:w-5/6 lg:m-auto"> {/* Increased height to h-96 */}
            <Image
                src={imageUrl}
                width={100}
                height={100}
                alt="Card image"
                className="w-full h-full"
            />
            <div className="absolute top-2 left-2 text-white font-bold text-lg">{text}</div>
            <div className="absolute bottom-5 left-2 w-full flex flex-col items-start px-4 py-2 gap-0">
                <div className="text-white  text-2xl">{text2}</div>
                <hr className="w-1/2 border-t-2 border-white my-2" />
                <div className="text-white font-bold text-lg">{text3}</div>
                <div className='flex flex-row items-center gap-4 pt-3 flex-wrap'>
                    <button className='rounded-3xl bg-[#ffffff] text-black px-2 py-1'>{btn1}</button>
                    <button className='rounded-3xl bg-[#ffffff] text-black px-2 py-1'>{btn2}</button>
                    <button className='rounded-3xl bg-[#ffffff] text-black px-2 py-1'>{btn3}</button>
                </div>
            </div>
        </div>
    );
};

export default WorkCards;
