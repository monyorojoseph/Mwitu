import { SiteDetailsType } from '@/constants/types'
import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useSitesDetails = (id:string)=> {
    const { data, isLoading } = useSWR(`/mwitu/site-details/${id}/`, fetcher)
    return { 
        site: data as SiteDetailsType, 
        loading: isLoading
    }
}
