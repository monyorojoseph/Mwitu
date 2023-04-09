import Layout from "@/components/Layout/Layout";
import RatingBar from "@/components/Ratings/RatingBar";
import { useState } from "react";
import { BsCardImage } from 'react-icons/bs'

export default function Add(){
    const [stars, setStars] = useState<number>(0)
    const [ review, setReview] = useState<string>('')
    const [ name, setName] = useState<string>('')
    const [ url, setUrl] = useState<string>('')

    const onSubmitHandler = (e: React.SyntheticEvent)=> {
        e.preventDefault()
    }

    return(
        <Layout>
            <>
                <section className="space-y-3">
                    {/* image previews */}
                    <ImagePreviews />
                    {/* form */}
                    <form className="space-y-3" onSubmit={onSubmitHandler}>
                        <div>
                            <label htmlFor="cover-photo" className="block text-sm font-semibold leading-6 text-gray-900">
                                Website images/screenshots
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
                                <div className="text-center">
                                <BsCardImage className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold 
                                    text-PrincetonOrange focus-within:outline-none focus-within:ring-2 focus-within:ring-Jet 
                                    focus-within:ring-offset-2 hover:text-PrincetonOrange"
                                    >
                                    <span>Upload a file</span>
                                    <input name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-3 items-center">
                            <div className="sm:col-span-6">
                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Website name
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    name="name"
                                    autoComplete="website-name"
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 bg-GhostWhite
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-Jet sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Website url
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="url"
                                    name="url"
                                    autoComplete="website-url"
                                    value={url}
                                    onChange={(e)=> setUrl(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 bg-GhostWhite
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-Jet sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <textarea
                                name="review"
                                rows={3}
                                onChange={(e)=> setReview(e.target.value)}
                                className="block w-full rounded-md border-0 text-Night shadow-sm ring-1 ring-inset p-2 bg-GhostWhite
                                ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-Night"
                                defaultValue={review}
                                />

                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences on what you like or hate about this site.</p>
                            </div>

                            <div>
                                <RatingBar stars={stars} setStars={setStars}/>
                            </div>
                        </div>

                        <div>
                            <button type="submit" 
                            className="py-1 px-4 rounded-md bg-PrimstonGreen text-GhostWhite font-semibold">
                                Add
                            </button>
                        </div>


                    </form>
                </section>
            </>
        </Layout>
    )
}

function ImagePreviews(){
    return(
        <>
            <section className="h-48">
            </section>
            <hr className="my-2" />
        </>
    )
}