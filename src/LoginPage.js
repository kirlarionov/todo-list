import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { Button, Box, TextField, Typography } from "@mui/material"

const LoginPageContainer = styled(Box)`
   width: 100%;
   display: flex;
   justify-content: center;
   margin-top: 175px;
`
const LoginBox = styled(Box)`
   width: 400px;
   border: 1px solid #ffffff;
   border-radius: 20px;
   background-image: linear-gradient(to right, #b8d0ff, #6849ff);
`
const FormBox = styled(Box)`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 170px;
   margin-top: 25px;
   padding: 0 20px;
`

const LoginPage = ({ setUser }) => {
   const [name, setName] = useState("")
   const [password, setPassword] = useState("")
   const [emptyName, setEmptyName] = useState("rgba(0,0,0,0.3)")
   const navigate = useNavigate()

   const handleChangeName = (event) => setName(event.target.value)
   const handleChangePassword = (event) => setPassword(event.target.value)

   const submitHandler = useCallback(
      (event) => {
         event.preventDefault()
         const formData = new FormData(event.currentTarget)
         const data = Object.fromEntries(formData)
         console.log(data.name)

         if (!!name) {
            setUser(name)
            navigate("/todo-list/")
            localStorage.setItem("userName", name)
         } else {
            setEmptyName("red")
            setTimeout(() => setEmptyName("rgba(0,0,0,0.3)"), 2000)
         }
      },
      [setUser, name, navigate]
   )

   return (
      <LoginPageContainer>
         <LoginBox>
            <Typography sx={{ padding: "10px 0 0 20px", color: "#ffffff" }}>
               <strong>Please Log in:</strong>
            </Typography>

            <FormBox
               component="form"
               variant="filled"
               noValidate
               autoComplete="off"
               onSubmit={submitHandler}>
               <TextField
                  name="name"
                  label="NAME *"
                  id="outlined-helperName"
                  size="small"
                  sx={{
                     backgroundColor: "white",
                     borderRadius: "5px",
                     border: `1px solid ${emptyName}`,
                  }}
                  value={name}
                  onChange={handleChangeName}
               />
               <TextField
                  name="password"
                  label="PASSWORD (optional)"
                  id="outlined-helperPass"
                  size="small"
                  sx={{ backgroundColor: "white", borderRadius: "5px" }}
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
               />
               <Box
                  sx={{
                     width: "100%",
                     display: "flex",
                     justifyContent: "center",
                     padding: "0 0 15px",
                  }}>
                  <Button variant="contained" type="submit">
                     Log in
                  </Button>
               </Box>
            </FormBox>
         </LoginBox>
      </LoginPageContainer>
   )
}

export default LoginPage
