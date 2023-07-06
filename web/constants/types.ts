export interface SiteCardType {
    id: string;
    name: string;
    logo: string;
    total_reviews: number;
    avg_rating: number;
    tags: string[]
}

export interface SiteDetailsType {    
    name: string;
    cover_image: string;
    logo: string;
    about: string;
    url: string;
    total_reviews: number;
    avg_rating: number;
    tags: string[]
}


export interface Item {
    label: string;
    value: string;
}

export interface ReviewType {
    id: number
    full_name: string
    image: string
    comment: string
    timestamp: Date
    rating: number
    upvotes: number
    downvotes: number
}

export interface ProfileType {
    full_name: string
    email: string
    image: string | null
    join_date: Date
}

export enum ContentTypes {
    CATEGORY = 'CT',
    RECENT = 'RT'
}

export interface Tag {
    name: string
}

export interface TagOptionsType {
    label: string
    value: string;
}

export interface SiteContextType {
    content: ContentTypes
    setContent: Function
    category?: string
    setCategory: Function
}