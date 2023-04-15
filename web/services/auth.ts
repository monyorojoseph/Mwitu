import axiosInstance from "@/utils/axios"


export async function googleSignIn(auth_token: string){
    try{
        const { data } = await axiosInstance.post('/account/google/', { auth_token })  
        return data      
    }catch(e){
        console.log(e)
    }
}