import SiteCard from "./SiteCard";
import Filter from "../Filters/Filter";
import { useSitesList } from "@/hooks/swr/listSites";
import { useState } from "react";
import { Item, SiteCardType } from "@/constants/types";

const Items =  [
    {
        label: 'The Good',
        value: 'good'
    },
    {
        label: 'The Bad',
        value: 'bad'
    },
    {
        label: 'The Ugly',
        value: 'ugly'
    }
]

export default function ListSites(){

    const { sites, loading } = useSitesList()
    const [ item, setItem ] = useState<Item>(Items[0])
    return(
        <>
            <div className="space-y-3">

                <Filter items={Items} item={item} setItem={setItem}/>

                {!loading && (<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {sites.map((site: SiteCardType) => (
                        <SiteCard site={site} />
                    ))}
                </div>)}
                {loading && ( <h2>Laoding...</h2> )}
            </div>
        </>
    )
}