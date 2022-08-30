import * as types from "./actionTypes"

const initState={
    isLoggedin:JSON.parse(localStorage.getItem("token"))?true:false,
    token:JSON.parse(localStorage.getItem("token"))||"",
    isloggin:false,
    loginFailed:false,
    profile:JSON.parse(localStorage.getItem("username"))||""
}
export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case(types.LOGIN_USER_REQUEST):{
            return{
                ...state,
                isloggin:true
            }
        }
        case(types.LOGIN_USER_SUCCESS):{
            return {
                ...state,
                token:JSON.parse(localStorage.getItem("token"))||payload,
                isLoggedin:true,
                isloggin:false,

            }
        }
        case("PROFILE"):{
            return{
                ...state,
                profile:JSON.parse(localStorage.getItem("username"))
            }
        }
        case (types.LOGIN_USER_FAILURE):{
            return{
                ...state,
                isloggin:false,
                isLoggedin:false,
                loginFailed:true
            }
        }
        case("LOG_OUT"):{
            return{
            //    ...state,
               token:JSON.parse(localStorage.getItem("token")),
               isLoggedin:false,
            }
        }
        default:{
            return   state
        }
    }
}