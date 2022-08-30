import React, { useState } from 'react'
import { Box, Button, Container, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react'
import{AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import {HiOutlineMail} from "react-icons/hi"
import {BsCheckLg} from 'react-icons/bs'
import {FaWhatsapp} from "react-icons/fa"
import { Navigate, useNavigate } from 'react-router-dom'
import { register } from '../Redux/Register/action'
import { useDispatch, useSelector } from 'react-redux'
export const Register = () => {
  const navigate= useNavigate()
  const isRegistered= useSelector((state)=>state.registerReducer.isRegistered)
  const dispatch= useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [credentials,setCedentials]=useState({})
  const [visible,setVisible] =useState(false)
  const [error,setError]=useState("")
  const handleChange=(e)=>{
    const {id,value}=e.target
    setCedentials({...credentials,[id]:value})
  }
  const handleSubmit=()=>{
    if(credentials.email&&  credentials.username&&credentials.password){
     dispatch(register(credentials))
      
    }
   else{
    if(!credentials.email){
      setError("Please enter email")
    }else if(!credentials.password){
      setError("Please enter password")

    }
    else if(!credentials.username){
      setError("Please enter username")
    }else{
      setError("Please enter valid credentials")
    }
    onOpen()
   }
  }
  if(isRegistered){
    return  <Navigate to="/login"/>
  }
  return (
    <Box height="100vh"  >
      <Container pt="1rem" margin="auto" textAlign="center" height="20%"  backgroundColor="teal" maxW="container.2xl">
       <HStack width="80%"  textAlign="left">
          <FaWhatsapp color="white"/>
          <Heading color="white" fontSize="smaller">WHATSAPP WEB</Heading>
       </HStack>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
             ok
            </Button>
             
          </ModalFooter>
        </ModalContent  >
      </Modal>
      <Container p="2rem" height="80%" backgroundColor="#111B21" maxW="container.2xl">
          <Stack spacing="auto" backgroundColor="white" p="2rem" margin="auto"  maxW="container.sm"  >
            <Stack spacing={6}>
              <Input  onChange={handleChange} id="username" variant="flushed" placeholder=" Enter username"/>
              <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children={<HiOutlineMail/>}
                  />
                  
                  <Input id="email" variant="flushed" value={credentials?.email} placeholder='Enter email' onChange={handleChange} />
                   <InputRightElement children={credentials?.email?.length>0 ? <BsCheckLg color='green' />:null} />
               </InputGroup>
               <InputGroup>

                <Input variant="flushed" id="password" type={visible?"text":"password"} value={credentials.password} placeholder="Enter password" onChange={handleChange} />
                <InputRightElement  onClick={()=>{
                    setVisible(!visible)
                }} children={ visible?<AiFillEye/>:<AiFillEyeInvisible/>}/>
                </InputGroup>
            </Stack>
            <Stack pt="2rem">
              <Button onClick={handleSubmit} colorScheme="teal">Register</Button>
              <Button colorScheme="teal" onClick={()=>{navigate("/login")}}>Already registered? Login here</Button>
            </Stack>
          </Stack>
         
      </Container>
    </Box>
  )
}
