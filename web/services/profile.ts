import axiosInstance from "@/utils/axios";

export async function updateProfile(formData:any) {
    try{
        const response = await axiosInstance.put('/mwitu/create-site/', formData);
        return response
    }catch(e){
        console.log(e)
    } 
}