const ListingTags = ({tags}: {tags: string[]})=> {
    return(
        <div className="space-x-2">
            {
                tags?.map((tag, index)=> (
                    <span key={index}
                    className="text-xs text-CaribbeanCurrent bg-Isabeline py-0.5 px-1.5 rounded-md">{tag}</span>
                ))
            }
        </div>
    )
} 

export default ListingTags;