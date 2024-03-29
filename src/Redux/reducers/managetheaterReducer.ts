import { actionType } from "../type";

const initialState = {
    managetheater: []
}

const managetheaterReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.managetheater:
            return {
                ...state,
                managetheater: action.data
            }

        default:
            return state;
    }
}

export default managetheaterReducer