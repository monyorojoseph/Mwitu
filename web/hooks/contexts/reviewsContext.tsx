import { Item } from "@/constants/types";
import { ReviewItems } from "@/constants/values";
import { useContext, createContext, useState } from "react";

interface ReviewContextType {
    filter: Item
    setFilter: Function
}

const ReviewsContext = createContext({} as ReviewContextType);

const ReviewsContextProvider = ({children}:{children: JSX.Element})=> {
    const [ filter, setFilter ] = useState<Item>(ReviewItems[0])

    return(
        <ReviewsContext.Provider value={{ filter, setFilter }}>
            {children}
        </ReviewsContext.Provider>
    )
}

const useReviewsContext = ()=> {
    return useContext(ReviewsContext)
}

export { useReviewsContext,  ReviewsContextProvider };