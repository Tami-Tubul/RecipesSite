import * as ActionTypes from "../actionTypes";

export const saveBayList = (arr) => {
    return {
        type: ActionTypes.SAVE_BAY_LIST,
        payload: arr
    };
};

export const deleteBuyItem = (Id, index) => {
    return {
        type: ActionTypes.DELETE_PRODUCT_FROM_LIST,
        payload: Id, index,
    }
}

export const updateBuyList = (arr) => {
    return {
        type: ActionTypes.UPDATE_BUY_LIST,
        payload: arr,
    }
}

export const addProductToList = (product) => {
    return {
        type: ActionTypes.ADD_PRODUCT_TO_LIST,
        payload: product,
    };
};
