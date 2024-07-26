import Image from 'next/image';
import React from 'react';

const WorkCards = ({ imageUrl, text, text2, text3, btn1, btn2, btn3 }) => {
    return (
        <div className=" imgcontainer relative lg:w-11/12 lg:h-11/12 h-full space-y-0 mx-auto rounded-[3rem] overflow-hidden">
            <Image
                src={imageUrl}
                width={1024}
                height={500}
                alt="Card image"
                className="w-full h-full object-cover imgcontainer bg-black"
            />
            <div className="absolute top-3 left-5 text-white font-bold text-lg">{text}</div>
            <div className="absolute bottom-5 left-2 w-full flex flex-col items-start px-4 py-2 gap-0">
                <div className="text-white text-2xl">{text2}</div>
                <hr className="w-1/2 border-t-2 border-white my-2" />
                <div className="text-white font-bold text-lg">{text3}</div>
                <div className='flex flex-row items-center gap-2 pt-1 flex-wrap'>
                    <button className='rounded-3xl bg-white text-black px-2 py-2 text-xm'>{btn1}</button>
                    <button className='rounded-3xl bg-white text-black px-2 py-2 text-xm'>{btn2}</button>
                    <button className='rounded-3xl bg-white text-black px-2 py-2 text-xm'>{btn3}</button>
                </div>
            </div>
        </div>
    );
};

export default WorkCards;
