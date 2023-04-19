import { ProfileType } from '@/constants/types'
import { fetcher } from '@/services/constant'
import useSWR from 'swr'

export const useProfileDetails = ()=> {
    const { data, isLoading } = useSWR(`/account/profile-details/`, fetcher)
    return { 
        profile: data as ProfileType, 
        loading: isLoading
    }
}
