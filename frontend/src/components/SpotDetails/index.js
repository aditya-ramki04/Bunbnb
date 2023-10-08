import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, getOneSpot } from "../../store/spots"
import { getAllReviews } from "../../store/reviews";
import { deleteSpot } from "../../store/spots";
import './spotDetails.css'


const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneSpot(spotId))
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])

    const spotList = useSelector(state => Object.values(state.spots))
    const reviewList = useSelector(state => Object.values(state.reviews))

    const spot = spotList.find(spot => spot.id === Number(spotId))
    const reviews = reviewList.filter(review => review.spotId === Number(spotId))
    if (!spot) return null

    function randInt(max) {
        return (Math.floor(Math.random() * max) + 1);
      }

      const handleDelete = () => {
        dispatch(deleteSpot(spotId)).then(() => dispatch(getAllSpots()))
    }

    //ids
    const spotOwnerId = spot.ownerId
    let sessionUserId
    if (sessionUser) {
        sessionUserId = sessionUser.id;
    }

    return(
        <>
        <div className = 'flex-container1'>
        <div>{spot.name}</div>
        <span>{spot.avgStarRating === null ? ("No Reviews") : (Number(spot.avgStarRating).toFixed(2))}</span>
        <span>{spot.numReviews} Reviews, {spot.address}, {spot.city}, {spot.state}</span>
        <div></div>
        <img className = 'img1' src={spot.SpotImages?.url} alt=''/>
        <div>Hosted by {spot.owner?.username}</div>
        <div>
            {/*For aesthetic purposes only these can't be inputted by user and aren't stored in db*/}
            {randInt(8)} guests {randInt(4)} bedrooms {randInt(6)} bed {randInt(4)} bath
            </div>
        <div>{spot.description}</div>
        <div>
        {reviews.map(review => {
            return (
                <div> {review.review}</div>
            )
        })}
        </div>
        {sessionUserId && sessionUserId === spotOwnerId ?
            <button onClick={handleDelete}>Delete Spot</button> : null}
        </div>
        </>
    )
}

export default SpotDetails
