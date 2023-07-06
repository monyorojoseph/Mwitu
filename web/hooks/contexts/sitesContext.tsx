import { ContentTypes, SiteContextType } from "@/constants/types";
import { useContext, createContext, useState } from "react";



const SitesContext = createContext({} as SiteContextType);

const SitesContextProvider = ({children}:{children: JSX.Element})=> {

    const [ content, setContent ] = useState<ContentTypes>(ContentTypes.RECENT)
    const [ category, setCategory ] = useState<string>()

    return(
        <SitesContext.Provider value={{content, setContent, category, setCategory }}>
            {children}
        </SitesContext.Provider>
    )
}

const useSitesContext = ()=> {
    return useContext(SitesContext)
}

export { useSitesContext,  SitesContextProvider };