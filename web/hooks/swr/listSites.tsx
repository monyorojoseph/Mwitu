import { SiteCardType } from '@/constants/types'
import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useSitesList = (category: string)=> {
    const { data, isLoading } = useSWR(`/mwitu/list-site/?category=${category}`, fetcher)
    return { 
        sites: data as SiteCardType[], 
        loading: isLoading
    }
}
