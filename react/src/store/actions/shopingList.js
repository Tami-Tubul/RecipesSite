import ActionTyype from "../actionTypes";

export const saveProducts = (products) => {
  return {
    type: ActionTyype.SAVE_PRODUCT_TO_SHOPINGlIST,
    payload: products,
  };
};

export const addProductToShopList = (products) => {
  return {
    type: ActionTyype.ADD_PRODUCT_TO_SHOPINGlIST,
    payload: products,
  };
};
export const editProductToShopList = (products) =>{
    return { type: ActionTyype.EDIT_PRODUCT_TO_SHOPINGlIST,
        payload: products,
        };
    };
export const removeProductFromShopList = (products) =>{
    return { type: ActionTyype.REMOVE_PRODUCT_FROM_SHOPINGlIST,
            payload: products,
        };
};
