import axiosInstance from "@/utils/axios";
import errorHandler from "@/utils/errors";

export async function createSite(formData:any) {
    try{
        const response = await axiosInstance.post('/mwitu/create-site/', formData);
        return response
    }catch(e){
        errorHandler(e)
    } 
}

export async function postReview(formData:any) {
    try{
        const response = await axiosInstance.post('/mwitu/post-review/', formData);
        return response
    }catch(e){
        errorHandler(e)
    } 
}

export async function voteReview(formData:any) {
    try{
        const response = await axiosInstance.post('/mwitu/vote-review/', formData);
        return response
    }catch(e){
        errorHandler(e)
    } 
}

export async function searchSite(formData:any) {
    try{
        const response = await axiosInstance.post('/mwitu/search-site/', formData);
        return response
    }catch(e){
        errorHandler(e)
    } 
}