import Link from "next/link";

export default function Begger(){
    return(
        <>
        <div className="border rounded-md shadow-sm p-5">
            <h4 className="text-center text-Night text-xl font-semibold border-b-2 border-Jet pb-1 mb-2"
            >Donate</h4>
            <p className="text-Jet text-lg">If you like the project, you can head over to
            <Link href={'/settings'}>
                <span className="text-ProcessCyan border-b border-ProcessCyan italic mx-1">profile</span>
            </Link>
            and contribute, under Donate tab.</p>
        </div>
        </>
    )
}