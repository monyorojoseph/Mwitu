import SiteCard from "./SiteCard";
import Filter from "../Filters/Filter";
import { useSitesList } from "@/hooks/swr/listSites";
import { SiteCardType } from "@/constants/types";
import { SiteItems } from "@/constants/values";
import { useSitesContext } from "@/hooks/contexts/sitesContext";
import Loader from "../Loading/Loader";
import ZeroListing from "../Empty/ZeroListings";
import LoadMore from "../Loading/LoadMore";



export default function ListSites(){
    const { filter, setFilter } = useSitesContext()
    const { sites, loading, next } = useSitesList(filter.value)
    console.log( next)
    return(
        <>
            <div className="space-y-3">

                <Filter items={SiteItems} item={filter} setItem={setFilter}/>

                {!loading && (<div className="space-y-3">
                    {(sites?.length > 0) && sites.map((site: SiteCardType) => (
                        <SiteCard site={site} key={site.id} />
                    ))}
                    {(sites?.length === 0) && <ZeroListing message="Nothing to see here"/>}

                    { next && <LoadMore /> }
                    
                    </div>)}

                {loading && <Loader />}

            </div>
        </>
    )
}