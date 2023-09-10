const getImageUrl = (url: string)=> {
    return process.env.NEXT_PUBLIC_API_URL + url
}

export default getImageUrl