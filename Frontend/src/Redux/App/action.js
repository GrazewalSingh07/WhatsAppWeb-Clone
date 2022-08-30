import axios from "axios"
import * as types from "./actionTypes"
export const getdatasuccess=(payload)=>{
    return{
        type:types.GET_DATA_SUCCESS,
        payload
    }
}
export const getdata=()=>(dispatch)=>{
    try {
        axios.get("http://localhost:4000/getuser").then((res)=>{
            
            dispatch(getdatasuccess(res.data.user))
        })
    } catch (error) {
        console.log(error.message)
    }
}

 
 