import Layout from "@/components/Layout/Layout";
import { createSite } from "@/services/sites";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { coverImg, bulb } from "@/constants/images";
import AsyncCreatableSelect from 'react-select/async-creatable';
import { EditSlateNode } from "@/components/SlateNode/SlateNode";
import { slateInitialValue } from "@/constants/values";
import { Descendant } from "slate";
import { HiLightBulb } from 'react-icons/hi'
import { fetcher } from "@/services/constant";
import { Tag } from "@/constants/types";
import { MultiValue } from "react-select";

export default function Add(){
    const router = useRouter()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ about, setAbout ] = useState<Descendant[]>(slateInitialValue)
    const [ selectedTags, setSelectedTags ] = useState<MultiValue<{ label: string; value: string; }>>()
    const [ name, setName ] = useState<string>()
    const [ url, setUrl ] = useState<string>()
    const [ logo, setLogo ] = useState<File>()
    const [ cover_image, setCoverImage ] = useState<File>()

    const filterTags =async (value:string) => {
        const response = await fetcher(`/mwitu/tags/?c=${value}`) as Tag[]
        return response?.map((tg)=> ({"label": tg.name, "value": tg.name}))
    }

    const onSubmitHandler = async(e: React.SyntheticEvent)=> {
        e.preventDefault()
        setLoading(true)
        if (name && url && about && logo && cover_image && selectedTags){
            const formData = new FormData()
            formData.append('url', url)
            formData.append('name', name)
            formData.append('logo', logo)
            formData.append('cover_image', cover_image)
            formData.append('about', JSON.stringify(about))
            formData.append('tags', selectedTags?.map((value)=> value?.label).toString())
            const resp = await createSite(formData) as AxiosResponse;
            setLoading(false)
            if(resp?.status === 201){
                toast.success('Site added')
                if(resp?.data?.slug) {
                    router.push(`/site/${resp?.data?.slug}`)
                } else{
                    router.push(`/`)
                }

            }
        }
 
    }


    return(
        <Layout>
            <>
                <section className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 mb-10 min-h-80vh">
                    <div className="my-3 p-4 flex flex-row justify-start items-center space-x-5 bg-SkyBlue bg-opacity-10 rounded-md">
                        <span><HiLightBulb className="text-OrangePeel text-lg"/></span>
                        <span className="text-CaribbeanCurrent text-sm fo">
                            <p>Anyone can add a business, as an owner or as a reviewer if your business is already listed you can claim it.</p>
                            <p>Before adding a business check if it&apos;s listed first.</p>
                        </span>
                    </div>
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
                                    required value={name}
                                    onChange={(event)=> setName(event.target.value)}
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
                                    required value={url}
                                    onChange={(event)=> setUrl(event.target.value)}
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
                                <EditSlateNode initialValue={about} setTextValue={setAbout}/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg leading-6 text-CaribbeanCurrent">
                                cover image
                            </label>
                            <div className="w-full h-36 relative mt-2">
                                <img src={ cover_image ? URL.createObjectURL(cover_image) : coverImg.src } alt="alt cover img" 
                                className="object-cover object-center h-full w-full rounded-md" />
                                {!cover_image && (<label htmlFor="cover_image"
                                    className="cursor-pointer absolute rounded-md
                                    h-36 w-full top-0 bg-SkyBlue bg-opacity-75 flex flex-row justify-center items-center">
                                        <p className="text-white font-semibold">upload cover image</p>
                                    <input 
                                    id="cover_image" name="cover_image" 
                                    type="file" className="sr-only" required
                                    onChange={(event)=> {
                                        const files = event.target.files;
                                        if(files) {
                                            setCoverImage(files[0])
                                        }                                           
                                    }} />

                                </label>)}
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-2">
                                <label className="block text-lg leading-6 text-CaribbeanCurrent">
                                    logo
                                </label>
                                <div className="w-20 h-20 relative mt-2">
                                    <img src={logo ? URL.createObjectURL(logo) : bulb.src } alt="alt logo" className="object-scale-down object-center h-full w-full rounded-md" />
                                    { !logo && (<label htmlFor="logo"
                                        className="cursor-pointer absolute rounded-md
                                        h-20 w-20 top-0 bg-SkyBlue bg-opacity-75 flex flex-row justify-center items-center">
                                            <p className="text-sm text-white font-semibold">upload logo</p>
                                        <input 
                                        id="logo" name="logo" 
                                        type="file" className="sr-only" required
                                        onChange={(event)=> {
                                            const files = event.target.files;
                                            if(files) {
                                                setLogo(files[0])
                                            }                                           
                                        }} />

                                    </label>)}
                                </div>
                            </div>
                            <div className="col-span-10">

                                <label htmlFor="cover-photo" className="block text-lg leading-6 text-CaribbeanCurrent">
                                    tag
                                </label>

                                <div className="mt-2">
                                    <AsyncCreatableSelect
                                        isMulti
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={filterTags}
                                        isClearable
                                        onChange={(newValue: MultiValue<{ label: string; value: string; }>)=> setSelectedTags(newValue) }
                                    />
                                </div>
                                <small className="text-CaribbeanCurrent">you can select more that one that</small>

                            </div>
                        </div>

                        <div>
                            <button type="submit"
                            className="py-1 px-4 rounded-md text-CaribbeanCurrent font-semibold border w-full border-SkyBlue">
                                {loading ? 'Adding' : 'Add' }
                            </button>
                        </div>


                    </form>
                </section>
            </>
        </Layout>
    )
}