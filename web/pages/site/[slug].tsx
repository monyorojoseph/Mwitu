import Layout from "@/components/Layout/Layout";
import RatedBar from "@/components/Ratings/RatedBar";
import RatingBar from "@/components/Ratings/RatingBar";
import { useState } from "react";
import { BiUpvote, BiDownvote,  } from 'react-icons/bi';
import { TbWorldWww } from 'react-icons/tb';
import { HiOutlineMail } from 'react-icons/hi'
// import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";

export default function Site(){
    return(
        <Layout>
            <>
                <section className="my-5">
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
                            <RatingValues />
                            <Sponser />
                        </div>
                    </div>  
                    {/* Related */}
                    <div></div>
                </section>
            </>
        </Layout>
    )
}

function RatingValues(){
    const barList = [5, 4, 3, 2, 1]
    const bars = barList.map((value)=> (
        <div className="flex flex-row justify-start items-center">
            <div className="border rounded-md py-1 px-3 w-fit">
                <RatedBar stars={value} extraStyles="text-3xl mx-2"/>
            </div>
            <div className="ml-5 text-lg font-semibold">
                5
            </div>
        </div>
    ))

    return(<>
        <div className="border rounded-md shadow-sm p-2 space-y-2">
            {bars}
        </div>
        </>)
}

function SiteDetails(){
    return(<>
    <div className="border rounded-md mb-3 divide-y">
        <div className="py-1 px-3 text-lg font-semibold">
            Food Market
        </div>
        <div className="py-1 px-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid officia error! 
        Qui ratione sapiente maxime ut cumque numquam iste corporis dolore saepe error eius voluptate nihil, voluptates totam excepturi.</div>
        <div className="py-1 px-3">
            <TbWorldWww className="text-2xl font-semibold"/>
        </div>
        <div className="py-1 px-3">
            <HiOutlineMail className="text-2xl font-semibold"/>
        </div>
    </div></>)
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

function Reviews(){
    return(
        <>
            <div>
                <div className="rounded-md border border-gray-300 w-10/12 p-3 space-y-3 shadow-sm">
                    {/* name and time */}
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-semibold text-lg">John Doe</h2>
                        <h2>Sat 04:44 P.M</h2>
                    </div>
                    {/* rating bar */}
                    <div>
                        <RatedBar stars={3}/>
                    </div>
                    {/* review text */}
                    <div>
                        <p>
                        Specifically, if you mouse over a component very quickly, only the onMouseEnter event is registered. 
                        The onMouseLeave never fires, and thus can't update state... leaving the component to appear as if it still is being hovered over.
                        </p>
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
            </div>
        </>
    )
}

function LeaveReview(){
    const [ stars, setStars ] = useState<number>(0)
    const [ review, setReview ] = useState<string>('')
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
