import { useSession, signIn } from "next-auth/react"

export default function Auth(){
    const { data: session } = useSession()
    if(session){
        return(
            <>
            <button
            className="border border-GhostWhite rounded-md py-1 px-4 font-semibold"
            >Account</button></>
        )
    }else{
        return(
            <>
            <button
            className="border border-GhostWhite rounded-md py-1 px-4 font-semibold"
            onClick={()=> signIn()}>Sign Up</button></>
        )
    }
    
}