import Link from "next/link"
import ListSites from "./ListSites"

const SITES = [
    {
        slug: "jnndsfjnns934248",
        name: "Food Market",
        image_url: "https://images.unsplash.com/photo-1681006319055-ef42b2e21eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        rating: 45
    },
    {
        slug: "jnndsfjnns934248",
        name: "Food Market",
        image_url: "https://images.unsplash.com/photo-1681006319055-ef42b2e21eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        rating: 45
    },
    {
        slug: "jnndsfjnns934248",
        name: "Food Market",
        image_url: "https://images.unsplash.com/photo-1681006319055-ef42b2e21eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        rating: 45
    },
    {
        slug: "jnndsfjnns934248",
        name: "Food Market",
        image_url: "https://images.unsplash.com/photo-1681006319055-ef42b2e21eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        rating: 45
    }
]

export default function MainPreview(){
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
                <ListSites sites={SITES} />
            </section>
            {/* The bad */}
            <section>
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="font-semibold text-PrincetonOrange">The Bad</h2>
                    <Link href={''}>
                        <h2 className="text-ProcessCyan font-semibold">View All</h2>
                    </Link>
                </div>
                
                <ListSites sites={SITES} />
            </section>
            {/* The ugly */}
            <section>
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="font-semibold text-Tomato">The Ugly</h2>
                    <Link href={''}>
                        <h2 className="text-ProcessCyan font-semibold">View All</h2>
                    </Link>
                </div>
                <ListSites sites={SITES} />
            </section>
      </section>
    )
}