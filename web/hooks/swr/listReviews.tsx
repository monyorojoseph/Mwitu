import { ReviewType } from '@/constants/types'
import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useListReviews: any = (slug: string, filter: string)=> {
    const { data, isLoading } = useSWR(`/mwitu/list-site-reviews/${slug}/${filter}/`, fetcher)
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
