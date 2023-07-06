import Layout from "@/components/Layout/Layout";
import { SettingTabs } from "@/constants/values";
import { useProfileDetails } from "@/hooks/swr/profileDetails";
import { joinDate } from "@/utils/date";

export default function Setting(){
    return(
        <Layout>
            <section className="w-full">
                <div className="w-11/12 md:w-9/12 lg:w-6/12 mx-auto min-h-80vh my-6">
                    <div className="border border-SkyBlue border-opacity-20 col-span-5 p-8 shadow-sm rounded-sm">
                        <Profile />
                        <Account />
                        {/* <Donate /> */}
                    </div>
                </div>
                
            </section>
        </Layout>
    )
}

function Profile(){
    const { profile, loading } = useProfileDetails()

    return(
        <>
            {!loading && (<div>
                {/* image */}
                {/* details */}
                <div className="space-y-4">
                    <div className="font-semibold text-CaribbeanCurrent flex justify-start items-center space-x-3">
                        <span className="text-lg">Full name:</span>
                        <input type="text" className="text-opacity-90 text-black border rounded-md py-1 px-3 outline-0"
                        value={profile?.full_name} onChange={(e)=> {}} />
                    </div>
                    <div className="font-semibold text-CaribbeanCurrent flex justify-start items-center space-x-3">
                        <span className="text-lg">Email:</span>
                        <input type="text" className="text-opacity-90 text-black border rounded-md py-1 px-3 outline-0"
                        value={profile?.email} onChange={(e)=> {}} />
                    </div>
                    <div className="font-semibold text-CaribbeanCurrent flex justify-start items-center space-x-3">
                        <span className="text-lg">Join date:</span>
                        <span  className="text-opacity-90 text-black">{joinDate(profile?.join_date)}</span>
                    </div>
                    <div>
                        <button className="py-1 px-3 rounded-md text-CaribbeanCurrent border font-semibold"
                        onClick={()=> {}}>
                            Update
                        </button>
                    </div>
                </div>

            </div>)}
        </>
    )
}

function Account(){
    return(
        <>
            <section className="mt-4">
                <button className="py-1 text-OrangePeel font-semibold text-lg rounded-md"
                > Remove Account </button>
            </section>
        </>
    )
}

function Donate(){
    return(
        <>
        <section>
            Donate</section></>
    )
}