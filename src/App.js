import React, { useEffect } from 'react'
import { BrowserRouter, } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// components
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import MessageBox from './components/MessageBox'
import { RESET_SUCCESS_MESSAGE, RESET_ERROR_MESSAGE } from './constants/generalConstant.js'


const App = () => {
  const {successMessage, errorMessage} = useSelector(state => state.generalState)
  const dispatch = useDispatch()

  useEffect(() => {
    if(successMessage){
      setTimeout(() => {
          dispatch({type: RESET_SUCCESS_MESSAGE})
      }, 2500);
    }
    if(errorMessage){
      setTimeout(() => {
          dispatch({type: RESET_ERROR_MESSAGE})
      }, 2500);
    }
  }, [dispatch,successMessage, errorMessage])
  return (
    <BrowserRouter>
       <Header/>
       <br />
       <Container>
        {successMessage && <MessageBox variant="success">{successMessage} </MessageBox>}
        {errorMessage && <MessageBox variant="info">{errorMessage} </MessageBox>}
       </Container>
       <Main />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <Footer/>
    </BrowserRouter>
  )
}

export default App
