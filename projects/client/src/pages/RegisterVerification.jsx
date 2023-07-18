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
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import hero from "../assets/Ecommerce checkout laptop-amico.svg"
import logo from "../assets/logo.png"
import { useFormik } from "formik"
import { axiosInstance } from "../api"
import * as Yup from "yup"
import { useState } from "react"
import { BiHide, BiShow } from "react-icons/bi"

const RegisterVerification = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  })

  const toast = useToast()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ password, username }) => {
      try {
        const response = await axiosInstance.post("/auth/registerPassword", {
          username,
          password,
          token: params.verification_token,
        })

        toast({
          title: "Registration Success",
          description: response.data.message,
          status: "success",
        })
        formik.setFieldValue("password", "")
        formik.setFieldValue("username", "")
        navigate("/login")
      } catch (error) {
        console.log(error.response)
        toast({
          title: "Registration Failed",
          description: error.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required().min(3),
      password: Yup.string()
        .required(8)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Box>
      <Link to={"/"}>
        <Box
          textAlign={"center"}
          mt="20px"
          minW={{ lg: "960px", md: null, base: null }}
          fontSize={{ lg: "40px", md: "20px", base: "20px" }}
          fontWeight="bold"
          fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
        >
          <Image
            src={logo}
            width={{ lg: "50px", md: "25pxpx", base: "25px" }}
            mt="5px"
            display={"inline"}
          />

          <Text color={"#0095DA"} display="inline">
            Shop
          </Text>
          <Text color={"#F7931E"} display="inline">
            edia
          </Text>
        </Box>
      </Link>
      <Box
        display={"flex"}
        mx={"auto"}
        mt={{ lg: "20px", md: "10%", base: "10%" }}
        pt={{ lg: "50px", md: "25%", base: "25%" }}
        alignItems="center"
      >
        <Box
          width={"50%"}
          display={{ lg: "flex", md: "none", base: "none" }}
          justifyContent={"flex-end"}
          pr="80px"
        >
          <Box>
            <Image src={hero} width="360px" justifyContent={"end"} />
            <Text
              m="27px 0 8px"
              fontSize={"22.4px"}
              fontWeight="bold"
              textAlign={"center"}
            >
              It's not complicated at Shopedia
            </Text>
            <Text
              mt="5px"
              fontSize={"13px"}
              fontWeight="semibold"
              textAlign={"center"}
            >
              Join and feel the convenience of transactions on Shopedia
            </Text>
          </Box>
        </Box>

        <Box fontSize="14px" width={{ lg: "50%", md: "100%", base: "100%" }}>
          <Box
            w="400px"
            mx={{ lg: null, md: "auto", base: "auto" }}
            ml={{ lg: "50px", md: null, base: null }}
            boxShadow={{
              lg: "0 0 10px 0 rgb(0 0 0 / 10%)",
              md: "none",
              base: "none",
            }}
            border={{
              lg: "1px solid var(--N75,#E5E7E9)",
              md: "none",
              base: "none",
            }}
            borderRadius={"3px"}
            p={{
              lg: "24px 40px 32px ",
              md: "12px 20px 16px",
              base: "12px 20px 16px",
            }}
            textAlign={"center"}
          >
            <Text fontSize="22px" fontWeight={"bold"}>
              Register by Email
            </Text>

            <Text mt="8px">Please input the field to make your account</Text>

            <form onSubmit={formik.handleSubmit}>
              <Box m="20px 0 8px">
                <Box>
                  <Text
                    fontSize={"12px"}
                    textAlign="start"
                    mb="7px"
                    fontWeight={"bold"}
                  >
                    Full Name
                  </Text>
                  <FormControl isInvalid={formik.errors.username}>
                    <InputGroup>
                      <Input
                        border={"1px solid #e2e8f0"}
                        placeholder="Username"
                        p="8px 12px"
                        value={formik.values.username}
                        name="username"
                        type="text"
                        onChange={formChangeHandler}
                      />
                    </InputGroup>

                    <FormErrorMessage>
                      {formik.errors.username}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </Box>
              <Box m="20px 0">
                <Box mb="8px">
                  <Text
                    fontSize={"12px"}
                    textAlign="start"
                    mb="7px"
                    fontWeight={"bold"}
                  >
                    Password
                  </Text>
                  <FormControl isInvalid={formik.errors.password}>
                    <InputGroup>
                      <Input
                        border={"1px solid #e2e8f0"}
                        placeholder="Password"
                        p="8px 12px"
                        value={formik.values.password}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={formChangeHandler}
                      />
                      <InputRightElement width="3rem">
                        <Button
                          size="sm"
                          _active={false}
                          _hover={false}
                          onClick={togglePassword}
                          color={"#0095DA"}
                          bgColor="transparent"
                        >
                          {showPassword ? <BiShow /> : <BiHide />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <Text fontSize={"12px"} textAlign="start" mb="7px">
                    Minimum 8 character
                  </Text>
                </Box>
              </Box>

              <Button
                display={"flex"}
                w="100%"
                bgColor={"#0095DA"}
                _hover={false}
                _active={false}
                m="50px 0 0"
                type="submit"
                color={"white"}
                isDisabled={!formik.values.password || !formik.values.username}
              >
                <Text fontWeight={"bold"}>Finish</Text>
              </Button>
            </form>

            <Box mt="15px" fontSize={"12px"} fontWeight={"normal"}>
              <Text textAlign="center">By registering I agree</Text>
              <Link>
                <Text display={"inline"} mr="1" color={"#0095DA"}>
                  Terms and Conditions
                </Text>
              </Link>
              <Text display={"inline"} mr="1">
                and
              </Text>
              <Link>
                <Text display={"inline"} color={"#0095DA"}>
                  Privacy Policy
                </Text>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterVerification
