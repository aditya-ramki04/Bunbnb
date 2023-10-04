import { csrfFetch } from './csrf'

const GET_SPOTS = 'spots/getSpots'
const GET_ONE_SPOT = 'spots/getOneSpot'
const CREATE_SPOT = '/spots/createSpot'


//ACTION CREATORS
const read = (spots) => {
    return{
        type: GET_SPOTS,
        spots
    }
}

const readOne = (spot) => {
    return{
        type:GET_ONE_SPOT,
        spot
    }
}

const create = (spot) => {
    return{
        type: CREATE_SPOT,
        spot
    }
}

//THUNKS

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`api/spots`)
    if(response.ok){
        const spots = await response.json()
        dispatch(read(spots))
    }
}

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    if(response.ok){
        const spot = await response.json()
        dispatch(readOne(spot))
    }
}

export const createSpot = (spotData, imgData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    })

    let newSpot
    let img_response

    if (response.ok) {
        newSpot = await response.json()

        img_response = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(imgData)
    })
    }

    if(response.ok && img_response.ok){
        dispatch(create(newSpot))
    }

}

//state object
const initalState = {}

//REDUCER
const spotsReducer = (state = initalState, action) => {
    switch (action.type){
        case GET_SPOTS:
            const allSpots = {}
            action.spots.forEach(spot => {allSpots[spot.id] = spot})
            return {
                ...state,
                ...allSpots
            }

        case GET_ONE_SPOT:
            const oneSpot = {...state}
            oneSpot[action.spot.id] = action.spot
            return oneSpot

        case CREATE_SPOT:
            const newSpot = {
                ...state,
            }
            newSpot[action.spot.id] = action.spot
            return newSpot

        default:
            return state
    }
}

export default spotsReducer
