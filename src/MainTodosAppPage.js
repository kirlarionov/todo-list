import React from "react"
import { styled } from '@mui/material/styles'
import { Container, Typography } from "@mui/material"
import GetTodosList from "./components/GetTodosList"
import AddTodosForm from "./components/AddTodosForm"

const MainContainer = styled(Container)`
   width: 850px;
   background-image: linear-gradient(to right, #fbfdcb, #fdfd7f);
   padding-bottom: 15px;
   margin-top: 40px;
   border: 2px solid #ffffff;
   border-radius: 30px;
`
const ProjectTitle = styled(Typography)`
   padding-top: 20px;
   margin: 0 0 15px 30px;
   font-size: 22px;
   font-weight: 700;
   color: #817272;
`

const MainTodosAppPage = ({ user }) => (
   <MainContainer>
      <ProjectTitle>
         ~ Hello, <span style={{ color: '#625757' }}>{user}</span>! It`s your TODO LIST ~
      </ProjectTitle>
      <AddTodosForm />
      <GetTodosList />
   </MainContainer>
)

export default MainTodosAppPage
