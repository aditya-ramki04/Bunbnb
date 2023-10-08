import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import './allSpots.css'
import { NavLink } from "react-router-dom";


const SpotList = () => {
    const dispatch = useDispatch()

    const spotList = useSelector((state) => Object.values(state.spots))

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])


    if(!spotList) return null

    return (
        <div className = 'padding-container'>
        <div className = 'flex-container'>
        {spotList.map(spot => {
                return (
                    <div className = 'spot-container'>
                    <NavLink className = 'nav-link' key={spot.name} to={`/spots/${spot.id}`}>
                    <img src={spot.previewImage} alt=''/>
                    <div className = 'firstRow'>
                    <span>{spot.city}, {spot.state}</span>
                    <span>
                       {spot.avgRating === null ? ("No Reviews") : (Number(spot.avgRating).toFixed(2))}
                    </span>
                    </div>
                    <div> {spot.name}</div>
                    <div>
                        <span className = 'spot-price'>${spot.price}</span>
                        <span> night</span>
                        </div>
                    </NavLink>
                    </div>
                )
            })}
        </div>
        </div>
    )
}
export default SpotList
