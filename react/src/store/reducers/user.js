import * as ActionTypes from "../actionTypes";

const initialState = {
    currentUser: sessionStorage["user"] && JSON.parse(sessionStorage["user"])
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ENTER_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case ActionTypes.EXIT_USER:
            return {
                ...state,
                currentUser: sessionStorage.clear()
            }
        default: return state;
    }
}