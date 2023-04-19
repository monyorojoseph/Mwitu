import { SiteCardType } from "@/constants/types"
import { searchSite } from "@/services/sites"
import { AxiosResponse } from "axios"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"

export default function Search(){
    const [ q, setQ ] = useState<string>()
    const [ queries, setQueries ] = useState<SiteCardType[]>([])

    const handleSearch = async() => {
        if(q){
            const response = await searchSite({q}) as AxiosResponse;
            if(response.status == 200 ){
                setQueries(response.data)
            }
        }else{
            toast.warn('Type something luv')
        }
    }

    return(
        <>  
            <section className="relative">
                <div className="flex flex-row justify-center items-center space-x-2">
                    <input type="text" name="q"
                    className="border rounded-md w-1/2 h-9 px-3 py-0 focus:ring-2 ring-PrincetonOrange outline-0 focus:outline-0" 
                    value={q}
                    onChange={(e)=> setQ(e.target.value)}
                    placeholder="search for site here ..."/>
                    <button 
                    className="py-1 px-3 bg-PrincetonOrange text-GhostWhite font-semibold rounded-md"
                    onClick={handleSearch}>Search</button>
                </div>

                { queries?.length > 0 && (
                    <div className="absolute w-full z-50">
                        <div className="mx-auto w-2/3  mt-2 border rounded-md shadow-sm py-2 bg-white ">
                            {
                                queries.map((query:SiteCardType)=> (
                                    <div key={query.id} className="px-3 py-1 hover:shadow-md">
                                        <Link href={`/site/${query.id}`}>
                                            <p>{query.name}</p>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}