import Layout from "@/components/Layout/Layout";
import { createSite } from "@/services/sites";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { logo } from "@/constants/images";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useTagList } from "@/hooks/swr/tagList";
import { createTagsOptions } from "@/utils/tags";
import { TagOptionsType } from "@/constants/types";

const animatedComponents = makeAnimated();


export default function Add(){
    const router = useRouter()
    const { tags } = useTagList()
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
                <section className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 mb-10">
                    {/* form */}
                    <form className="space-y-4" onSubmit={onSubmitHandler}>

                        <div className="grid grid-cols-12 gap-3 items-center">
                            <div className="sm:col-span-6">
                                <label htmlFor="first-name" className="block text-lg leading-6 text-CaribbeanCurrent">
                                    name
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    name="name"
                                    autoComplete="website-name"
                                    required
                                    className="block w-full px-3 rounded-md border py-1.5 text-black text-opacity-90 border-SkyBlue
                                  placeholder:text-MoonStone sm:text-sm sm:leading-6 outline-0 focus:outline-0"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="last-name" className="block text-lg leading-6 text-CaribbeanCurrent">
                                    url
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="url"
                                    name="url"
                                    autoComplete="website-url"
                                    required
                                    className="block w-full px-3 rounded-md border py-1.5 text-black text-opacity-90 border-SkyBlue
                                    placeholder:text-MoonStone sm:text-sm sm:leading-6 outline-0 focus:outline-0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cover-photo" className="block text-lg leading-6 text-CaribbeanCurrent">
                                about
                            </label>
                            <div className="mt-2">
                                <textarea
                                name="about"
                                rows={3}
                                className="block w-full px-3 rounded-md border py-1.5 text-black text-opacity-90 border-SkyBlue
                                placeholder:text-MoonStone sm:text-sm sm:leading-6 outline-0 focus:outline-0"
                                required
                                placeholder="Write something ..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-2">
                                <label htmlFor="cover-photo" className="block text-lg leading-6 text-CaribbeanCurrent">
                                    logo
                                </label>
                                <div className="w-20 h-20 relative mt-2">
                                    <Image src={logo} alt="alt logo" className="object-scale-down object-center h-full w-full" />
                                    <label htmlFor="logo"
                                        className="cursor-pointer absolute 
                                        h-20 w-20 top-0 bg-white bg-opacity-75 flex flex-row justify-center items-center">
                                            <p className="text-sm text-CaribbeanCurrent font-semibold">upload logo</p>
                                        <input id="logo" name="logo" type="file" className="sr-only" required />

                                    </label>
                                </div>
                            </div>
                            <div className="col-span-10">

                                <label htmlFor="cover-photo" className="block text-lg leading-6 text-CaribbeanCurrent">
                                    tag
                                </label>

                                <div className="mt-2">
                                    <Select
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isMulti
                                        components={animatedComponents}
                                        isClearable={true}
                                        isSearchable={true}
                                        name="tags"
                                        options={[]}
                                    />
                                </div>

                            </div>
                        </div>

                        <div>
                            <button type="submit" 
                            className="py-1 px-4 rounded-md text-CaribbeanCurrent font-semibold border">
                                {loading ? 'Adding' : 'Add' }
                            </button>
                        </div>


                    </form>
                </section>
            </>
        </Layout>
    )
}