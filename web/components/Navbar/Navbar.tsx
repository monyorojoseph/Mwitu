import { BiSearch } from 'react-icons/bi';
import { useSitesContext } from '@/hooks/contexts/sitesContext';
import { ContentTypes } from '@/constants/types';
import Business from './Business';
import MyHam from './MyHam';
import { useTagList } from '@/hooks/swr/tagList';
import Link from 'next/link';
import Icon from '../../public/images/logo/potato-icon.png'

export default function Navbar(){
    const { content, setContent, setCategory, category } = useSitesContext()
    const { tags } = useTagList()
    return(
        <nav className='bg-CaribbeanCurrent text-Isabeline pt-2 top-0 w-full sticky z-50'>
            <div className='container mx-auto'>
                {/* actions */}
                <div className='mt-1.5 grid grid-cols-12 gap-4'>
                    <div className='col-span-11 md:col-span-8 flex flex-row justify-between items-center'>
                        <span>
                            <Link href={'/'}>
                                <span className='flex flex-row items-center space-x-2 mr-3'>
                                    <span className='h-10 w-10'>                            
                                        <img src={Icon.src} alt="Mwitu Icon" className='object-cover object-center h-full w-full' />
                                    </span>
                                    <h6 className='text-lg font-semibold'>Mwitu</h6>
                                </span>
                            </Link>
                        </span>


                        <span className='w-full rounded-lg bg-white flex flex-row justify-center items-center'>
                            <input type="text" name="q"
                            className="border-none rounded-s-lg outline-none w-full h-9 px-3 py-0" 
                            // value={q}
                            // onChange={(e)=> setQ(e.target.value)}
                            placeholder="Search ..."/>
                            <span className='px-3 cursor-pointer'>
                                <BiSearch className='text-xl font-semibold text-MoonStone' />
                            </span>
                        </span>

                    </div>
                    <div className='col-span-1 md:col-span-4 flex flex-row justify-end md:justify-between space-x-2 items-center'>
                        <div className='hidden md:block'>
                            <div className='flex flex-row justify-start items-center'>
                                <Business />
                                <span className='px-2.5 hover:text-OrangePeel cursor-pointer py-1'>Donate</span>
                            </div>
                        </div>
                        <MyHam />

                    </div>
                </div>
                {/* tags */}
                <div className='mt-2.5 flex flex-row justify-start items-center overflow-x-auto'>
                    <span
                    onClick={()=> {
                        setContent(ContentTypes.RECENT)
                    }}
                    className={`${ content === ContentTypes.RECENT && 'border-b-2 border-OrangePeel' } 
                    py-1 px-1.5 cursor-pointer`}>
                        <Link href={'/'}>Recent</Link></span>
                    <div className='border h-6 mx-3' />
                    {
                        tags?.map((tag, key)=> (
                            <span key={key}
                            onClick={()=> {
                                setContent(ContentTypes.CATEGORY)
                                setCategory(tag.name)                                
                            }}
                            className={`${ (content === ContentTypes.CATEGORY && category === tag.name ) && 'border-b-2 border-OrangePeel' } 
                            py-1 px-1.5 cursor-pointer`}>
                                <Link href={`/?tag=${tag.name}`}>{tag.name}</Link>
                            </span>
                        ))
                    }
                </div>
            </div>
        </nav>
    )
}