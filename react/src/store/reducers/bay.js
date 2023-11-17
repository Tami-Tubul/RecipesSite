import * as ActionTypes from "../actionTypes";

const initialState = {
    buyList: [],
};

export const bayReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_BAY_LIST:
            return {
                ...state,
                buyList: action.payload
            };
        case ActionTypes.DELETE_PRODUCT_FROM_LIST:
            let arr = state.buyList.filter(item => item.UserId === action.payload.Id && item.Id !== action.payload.index);
            return {
                ...state,
                buyList: arr,
            };

        case ActionTypes.UPDATE_BUY_LIST:
            return {
                ...state,
                buyList: action.payload
            }
        case ActionTypes.ADD_PRODUCT_TO_LIST:
            const { UserId, Count, Name } = action.payload;
            const maxId = state.buyList.length > 0 ? Math.max(...state.buyList.map(item => item.Id)) : 0;
            console.log("maxId eqael to ", maxId);
            if (Count > 0 && Name.length > 1) {
                const newProduct = {
                    Id: maxId + 1,
                    UserId,
                    Count,
                    Name,
                };
                return {
                    ...state,
                    buyList: [...state.buyList, newProduct],
                };
            } else {
                console.log("The values are invalid");
                return state;
            }
        default: return state;
    }
}
