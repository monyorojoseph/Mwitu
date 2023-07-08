import { useEffect, useState } from 'react';
import { Images } from '@/constants/images';
import { Texts } from '@/constants/text';


const ImagePreview = ()=> {
  const [ index, setIndex ] = useState<number>(0)

  useEffect(()=>{
    setTimeout(()=>{
        const newIndex = Images.length - 1 > index ? index + 1: Images.length === index ? 0 : 0 
        setIndex(newIndex) 
    }, 3000)
  }, [index])

    return(
        <div className='relative'>
            <div className='w-full h-96'>
                <img src={Images[index].src} alt='hey' 
                className='h-full w-full transition delay-300 duration-300 ease-in-out object-cover object-center'/>
            </div>
            <div className='absolute w-full h-96 top-0 bg-black bg-opacity-50 z-10 flex flex-row items-center'>
                <div className=' w-9/12 mx-auto'>
                    <p className='text-5xl text-white transition delay-300 duration-300 ease-in-out'>{Texts[index]}</p>
                </div>
            </div>
      </div>
    )
}

export default ImagePreview;