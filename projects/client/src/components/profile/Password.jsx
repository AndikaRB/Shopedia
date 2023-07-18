import {
    Avatar,
    Box,
    Button,
    Center,
    CircularProgress,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { BiHide, BiShow } from "react-icons/bi"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { axiosInstance } from "../../api"

const Password = () => {
    const [userData, setUserData] = useState([])
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false)

    const toggleNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }
    const toggleNewPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation)
    }

    const toast = useToast()
    const authSelector = useSelector((state) => state.auth)
    const apiImg = process.env.REACT_APP_IMAGE_URL
    const [isLoading, setIsLoading] = useState(false)

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get(
                `user-profile/get/${authSelector.id}`
            )
            setUserData(response.data.data)
            setIsLoading(true)
        } catch (err) {
            console.log(err)
        }
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ password, confirmPassword }, { resetForm }) => {
            try {
                const response = await axiosInstance.patch(
                    `/user-profile/password/${authSelector.id}`,
                    { password, confirmPassword }
                )

                toast({
                    title: "Updated Success",
                    description: response.data.message,
                    status: "success",
                })
                resetForm()
            } catch (err) {
                toast({
                    title: "Updated Failed",
                    description: err.response.data.message,
                    status: "error",
                })
            }
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8)
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character"
                ),
            confirmPassword: Yup.string()
                .required("Password not match")
                .oneOf([Yup.ref("password")], "password not match"),
        }),
        validateOnChange: false,
    })

    const formChangeHandler = ({ target }) => {
        const { name, value } = target
        formik.setFieldValue(name, value)
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <>
            <Box
                p="16px 0"
                display={{ base: "none", md: "none", lg: "flex" }}
                border="1px solid #dfe1e3"
            >
                {isLoading === false ? (
                    <Box
                        w={"850px"}
                        h={"400px"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                    >
                        <CircularProgress
                            isIndeterminate
                            color="#F7931E"
                            thickness="160px"
                            size="100px"
                        />
                    </Box>
                ) : (
                    <Flex>
                        {/* Profile Photo */}
                        <Box p="16px" w="290px">
                            <Box
                                p="16px"
                                mb="24px"
                                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                                borderRadius="8px"
                            >
                                <Avatar
                                    src={`${apiImg}/${authSelector.profile_picture}`}
                                    name={userData.username}
                                    w="225px"
                                    h="225px"
                                    borderRadius="3px"
                                />
                            </Box>
                        </Box>

                        {/* Change Password */}
                        <Box
                            p="16px"
                            display={{ base: "none", md: "none", lg: "grid" }}
                        >
                            <Center>
                                <Text
                                    p="14px 0 55px"
                                    fontWeight={"bold"}
                                    fontSize="xl"
                                >
                                    Change Your Password
                                </Text>
                            </Center>

                            {/* Form */}
                            <Box fontSize="13px" alignItems="flex-start">
                                <Stack spacing="10">
                                    {/* Password */}
                                    <FormControl
                                        isInvalid={formik.errors.password}
                                    >
                                        <HStack>
                                            <FormLabel
                                                w="300px"
                                                mr="16px"
                                                align="left"
                                                fontSize="xl"
                                            >
                                                New Password
                                            </FormLabel>
                                            <InputGroup
                                                w="100%"
                                                display="block"
                                            >
                                                <Box display="flex" w="70%">
                                                    <InputGroup>
                                                        <Input
                                                            onChange={
                                                                formChangeHandler
                                                            }
                                                            name="password"
                                                            value={
                                                                formik.values
                                                                    .password
                                                            }
                                                            type={
                                                                showNewPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                        />
                                                        <InputRightElement width="3rem">
                                                            <Button
                                                                onClick={
                                                                    toggleNewPassword
                                                                }
                                                                variant="ghost"
                                                            >
                                                                {showNewPassword ? (
                                                                    <BiShow />
                                                                ) : (
                                                                    <BiHide />
                                                                )}
                                                            </Button>
                                                        </InputRightElement>
                                                    </InputGroup>
                                                </Box>
                                                <FormErrorMessage
                                                    fontSize={"11px"}
                                                >
                                                    {formik.errors.password}
                                                </FormErrorMessage>
                                            </InputGroup>
                                        </HStack>
                                    </FormControl>

                                    {/* Change Password */}
                                    <FormControl
                                        isInvalid={
                                            formik.errors.confirmPassword
                                        }
                                    >
                                        <HStack>
                                            <FormLabel
                                                w="300px"
                                                mr="16px"
                                                align="left"
                                                fontSize="xl"
                                            >
                                                Confirm Password
                                            </FormLabel>
                                            <InputGroup
                                                w="100%"
                                                display="block"
                                            >
                                                <Box w="70%" display="flex">
                                                    <InputGroup>
                                                        <Input
                                                            onChange={
                                                                formChangeHandler
                                                            }
                                                            name="confirmPassword"
                                                            value={
                                                                formik.values
                                                                    .confirmPassword
                                                            }
                                                            type={
                                                                showPasswordConfirmation
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                        />
                                                        <InputRightElement width="3rem">
                                                            <Button
                                                                onClick={
                                                                    toggleNewPasswordConfirmation
                                                                }
                                                                variant="ghost"
                                                            >
                                                                {showPasswordConfirmation ? (
                                                                    <BiShow />
                                                                ) : (
                                                                    <BiHide />
                                                                )}
                                                            </Button>
                                                        </InputRightElement>
                                                    </InputGroup>
                                                </Box>

                                                <FormErrorMessage
                                                    fontSize={"11px"}
                                                >
                                                    {
                                                        formik.errors
                                                            .confirmPassword
                                                    }
                                                </FormErrorMessage>
                                            </InputGroup>
                                        </HStack>
                                    </FormControl>

                                    {/* Button Submit */}
                                    <Center>
                                        <Button
                                            bg="#F7931E"
                                            color="rgba(0,0,0,.54)"
                                            onClick={formik.handleSubmit}
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Center>
                                </Stack>
                            </Box>
                        </Box>
                    </Flex>
                )}
            </Box>

            {/* Responsive */}
            <Box
                display={{ base: "block", md: "block", lg: "none" }}
                maxW="500px"
            >
                <Box>
                    <Center>
                        <Box p="16px">
                            <Box
                                p="16px"
                                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                                borderRadius="full"
                                w="fit-content"
                                h="fit-content"
                            >
                                <Center>
                                    <Avatar
                                        src={`${apiImg}/${authSelector.profile_picture}`}
                                        name={userData.username}
                                        w="120px"
                                        h="120px"
                                        borderRadius="full"
                                    />
                                </Center>
                            </Box>
                        </Box>
                    </Center>

                    {/* Change Password */}
                    <Box
                        p="16px"
                        display={{ base: "block", md: "block", lg: "none" }}
                    >
                        <Center>
                            <Text
                                p="14px 0 55px"
                                fontWeight={"bold"}
                                fontSize="18px"
                            >
                                Change Your Password
                            </Text>
                        </Center>

                        {/* Form */}
                        <Box fontSize="13px" alignItems="flex-start">
                            <Stack spacing="10">
                                {/* Password */}
                                <FormControl isInvalid={formik.errors.password}>
                                    <HStack>
                                        <FormLabel
                                            w="300px"
                                            mr="16px"
                                            align="left"
                                            fontSize="14px"
                                        >
                                            New Password
                                        </FormLabel>
                                        <InputGroup w="100%" display="block">
                                            <Box display="flex" w="100%">
                                                <InputGroup>
                                                    <Input
                                                        onChange={
                                                            formChangeHandler
                                                        }
                                                        name="password"
                                                        value={
                                                            formik.values
                                                                .password
                                                        }
                                                        type={
                                                            showNewPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                    />
                                                    <InputRightElement width="3rem">
                                                        <Button
                                                            onClick={
                                                                toggleNewPassword
                                                            }
                                                            variant="ghost"
                                                        >
                                                            {showNewPassword ? (
                                                                <BiShow />
                                                            ) : (
                                                                <BiHide />
                                                            )}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                            </Box>
                                            <FormErrorMessage fontSize={"11px"}>
                                                {formik.errors.password}
                                            </FormErrorMessage>
                                        </InputGroup>
                                    </HStack>
                                </FormControl>

                                {/* Change Password */}
                                <FormControl
                                    isInvalid={formik.errors.confirmPassword}
                                >
                                    <HStack>
                                        <FormLabel
                                            w="300px"
                                            mr="16px"
                                            align="left"
                                            fontSize="14px"
                                        >
                                            Confirm Password
                                        </FormLabel>
                                        <InputGroup w="100%" display="block">
                                            <Box w="100%" display="flex">
                                                <InputGroup>
                                                    <Input
                                                        onChange={
                                                            formChangeHandler
                                                        }
                                                        name="confirmPassword"
                                                        value={
                                                            formik.values
                                                                .confirmPassword
                                                        }
                                                        type={
                                                            showPasswordConfirmation
                                                                ? "text"
                                                                : "password"
                                                        }
                                                    />
                                                    <InputRightElement width="3rem">
                                                        <Button
                                                            onClick={
                                                                toggleNewPasswordConfirmation
                                                            }
                                                            variant="ghost"
                                                        >
                                                            {showPasswordConfirmation ? (
                                                                <BiShow />
                                                            ) : (
                                                                <BiHide />
                                                            )}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                            </Box>

                                            <FormErrorMessage fontSize={"11px"}>
                                                {formik.errors.confirmPassword}
                                            </FormErrorMessage>
                                        </InputGroup>
                                    </HStack>
                                </FormControl>

                                {/* Button Submit */}
                                <Center>
                                    <Button
                                        bg="#F7931E"
                                        color="rgba(0,0,0,.54)"
                                        onClick={formik.handleSubmit}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Center>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Password
