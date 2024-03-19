import { actionType } from "../type"

export const cityAction = (data: any) => {
    return {
        type: actionType.city,
        data: data
    }
}

export const seatsArrayAction = (data: any) => {
    return {
        type: actionType.seatsArray,
        data: data
    }
}

export const movieAction = (data: any) => {
    return {
        type: actionType.movie,
        data: data
    }
}

export const cinemaAction = (data: any) => {
    return {
        type: actionType.cinema,
        data: data
    }
}

export const visibleAction = (data: any) => {
    return {
        type: actionType.visible,
        data: data
    }
}

