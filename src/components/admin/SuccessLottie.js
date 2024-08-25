import React from 'react';
import Lottie from 'react-lottie';
import success from "../../assets/success.json"


const SuccessLottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: success,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className='absolute bg-red flex flex-col justify-center items-center w-screen h-screen'>
            <Lottie options={defaultOptions} height={200} width={200} />
        </div>
    )
};

export default SuccessLottie;
