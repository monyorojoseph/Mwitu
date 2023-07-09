import { SiteCardType } from "@/constants/types";
import RatedBar from "../Ratings/RatedBar";
import getImageUrl from "@/utils/imageUrl";
import { useRouter } from "next/router";
import ListingTags from "../Tags/ListingTags";

export default function SiteCard({site}:{site: SiteCardType}){
    const router = useRouter()

    return(
        <>
            <div
            onClick={()=>{
                router.push({
                    pathname: '/site/[slug]',
                    query: { slug: site.slug },
                    })
            }} 
            className="border border-SkyBlue border-opacity-20 rounded-sm shadow-md hover:shadow-lg grid grid-cols-5 cursor-pointer">
                <div className="h-32 aspect-w-1 overflow-hidden rounded-s-sm bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 
                col-span-1">
                    <img
                    src={getImageUrl(site.logo)}
                    alt={site.name}
                    className="h-full w-full object-cover object-center opacity-90"
                    />
                </div>

                <div className="col-span-4 py-2 px-6">
                    <div className="space-y-2 h-2/3">
                        <p className="mt-1 text-CaribbeanCurrent text-lg font-semibold cursor-pointer">
                            {site.name}
                        </p>
                        
                        <div className="flex flex-row justify-start items-center space-x-5">
                            <RatedBar stars={site.avg_rating} extraStyles="text-lg"/>
                            <h6 className="text-sm text-CaribbeanCurrent space-x-1">
                                <span className="font-semibold">{site.total_reviews}</span> 
                            <span className="text-MoonStone">reviews</span></h6>

                        </div>

                        <ListingTags tags={site.tags} />
                    </div>
                </div>
            </div>
        </>
    )
}