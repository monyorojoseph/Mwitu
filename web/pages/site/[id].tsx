import Layout from "@/components/Layout/Layout";
import RatedBar from "@/components/Ratings/RatedBar";
import RatingBar from "@/components/Ratings/RatingBar";
import { useState } from "react";
import { TbWorldWww } from 'react-icons/tb';
import { HiOutlineMail } from 'react-icons/hi'
import { useRouter } from "next/router";
import { useSitesDetails } from "@/hooks/swr/siteDetails";
import Filter from "@/components/Filters/Filter";
import { useListReviews } from "@/hooks/swr/listReviews";
import { postReview } from "@/services/sites";
import { AxiosResponse } from "axios";
import { ReviewsContextProvider, useReviewsContext } from "@/hooks/contexts/reviewsContext";
import { ReviewItems, SiteDetailsTabs } from "@/constants/values";
import Loader from "@/components/Loading/Loader";
import { toast } from "react-toastify";
import getImageUrl from "@/utils/imageUrl";
import ZeroListing from "@/components/Empty/ZeroListings";
import ListingTags from "@/components/Tags/ListingTags";
import Review from "@/components/Review/Review";
import { ReviewType } from "@/constants/types";

export default function Site(){
    const router = useRouter()
    const { id } = router.query;
    const [ tab, setTab ] = useState<string>(SiteDetailsTabs[0])


    return(
        <Layout>
            <>
                {id && 
                (<section className="w-full">
                    <SiteHeader tab={tab} setTab={setTab} />
                    <div className="w-9/12 mx-auto min-h-80vh my-6 ">
                        { tab === SiteDetailsTabs[0] && <ReviewsContextProvider><Reviews /></ReviewsContextProvider>}
                        { tab === SiteDetailsTabs[1] && <LeaveReview tab={tab} setTab={setTab} /> }
                        { tab === SiteDetailsTabs[2] && <SiteDetails /> }
                    </div>
                </section>)}
            </>
        </Layout>
    )
}

const SiteHeader = ({tab, setTab}:{tab: string; setTab: Function})=> {
    const router = useRouter()
    const { id } = router.query;
    const { site, loading } = useSitesDetails(id as string)

    return(
        <div className="border-b border-SkyBlue border-opacity-20 shadow-sm">
            <div className="w-full h-40 relative">
                <img src={getImageUrl(site?.cover_image)} alt='cover image' className="w-full h-full object-cover object-center" />  

                <div className="absolute z-30 top-0 bg-black bg-opacity-40 h-40 w-full">
                    <div className="w-9/12 mx-auto h-full flex flex-row justify-start items-start mt-5 space-x-4">
                        <div className="h-28 w-28">
                            <img
                            src={getImageUrl(site?.logo)}
                            alt={site?.name}
                            className="h-full w-full object-cover rounded-md object-center"
                            />
                        </div>
                        <div className="text-Isabeline font-semibold">
                            <h4 className="text-2xl ">{site?.name}</h4>
                            <div className="">
                                <h4 className="mb-1">Average Rating</h4>
                                <RatedBar stars={site?.avg_rating} extraStyles="text-2xl mb-1.5"/>
                            </div>
                            <p className="text-xs">{site?.total_reviews} reviews</p>                            
                        </div>
                    </div>

                </div>                      
            </div>

            <div className="w-9/12 mx-auto py-1.5 flex flex-row justify-start items-center">
                <span onClick={()=>setTab(SiteDetailsTabs[0])}
                className={`py-1 px-3 font-semibold cursor-pointer 
                    ${tab === SiteDetailsTabs[0] ? "text-CaribbeanCurrent" : "text-MoonStone"} `}>Reviews</span>
                <span onClick={()=>setTab(SiteDetailsTabs[1])}
                className={`py-1 px-3 font-semibold cursor-pointer 
                    ${tab === SiteDetailsTabs[1] ? "text-CaribbeanCurrent" : "text-MoonStone"} `}>Leave Review</span>
                <span onClick={()=>setTab(SiteDetailsTabs[2])}
                className={`py-1 px-3 font-semibold cursor-pointer 
                    ${tab === SiteDetailsTabs[2] ? "text-CaribbeanCurrent" : "text-MoonStone"} `}>About</span>
            </div>
        </div>
    )

}

function SiteDetails(){
    const router = useRouter()
    const { id } = router.query;
    const { site, loading } = useSitesDetails(id as string)
    
    return(<>
    {!loading && (<div className="rounded-md space-y-3">
        <div className="py-1">{site?.about}</div>
        <ListingTags tags={site?.tags} />
        <div className="py-1">
            <a href={site?.url} target="_blank" rel="noopener noreferrer"
            className="flex flex-row justify-start items-center space-x-5 text-MoonStone hover:text-CaribbeanCurrent">
                <TbWorldWww className="text-2xl font-semibold"/>
                <span>{site?.name}</span>
            </a>
        </div>
        {/* <div className="py-1 px-3">
            <HiOutlineMail className="text-2xl font-semibold"/>
        </div> */}
    </div>)}
    {loading && <Loader />}</>)
}

function Reviews(){

    const router = useRouter()
    const { id } = router.query;
    const { filter, setFilter } = useReviewsContext()
    const { reviews, loading } = useListReviews(id as string, filter.value)

    return(
        <>
            <div className="space-y-3">
                <Filter item={filter} setItem={setFilter} items={ReviewItems}/>
                {!loading && (

                    <>
                        {(reviews?.length > 0) && reviews.map((review: ReviewType)=> (
                            <Review recent={false} review={review} key={review.id} />
                        ))}

                        {(reviews?.length === 0) && <ZeroListing message="Be the first to leave a review ..." />}

                        {/* { next && <div className="w-10/12 p-3"><LoadMore /></div> }                         */}
                        
                    </>
                ) }
                {loading && <Loader /> }
            </div>
        </>
    )
}

function LeaveReview({tab, setTab}:{tab: string; setTab: Function}){
    const [ stars, setStars ] = useState<number>(0)
    const [ review, setReview ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)

    const router = useRouter()
    const { id } = router.query;

    const handlePost = async (e:React.SyntheticEvent)=> {
        e.preventDefault()
        setLoading(true)
        const resp = await postReview({ comment: review, rating: stars, site_id: id}) as AxiosResponse;
        setLoading(false)
    if ( resp?.status === 201){
        // react toastify
        setTab(SiteDetailsTabs[0])
        toast.success('Review posted')
    }

    }

    return(
        <>
            <div className="space-y-3">
                <div>
                    <textarea
                    name="review"
                    rows={3}
                    onChange={(e)=> setReview(e.target.value)}
                    className="block w-full rounded-md border text-black text-opacity-90 shadow-sm p-2 border-SkyBlue outline-none"
                    defaultValue={review}
                    />

                    <p className="mt-3 text-sm leading-6 text-MoonStone">Write a few sentences on what you like or hate about this site.</p>
                </div>

                <div>
                    <RatingBar stars={stars} setStars={setStars}/>
                </div>

                <div>
                    <button className="py-1 px-4 text-CaribbeanCurrent border font-semibold bg-PrimstonGreen disabled:bg-Jet 
                    disabled:bg-opacity-30 rounded-md"
                    onClick={handlePost} disabled={review ===  '' && stars === 0}>
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>
        </>
    )
}
