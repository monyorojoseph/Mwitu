import { googleSignIn } from "@/services/auth"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"

export default function Auth(){
    const { data: session } = useSession()

    const handleGoogleSignIn = async()=>{
        // @ts-ignore
        const data = await googleSignIn(session.idToken);
        console.log(data)

    }

    useEffect(()=> {
        console.log(session)
        // @ts-ignore
        if(session?.provider === "google"){
            handleGoogleSignIn()
        }
    }, [session])

    if(session){
        return(
            <>
            <button onClick={()=> signOut()}
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