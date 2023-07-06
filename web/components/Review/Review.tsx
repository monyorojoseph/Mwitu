import { ReviewType } from "@/constants/types"
import getImageUrl from "@/utils/imageUrl"
import RatedBar from "../Ratings/RatedBar"
import { voteReview } from "@/services/sites"
import { toast } from "react-toastify"
import { AxiosResponse } from "axios"
import { monthDate } from "@/utils/date"
import { BiDownvote, BiUpvote } from "react-icons/bi"

const Review = ({review, recent}: {review: ReviewType; recent:boolean})=> {
    
    const handleVoteReview = async(review_id: string, vote_type: string)=> {
        if(!recent){
            const response = await voteReview({review_id, vote_type}) as AxiosResponse;
            if (response.status == 200){
                // toastify
                vote_type == 'up' && toast.success('Up Voted')
                vote_type == 'down' && toast.success('Down Voted')
            }
        }
        }

    return (
        <div 
        className="rounded-sm border border-SkyBlue border-opacity-20 px-3 py-1.5 
        space-y-3 shadow-md hover:shadow-lg">
            {/* name and time */}
            <div className="flex flex-row justify-between items-center">
                <span className="flex flex-row justify-center items-center space-x-3">
                    <img src={getImageUrl(review.image)} alt="reviewer image"
                        className="w-12 h-12 rounded-full object-cover object-center" />
                    <h2 className="font-semibold text-CaribbeanCurrent">{review.full_name}</h2>
                </span>
                <h2 className="text-sm text-MoonStone">{monthDate(review.timestamp)}</h2>
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
                    className="text-2xl cursor-pointer text-CaribbeanCurrent"/>
                    <p className="text-xs font-semibold text-MoonStone">{review.upvotes}</p>
                </span>
                <span className=" flex flex-row items-center space-x-2">
                    <BiDownvote onClick={()=> handleVoteReview(review.id.toString(), 'down' )}
                    className="text-2xl cursor-pointer text-CaribbeanCurrent"/>
                    <p className="text-xs font-semibold text-MoonStone">{review.downvotes}</p>

                </span>
            </div>
        </div>
    )
}

export default Review