import * as ActionTypes from "../actionTypes";

export const saveCategory = (categories) => {
 return {
    type: ActionTypes.SAVE_CATEGORY,
    payload: categories
 };
};
 export const addCategory = (category) => {
    return {
      type: ActionTypes.ADD_CATEGORY,
      payload: category,
    };
}; 
