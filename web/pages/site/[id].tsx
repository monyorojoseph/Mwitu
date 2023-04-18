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
import { Item, Review } from "@/constants/types";
import { useListReviews } from "@/hooks/swr/listReviews";
import { monthDate } from "@/utils/yearData";
// import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";

export default function Site(){
    const router = useRouter()
    const { id } = router.query;

    return(
        <Layout>
            <>
                {id && (<section className="my-5">
                    {/* <div className="my-4">
                        <BreadCrumb />
                    </div> */}
                    <div className="grid grid-cols-8 gap-4">                     
                        {/* review container */}
                        <div className="col-span-4">
                            <ReviewContainer /></div> 
                        {/* rating values and site details */}
                        <div className="col-span-4">
                            <SiteDetails />
                            <AverageRatingValues />
                            <Sponser />
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
        {!loading && (<div className="border rounded-md shadow-sm p-2 space-y-2">
            <h4 className="text-lg font-semibold mx-2 mb-3">Average Rating</h4>
            <RatedBar stars={site.avg_rating} extraStyles="text-3xl mx-2 mb-3"/>

        </div>)}
        { loading && ( <h4>Loading...</h4> )}
        </>)
}

function SiteDetails(){
    const router = useRouter()
    const { id } = router.query;
    const { site, loading } = useSitesDetails(id as string)
    
    return(<>
    {!loading && (<div className="border rounded-md mb-3 divide-y">
        <div className="py-1 px-3 text-lg font-semibold">
            {site.name}
        </div>
        <div className="py-1 px-3">{site.about}</div>
        <div className="py-1 px-3">
            <a href={site.url} target="_blank" rel="noopener noreferrer"
            className="flex flex-row justify-start items-center space-x-5 hover:text-ProcessCyan">
                <TbWorldWww className="text-2xl font-semibold"/>
                <span>{site.name}</span>
            </a>
        </div>
        {/* <div className="py-1 px-3">
            <HiOutlineMail className="text-2xl font-semibold"/>
        </div> */}
    </div>)}
    {loading && ( <h2>Loading</h2> )}</>)
}

function Sponser(){
    return(
        <>Begger</>
    )
}

function ReviewContainer(){
    const [ tab, setTab ] = useState<string>('reviews')
    return (
        <>
            <div>
                {/* tabs */}
                <div className="flex flex-row justify-start items-center space-x-3 mb-3">
                    <span className="bg-Jet py-1 px-3 text-GhostWhite rounded-md 
                    font-semibold cursor-pointer"
                    onClick={()=> setTab('reviews')}>Reviews</span>
                    <span className="bg-Jet py-1 px-3 text-GhostWhite rounded-md 
                    font-semibold cursor-pointer"
                    onClick={()=> setTab('leaveReview')}>Leave a review</span>
                </div>
                {/* tabs content */}
                {  tab === 'reviews' && <Reviews />}
                {  tab === 'leaveReview' && <LeaveReview />}

            </div>
        </>
    )
}

const Items =  [
    {
        label: 'Latest',
        value: 'latest'
    },
    {
        label: 'Most voted',
        value: 'mostvoted'
    },
    {
        label: 'Best',
        value: 'best'
    },
    {
        label: 'Bad',
        value: 'bad'
    }
]

function Reviews(){

    const router = useRouter()
    const { id } = router.query;
    const [ item, setItem ] = useState<Item>(Items[0])
    const { reviews, loading } = useListReviews(id as string)


    return(
        <>
            <div className="space-y-3">
                <Filter item={item} setItem={setItem} items={Items}/>
                {!loading && (

                    <>
                        { reviews.map((review: Review)=> (
                            <div key={review.id} className="rounded-md border border-gray-300 w-10/12 p-3 space-y-3 shadow-sm">
                                {/* name and time */}
                                <div className="flex flex-row justify-between items-center">
                                    <h2 className="font-semibold text-lg">{review.full_name}</h2>
                                    <h2>{monthDate(review.timestamp)}</h2>
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
                                    <span>
                                        <BiUpvote 
                                        className="text-2xl cursor-pointer text-PrimstonGreen"/>
                                    </span>
                                    <span>
                                        <BiDownvote 
                                        className="text-2xl cursor-pointer text-Tomato"/>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                ) }
                {loading && <h4>Loading...</h4> }
            </div>
        </>
    )
}

function LeaveReview(){
    const [ stars, setStars ] = useState<number>(0)
    const [ review, setReview ] = useState<string>('')

    const router = useRouter()
    const { id } = router.query;

    return(
        <>
        <div className="space-y-3">
              <div>
                <textarea
                  name="review"
                  rows={3}
                  onChange={(e)=> setReview(e.target.value)}
                  className="block w-full rounded-md border-0 text-Night shadow-sm ring-1 ring-inset p-2 bg-GhostWhite
                  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Night"
                  defaultValue={review}
                />

                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences on what you like or hate about this site.</p>
              </div>

              <div>
                <RatingBar stars={stars} setStars={setStars}/>
              </div>

              <div>
                <button className="py-1 px-4 text-GhostWhite font-semibold bg-PrimstonGreen rounded-md">
                    Post
                </button>
              </div>
        </div>
        </>
    )
}
