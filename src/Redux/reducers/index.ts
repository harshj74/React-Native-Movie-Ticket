import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import seatsArrayReducer from "./seatsArrayReducer";
import movieReducer from "./movieReducer";
import cinemaReducer from "./cinemaReducer";
import visibleReducer from "./visibleReducer";


const allReducers = combineReducers({
    cityReducer: cityReducer,
    seatsArrayReducer: seatsArrayReducer,
    movieReducer: movieReducer,
    cinemaReducer: cinemaReducer,
    visibleReducer: visibleReducer
})

export default allReducers