import { Popover } from "@headlessui/react"
import { useRouter } from "next/router"
import { FaAngleDown } from "react-icons/fa"

const Business = ()=> {
    const router = useRouter()
    return(
    <span>
        <Popover className="relative">
            <Popover.Button 
                className={`border-none hover:text-OrangePeel cursor-pointer py-1 outline-none px-2.5 
                flex flex-row justify-between items-center space-x-1`}>
                    <span>Business</span>
                    <FaAngleDown className='mt-1 text-sm' />
            </Popover.Button>

            <Popover.Panel className="absolute z-50 shadow-md rounded-sm p-1 bg-white">
                <div className="w-52 text-CaribbeanCurrent flex flex-col">
                    <span onClick={()=>router.push('/site/add')} 
                    className='hover:bg-SkyBlue w-full rounded-sm py-1 px-4 cursor-pointer'>                        
                        Add business                    
                    </span>

                    <span onClick={()=>router.push('/soon')} 
                    className='hover:bg-SkyBlue w-full rounded-sm py-1 px-4 cursor-pointer'>                        
                        Claim business                    
                    </span>

                    <span onClick={()=>router.push('/soon')} 
                    className='hover:bg-SkyBlue w-full rounded-sm py-1 px-4 cursor-pointer'>                        
                        Create business account                    
                    </span>
                </div>
            </Popover.Panel>
        </Popover>
    </span>
    )
}

export default Business;