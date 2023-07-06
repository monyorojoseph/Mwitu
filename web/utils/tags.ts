import { Tag } from "@/constants/types";

export const createTagsOptions = (tags: Tag[])=> {
    return tags.forEach((tag)=> ({"label": tag.name, "value": tag.name}))
}