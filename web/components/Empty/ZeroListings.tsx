export default function ZeroListing({message}:{message: string}){
    return (
        <div className="h-56 w-full flex flex-row justify-center items-center">
            <p className="text-3xl text-CaribbeanCurrent text-opacity-30 font-extralight italic">
                {message}
            </p>            
        </div>
    )
}