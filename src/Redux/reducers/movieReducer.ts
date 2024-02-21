import { actionType } from "../type";

const initialState = {
    movie: []
}

const movieReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.movie:
            return {
                ...state,
                movie: action.data
            }

        default:
            return state;
    }
}

export default movieReducer

