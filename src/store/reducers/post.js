import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, ADD_POST } from "../types"

const initialState = {
    allPost: [],
    bookedPost: [],
    loading: true
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return { ...state, loading: false, allPost: action.payload, bookedPost: action.payload.filter(post => post.bookmarked) }
        case TOGGLE_BOOKED:
            const allPost = state.allPost.map(post => {
                if (post.id === action.payload) post.bookmarked = !post.bookmarked
                return post
            })
            return { ...state, allPost, bookedPost: allPost.filter(post => post.bookmarked) }
        case REMOVE_POST:
            return { 
                ...state, 
                allPost: state.allPost.filter(p => p.id !== action.payload), 
                bookedPost: state.bookedPost.filter(p => p.id !== action.payload) 
            }
        case ADD_POST:
            return { ...state, allPost: [{ ...action.payload }, ...state.allPost] }
        default: return state
    }
}