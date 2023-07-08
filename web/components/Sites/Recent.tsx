import ZeroListing from "../Empty/ZeroListings";
import ImagePreview from "../ImagePreview/ImagePreview"
import Review from "../Review/Review";
import { useRecentActivity } from "@/hooks/swr/listReviews";


const Recent = ()=> {
    const { reviews } = useRecentActivity()

    return(
        <section>
            <ImagePreview />
            <div className="my-5 w-11/12 md:w-10/12 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl text-CaribbeanCurrent">Recent Actitvity</h1>
                </div>
                <div className="mt-5 grid grid-cols-6 gap-1 items-center">
                    {
                        reviews?.map((review)=>(
                            <div className="col-span-6 md:col-span-3 lg:col-span-2">
                                <Review recent={true} review={review} key={review.id} />
                            </div>
                        ))
                    }
                    
                </div>  
                {
                    reviews?.length === 0 &&
                    <ZeroListing message="No recent activites" />
                }             
            </div>
        </section>
    )
}

export default Recent;
