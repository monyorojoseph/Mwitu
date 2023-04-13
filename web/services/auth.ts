import axios from "axios";


const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export async function googleSignIn(auth_token: string){
    try{
        const { data } = await axios.post('http://localhost:8000/account/google/', { auth_token }, config)  
        return data      
    }catch(e){
        console.log(e)
    }
}