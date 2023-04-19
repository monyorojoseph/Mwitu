import axiosInstance from "@/utils/axios";
import errorHandler from "@/utils/errors";

export async function fetcher(url:string) {  
    try{
        const { data } = await axiosInstance.get(url)
        return data
    }catch(e){
        errorHandler(e)
    }
}