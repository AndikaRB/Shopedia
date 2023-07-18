import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../api";
import * as Yup from "yup";
import React, { useState } from "react";
import { attach } from "../redux/features/resetSlice";

const RequestResetPassword = () => {
  const [emailMatch, setEmailMatch] = useState(false);

  const dispatch = useDispatch();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async ({ email }) => {
      try {
        const response = await axiosInstance.post(
          "/auth/request-reset-password",
          {
            email,
          }
        );

        localStorage.setItem("reset_token", response.data.token);

        dispatch(
          attach({
            email: response.data.data.email,
            is_verify: response.data.data.is_verify,
          })
        );

        setEmailMatch(false);

        toast({
          title: "Request Sent",
          description: response.data.message,
          status: "success",
        });
        formik.setFieldValue("email", "");
      } catch (error) {
        console.log(error.response);

        if (error.response.data.message === "Email not found") {
          setEmailMatch(true);
        }

        toast({
          title: "Registration Failed",
          description: error.response.data.message,
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email("Invalid email*"),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  return (
    <Box>
      <Link to="/transaction-list">
        <Box pt={"12px"} mt={"-10px"}>
          <Button
            bgColor={"white"}
            fontSize={"35px"}
            _hover={"none"}
            pb={"5px"}
          >
            ←
          </Button>
        </Box>
      </Link>
      {/* reset password box */}
      <Box
        display={"flex"}
        fontSize="14px"
        justifyContent={"center"}
        mt={"50px"}
      >
        <Box
          w={{ lg: "450px", base: "400px" }}
          boxShadow={"0 0 10px 3px rgb(0 0 0 / 10%)"}
          borderRadius={"10px"}
          p="24px 40px 32px "
          textAlign={"center"}
          bgColor={"white"}
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
            Reset Password
          </Text>
          <Box mt="8px" fontSize={"14px"} textAlign="left" color={"#9d9db7"}>
            <Text
              display={"inline"}
              mr="1"
              color={"#31353b"}
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
            >
              Enter your registered e-mail or phone number. We will send you a
              verification code to reset password.
            </Text>
          </Box>

          {/* reset password form */}
          <form onSubmit={formik.handleSubmit}>
            <Box m="20px 0 8px">
              <FormControl isInvalid={formik.errors.email}>
                <Input
                  value={formik.values.email}
                  name="email"
                  onChange={formChangeHandler}
                  focusBorderColor="#F7931E"
                  placeholder={"Email"}
                  variant="flushed"
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
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
                {emailMatch ? (
                  <Text
                    fontSize={"12px"}
                    fontFamily={"Open Sauce One, sans-serif"}
                    color={"#EF144A"}
                    m={"4px 0px 0px"}
                    lineHeight={"18px"}
                    textAlign={"start"}
                    pl={"2px"}
                  >
                    Email is not registered*
                  </Text>
                ) : null}
              </FormControl>
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
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
            >
              <Text fontWeight={"bold"}>Next</Text>
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default RequestResetPassword;
