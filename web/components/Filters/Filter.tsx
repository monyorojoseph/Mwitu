import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Item } from "@/constants/types"


export default function Filter({item, items, setItem}:{
    item: Item,
    items: Array<Item>,
    setItem: Function
}){ 
    return (
        <>
            <div className="flex flex-row justify-start items-center space-x-3">
                <h6 className="font-semibold text-sm text-CaribbeanCurrent">Sort by</h6>
                <Menu as='div'
                className="relative cursor-pointer z-10">
                    {({open})=>(
                        <>
                            <Menu.Button 
                            className='p-1 flex flex-row justify-center items-center space-x-1 border rounded-md px-3 py-1 text-MoonStone focus:border-SkyBlue'>
                                <span className="text-sm font-semibold">{item.label}</span>
                                <span><ChevronDownIcon className={` h-5 w-5 ${open && "rotate-180 transform "}`} /></span>
                            </Menu.Button>
                            
                                <Transition
                                    show={open}
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Menu.Items static as='section' 
                                    className="absolute top-2 left-5 bg-white flex flex-col justify-center items-start space-y-3 py-3
                                    border w-60 rounded-sm shadow-md border-SkyBlue border-opacity-20">
                                        {
                                            items?.map((itm)=>(
                                                <Menu.Item key={itm.label}>
                                                        <span className={`py-1 px-6 w-full 
                                                        ${item?.value === itm.value && "font-bold text-opacity-75 text-MoonStone"}`}
                                                        onClick={()=> setItem(itm)}>{itm.label}</span>
                                                </Menu.Item>
                                            ))
                                        }
                                    </Menu.Items>
                                </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </>            
        )
}