import { SiteCardType } from "@/constants/types";
import Link from "next/link";
import RatedBar from "../Ratings/RatedBar";
import getImageUrl from "@/utils/imageUrl";

export default function SiteCard({site}:{site: SiteCardType}){

    return(
        <>
            <div key={site.id} className="group border rounded-md p-2 shadow-sm items-end">
                <div className="h-28 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                    src={getImageUrl(site.cover_image)}
                    alt={site.name}
                    className="h-full w-full object-cover object-center opacity-90"
                    />
                </div>

                <div className="mt-2 space-y-2">
                    <Link href={`/site/${site.id}`}>                    
                        <p className="mt-1 text-Night hover:text-PrincetonOrange">
                            {site.name}
                        </p>
                    </Link>
                    <div className="flex flex-row justify-between items-center">
                        <RatedBar stars={site.avg_rating} extraStyles="text-lg"/>
                        <h6 className="text-sm text-gray-500">{site.total_reviews} reviews</h6>

                    </div>
                </div>
            </div>
        </>
    )
}