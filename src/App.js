import React, { useState } from "react"
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Box } from "@mui/material"
import { styled } from '@mui/material/styles'
import MainTodosAppPage from './MainTodosAppPage'
import LoginPage from './LoginPage'
import { useEffect } from "react"

const MenuLink = styled(NavLink)`
   color: blue;
   font-family: "Roboto","Helvetica","Arial",sans-serif;
   font-size: 20px;
   font-weight: 700;
   border: 2px solid #fff0;
   border-radius: 10px;
   padding: 7px 10px;
   margin-left: 10px;
   &.active {
      color: #f4f97c;
      background-color: #3190f2;
      border-color: #ffffff;
   }
   &:hover{
      background-color: #6d95f6;
   }
`

const App = () => {
   const [user, setUser] = useState('')
   const [loginBtnName, setLoginBtnName] = useState('')
   const navigate = useNavigate()
   const currentURL = useLocation()

   useEffect(() => {
      const userName = localStorage.getItem("userName")
      if (userName) {
         setUser(userName)
      } else {
         navigate("/login")
      }
   }, [navigate])

   useEffect(() => {
      if (currentURL.pathname === "/") {
         setLoginBtnName("Log Out")
      } else {
         setLoginBtnName("Log In")
      }
   }, [currentURL])

   const onClickLogOut = () => {
      localStorage.removeItem("userName")
   }

   return (
      <Box sx={{ backgroundImage: 'linear-gradient(to right, #93c8ff, #6969ff)', minHeight: '100vh' }}>
         <Box sx={{ p: '20px' }}>
            <MenuLink to='/'>HOME</MenuLink>
            <MenuLink to='/login' onClick={onClickLogOut}>{loginBtnName}</MenuLink>
         </Box>

         <Routes>
            <Route path="/" element={<MainTodosAppPage user={user} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
         </Routes>
      </Box>
   )
}

export default App
