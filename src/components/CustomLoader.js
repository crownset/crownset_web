import React from 'react'
import { BeatLoader } from 'react-spinners'

export const  CustomLoader = ({ loading , color, size }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <BeatLoader
                color={color}
                loading={loading}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}
