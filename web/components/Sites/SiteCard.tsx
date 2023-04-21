import { SiteCardType } from "@/constants/types";
import Link from "next/link";
import RatedBar from "../Ratings/RatedBar";
import getImageUrl from "@/utils/imageUrl";

export default function SiteCard({site}:{site: SiteCardType}){

    return(
        <>
            <div key={site.id} className="border rounded-sm shadow-sm grid grid-cols-5">
                <div className="h-32 aspect-w-1 overflow-hidden rounded-sm bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 
                col-span-1">
                    <img
                    src={getImageUrl(site.cover_image)}
                    alt={site.name}
                    className="h-full w-full object-cover object-center opacity-90"
                    />
                </div>

                <div className="col-span-4 py-2 px-6">
                    <div className="space-y-2 h-2/3">

                        <Link href={`/site/${site.id}`}>                    
                            <p className="mt-1 text-Night text-lg font-semibold
                            hover:text-PrincetonOrange">
                                {site.name}
                            </p>
                        </Link>
                        <div className="flex flex-row justify-start items-center space-x-5">
                            <RatedBar stars={site.avg_rating} extraStyles="text-lg"/>
                            <h6 className="text-sm text-Night space-x-1">
                                <span className="font-semibold">{site.total_reviews}</span> 
                            <span className="text-gray-500">reviews</span></h6>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}