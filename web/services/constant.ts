import axiosInstance from "@/utils/axios";

export async function fetcher(url:string) {  
    try{
        const { data } = await axiosInstance.get(url)
        return data
    }catch(e){
        console.log(e)
    }
}