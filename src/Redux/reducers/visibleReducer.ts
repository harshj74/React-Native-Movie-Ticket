import { actionType } from "../type";

const initialState = {
    visible: ''
}

const visibleReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.visible:
            return {
                ...state,
                visible: action.data
            }

        default:
            return state;
    }
}

export default visibleReducer

