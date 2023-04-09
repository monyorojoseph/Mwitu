import { AiOutlineStar, AiFillStar } from 'react-icons/ai'


export default function RatingBar({ stars, setStars }: {stars: number; setStars: Function}){
    const numStars = [1, 2, 3, 4, 5];
    const ratingStars = numStars.map((value)=> value <= stars ? (
        <AiFillStar key={value} onClick={()=> setStars(value)} onMouseEnter={()=> setStars(value)}
        className="text-PrincetonOrange text-3xl"/>
    ) :
    (<AiOutlineStar key={value} onClick={()=> setStars(value)} onMouseEnter={()=> setStars(value)}
        className="text-PrincetonOrange text-3xl"/>))
    return(
        <>
        <div className="flex flex-row justify-start items-center">
            {ratingStars}
        </div>
        </>
    )
}