import { googleSignIn } from "@/services/auth"
import axiosInstance from "@/utils/axios"
import { AxiosResponse } from "axios"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect } from "react"
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'

export default function Auth(){
    const { data: session, update } = useSession()

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

    if(session){
        return(
            <>
            <div className="flex flex-row justify-end items-center space-x-5">
                <Link href={'/settings'}>
                    <AiOutlineUser className="border-2 border-GhostWhite text-3xl font-bold rounded-full cursor-pointer
                    hover:border-PrincetonOrange hover:text-PrincetonOrange"/>
                </Link>
                <AiOutlineLogout onClick={()=> signOut()}
                className="text-3xl cursor-pointer hover:text-Tomato font-bold"/>
            </div>
            </>
        )
    }else{
        return(
            <>
            <button
            className="border-2 border-GhostWhite rounded-md py-1 px-4 font-semibold
            hover:border-PrincetonOrange hover:text-PrincetonOrange"
            onClick={()=> signIn()}>Sign Up</button></>
        )
    }
    
}