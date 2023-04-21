import Layout from "@/components/Layout/Layout";
import RatedBar from "@/components/Ratings/RatedBar";
import RatingBar from "@/components/Ratings/RatingBar";
import { useState } from "react";
import { BiUpvote, BiDownvote,  } from 'react-icons/bi';
import { TbWorldWww } from 'react-icons/tb';
import { HiOutlineMail } from 'react-icons/hi'
import { useRouter } from "next/router";
import { useSitesDetails } from "@/hooks/swr/siteDetails";
import Filter from "@/components/Filters/Filter";
import { Review } from "@/constants/types";
import { useListReviews } from "@/hooks/swr/listReviews";
import { monthDate } from "@/utils/date";
import { postReview, voteReview } from "@/services/sites";
import { AxiosResponse } from "axios";
import { ReviewsContextProvider, useReviewsContext } from "@/hooks/contexts/reviewsContext";
import { ReviewItems, ReviewTabs } from "@/constants/values";
import Loader from "@/components/Loading/Loader";
import Begger from "@/components/Begger/Begger";
import { toast } from "react-toastify";
import getImageUrl from "@/utils/imageUrl";
import ZeroListing from "@/components/Empty/ZeroListings";
import LoadMore from "@/components/Loading/LoadMore";

export default function Site(){
    const router = useRouter()
    const { id } = router.query;

    return(
        <Layout>
            <>
                {id && (<section className="my-5">
                    <div className="grid grid-cols-8 gap-4">                     
                        {/* review container */}
                        <div className="col-span-4">
                            <ReviewContainer /></div> 
                        {/* rating values and site details */}
                        <div className="col-span-4">
                            <SiteImage />
                            <SiteDetails />
                            <AverageRatingValues />
                            <Begger />
                        </div>
                    </div>  
                    {/* Related */}
                    <div></div>
                </section>)}
            </>
        </Layout>
    )
}

function AverageRatingValues(){
    const router = useRouter()
    const { id } = router.query;
    const { site, loading } = useSitesDetails(id as string)

    return(<>
        {!loading && (<div className="border rounded-md shadow-sm p-2 space-y-2 mb-2">
            <h4 className="text-lg font-semibold mx-2 mb-3">Average Rating</h4>
            <RatedBar stars={site?.avg_rating} extraStyles="text-3xl mx-2 mb-3"/>

        </div>)}
        { loading && <Loader /> }
        </>)
}

function SiteImage(){
    const router = useRouter()
    const { id } = router.query;
    const { site, loading } = useSitesDetails(id as string)
    return(
        <>
        {!loading && (<div className="border mb-2 rounded-md p-3">
            <div className="h-28 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                src={getImageUrl(site.cover_image)}
                alt={site.name}
                className="h-full w-full object-cover object-center"
                />
            </div>
        </div>)}
        {loading && <Loader />}
        </>
    )
}

function SiteDetails(){
    const router = useRouter()
    const { id } = router.query;
    const { site, loading } = useSitesDetails(id as string)
    
    return(<>
    {!loading && (<div className="border rounded-md mb-3 divide-y">
        <div className="py-1 px-3 text-lg font-semibold">
            {site?.name}
        </div>
        <div className="py-1 px-3">{site?.about}</div>
        <div className="py-1 px-3">
            <a href={site?.url} target="_blank" rel="noopener noreferrer"
            className="flex flex-row justify-start items-center space-x-5 hover:text-ProcessCyan">
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

function ReviewContainer(){
    const [ tab, setTab ] = useState<string>(ReviewTabs[0])
    return (
        <>
            <ReviewsContextProvider>
                <div>
                    {/* tabs */}
                    <div className="flex flex-row justify-start items-center space-x-3 mb-3">
                        <span className="bg-Jet py-1 px-3 text-GhostWhite rounded-md 
                        font-semibold cursor-pointer"
                        onClick={()=> setTab(ReviewTabs[0])}>Reviews</span>
                        <span className="bg-Jet py-1 px-3 text-GhostWhite rounded-md 
                        font-semibold cursor-pointer"
                        onClick={()=> setTab(ReviewTabs[1])}>Leave a review</span>
                    </div>
                    {/* tabs content */}
                    {  tab === ReviewTabs[0] && <Reviews />}
                    {  tab === ReviewTabs[1] && <LeaveReview setTab={setTab}/>}

                </div>
            </ReviewsContextProvider>
        </>
    )
}

function Reviews(){

    const router = useRouter()
    const { id } = router.query;
    const { filter, setFilter } = useReviewsContext()
    const { reviews, loading, next } = useListReviews(id as string, filter.value)

    const handleVoteReview = async(review_id: string, vote_type: string)=> {
        const response = await voteReview({review_id, vote_type}) as AxiosResponse;
        if (response.status == 200){
            // toastify
            vote_type == 'up' && toast.success('Up Voted')
            vote_type == 'down' && toast.success('Down Voted')
        }
    }


    return(
        <>
            <div className="space-y-3">
                <Filter item={filter} setItem={setFilter} items={ReviewItems}/>
                {!loading && (

                    <>
                        {(reviews?.length > 0) && reviews.map((review: Review)=> (
                            <div key={review.id} className="rounded-md border border-gray-300 w-10/12 p-3 space-y-3 shadow-sm">
                                {/* name and time */}
                                <div className="flex flex-row justify-between items-center">
                                    <h2 className="font-semibold text-lg">{review.full_name}</h2>
                                    <h2 className="text-sm">{monthDate(review.timestamp)}</h2>
                                </div>
                                {/* rating bar */}
                                <div>
                                    <RatedBar stars={review.rating}/>
                                </div>
                                {/* review text */}
                                <div>
                                    <p>{review.comment}</p>
                                </div>
                                {/* action */}
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <span className=" flex flex-row items-center space-x-2">
                                        <BiUpvote onClick={()=> handleVoteReview(review.id.toString(), 'up' )}
                                        className="text-2xl cursor-pointer text-PrimstonGreen"/>
                                        <p className="text-xs font-semibold text-Night">{review.upvotes}</p>
                                    </span>
                                    <span className=" flex flex-row items-center space-x-2">
                                        <BiDownvote onClick={()=> handleVoteReview(review.id.toString(), 'down' )}
                                        className="text-2xl cursor-pointer text-Tomato"/>
                                        <p className="text-xs font-semibold text-Night">{review.downvotes}</p>

                                    </span>
                                </div>
                            </div>
                        ))}

                        {(reviews?.length === 0) && <ZeroListing message="Be the first to leave a review ..." />}

                        { next && <div className="w-10/12 p-3"><LoadMore /></div> }                        
                        
                    </>
                ) }
                {loading && <Loader /> }
            </div>
        </>
    )
}

function LeaveReview({setTab}:{setTab: Function}){
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
        setTab(ReviewTabs[0])
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
                    className="block w-full rounded-md border-0 text-Night shadow-sm p-2 bg-GhostWhite
                    placeholder:text-gray-400  focus:ring-2 ring-PrincetonOrange outline-0 focus:outline-0"
                    defaultValue={review}
                    />

                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences on what you like or hate about this site.</p>
                </div>

                <div>
                    <RatingBar stars={stars} setStars={setStars}/>
                </div>

                <div>
                    <button className="py-1 px-4 text-GhostWhite font-semibold bg-PrimstonGreen disabled:bg-Jet disabled:bg-opacity-30 rounded-md"
                    onClick={handlePost} disabled={review ===  '' && stars === 0}>
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>
        </>
    )
}
