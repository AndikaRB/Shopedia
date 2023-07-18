import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../api";
import * as Yup from "yup";
import { login } from "../redux/features/authSlice";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Oshop from "../assets/sales-shop.svg";
import logo from "../assets/logo.png";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import Warehouse from "../components/admin/Warehouse";

const clientId = process.env.REACT_APP_CLIENT_ID;
const appId = process.env.REACT_APP_APP_ID;

const LoginPage = () => {
  const authSelector = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [userVerified, setUserVerified] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);

  const dispatch = useDispatch();

  const toast = useToast();

  const navigate = useNavigate();

  const location = useLocation();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // normal login
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const response = await axiosInstance.post(`/auth/login`, {
          email,
          password,
        });

        toast({
          title: "Login Succesful",
          status: "success",
          description: response.data.message,
        });

        localStorage.setItem("auth_token", response.data.token);
        dispatch(
          login({
            id: response.data.data.id,
            RoleId: response.data.data.RoleId,
            email: response.data.data.email,
            username: response.data.data.username,
            phone_number: response.data.data.phone_number,
            profile_picture: response.data.data.profile_picture,
            is_verify: response.data.data.is_verify,
            WarehouseId: response?.data.data.WarehouseId,
          })
        );
        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");
      } catch (err) {
        console.log(err);
        if (err.response.data.message === "Email not found") {
          setEmailNotFound(true);
        } else {
          setEmailNotFound(false);
        }

        if (err.response.data.message === "Unverified user") {
          setUserVerified(true);
        } else {
          setUserVerified(false);
        }

        if (err.response.data.message === "Password invalid") {
          setPasswordIncorrect(true);
        } else {
          setPasswordIncorrect(false);
        }

        console.log(err.response.data.message);
        toast({
          title: "Login Failed",
          status: "error",
          description: err.response.data.message,
        });
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email("Email must be a valid email*"),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  // facebook login
  const responseFacebook = async (res) => {
    try {
      const response = await axiosInstance.post("/auth/loginSocialMedia", {
        username: res.name,
        email: res.email,
      });

      toast({
        title: "Login Succesful",
        status: "success",
        description: response.data.message,
      });

      localStorage.setItem("auth_token", response.data.token);
      dispatch(
        login({
          id: response.data.data.id,
          RoleId: response.data.data.RoleId,
          email: response.data.data.email,
          username: response.data.data.username,
          phone_number: response.data.data.phone_number,
          profile_picture: response.data.data.profile_picture,
          is_verify: response.data.data.is_verify,
          WarehouseId: response?.data.data.WarehouseId,
        })
      );
    } catch (error) {
      console.log(error);
    }
    navigate(location.state.from);
  };

  // google login
  const onSuccess = async (res) => {
    try {
      const response = await axiosInstance.post("/auth/loginSocialMedia", {
        username: res.profileObj.name,
        email: res.profileObj.email,
      });

      toast({
        title: "Login Succesful",
        status: "success",
        description: response.data.message,
      });

      localStorage.setItem("auth_token", response.data.token);
      dispatch(
        login({
          id: response.data.data.id,
          RoleId: response.data.data.RoleId,
          email: response.data.data.email,
          username: response.data.data.username,
          phone_number: response.data.data.phone_number,
          profile_picture: response.data.data.profile_picture,
          is_verify: response.data.data.is_verify,
          WarehouseId: response?.data.data.WarehouseId,
        })
      );
    } catch (error) {
      console.log(error);
    }
    navigate(location.state.from);
  };

  const onFailure = (err) => {
    console.log(err);
  };

  const myStyle = {
    color: "#F7931E",
    paddingLeft: "5px",
  };

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  return (
    <Box>
      {/* logo for mobile */}
      <Box
        textAlign={"center"}
        mt="50px"
        mb={"10px"}
        minW={"100px"}
        display={{ lg: "none", md: "none", base: "flex" }}
        justifyContent={"center"}
      >
        <Link to={"/"}>
          <Image src={logo} width={"50px"} display={"inline"} />
        </Link>
        <Link to={"/"}>
          <Text
            fontSize={"30px"}
            fontWeight="bold"
            color={"#0095DA"}
            display="inline"
          >
            Shop
          </Text>
          <Text
            pl={"0"}
            fontSize={"30px"}
            fontWeight="bold"
            color={"#F7931E"}
            display="inline"
          >
            edia
          </Text>
        </Link>
      </Box>
      {/* logo for dekstop */}
      <Box
        textAlign={"center"}
        mt="20px"
        mb={"15px"}
        minW={"960px"}
        display={{ lg: "flex", md: "none", base: "none" }}
        justifyContent={"center"}
      >
        <Link to={"/"}>
          <Image src={logo} width={"50px"} display={"inline"} mt={"5px"} />
        </Link>
        <Link to={"/"}>
          <Text
            fontSize={"40px"}
            fontWeight="bold"
            color={"#0095DA"}
            display="inline"
            fontFamily={
              "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
            }
          >
            Shop
          </Text>
          <Text
            pl={"0"}
            fontSize={"40px"}
            fontWeight="bold"
            color={"#F7931E"}
            display="inline"
          >
            edia
          </Text>
        </Link>
      </Box>

      {/* background image */}
      <Box
        display={"flex"}
        maxW="100%"
        mt="10px"
        pt={{ lg: "50px", base: "10px" }}
        mx={"auto"}
        bgColor={{ lg: "#E5F9F6", base: "#fff" }}
        height={"590px"}
      >
        <Box
          width={"50%"}
          display={{ lg: "flex", md: "none", base: "none" }}
          justifyContent={"flex-end"}
          pr="80px"
        >
          <Box mt={"40px"}>
            <Image src={Oshop} width="480px" justifyContent={"end"} />
            <Text
              m="27px 0 8px"
              fontSize={"22.4px"}
              fontWeight="bold"
              textAlign={"center"}
              color={"#009CE2"}
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
            >
              It's not complicated at Shopedia
            </Text>
            <Text
              mt="5px"
              fontSize={"13px"}
              fontWeight="semibold"
              textAlign={"center"}
              color={"#009CE2"}
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
            >
              Join and feel the convenience of transactions on Shopedia
            </Text>
          </Box>
        </Box>

        {/* login box */}
        <Box fontSize="14px" width={"50%"} mt={"5px"}>
          <Box
            w="400px"
            mx={"auto"}
            ml="50px"
            boxShadow={"0 0 10px 0 rgb(0 0 0 / 10%)"}
            border="1px solid var(--N75,#0095DA)"
            borderRadius={"10px"}
            p="24px 40px 32px "
            textAlign={"center"}
            bgColor={{ lg: "white", base: "#E5F9F6" }}
          >
            <Text
              fontSize="22px"
              fontWeight={"bold"}
              textAlign={"left"}
              color={"#0095DA"}
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
            >
              Log in{" "}
            </Text>
            <Box mt="8px" fontSize={"12px"} textAlign="left" color={"#F7931E"}>
              <Text
                display={"inline"}
                mr="1"
                color={{ lg: "#31353BAD", base: "#31353BF5" }}
                fontFamily={
                  "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                }
              >
                Welcome to Shopedia, please put your login credentials below to
                access our website
              </Text>
            </Box>

            {/* normal login */}
            <form onSubmit={formik.handleSubmit}>
              <Box m="20px 0 8px">
                <FormControl isInvalid={formik.errors.email}>
                  <Input
                    pl={"10px"}
                    value={formik.values.email}
                    name="email"
                    type="text"
                    onChange={formChangeHandler}
                    borderColor={{
                      lg: "#e2e8f0",
                      base: "#A6B0DD",
                    }}
                    placeholder={"Email"}
                    bgColor={{ lg: "#fff", base: "#fff" }}
                  />
                  <FormErrorMessage
                    fontSize={"12px"}
                    fontFamily={"Open Sauce One, sans-serif"}
                    color={"#EF144A"}
                    m={"4px 0px 0px"}
                    lineHeight={"18px"}
                    textAlign={"start"}
                    pl={"2px"}
                  >
                    {formik.errors.email}
                  </FormErrorMessage>
                </FormControl>
                {emailNotFound ? (
                  <Text
                    fontSize={"12px"}
                    fontFamily={"Open Sauce One, sans-serif"}
                    color={"#EF144A"}
                    m={"4px 0px 0px"}
                    lineHeight={"18px"}
                    textAlign={"start"}
                    pl={"2px"}
                  >
                    Email not registered*
                  </Text>
                ) : null}
                {userVerified ? (
                  <Text
                    fontSize={"12px"}
                    fontFamily={"Open Sauce One, sans-serif"}
                    color={"#EF144A"}
                    m={"4px 0px 0px"}
                    lineHeight={"18px"}
                    textAlign={"start"}
                    pl={"3px"}
                  >
                    User not verified*
                  </Text>
                ) : null}
                <Box mt={"20px"}>
                  <FormControl isInvalid={formik.errors.password}>
                    <InputGroup>
                      <Input
                        pl={"10px"}
                        value={formik.values.password}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={formChangeHandler}
                        borderColor={{
                          lg: "#e2e8f0",
                          base: "#A6B0DD",
                        }}
                        placeholder={"Password"}
                        bgColor={{
                          lg: "#fff",
                          base: "#fff",
                        }}
                      />
                      <InputRightElement width={"4.5rem"}>
                        <Button
                          ml={"19px"}
                          size={"md"}
                          bg={"#white"}
                          onClick={togglePassword}
                          color={"#F37121"}
                        >
                          {showPassword ? <BiShow /> : <BiHide />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  {passwordIncorrect ? (
                    <Text
                      fontSize={"12px"}
                      fontFamily={"Open Sauce One, sans-serif"}
                      color={"#EF144A"}
                      m={"4px 0px 0px"}
                      lineHeight={"18px"}
                      textAlign={"start"}
                      pl={"3px"}
                    >
                      Email or Password is Incorrect*
                    </Text>
                  ) : null}
                  <Box>
                    <Link to="/request-reset-password">
                      <Text
                        cursor={"pointer"}
                        textAlign={"right"}
                        color={"#0095DA"}
                        fontSize={"11px"}
                        mt={"5px"}
                        fontFamily={
                          "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                      >
                        Forgot password?
                      </Text>
                    </Link>
                  </Box>
                </Box>
              </Box>

              <Button
                display={"flex"}
                w="100%"
                bgColor={"#0095DA"}
                _hover={false}
                m="16px 0"
                color={"white"}
                isDisabled={
                  formik.values.email.includes("@") &&
                  formik.values.email.includes(".co")
                    ? false
                    : true
                }
                type={"submit"}
              >
                <Text
                  fontWeight={"bold"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                >
                  Log in
                </Text>
              </Button>

              <Box margin="30px 0">
                <Box justifyContent={"space-between"} display="flex">
                  <Box width="42%">
                    <hr />
                  </Box>

                  <Box width="42%">
                    <hr />
                  </Box>
                </Box>
                <Text
                  textAlign={"center"}
                  mt="-13px"
                  mx={"auto"}
                  color={"#B0BFBF"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                  bgColor={{ lg: "#fff", base: "#E5F9F6" }}
                >
                  or
                </Text>
              </Box>

              {/* google login */}
              <Box display={"flex"} gap="2" mt={"-10px"}>
                <GoogleLogin
                  clientId={clientId}
                  buttonText={null}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={false}
                  render={(renderProps) => (
                    <Button
                      display={"flex"}
                      onClick={renderProps.onClick}
                      w="100%"
                      bgColor={"white"}
                      border="1px solid #A6B0DD"
                      _hover={false}
                    >
                      <Box ml="-7px" my={"auto"}>
                        <FcGoogle fontSize={"25px"} />
                      </Box>
                      <Text
                        pl={"2px"}
                        fontFamily={
                          "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                      >
                        Google
                      </Text>
                    </Button>
                  )}
                />

                {/* facebook login */}
                <FacebookLogin
                  appId={appId}
                  autoLoad={false}
                  callback={responseFacebook}
                  fields="name,email,picture"
                  render={(renderProps) => (
                    <Button
                      display={"flex"}
                      onClick={renderProps.onClick}
                      w="100%"
                      bgColor={"white"}
                      border="1px solid #A6B0DD"
                      _hover={false}
                    >
                      <Box mr="6px" my={"auto"}>
                        <FaFacebook color="#3b5998" size={"25px"} />
                      </Box>
                      <Text
                        fontFamily={
                          "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                      >
                        FaceBook
                      </Text>
                    </Button>
                  )}
                />
              </Box>

              {/* redirect register */}
              <Box textAlign={"center"} mt={"30px"}>
                <Text
                  color={"#31353BF5"}
                  fontSize={"12px"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                >
                  Don't have an account?
                  <span style={myStyle}>
                    <Link to={"/register"}>Sign up</Link>
                  </span>
                </Text>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
