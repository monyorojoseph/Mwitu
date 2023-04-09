import { Site } from "@/constants/types";
import SiteCard from "./SiteCard";


export default function ListSites({ sites }: { sites: Site[]}){
    return(
        <>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {sites.map((site) => (
                <SiteCard site={site} />
            ))}
        </div>
        </>
    )
}