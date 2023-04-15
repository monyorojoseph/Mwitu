import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useSitesList = ()=> {
    const { data, isLoading } = useSWR('/mwitu/list-site/', fetcher)
    return { 
        sites: data, 
        loading: isLoading
    }
}
