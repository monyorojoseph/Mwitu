import { SiteCardType } from '@/constants/types'
import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useSitesList = (filter: string)=> {
    const { data, isLoading } = useSWR(`/mwitu/list-site/${filter}/`, fetcher)
    return { 
        sites: data as SiteCardType[], 
        loading: isLoading
    }
}
