import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
export async function createSite(formData:any) {
    try{
        const response = await axios.post('http://localhost:8000/mwitu/create-site/', formData, config);
        return response
    }catch(e){
        console.log(e)
    } 
}