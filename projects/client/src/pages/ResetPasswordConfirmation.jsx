import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { detach } from "../redux/features/resetSlice";

const ResetPasswordConfirmation = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [passwordContain, setPasswordContain] = useState(false);

  const resetSelector = useSelector((state) => state.reset);

  const dispatch = useDispatch();

  const toast = useToast();

  const navigate = useNavigate();

  const location = useLocation();

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: async ({ newPassword, confirmNewPassword }) => {
      try {
        const response = await axiosInstance.patch(
          `/auth/confirm-reset-password`,
          {
            newPassword,
            confirmNewPassword,
            token: params.reset_token,
          }
        );
        localStorage.removeItem("reset_token");
        dispatch(detach());

        toast({
          title: "Reset Password Succesful",
          status: "success",
          description: response.data.message,
        });

        formik.setFieldValue("newPassword", "");
        formik.setFieldValue("confirmNewPassword", "");
        navigate("/login");
      } catch (err) {
        console.log(err);

        if (err.response.data.message === "Password doesn't match") {
          setPasswordMatch(true);
        }

        if (
          err.response.data.message ===
          "Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character"
        ) {
          setPasswordContain(true);
        }

        console.log(err.response.data.message);

        toast({
          title: "Reset Password Failed",
          status: "error",
          description: err.response.data.message,
        });
      }
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required(8),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  console.log(passwordContain);
  useEffect(() => {
    if (!localStorage.getItem("reset_token")) {
      navigate("/login");
    }
    if (formik.values.confirmNewPassword === formik.values.newPassword) {
      setPasswordMatch(false);
    }

    if (
      formik.values.newPassword.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )
    ) {
      setPasswordContain(false);
    }
  }, [formik]);

  return (
    <Box>
      <Link to="/login">
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
          w={{ lg: "480px", base: "410px" }}
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
            New Password
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
              Create a strong password for an account with e-mail reset{" "}
              <span style={{ color: "#F7931E" }}>{resetSelector.email}</span>
            </Text>
          </Box>

          {/* reset password form */}
          <form onSubmit={formik.handleSubmit}>
            <Box m="20px 0 8px">
              <FormControl isInvalid={formik.errors.newPassword}>
                <InputGroup>
                  <Input
                    value={formik.values.newPassword}
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    onChange={formChangeHandler}
                    focusBorderColor="#F7931E"
                    placeholder={"New Password"}
                    variant="flushed"
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                  />
                  <InputRightElement width={"4.5rem"}>
                    <Button
                      mt={"-2px"}
                      ml={"19px"}
                      size={"md"}
                      bg={"white"}
                      onClick={toggleNewPassword}
                      color={"#F37121"}
                    >
                      {showNewPassword ? <BiShow /> : <BiHide />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {passwordContain === true ? (
                  <Text
                    fontSize={"11px"}
                    fontFamily={"Open Sauce One, sans-serif"}
                    color={"#EF144A"}
                    m={"4px 0px 0px"}
                    lineHeight={"18px"}
                    textAlign={"start"}
                    pl={"2px"}
                  >
                    Password Must Contain 8 Characters, 1 Uppercase, 1
                    Lowercase, 1 Number and 1 Special Case Character
                  </Text>
                ) : (
                  <Text
                    fontSize={"11px"}
                    color={"#31353b"}
                    textAlign={"left"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                  >
                    Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1
                    Number and 1 Special Case Character
                  </Text>
                )}
              </FormControl>
              <Box mt={"20px"}>
                <FormControl isInvalid={formik.errors.confirmNewPassword}>
                  <InputGroup>
                    <Input
                      value={formik.values.confirmNewPassword}
                      name="confirmNewPassword"
                      type={showConfirmNewPassword ? "text" : "password"}
                      onChange={formChangeHandler}
                      focusBorderColor="#F7931E"
                      fontFamily={
                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                      }
                      placeholder={"Retype New Password"}
                      variant="flushed"
                    />
                    <InputRightElement width={"4.5rem"}>
                      <Button
                        ml={"19px"}
                        size={"md"}
                        bg={"#white"}
                        onClick={toggleConfirmNewPassword}
                        color={"#F37121"}
                      >
                        {showConfirmNewPassword ? <BiShow /> : <BiHide />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.values.confirmNewPassword !==
                    formik.values.newPassword && passwordMatch ? (
                    <FormHelperText
                      color={"red"}
                      fontSize={"12px"}
                      textAlign={"left"}
                    >
                      Your new password does not match
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>
            </Box>
            <Box
              mt={"25px"}
              mb={"20px"}
              borderRadius={"10px"}
              bgColor={"#FFE0C4"}
            >
              <Text
                textAlign={"justify"}
                color={"black"}
                fontSize={"12px"}
                p={"10px 16px 12px 12px"}
                fontFamily={
                  "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                }
              >
                Once the password has been changed, please log in again with the
                new password on all your devices.
              </Text>
            </Box>
            <Button
              display={"flex"}
              w="100%"
              bgColor={"#0095DA"}
              _hover={false}
              mt="16px"
              color={"white"}
              isDisabled={
                formik.values.newPassword && formik.values.confirmNewPassword
                  ? false
                  : true
              }
              type={"submit"}
              // onClick={passwordNotMatch}
              borderRadius={"8px"}
            >
              <Text
                fontWeight={"bold"}
                fontFamily={
                  "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                }
              >
                Confirm Change
              </Text>
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordConfirmation;
