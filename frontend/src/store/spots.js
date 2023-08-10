import { csrfFetch } from './csrf'

const GET_SPOTS = 'spots/getSpots'
const GET_ONE_SPOT = 'spots/getOneSpot'


//ACTION CREATORS
const loadSpots = (spots) => {
    return{
        type: GET_SPOTS,
        spots
    }
}

const loadOneSpot = (spot) => {
    return{
        type:GET_ONE_SPOT,
        spot
    }
}

//THUNKS

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`api/spots`)
    if(response.ok){
        const spots = await response.json()
        dispatch(loadSpots(spots))
    }
}

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    if(response.ok){
        const spot = await response.json()
        dispatch(loadOneSpot(spot))
    }
}

//state object
const initalState = {}

//REDUCER
const spotsReducer = (state = initalState, action) => {
    switch (action.type){
        case GET_SPOTS:
            const allSpots = {}
            action.spots.forEach(spot => {allSpots[spot.id] = spot});
            return {
                ...allSpots
            }
        case GET_ONE_SPOT:
            const oneSpot = {...state}
            oneSpot[action.spot.id] = action.spot
            return oneSpot
        default:
            return state
    }
}

export default spotsReducer
