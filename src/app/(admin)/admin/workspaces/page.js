import React from 'react'
import WorkCard from './_components/WorkCard'

const Workspace = () => {
    const workspace = ["Project 1", "Project 2", "Project 3"]
    return (
        <div className='px-10 py-5'>
            
            <button className='px-4 py-2 bg-black text-white rounded-[2rem]'>Create Workspace</button>

            <div className='flex gap-4 mt-10'>
                {
                    workspace.map((heading, index) => (
                        <WorkCard key={index} heading={heading} />
                    ))
                }
            </div>

        </div>
    )
}

export default Workspace