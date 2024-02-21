import { actionType } from "../type";

const initialState = {
    city: ''
}

const cityReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.city:
            return {
                ...state,
                city: action.data
            }

        default:
            return state;
    }
}

export default cityReducer

