import { Item } from "@/constants/types";
import { SiteItems } from "@/constants/values";
import { useContext, createContext, useState } from "react";

interface SiteContextType {
    filter: Item
    setFilter: Function
}

const SitesContext = createContext({} as SiteContextType);

const SitesContextProvider = ({children}:{children: JSX.Element})=> {

    const [ filter, setFilter ] = useState<Item>(SiteItems[0])
    return(
        <SitesContext.Provider value={{filter, setFilter}}>
            {children}
        </SitesContext.Provider>
    )
}

const useSitesContext = ()=> {
    return useContext(SitesContext)
}

export { useSitesContext,  SitesContextProvider };