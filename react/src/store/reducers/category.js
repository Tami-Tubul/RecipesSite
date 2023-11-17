import * as  ActionType from "../actionTypes";

const initialState = {
    categories: [],
}

export const categoryReducer = (state = initialState, action) =>{
    switch( action.type ){
        case ActionType.SAVE_CATEGORY:
        return{
            ...state,
            categories: action.payload,
        };
        case ActionType.ADD_CATEGORY:
        return{
            ...state,
            categories: [...state.categories, action.payload],
            };
        default: return state; 
    }
};