import { actionType } from "../type";

const initialState = {
    seatsArray: []
}

const seatsArrayReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.seatsArray:
            return {
                ...state,
                seatsArray: action.data
            }

        default:
            return state;
    }
}

export default seatsArrayReducer

