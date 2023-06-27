//import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots'

//ACTION CREATORS
const loadSpots = (spots) => {
    return{
        type: GET_SPOTS,
        spots
    }
}

//THUNKS
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('api/spots')
    if(response.ok){
        const spots = await response.json()
        dispatch(loadSpots(spots))
    }
}

//state object
const initalState = {}

//REDUCER
const spotsReducer = (state = initalState, action) => {
    switch (action.type){
        case GET_SPOTS:
            const newState = {}
            action.spots.forEach(spot => {newState[spot.id] = spot});
            return {
                ...newState
            }
        default:
            return state
    }
}

export default spotsReducer
