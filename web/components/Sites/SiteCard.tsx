import { Site } from "@/constants/types";
import Link from "next/link";

export default function SiteCard({site}:{site: Site}){
    return(
        <>
            <div key={site.slug} className="group">
                <div className="aspect-h-1 aspect-w-1 w-3/4 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                    src={site.image_url}
                    alt={site.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>

                <div>
                    <h3 className="mt-4 text-Night font-semibold">{site.rating}%</h3>
                    <Link href={`/site/${site.slug}`}>                    
                        <p className="mt-1 text-sm text-gray-500 hover:text-ProcessCyan">
                            {site.name}
                        </p>
                    </Link>
                </div>
            </div>
        </>
    )
}