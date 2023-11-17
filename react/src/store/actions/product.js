import * as ActionTypes from "../actionTypes";

export const addProduct = (product)=>{
    return{
        type: ActionTypes.ADD_PRODUCT,
        payload: product
    }
}

export const saveProducts = (arr)=>{
    return{
        type: ActionTypes.SAVE_PRODUCTS,
        payload: arr
    }
}
export const editProducts = (arr)=>{
    return{
        type: ActionTypes.EDIT_PRODUCT,
        payload: arr
    }
}
export const deleteProduct = (id)=>{
    return{
        type: ActionTypes.DELETE_PRODUCT,
        payload: id
    }
}