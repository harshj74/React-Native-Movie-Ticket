import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import seatsArrayReducer from "./seatsArrayReducer";
import movieReducer from "./movieReducer";

const allReducers = combineReducers({
    cityReducer: cityReducer,
    seatsArrayReducer: seatsArrayReducer,
    movieReducer: movieReducer
})

export default allReducers