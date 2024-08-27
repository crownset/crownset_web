import React from 'react';
import Lottie from 'react-lottie';
import success from "../../assets/success.json";

const SuccessModal = ({ isOpen, onClose, title }) => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: success,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    if (!isOpen) return null;

    return (
        isOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-5 max-w-sm w-[90%] md:w-full text-center">
                    <Lottie options={defaultOptions} height={100} width={100} />
                    <p className="text-lg font-semibold text-gray-900 my-4">{title}</p>
                    <div className='flex justify-end'>
                        <button
                            onClick={onClose}
                            className="bg-dashboard text-white px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default SuccessModal;
