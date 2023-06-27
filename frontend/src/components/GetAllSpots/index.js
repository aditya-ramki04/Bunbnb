import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

const SpotList = () => {
    const dispatch = useDispatch()
    const spotList = useSelector((state) => Object.values(state.spots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <>
        {spotList.map(spot => {
                return (
                    <>
                    <img src = {spot.previewImage.url} alt='nothing provided'/>
                    <div key = {spot.id}> {spot.city}, {spot.state}, {spot.avgRating}, {spot.price}, {spot.name}</div>
                    </>
                )
            })}
        </>
    )
}

export default SpotList
