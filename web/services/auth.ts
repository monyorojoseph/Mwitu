import axiosInstance from "@/utils/axios"
import errorHandler from "@/utils/errors"


export async function googleSignIn(auth_token: string){
    try{
        const response = await axiosInstance.post('/account/google/', { auth_token })
        return response      
    }catch(e){
        errorHandler(e)
    }
}