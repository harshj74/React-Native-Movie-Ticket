import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import seatsArrayReducer from "./seatsArrayReducer";
import movieReducer from "./movieReducer";
import cinemaReducer from "./cinemaReducer";
import visibleReducer from "./visibleReducer";
import managetheaterReducer from "./managetheaterReducer";


const allReducers = combineReducers({
    cityReducer: cityReducer,
    seatsArrayReducer: seatsArrayReducer,
    movieReducer: movieReducer,
    cinemaReducer: cinemaReducer,
    visibleReducer: visibleReducer,
    managetheaterReducer: managetheaterReducer
})

export default allReducers