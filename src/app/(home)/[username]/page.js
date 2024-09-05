"use client"
import { notFound } from 'next/navigation';

const page = ({params}) => {

    if(params.username==="pragatisingh"||params.username==="priyam"||params.username==="siddharthmishra"){
        return (
            <h1 className='text-[2rem] text-center my-[5rem]'>Under Development</h1>
        )
    }   
    notFound();
 
}

export default page
