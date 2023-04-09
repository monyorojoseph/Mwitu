import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function RatedBar({ stars }: {stars: number}){
    const numStars = [1, 2, 3, 4, 5];
    const ratingStars = numStars.map((value)=> value <= stars ? (
        <AiFillStar key={value}
        className="text-PrincetonOrange text-2xl"/>
    ) :
    (<AiOutlineStar key={value}
        className="text-PrincetonOrange text-2xl"/>))
    return(
        <>
        <div className="flex flex-row justify-start items-center">
            {ratingStars}
        </div>
        </>
    )
}