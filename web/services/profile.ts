import axiosInstance from "@/utils/axios";
import errorHandler from "@/utils/errors";

export async function updateProfile(formData:any) {
    try{
        const response = await axiosInstance.put('/mwitu/create-site/', formData);
        return response
    }catch(e){
        errorHandler(e)
    } 
}