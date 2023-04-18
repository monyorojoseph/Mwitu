import axiosInstance from "@/utils/axios"


export async function googleSignIn(auth_token: string){
    try{
        const response = await axiosInstance.post('/account/google/', { auth_token })
        return response      
    }catch(e){
        console.log(e)
    }
}