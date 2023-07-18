import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BiLogIn, BiLogOutCircle } from "react-icons/bi";
import {
  Link,
  useNavigate,
  createSearchParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import logo from "../../../assets/logo.png";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/authSlice";
import { useState } from "react";
import { useEffect } from "react";
import {
  fillCart,
  getTotalCartQuantity,
} from "../../../redux/features/cartSlice";
import { axiosInstance } from "../../../api";
import { fillTrans, fillUnpaidTrans } from "../../../redux/features/transSlice";
import NotificationTab from "./NotificationTab";
import CartTab from "./CartTab";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications, IoMdCart } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { GrMenu } from "react-icons/gr";
import CategoryNavbarItems from "./CategoryNavbarItems";

const Navbar = ({
  onChange,
  onKeyDown,
  setOption1,
  setOption2,
  setOption3,
  setOption4,
  setOption5,
  setSortBy,
  setSortDir,
  keyword_filter,
}) => {
  const authSelector = useSelector((state) => state.auth);
  const cartSelector = useSelector((state) => state.cart);
  const transSelector = useSelector((state) => state.trans);
  const query = new URLSearchParams(useLocation().search);
  const keyword_query = query.get("keyword");

  const [searchValue, setSearchValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [showCategory, setShowCategory] = useState([]);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);
  const [unpaidTransaction, setUnpaidTransaction] = useState([]);
  const [keyword, setKeyword] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const apiImg = process.env.REACT_APP_IMAGE_URL;

  const fetchMyCart = async () => {
    try {
      const response = await axiosInstance.get("/carts/me");
      dispatch(fillCart(response.data.data));

      const cartQuantity = response.data.data.map((val) => val.quantity);

      let Total = 0;

      for (let i = 0; i < cartQuantity.length; i++) {
        Total += Number(cartQuantity[i]);
      }

      setTotalCartQuantity(Total);

      dispatch(getTotalCartQuantity(Total));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllTransaction = async () => {
    try {
      const response = await axiosInstance.get(
        "/transactions/all-transaction-list"
      );
      dispatch(fillTrans(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUnpaidTransaction = async () => {
    try {
      const response = await axiosInstance.get(
        "/transactions/unpaid-transaction"
      );

      dispatch(fillUnpaidTrans(response.data.data));
      setUnpaidTransaction(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setShowCategory(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCategory = () => {
    return showCategory.map((val) => {
      return (
        <CategoryNavbarItems category_name={val.category_name} id={val.id} />
      );
    });
  };

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());

    toast({
      title: "User Logout",
      status: "info",
    });

    if (
      location.pathname === "/cart" ||
      location.pathname === "/transaction-list" ||
      location.pathname === "/user/profile" ||
      location.pathname === "/user/profile/change-password" ||
      location.pathname === "/user/profile/address" ||
      location.pathname === "/transaction/payment-list"
    ) {
      navigate("/login");
    }
  };

  const changeBtnHandler = (e) => {
    setSearchValue(e.target.value);
    onChange(e);
  };

  const keyDownBtnHandler = (e) => {
    if (e.key === "Enter") {
      // navigate({
      //     pathname: "/product",
      //     search: createSearchParams({
      //         name: searchValue,
      //     }).toString(),
      // });
      // onKeyDown(e);
      setKeyword(searchValue);
      navigate(`/product?keyword=${searchValue}`);
      setOption1(true);
      setOption2(false);
      setOption3(false);
      setOption4(false);
      setOption5(false);
      setSortBy("id");
      setSortDir("ASC");
    }
  };

  const statusOrder = transSelector.trans.map((val) => val.OrderStatusId);

  let StatusOrderActive = [];

  for (let i = 0; i < statusOrder.length; i++) {
    if (
      statusOrder[i] === 1 ||
      statusOrder[i] === 2 ||
      statusOrder[i] === 3 ||
      statusOrder[i] === 4
    ) {
      StatusOrderActive.push(statusOrder[i]);
    }
  }

  const backToHome = () => {
    navigate("/");
    setSearchValue("");
  };

  useEffect(() => {
    // setSearchValue(searchParam.get("name"));
    // if (location.pathname === "/") {
    //   setDefaultValue("");
    // } else {
    //   setDefaultValue(keyword_filter);
    // }
    // if (keyword_filter) {
    // if (keyword_filter) {
    if (keyword_query) {
      setSearchValue(keyword_query);
    }

    if (keyword_query === null) {
      setSearchValue("");
    }
  }, [keyword_query]);

  useEffect(() => {
    fetchMyCart();
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchAllTransaction();
  }, []);

  useEffect(() => {
    fetchUnpaidTransaction();
  }, []);

  return (
    <>
      <Container display={{ lg: "flex", base: "none" }}>
        <Box
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          position={"fixed"}
          left="0"
          right={"0"}
          top="0"
          backgroundColor={"#EEEEEE"}
          zIndex="9998"
        >
          <Box backgroundColor="#E5F9F6">
            <HStack height={"65px"} width="96%" mx={"auto"}>
              {/* Brand */}
              {/* <Link to={"/"}> */}
              <Image
                src={logo}
                width={"45px"}
                display={"inline"}
                mt={"4px"}
                onClick={backToHome}
                cursor={"pointer"}
              />
              {/* </Link> */}
              {/* <Link to={"/"}> */}
              <Text
                fontSize={"30px"}
                fontWeight="bold"
                color={"#0095DA"}
                display="inline"
                ml={"-3px"}
                onClick={backToHome}
                cursor={"pointer"}
              >
                Shop
                <Text
                  pl={"0"}
                  fontSize={"30px"}
                  fontWeight="bold"
                  color={"#F7931E"}
                  display="inline"
                >
                  edia
                </Text>
              </Text>
              {/* </Link> */}

              {/* Category */}
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Box pr={"1px"} pl={"10px"} cursor={"pointer"}>
                    <Text
                      my={"auto"}
                      fontSize="28px"
                      fontWeight="semibold"
                      p="15px"
                      pr={"17px"}
                      pt={"8x"}
                      color={"#878787"}
                      _hover={{
                        color: "orange",
                        borderRadius: "5px",
                      }}
                    >
                      <GiHamburgerMenu />
                    </Text>
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  w={"100%"}
                  mt="-10px"
                  bgColor={"#E5F9F6"}
                  borderRadius={"5px"}
                >
                  <PopoverBody fontWeight={"bold"} fontSize="14px">
                    <Grid
                      templateColumns="1fr"
                      gap="6"
                      width={"180px"}
                      height={"400px"}
                      overflow={"auto"}
                      cursor={"pointer"}
                    >
                      <GridItem>{renderCategory()}</GridItem>
                    </Grid>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              {/* Search Input */}
              <Box w={"100%"}>
                <InputGroup>
                  {/* {keyword_query ? (
                    <Input
                      placeholder="Find in Warehouse"
                      _placeholder={{ fontSize: "14px" }}
                      bgColor={"#fff"}
                      border={"2px solid #FFD7B1"}
                      borderRadius={"15px"}
                      onChange={changeBtnHandler}
                      onKeyDown={keyDownBtnHandler}
                      defaultValue={keyword_query}
                    />
                  ) : ( */}
                  <Input
                    placeholder="Find in Warehouse"
                    _placeholder={{ fontSize: "14px" }}
                    bgColor={"#fff"}
                    border={"2px solid #FFD7B1"}
                    borderRadius={"15px"}
                    onChange={changeBtnHandler}
                    onKeyDown={keyDownBtnHandler}
                    value={searchValue}
                  />
                  {/* )} */}

                  <InputRightElement width="3.5rem" mr={"-5px"}>
                    <Button
                      borderLeftRadius="0"
                      _hover={{ bgColor: "none" }}
                      size={"md"}
                      h={"36px"}
                      bgColor={"#fff"}
                      mr={"4px"}
                      borderRadius={"15px"}
                    >
                      <BiSearch color={"#F7931E"} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>

              {/* notification tab */}
              <NotificationTab
                unpaidTransaction={unpaidTransaction}
                navigate={navigate}
                authSelector={authSelector}
              />

              {/* Cart tab */}
              <CartTab
                authSelector={authSelector}
                totalCartQuantity={totalCartQuantity}
              />

              {/* navbar user logged in */}
              <Box
                display={"flex"}
                gap="4"
                fontSize="14px"
                fontWeight={"semibold"}
                pl={"8px"}
              >
                {authSelector.username ? (
                  <Box display={"flex"} mr="2" ml="1" cursor={"pointer"}>
                    <Popover trigger={"hover"}>
                      <PopoverTrigger>
                        <Box
                          display={"flex"}
                          my="auto"
                          minW={"113px"}
                          maxW="200px"
                          paddingLeft="5px"
                          paddingRight={"5px"}
                          _hover={{
                            bgColor: "#A5D8F8",
                            color: "orange",
                            borderRadius: "3px",
                          }}
                          color={"rgba(0,0,0,.54)"}
                        >
                          <Avatar
                            size="sm"
                            name={authSelector.username}
                            mr={2}
                            width={"25px"}
                            height="25px"
                            my="auto"
                            src={`${apiImg}/${authSelector.profile_picture}`}
                          />
                          <Text
                            my="auto"
                            padding={"8px"}
                            textTransform={"capitalize"}
                          >
                            {authSelector.username.split(" ")[0]}
                          </Text>
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent w={"300px"} mr="4" bgColor={"#E5F9F6"}>
                        <PopoverBody>
                          <Box p="2 4" bgColor={"#E5F9F6"}>
                            <Box
                              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                              display={"flex"}
                              my="auto"
                              padding="6px 12px"
                              borderRadius={"5px"}
                              bgColor={"#E5F9F6"}
                              cursor={"pointer"}
                            >
                              <Avatar
                                name={authSelector.username}
                                mr={2}
                                width={"50px"}
                                height="50px"
                                my="auto"
                                src={`${apiImg}/${authSelector.profile_picture}`}
                              />
                              <Text
                                my="auto"
                                padding={"8px"}
                                fontSize="16px"
                                fontWeight={"bold"}
                                color={"rgba(0,0,0,.54)"}
                                textTransform={"capitalize"}
                              >
                                {authSelector.username}
                              </Text>
                            </Box>

                            <Box fontSize={"14px"} p="10px 0">
                              <Link to="/user/profile">
                                <Box
                                  _hover={{
                                    bgColor: "#A5D8F8",
                                    borderRadius: "7px",
                                  }}
                                  p={"5px 4px"}
                                >
                                  <Text>Profile</Text>
                                </Box>
                              </Link>

                              <Link to={"/transaction-list"}>
                                <Box
                                  _hover={{
                                    bgColor: "#A5D8F8",
                                    borderRadius: "7px",
                                  }}
                                  p={"5px 4px"}
                                >
                                  <Text>Transaction-list</Text>
                                </Box>
                              </Link>
                              {location.pathname === "/cart" ||
                              location.pathname === "/transaction-list" ||
                              location.pathname === "/user/profile" ||
                              location.pathname ===
                                "/user/profile/change-password" ||
                              location.pathname === "/user/profile/address" ? (
                                <Link
                                  to={"/login"}
                                  replace
                                  state={{
                                    from: location,
                                  }}
                                >
                                  <Box
                                    display={"flex"}
                                    _hover={{
                                      bgColor: "#A5D8F8",
                                      borderRadius: "7px",
                                    }}
                                    p={"5px 4px"}
                                    b="0"
                                    onClick={logoutBtnHandler}
                                  >
                                    <Text>Logout</Text>
                                    <Box my="auto" ml="1">
                                      <BiLogOutCircle />
                                    </Box>
                                  </Box>
                                </Link>
                              ) : (
                                <Box
                                  display={"flex"}
                                  _hover={{
                                    bgColor: "#A5D8F8",
                                    borderRadius: "7px",
                                  }}
                                  p={"5px 4px"}
                                  b="0"
                                  onClick={logoutBtnHandler}
                                >
                                  <Text>Logout</Text>
                                  <Box my="auto" ml="1">
                                    <BiLogOutCircle />
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                ) : (
                  // navbar if user not logged in
                  <Box gap="2" display={"flex"} pl={"15px"} mr={"0px"}>
                    <Link to={"/login"} replace state={{ from: location }}>
                      <Box width={"73px"}>
                        <Button
                          _hover={"null"}
                          height="32px"
                          border={"1px solid #0095DA"}
                          bgColor={"white"}
                          color={"#0095DA"}
                          fontSize="12px"
                          fontWeight={"bold"}
                          borderRadius={"12px"}
                        >
                          Login
                        </Button>
                      </Box>
                    </Link>
                    <Link to="/register">
                      <Box width={"72px"}>
                        <Button
                          _hover={"null"}
                          height="32px"
                          borderRadius={"12px"}
                          bgColor={"#0095DA"}
                          border={"1px solid #0095DA"}
                          color={"#fff"}
                          fontWeight={"bold"}
                          fontSize="12px"
                          textAlign="center"
                          mx={"auto"}
                          w={"65px"}
                        >
                          Register
                        </Button>
                      </Box>
                    </Link>
                  </Box>
                )}
              </Box>
            </HStack>
          </Box>
        </Box>
      </Container>

      {/* mobile responsive */}
      {location.pathname !== "/" ? null : (
        <Container display={{ lg: "none", base: "flex" }} p={"0px"}>
          <Box
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            position={"fixed"}
            left="0"
            right={"0"}
            top="0"
            zIndex="9998"
          >
            <Box
              bgColor={"#E5F9F6"}
              display={"flex"}
              flexDir={"row"}
              p={"8px 10px 4px 16px"}
              h={"52px"}
              justifyContent={"flex-start"}
              gap={"4px"}
              maxW={"500px"}
            >
              {/* logo */}
              <Link to={"/"}>
                <Image
                  src={logo}
                  minWidth={"28px"}
                  maxWidth={"28px"}
                  display={"inline"}
                  mt={"4px"}
                />
              </Link>
              {/* search bar */}
              <InputGroup pl={"3px"}>
                <InputLeftElement>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    h={"24px"}
                    w={"24px"}
                    pr={"5px"}
                    pb={"2px"}
                  >
                    <BiSearch color={"#F7931E"} />
                  </Box>
                </InputLeftElement>
                <Input
                  p={"0px 12px 2px 28px"}
                  placeholder="Find in Shopedia"
                  _placeholder={{ fontSize: "14px" }}
                  bgColor={"#fff"}
                  border={"1px solid #FFD7B1"}
                  borderRadius={"12px"}
                  onChange={changeBtnHandler}
                  onKeyDown={keyDownBtnHandler}
                  value={searchValue}
                  w={"100%"}
                  h={"36px"}
                  fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                  fontSize={"14px"}
                  color={"#31353BAD"}
                />
              </InputGroup>
              {/* cart */}
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Link to="/cart">
                  <Box
                    w={"36px"}
                    h={"36px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    ml={"1px"}
                  >
                    <IoMdCart
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                    {cartSelector.cart.length && authSelector.id ? (
                      <sup>
                        <Box
                          fontSize={"9px"}
                          backgroundColor={"#EF144A"}
                          borderRadius={"50%"}
                          m={"-6px -8px 0px -8px"}
                          p={"7px 3px 8px 3px"}
                          color={"white"}
                          fontWeight={700}
                          textAlign={"center"}
                        >
                          {totalCartQuantity}
                        </Box>
                      </sup>
                    ) : null}
                  </Box>
                </Link>

                {/* notification */}
                <Link to="/transaction-list">
                  <Box
                    w={"36px"}
                    h={"36px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <IoIosNotifications
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                    {transSelector.trans.length && authSelector.id ? (
                      <sup>
                        <Box
                          fontSize={"9px"}
                          backgroundColor={"#EF144A"}
                          borderRadius={"50%"}
                          m={"-6px -8px 0px -8px"}
                          p={"7px 3px 8px 3px"}
                          color={"white"}
                          fontWeight={700}
                          textAlign={"center"}
                        >
                          {StatusOrderActive.length + unpaidTransaction.length}
                        </Box>
                      </sup>
                    ) : null}
                  </Box>
                </Link>
                {!authSelector.id ? (
                  // if user not logged in yet
                  <Link to={"/login"} replace state={{ from: location }}>
                    <Button
                      display={"flex"}
                      flexDir={"row"}
                      color={"#0095DA"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      pl={"7px"}
                      h={"35px"}
                      bgColor={"#fff"}
                      border={"1px solid #0095DA"}
                      _hover={"none"}
                      _active={"none"}
                      ml={"4px"}
                    >
                      <BiLogIn
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                      />
                      <Text
                        ml={"4px"}
                        fontSize={"12px"}
                        mt={"0px"}
                        fontWeight={600}
                      >
                        Login
                      </Text>
                    </Button>
                  </Link>
                ) : (
                  // if user login
                  <Box display={"flex"} cursor={"pointer"}>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          display={"flex"}
                          paddingLeft="5px"
                          paddingRight={"0px"}
                          color={"rgba(0,0,0,.54)"}
                          pl={"5px"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          h={"36px"}
                          bgColor={"transparent"}
                          _hover={"none"}
                          _active={"none"}
                        >
                          <Text
                            fontSize={"15px"}
                            padding={"6px"}
                            textTransform={"capitalize"}
                            fontWeight={600}
                            color={"#31353BF5"}
                            fontFamily={
                              "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                          >
                            {authSelector.username.split(" ")[0]}
                          </Text>
                          <MdKeyboardArrowDown
                            style={{
                              height: "16px",
                              marginTop: "2px",
                            }}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        w={"110px"}
                        bgColor={"#E5F9F6"}
                        mt={"-10px"}
                        p={"0px"}
                      >
                        <PopoverBody>
                          <Box p="0px" bgColor={"#E5F9F6"}>
                            <Box fontSize={"14px"} p="5px 0">
                              <Link to="/user/profile">
                                <Box p={"5px 4px"}>
                                  <Text>Profile</Text>
                                </Box>
                              </Link>

                              <Link to={"/transaction-list"}>
                                <Box p={"5px 4px"}>
                                  <Text>Transaction</Text>
                                </Box>
                              </Link>
                              {location.pathname === "/cart" ||
                              location.pathname === "/transaction-list" ||
                              location.pathname === "/user/profile" ||
                              location.pathname ===
                                "/user/profile/change-password" ||
                              location.pathname === "/user/profile/address" ? (
                                <Link
                                  to={"/login"}
                                  replace
                                  state={{
                                    from: location,
                                  }}
                                >
                                  <Box
                                    display={"flex"}
                                    _hover={{
                                      bgColor: "#A5D8F8",
                                      borderRadius: "7px",
                                    }}
                                    p={"5px 4px"}
                                    b="0"
                                    onClick={logoutBtnHandler}
                                  >
                                    <Text>Logout</Text>
                                    <Box my="auto" ml="1">
                                      <BiLogOutCircle />
                                    </Box>
                                  </Box>
                                </Link>
                              ) : (
                                <Box
                                  display={"flex"}
                                  p={"5px 4px"}
                                  b="0"
                                  onClick={logoutBtnHandler}
                                >
                                  <Text>Logout</Text>
                                  <Box my="auto" ml="1">
                                    <BiLogOutCircle />
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      )}

      {/* mobile Navbar 2 */}
      {location.pathname === "/transaction-list" ||
      location.pathname === "/cart" ||
      location.pathname === "/user/profile/change-password" ||
      location.pathname === "/user/profile" ||
      location.pathname === `/user/profile/address` ||
      location.pathname === "/cart/shipment" ||
      location.pathname === "/transaction/payment-list" ||
      location.pathname === "/" ? null : (
        <Box
          display={{ lg: "none", base: "flex" }}
          p={"0px"}
          mx="auto"
          maxW={"500px"}
        >
          <Box
            position={"fixed"}
            left="0"
            right={"0"}
            top="0"
            zIndex="9998"
            bgColor="white"
          >
            <Box
              p={"8px 10px 4px"}
              h={"52px"}
              maxW={"500px"}
              display={"flex"}
              justifyContent={"flex-start"}
              flexDir={"row"}
              alignItems={"center"}
              columnGap={"8px"}
            >
              <Link to={"/"} maxH={"36px"} w={"36px"}>
                <Box
                  w={"36px"}
                  h={"24px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <HiOutlineArrowLeft
                    style={{
                      height: "24px",
                      width: "24px",
                      color: "#7d8086",
                    }}
                  />
                </Box>
              </Link>
              <InputGroup w={"100%"}>
                <InputLeftElement>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    h={"24px"}
                    w={"24px"}
                    pr={"5px"}
                    pb={"5px"}
                  >
                    <BiSearch color={"#9fa6b0"} />
                  </Box>
                </InputLeftElement>
                <Input
                  p={"0px 12px 2px 31px"}
                  placeholder="Find in Shopedia"
                  _placeholder={{ fontSize: "14px" }}
                  border={"1px solid #FFD7B1"}
                  borderRadius={"15px"}
                  onChange={changeBtnHandler}
                  onKeyDown={keyDownBtnHandler}
                  value={searchValue}
                  fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                  fontSize={"14px"}
                  h={"36px"}
                  color={"#31353BAD"}
                />
              </InputGroup>
              <Popover>
                <PopoverTrigger>
                  <Button
                    maxH={"32px"}
                    maxW={"36px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bgColor={"transparent"}
                    p={"0px"}
                    _active={"none"}
                    _hover={"none"}
                  >
                    <GrMenu
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "#7c7e82",
                      }}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  w={"110px"}
                  bgColor={"#fff"}
                  mt={"-10px"}
                  p={"0px"}
                >
                  <PopoverBody>
                    <Box p="0px" bgColor={"#fff"}>
                      <Box fontSize={"14px"} p="5px 0">
                        <Link to="/user/profile">
                          <Box p={"5px 4px"}>
                            <Text>Profile</Text>
                          </Box>
                        </Link>

                        <Link to={"/transaction-list"}>
                          <Box p={"5px 4px"}>
                            <Text>Transaction</Text>
                          </Box>
                        </Link>
                        {location.pathname === "/cart" ||
                        location.pathname === "/transaction-list" ||
                        location.pathname === "/user/profile" ||
                        location.pathname === "/user/profile/change-password" ||
                        location.pathname === "/user/profile/address" ? (
                          <Link
                            to={"/login"}
                            replace
                            state={{
                              from: location,
                            }}
                          >
                            <Box
                              display={"flex"}
                              _hover={{
                                bgColor: "#A5D8F8",
                                borderRadius: "7px",
                              }}
                              p={"5px 4px"}
                              b="0"
                              onClick={logoutBtnHandler}
                            >
                              <Text>Logout</Text>
                              <Box my="auto" ml="1">
                                <BiLogOutCircle />
                              </Box>
                            </Box>
                          </Link>
                        ) : (
                          <Box
                            display={"flex"}
                            p={"5px 4px"}
                            b="0"
                            onClick={logoutBtnHandler}
                          >
                            <Text>Logout</Text>
                            <Box my="auto" ml="1">
                              <BiLogOutCircle />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Navbar;
