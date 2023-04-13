import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function RatedBar({ stars, extraStyles }: {stars: number; extraStyles?: string}){
    const numStars = [1, 2, 3, 4, 5];
    const ratingStars = numStars.map((value)=> value <= stars ? (
        <AiFillStar key={value}
        className={`text-PrincetonOrange text-2xl ${extraStyles}`}/>
    ) :
    (<AiOutlineStar key={value}
        className={`text-PrincetonOrange text-2xl ${extraStyles}`}/>))
    return(
        <>
        <div className="flex flex-row justify-start items-center">
            {ratingStars}
        </div>
        </>
    )
}