import Link from "next/link"
import ListSites from "./ListSites"
import { useSitesList } from "@/hooks/swr/listSites"

export default function MainPreview(){
    const { sites, loading } = useSitesList()
    return(
        <section className="space-y-12 divide-Night my-12">
            {/* The Good */}
            <section>
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="font-semibold text-PrimstonGreen">The Good</h2>
                    <Link href={''}>
                        <h2 className="text-ProcessCyan font-semibold">View All</h2>
                    </Link>
                </div>
                {!loading && <ListSites sites={sites} />}
                {loading && <h2>Loading</h2> }

            </section>
            {/* The bad */}
            {/* <section>
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="font-semibold text-PrincetonOrange">The Bad</h2>
                    <Link href={''}>
                        <h2 className="text-ProcessCyan font-semibold">View All</h2>
                    </Link>
                </div>
                
                <ListSites sites={sites} />
            </section> */}
            {/* The ugly */}
            {/* <section>
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="font-semibold text-Tomato">The Ugly</h2>
                    <Link href={''}>
                        <h2 className="text-ProcessCyan font-semibold">View All</h2>
                    </Link>
                </div>
                <ListSites sites={sites} />
            </section> */}
      </section>
    )
}