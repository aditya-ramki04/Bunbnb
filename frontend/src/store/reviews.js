const GET_REVIEWS = 'reviews/getReviews'

//ACTION CREATORS
const loadReviews = (reviews) => {
    return{
        type: GET_REVIEWS,
        reviews
    }
}

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const reviews = await response.json()
        dispatch(loadReviews(reviews))
    }
}

const initalState = {}

//REDUCER
const reviewsReducer = (state = initalState, action) => {
    switch (action.type){
        case GET_REVIEWS:
            const allReviews = {}
            action.reviews.forEach(review => {allReviews[review.id] = review})
            return {
                ...state,
                ...allReviews
            }
        default:
            return state
    }
}

export default reviewsReducer
