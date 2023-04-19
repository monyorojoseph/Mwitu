import Layout from "@/components/Layout/Layout";
import { createSite } from "@/services/sites";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsCardImage } from 'react-icons/bs'
import { toast } from "react-toastify";

export default function Add(){
    const router = useRouter()
    const [ loading, setLoading ] = useState<boolean>(false)

    const onSubmitHandler = async(e: React.SyntheticEvent)=> {
        e.preventDefault()
        setLoading(true)
        const form = document.getElementById('form');
        // @ts-ignore
        const formData = new FormData(form)
        const resp = await createSite(formData) as AxiosResponse;
        setLoading(false)
        if(resp?.status === 201){
            toast.success('Site added')
            router.push('/')
        }
    }

    return(
        <Layout>
            <>
                <section className="space-y-3 mt-5 mb-10">
                    {/* form */}
                    <form className="space-y-3" onSubmit={onSubmitHandler} id="form" encType="multipart/form-data">
                        <div className="grid grid-cols-6 gap-3">

                        <div className="col-span-6">
                            <label htmlFor="cover-photo" className="block text-lg font-semibold leading-6 text-gray-900">
                                Website logo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
                                <div className="text-center">
                                    <BsCardImage className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-GhostWhite font-semibold text-PrincetonOrange
                                         focus-within:outline-none focus-within:ring-2 focus-within:ring-ptext-PrincetonOrange 
                                         focus-within:ring-offset-2 hover:text-PrincetonOrange"
                                        >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="cover_image" type="file" className="sr-only" required />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        </div>

                        <div className="grid grid-cols-12 gap-3 items-center">
                            <div className="sm:col-span-6">
                                <label htmlFor="first-name" className="block text-lg font-semibold leading-6 text-gray-900">
                                    Website name
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    name="name"
                                    autoComplete="website-name"
                                    required
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm bg-GhostWhite
                                  placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 ring-PrincetonOrange outline-0 focus:outline-0"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="last-name" className="block text-lg font-semibold leading-6 text-gray-900">
                                    Website url
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="url"
                                    name="url"
                                    autoComplete="website-url"
                                    required
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm  bg-GhostWhite
                                     placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 ring-PrincetonOrange 
                                     outline-0 focus:outline-0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">

                            <label htmlFor="cover-photo" className="block text-lg font-semibold leading-6 text-gray-900">
                                About / Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                name="about"
                                rows={3}
                                className="block w-full rounded-md border-0 text-Night shadow-sm p-2 bg-GhostWhite
                                placeholder:text-gray-400 focus:ring-2 ring-PrincetonOrange outline-0 focus:outline-0"
                                required
                                placeholder="Write something ..."
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" 
                            className="py-1 px-4 rounded-md bg-PrimstonGreen text-GhostWhite font-semibold">
                                {loading ? 'Adding' : 'Add' }
                            </button>
                        </div>


                    </form>
                </section>
            </>
        </Layout>
    )
}