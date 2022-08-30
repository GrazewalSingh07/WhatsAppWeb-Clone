
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { reducer as RegisterReducer } from "./Register/reducer"
import { reducer as LoginReducer } from "./Login/reducer"
import { reducer as AppReducer } from "./App/reducer"
import thunk from "redux-thunk"
const rootReducer=combineReducers({
    registerReducer:RegisterReducer,
   loginReducer:LoginReducer,
    appReducer:AppReducer
})
 export const store= legacy_createStore(rootReducer,applyMiddleware(thunk))