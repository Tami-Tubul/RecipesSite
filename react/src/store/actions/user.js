import * as ActionTypes from "../actionTypes";

export const enterUser = (user)=>{
    return{
        type: ActionTypes.ENTER_USER,
        payload: user
    }
}

export const exitUser = ()=>{
    return{
       type: ActionTypes.EXIT_USER
    }
}
