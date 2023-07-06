import { ReviewType } from '@/constants/types'
import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useListReviews: any = (site_id: string, filter: string)=> {
    const { data, isLoading } = useSWR(`/mwitu/list-site-reviews/${site_id}/${filter}/`, fetcher)
    return { 
        reviews: data as ReviewType[], 
        loading: isLoading
    }
}

export const useRecentActivity = ()=> {
    const { data, isLoading } = useSWR(`/mwitu/recent-activity/`, fetcher)
    return { 
        reviews: data as ReviewType[], 
        loading: isLoading
    }
}
