import {
  Container,
  HStack,
  Stack,
  Text,
  Image,
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Divider,
  Heading,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  border,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { TbCircleDashed } from "react-icons/tb";
import "antd/dist/antd.css";
import { Menu, Dropdown, Drawer } from "antd";
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import imgSrc from "../Public/imgSrc.png";
import Background from "../Public/Background.png";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { BsMicFill } from "react-icons/bs";
import { RiMessageFill } from "react-icons/ri";
import { HiLockClosed } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Login/action";
import { Navigate } from "react-router-dom";
import { getdata } from "../Redux/App/action";
import Picker from "emoji-picker-react";
import EmojiPicker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

export const Home = () => {
  const socket = useRef();
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [chat, setChat] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const data = useSelector((state) => state.appReducer.data);
  const isLoggedin = useSelector((state) => state.loginReducer.token);
  const currUser = useSelector((state) => state.loginReducer.profile);

  const [selected, setSelected] = useState(null);
  const [curr, setCurr] = useState(null);

  const [message, setmessage] = useState("");

  const options = (
    <Box pt=".5rem">
      <Menu
        style={{ backgroundColor: "#233138", width: "100%" }}
        theme="dark"
        items={[
          {
            key: "1",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                New group
              </Button>
            ),
          },
          {
            key: "2",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Starred messages
              </Button>
            ),
          },
          {
            key: "3",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Settings
              </Button>
            ),
          },
          {
            key: "4",
            label: (
              <Button
                onClick={() => {
                  localStorage.clear();
                  logout(dispatch);
                }}
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Log out
              </Button>
            ),
          },
        ]}
      />
    </Box>
  );
  const Chatoptions = (
    <Box pt=".5rem" width="100%">
      <Menu
        style={{ backgroundColor: "#233138", width: "100%" }}
        theme="dark"
        items={[
          {
            key: "1",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Contact info
              </Button>
            ),
          },
          {
            key: "2",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Select messages
              </Button>
            ),
          },
          {
            key: "3",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Close chat
              </Button>
            ),
          },
          {
            key: "4",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Mute notifications
              </Button>
            ),
          },
          {
            key: "5",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Disappearing messages
              </Button>
            ),
          },
          {
            key: "6",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Clear messages
              </Button>
            ),
          },
          {
            key: "7",
            label: (
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="small"
                color="#AEBAC1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                Delete chat
              </Button>
            ),
          },
        ]}
      />
    </Box>
  );


  const [showEmojipicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (currUser) {
      socket.current = io("http://localhost:4000");
      socket.current.emit("add-user", currUser._id);
    }
  }, [currUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  },[]);

  const onEmojiClick = (event, emojiObject) => {
    let msg = message;
    msg += emojiObject.emoji;
    console.log(msg);
    setmessage(msg);
  };

  useEffect(() => {
    // dispatch(getdata())

    let temp = data.find((el) => {
      return el._id == selected;
    });
    setCurr(temp);
  }, [selected]);

  const getchat = async () => {
    await axios
      .post("http://localhost:4000/message/get", {
        from: currUser?._id,
        to: curr?._id,
      })
      .then((res) => {
        console.log(res);
        setChat(res.data);
      });
  };

  useEffect(() => {
    if (curr) {
      getchat();
    }
  }, [curr]);

  useEffect(() => {
    dispatch(getdata());
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.curr?.on("msg-recieve", (message) => {
        setArrivalMessage({ fromSelf: false, message: message });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setChat((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
 

  const sendMessage = (m) => {
    axios.post("http://localhost:4000/message/add", {
      from: currUser._id,
      to: curr._id,
      message: m,
    });

    socket.current.emit("send-msg", {
      to: curr?._id,
      from: currUser?._id,
      message: message,
    });
    const msgs = [...chat];
    msgs.push({ fromSelf: true, message: message });
    setChat(msgs);
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendMessage(message);
      setmessage("");
      setShowEmojiPicker(false);
    }
  };

  if (!isLoggedin) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      top={0}
      bottom={0}
      left={0}
      right={0}
      position="absolute"
      width="100%"
      p="2rem"
      height="100vh"
      backgroundColor="#111B21"
    >
      <Container
        height="100%"
        m="auto"
        display="flex"
        pl="10rem"
        pr="10rem"
        maxW="container.2xl"
      >
        <Stack width="50vh" borderRight="1px solid #AEBAC1">
          <HStack backgroundColor="#202C33" p=".5rem" spacing="auto">
            <Image
              width="3rem"
              borderRadius="50%"
              src="http://www.defineinternational.com/wp-content/uploads/2014/06/dummy-profile.png"
            />
            <HStack spacing={6}>
              <TbCircleDashed
                cursor="pointer"
                fontSize="1.5rem"
                color="#AEBAC1"
              />
              <RiMessageFill
                cursor="pointer"
                fontSize="1.5rem"
                color="#AEBAC1"
              />
              <Dropdown
                trigger="click"
                overlay={options}
                placement="bottomRight"
              >
                <BsThreeDotsVertical
                  cursor="pointer"
                  fontSize="1.5rem"
                  color="#AEBAC1"
                />
              </Dropdown>
            </HStack>
          </HStack>
          <Stack overflow-y="scroll" overflow-x="hidden" fontSize="14px">
            <HStack spacing={5} p=".5rem">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BsSearch color="#AEBAC1" />}
                />
                <Input
                  outline={false}
                  outlineColor="none"
                  pl="3rem"
                  backgroundColor="#202C33"
                  type="tel"
                  placeholder="Search or start a new chat"
                />
              </InputGroup>
              <Button
                _hover={{ variant: "ghost" }}
                variant="ghost"
                fontSize="1.5rem"
                color="#AEBAC1"
              >
                {<MdFilterList fontSize="2rem" ccolor="#AEBAC1" />}
              </Button>
            </HStack>

            {data?.map((el) => {
              if (el._id !== currUser._id) {
                return (
                  <>
                    <HStack
                      onClick={() => {
                        setSelected(el._id);
                      }}
                      key={el._id}
                      width="50vh"
                      _hover={{ backgroundColor: "#202C33" }}
                      pt="1rem"
                      pl="1rem"
                      spacing={6}
                    >
                      <Image
                        mb="1rem"
                        borderRadius="50%"
                        width="2rem"
                        src="http://www.defineinternational.com/wp-content/uploads/2014/06/dummy-profile.png"
                      />
                      <HStack
                        spacing="auto"
                        width="50vh"
                        height="4vh"
                        p="1rem"
                        cursor="pointer"
                        borderBottom="1px solid #AEBAC1"
                      >
                        <Text fontWeight={600} pb="1rem" color="#AEBAC1">
                          {el.username}
                        </Text>
                        <IoIosArrowDown color="#AEBAC1" m="2rem" fontSize="1rem" />
                      </HStack>
                    </HStack>
                  </>
                );
              }
            })}
          </Stack>
        </Stack>
        <Box backgroundColor="#222E35" width="100%">
          {!selected ? (
            <Stack height="100%" textAlign="center" spacing="auto">
              <Container margin="auto">
                <Image src={imgSrc} />
                <Heading p="1rem" fontWeight={400} color="#AEBAC1">
                  WhatsApp Web
                </Heading>
                <Text p=".5rem" fontWeight={300} color="#AEBAC1">
                  Send and receive messages without keeping your phone online
                </Text>
                <Text fontWeight={300} color="#AEBAC1">
                  Use WhatssApp on up to 4 linked devices and 1 phone at the
                  same time
                </Text>
              </Container>
              <HStack margin="auto" justifyContent="center">
                <HiLockClosed color="#799688" />
                <Text color="#799688"> End to End encrypted</Text>
              </HStack>
            </Stack>
          ) : (
            <Stack pt=".5rem" width="100%" height="100%">
              <HStack pl="1rem" pr="1rem" spacing="auto" maxW="container.xl">
                <HStack spacing={6}>
                  <Image
                    width="3rem"
                    borderRadius="50%"
                    src="http://www.defineinternational.com/wp-content/uploads/2014/06/dummy-profile.png"
                  />
                  <Heading fontSize="larger" p=".5rem" color="#AEBAC1">
                    {curr?.username}
                  </Heading>
                </HStack>
                <HStack spacing={6}>
                  <BsSearch
                    cursor="pointer"
                    fontSize="1.5rem"
                    color="#AEBAC1"
                  />

                  <Dropdown
                    trigger="click"
                    overlay={Chatoptions}
                    placement="bottomRight"
                  >
                    <BsThreeDotsVertical
                      cursor="pointer"
                      fontSize="1.5rem"
                      color="#AEBAC1"
                    />
                  </Dropdown>
                </HStack>
              </HStack>

              <Box
                overflow="scroll"
                scrollBehavior="smooth"
                
                width="100%"
                height="100%"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                backgroundImage={Background}
              >
                {chat?.map((el) => {
                  return (
                    <Box p="1rem" ref={scrollRef}>
                      <Text  cursor="pointer"
                        p=".5rem"
                        borderRadius="1rem"
                        display="flex"
                        color="white"
                        justifyContent={
                          el?.fromSelf ? "flex-end" : "flex-start"
                        }
                        backgroundColor="#222E35"
                         
                      >
                        {el.message}
                        
                      </Text>
                      
                    </Box>
                  );
                })}
              </Box>
              {showEmojipicker && (
                <Box
                  backgroundSize="cover"
                  backgroundRepeat="no-repeat"
                  backgroundImage={Background}
                  width="100%"
                >
                  {
                    <Picker
                      preload={false}
                      disableAutoFocus={true}
                      disableSearchBar={true}
                      skinTone={SKIN_TONE_MEDIUM_DARK}
                      onEmojiClick={onEmojiClick}
                      pickerStyle={{
                        width: "100%",
                        backgroundColor: "#222E35",
                        border: "none",
                        boxShadow: "none",
                        color: "white",
                      }}
                    />
                  }
                </Box>
              )}
              <Box p="1rem" display="flex" width="100%">
                <Button
                  _hover={{ variant: "ghost" }}
                  variant="ghost"
                  fontSize="1.5rem"
                  color="#AEBAC1"
                  onClick={() => {
                    setShowEmojiPicker(!showEmojipicker);
                  }}
                >
                  {<BsFillEmojiSmileFill />}
                </Button>

                <Button
                  _hover={{ variant: "ghost" }}
                  variant="ghost"
                  fontSize="1.5rem"
                  color="#AEBAC1"
                >
                  {<ImAttachment />}
                </Button>

                <Input
                  onChange={(e) => {
                    setmessage(e.target.value);
                  }}
                  value={message}
                  focusBorderColor="none"
                  backgroundColor="#AEBAC1"
                  variant="filled"
                  placeholder="Write message"
                  color="#AEBAC1"
                />

                {message ? (
                  <Button
                    onClick={handleSendMessage}
                    _hover={{ variant: "ghost" }}
                    variant="ghost"
                    fontSize="1.5rem"
                    color="#AEBAC1"
                  >
                    {<MdSend />}
                  </Button>
                ) : (
                  <Button
                    _hover={{ variant: "ghost" }}
                    variant="ghost"
                    fontSize="1.5rem"
                    color="#AEBAC1"
                  >
                    {<BsMicFill />}
                  </Button>
                )}
              </Box>
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
};
