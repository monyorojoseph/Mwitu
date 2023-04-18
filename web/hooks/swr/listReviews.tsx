import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useListReviews = (site_id: string)=> {
    const { data, isLoading } = useSWR(`/mwitu/list-site-reviews/${site_id}/`, fetcher)
    return { 
        reviews: data, 
        loading: isLoading
    }
}
