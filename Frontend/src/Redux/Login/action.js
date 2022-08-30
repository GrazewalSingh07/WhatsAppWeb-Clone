 


import axios from "axios"
import * as types from "./actionTypes"

export const loginRequest=()=>{
    return {
        type:types.LOGIN_USER_REQUEST
    }
}

export const loginSuccess=(payload)=>{
    return {
        type:types.LOGIN_USER_SUCCESS,
        payload

    }
}
export const loginFailure=()=>{
    return {
        type:types.LOGIN_USER_FAILURE
        
    }
}

export const Logout=()=>{
    return{
        type:"LOG_OUT"
    }
}
export const logout=(dispatch)=>{
   
    dispatch(Logout())
}
export const login=(data)=>(dispatch)=>{
    console.log(data)
    dispatch(loginRequest())
    return axios.post("http://localhost:4000/login",data).then((res)=>{
        
        
        localStorage.setItem("token",JSON.stringify(res.data.token))
        localStorage.setItem("username",JSON.stringify(res.data.user))
        dispatch(getProfile(res.data.user))
        console.log(res)
        dispatch(loginSuccess(res.data.token))

    }).catch((err)=>{
        console.log(err)
        dispatch(loginFailure())
    })
}
export const getProfileSuccess=(payload)=>{
    return{
        type:"PROFILE",
        payload
    }
}
export const getProfile=(username)=>(dispatch)=>{
     
    
    dispatch(getProfileSuccess(username))
    
}