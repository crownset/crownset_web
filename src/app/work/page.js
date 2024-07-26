import Image from 'next/image'
import React from 'react'
import WorkCards from '@/components/WorkCards'
import shoesImage from '../../assets/images/cheese.jpg'
import { DarkButton } from '@/components/CustomButtons'
import ReviewCarousel from '@/components/ReviewCarousel'
import Divider from '@/components/Divider'

const Work = () => {

  const cardsData = [
    { imageUrl: "https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1146893850-1024x948.jpg", text: 'ZARA', text2: "+40%", text3: "ECOMMERCE GROWTH", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
    { imageUrl: "https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1472335476.jpg", text: 'HOMME', text2: "+40%", text3: "INCREASE IN ORGANIC SESSIONS", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
    { imageUrl: "https://thecrownset.com/wp-content/uploads/2023/05/pexels-vanessa-loring-5965948.jpg", text: 'IKEA', text2: "+40%", text3: "ECOMMERCE GROWTH", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
    { imageUrl: "https://thecrownset.com/wp-content/uploads/2023/05/pexels-amelie-chen-12352170.jpg", text: 'LAPRIMA', text2: "+40%", text3: "ECOMMERCE GROWTH", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
    { imageUrl: "https://thecrownset.com/wp-content/uploads/2023/05/pexels-lucas-oliveira-4249007.jpg", text: 'SUBWAY', text2: "+40%", text3: "INCREASE IN ORGANIC SESSIONS", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
    { imageUrl: "https://thecrownset.com/wp-content/uploads/2023/05/pexels-ekaterina-bolovtsova-6311861.jpg", text: 'JOLIE', text2: "+40%", text3: "ECOMMERCE GROWTH", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
    { imageUrl: "https://thecrownset.com/wp-content/uploads/2023/05/pexels-melvin-buezo-2529148-1.jpg", text: 'NIKO', text2: "+40%", text3: "ECOMMERCE GROWTH", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
    { imageUrl: "https://thecrownset.com/wp-content/uploads/2023/05/pexels-amar-preciado-16230535.jpg", text: 'NESTLLE', text2: "+40%", text3: "INCREASE IN ORGANIC SESSIONS", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
    { imageUrl:"https://thecrownset.com/wp-content/uploads/2023/05/pexels-godisable-jacob-1191522.jpg", text: 'MARCPOL', text2: "+40%", text3: "ECOMMERCE GROWTH", btn1: "Paid Search", btn2: "Paid Social", btn3: "SEO" },
  ];

  const carouselItems = [
    { id: 1, review1: 'The Entire Staff at Numareque has been phenomenal.', review2: "They are quick with their replies and incredibly helpfull", reviewerName: "Edward Kennedy", designation: "Director , Client Experiance" },
    { id: 2, review1: 'The  Staff at Numareque has been phenomenal.', review2: "They are quick with their replies and incredibly helpfull", reviewerName: "Edward Kennedy", designation: "Director , Client Experiance" },
    { id: 3, review1: 'The Entire  at Numareque has been phenomenal.', review2: "They are quick with their replies and incredibly helpfull", reviewerName: "Edward Kennedy", designation: "Director , Client Experiance" },
    { id: 4, review1: 'The Entire Staff at Numareque has been phenomenal.', review2: "They are quick with their replies and incredibly helpfull", reviewerName: "Edward Kennedy", designation: "Director , Client Experiance" },
  ];

  return (
    <div className='linear-gradient'>
      {/* sectionone */}
      <div className='flex flex-col justify-center items-center px-5 py-10 md:flex-row lg:w-11/12 lg:m-auto '>
        <div className='flex flex-col justify-center gap-0 items-start'>
          
          <div className='font-extrabold'>
            <p>SUCCESS STORIES</p>
          </div>
          <div className='text-3xl font-extrabold md:text-6xl lg:text-[4rem] lg:w-1/2 lg:py-2'>
            <h1>Delivering real results</h1>
          </div>
          <div className='text-lg font-bold py-3 lg:w-1/2 lg:py-5'>
            <p>When you partner with Numerique, we take care of the heavy lifting, so you can enjoy more website traffic, leads, and revenue.</p>
          </div>
        
        </div>
        <div className='py-3 w-full lg:w-1/2'>
          <Image src="https://thecrownset.com/wp-content/uploads/2023/05/pexels-mikael-blomkvist-6476185-1024x895.jpg" alt='work image' width={200} height={100} className='rounded-[4rem] w-full  m-auto' />
        </div>
      </div>
      {/* sectionTwo */}
      <div className='flex flex-wrap justify-center items-center gap-5 lg:gap-28 py-10'>
        <div>
          <Image src="https://thecrownset.com/wp-content/uploads/2023/06/jolie-1.svg" width={100} height={100} className='lg:w-full' alt=""/>
        </div>
        <div>
          <Image src="https://thecrownset.com/wp-content/uploads/2023/06/caridad.svg" width={100} height={100} className='lg:w-full' alt=""/>
        </div>
        <div>
          <Image src="https://thecrownset.com/wp-content/uploads/2023/06/F7.svg" width={100} height={100} className='lg:w-full' alt="" />
        </div>
        <div>
          <Image src="https://thecrownset.com/wp-content/uploads/2023/06/Scuola_Logo_OnlyTop-1.svg" width={100} height={100} className='lg:w-full' alt=""/>
        </div>
        <div>
          <Image src="https://thecrownset.com/wp-content/uploads/2023/06/petmania.svg" width={100} height={100} className='lg:w-full' alt=""/>
        </div>
        <div>
          <Image src="https://thecrownset.com/wp-content/uploads/2023/06/tecnologia.svg" width={100} height={100} className='lg:w-full' alt=""/>
        </div>
      </div>
      <Divider />
      {/* sectionThree */}
      <div className='w-full m-auto'>
        <div className='text-xl font-bold py-10  w-11/12 m-auto md:w-1/2 lg:text-2xl'>
          <p>
            No matter what service you’re looking for — SEO, PPC, web design, social media, email marketing, or anything else — we’ve got you covered. Check out our portfolio to learn how our digital marketing solutions drive results for clients!
          </p>
        </div>
      </div>
      {/* sectionFour */}
      <div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {cardsData.map((card, index) => (
          <WorkCards key={index} imageUrl={card.imageUrl} text={card.text} text2={card.text2} text3={card.text3} btn1={card.btn1} btn2={card.btn2} btn3={card.btn3} />
        ))}
      </div>
      <div className='w-[100%] flex items-center justify-center'>
        <DarkButton buttonText={'LOAD MORE'} />
      </div>

      {/* sectionfifth */}

      <div className='flex flex-col justify-center items-center py-10'>
        <div className='text-3xl w-11/12 text-center m-auto font-extrabold lg:text-5xl lg:w-1/2'>
          <p>
            What our happy customers are saying
          </p>
        </div>
        <div>
          <div className='mt-10 w-'>
            <ReviewCarousel items={carouselItems} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Work
