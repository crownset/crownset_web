import { RoundedCircleCard } from "@/components/Cards";
import { DarkButton } from "@/components/CustomButtons";





const NumbersAndResults = ({ heading, cardData = [] }) => {
    
    return (
        <div className='bg-[#f7f7f9] mt-10 flex flex-col justify-center  items-center pt-[3rem] pb-[5rem] xl:w-11/12 m-auto rounded-t-[4rem]'>
            <h1 className='font-bold text-[1.5rem] text-center mx-5 leading-6'>{heading}</h1>

            <div className='flex flex-col justify-center items-center w-[100%] sm:px-[2rem] xl:flex-row'>

                <div className='md:grid md:grid-cols-3 md:gap-5 px-12' >
                    {
                        cardData.map((card, i) => (
                            <RoundedCircleCard key={i} value={card.value} descripiton={card.descripiton} />
                        ))
                    }

                </div>
                <div className='bg-[#e9e5fe] mt-[2rem] pt-[1rem] pb-[2rem] px-[3rem] rounded-[3rem] flex flex-col justify-center items-center sm:w-[100%] mx-6 xl:w-[30%] xl:h-[15rem]'>
                    <div className='font-bold text-[1.5rem]'>2<span className='text-[1.8rem]'>8</span>2,00+</div>
                    <span className='font-bold'>Leads generated so far…</span>

                    <DarkButton buttonText={'contact us'} />

                </div>
            </div>

        </div>

    )
}

export default NumbersAndResults;