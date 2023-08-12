import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots"
import { getAllReviews } from "../../store/reviews";
import './spotDetails.css'


const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getOneSpot(spotId))
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])

    const spotList = useSelector(state => Object.values(state.spots))
    const reviewList = useSelector(state => Object.values(state.reviews))

    const spot = spotList.find(spot => spot.id === Number(spotId))
    if (!spot) return null

    function randInt(max) {
        return (Math.floor(Math.random() * max) + 1);
      }

    console.log(reviewList)

    return(
        <>
        <div className = 'flex-container1'>
        <div>{spot.name}</div>
        <span>{spot.avgStarRating}, {spot.numReviews} Reviews, {spot.address}, {spot.city}, {spot.state}</span>
        <div></div>
        <img className = 'img1' src={spot.SpotImages?.url} alt=''/>
        <div>Hosted by {spot.owner?.username}</div>
        <div>
            {/*For aesthetic purposes only these can't be inputted by user and aren't stored in db*/}
            {randInt(8)} guests {randInt(4)} bedrooms {randInt(6)} bed {randInt(4)} bath
            </div>
        <div>{spot.description}</div>
        <div>
        {reviewList.map(review => {
            return (
                <div> {review.review}</div>
            )
        })}
        </div>
        </div>
        </>
    )
}

export default SpotDetails
