import { Route, Routes } from "react-router-dom"
import { Chat } from "./Pages/Chat"
import { Home } from "./Pages/Home"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"

 
function App() {
  

  return (
   <>
   <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/chat" element={<Chat/>}/>
   </Routes>
   </>
  )
}

export default App
