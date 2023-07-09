import { logout, googleSignIn } from "@/services/auth"
import axiosInstance from "@/utils/axios"
import { Popover } from "@headlessui/react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { GiHamburgerMenu } from "react-icons/gi"

const MyHam = ()=> {
    const { data: session, update } = useSession()
    const router = useRouter()

    const handleGoogleSignIn = async()=>{
        //@ts-ignore
        const response = await googleSignIn(session.idToken) as AxiosResponse;
        if (response?.status === 200){
            update({ data: response.data})
        }
    }

    useEffect(()=> {
        if(session){
            //@ts-ignore
            if(session.provider ==='google' && !session.access){
                handleGoogleSignIn()                
            }
            //@ts-ignore
            if(session.access){
                //@ts-ignore
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${session.access}`;
            }
        }
    }, [session])

    const handleSignOut = async()=> {
        //@ts-ignore
        const response = await logout({refresh: session.refresh})
        if (response?.status === 200){
            signOut()            
        }
    }

    return(
    <span>
        <Popover className="relative">
            <Popover.Button 
                className={`border-none outline-none cursor-pointer `}>
                <GiHamburgerMenu className='text-xl font-semibold' />

            </Popover.Button>

            <Popover.Panel className="absolute z-50 shadow-md rounded-sm p-1 bg-white right-0">
                <>
                {!session && (
                    <div className="w-40 text-CaribbeanCurrent flex flex-col">                
                        <span 
                        onClick={()=>signIn()}
                        className="px-4 hover:bg-SkyBlue rounded-sm cursor-pointer py-1.5">Sign In</span>
                    </div>
                )}

                {session && (
                    <div className="w-40 text-CaribbeanCurrent flex flex-col"> 
                        <span 
                        onClick={()=> router.push('/settings', undefined, { shallow: true })}
                        className="px-4 hover:bg-SkyBlue rounded-sm cursor-pointer py-1.5">Profile</span> 

                        <span 
                            onClick={handleSignOut}
                            className="px-4 hover:bg-SkyBlue rounded-sm cursor-pointer py-1.5">Sign Out</span>
                    </div>
                )}
                </>
            </Popover.Panel>
        </Popover>
    </span>
    )
}

export default MyHam;
