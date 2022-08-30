import * as types from "./actionTypes"
const initState={
    data: [],
     
    "booked":false
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case(types.GET_DATA_SUCCESS):{
            return{
                ...state,
                booked:false,
                data:payload
            }
        }
        case("booked"):{
         return{
            ...state,
            booked:true
         }
        }
        case("BOOKED_MOVIE"):{
            return{
                ...state,
                booked:false,
                bookedmovie:payload
            }
        }
        default:{
            return state
        }
    }
}