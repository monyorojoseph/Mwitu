import SiteCard from "./SiteCard";
import Filter from "../Filters/Filter";
import { useSitesList } from "@/hooks/swr/listSites";
import { SiteCardType } from "@/constants/types";
import { SiteItems } from "@/constants/values";
import { useSitesContext } from "@/hooks/contexts/sitesContext";
import Loader from "../Loading/Loader";



export default function ListSites(){
    const { filter, setFilter } = useSitesContext()
    const { sites, loading } = useSitesList(filter.value)
    return(
        <>
            <div className="space-y-3">

                <Filter items={SiteItems} item={filter} setItem={setFilter}/>

                {!loading && (<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {sites?.map((site: SiteCardType) => (
                        <SiteCard site={site} key={site.id} />
                    ))}
                </div>)}
                {loading && <Loader />}

            </div>
        </>
    )
}