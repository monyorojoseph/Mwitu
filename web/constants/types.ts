export interface SiteCardType {
    id: string;
    name: string;
    cover_image: string;
    total_reviews: number;
    avg_rating: number;
}

export interface SiteDetailsType {    
    name: string;
    cover_image: string;
    about: string;
    url: string;
    total_reviews: number;
    avg_rating: number;
}


export interface Item {
    label: string;
    value: string;
}

export interface Review {
    id: number
    full_name: string
    comment: string
    timestamp: Date
    rating: number
    upvotes: number
    downvotes: number
}