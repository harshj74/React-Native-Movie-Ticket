import { actionType } from "../type";

const initialState = {
    cinema: []
}

const cinemaReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.cinema:
            return {
                ...state,
                cinema: action.data
            }

        default:
            return state;
    }
}

export default cinemaReducer