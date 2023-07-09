import SiteCard from "./SiteCard";
import { useSitesList } from "@/hooks/swr/listSites";
import { SiteCardType } from "@/constants/types";
import { useSitesContext } from "@/hooks/contexts/sitesContext";
import Loader from "../Loading/Loader";
import ZeroListing from "../Empty/ZeroListings";

export default function ListSites(){
    const { category } = useSitesContext()
    const { sites, loading } = useSitesList(category!)
    return(
        <section className="w-full">
            <div className="w-9/12 mx-auto min-h-80vh my-6 space-y-3">

                {!loading && (<div className="space-y-3">
                    {(sites?.length > 0) && sites.map((site: SiteCardType, index: number) => (
                        <SiteCard site={site} key={index} />
                    ))}
                    {(sites?.length === 0) && <ZeroListing message="Nothing to see here"/>}

                    {/* { next && <LoadMore /> } */}
                    
                    </div>)}

                {loading && <Loader />}

            </div>
        </section>
    )
}