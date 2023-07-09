import { SiteDetailsType } from '@/constants/types'
import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useSitesDetails = (slug:string)=> {
    const { data, isLoading } = useSWR(`/mwitu/site-details/${slug}/`, fetcher)
    return { 
        site: data as SiteDetailsType, 
        loading: isLoading
    }
}
