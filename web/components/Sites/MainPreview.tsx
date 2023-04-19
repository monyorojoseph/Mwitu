import Search from "../Search/Search"
import ListSites from "./ListSites"


export default function MainPreview(){

    return(
        <section className="space-y-12 divide-Night my-12">
            <Search />
            <ListSites />
      </section>
    )
}