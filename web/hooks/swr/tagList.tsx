import { Tag } from '@/constants/types'
import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useTagList = ()=> {
    const { data, isLoading } = useSWR(`/mwitu/tags/`, fetcher)
    return { 
        tags: data as Tag[], 
        loading: isLoading
    }
}
