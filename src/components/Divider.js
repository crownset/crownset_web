
import {divider} from '@/helpers/icons'
import Image from 'next/image';
const Divider = ()=>{
    return (
        <div className='mt-10  w-full text-center object-cover mx-auto'>
        <Image
              src={divider}
              width={1280}
              height={500}
              alt="image"
            />
        </div>
    )
}

export default Divider;
