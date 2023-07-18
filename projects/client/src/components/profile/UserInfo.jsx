import {
    Box,
    Button,
    Center,
    CircularProgress,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { axiosInstance } from "../../api"
import { useState } from "react"
import { useEffect } from "react"
import ImageCard from "./ImageCard"

const UserInfo = ({ onClick }) => {
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const authSelector = useSelector((state) => state.auth)
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
    console.log("res", userData)

    const formik = useFormik({
        initialValues: {
            username: userData.username,
            phone_number: userData.phone_number,
        },
        onSubmit: async ({ username, phone_number }) => {
            try {
                const response = await axiosInstance.patch(
                    `/user-profile/info/${authSelector.id}`,
                    { username, phone_number }
                )

                toast({
                    title: "Updated Success",
                    description: response.data.message,
                    status: "success",
                })
                window.location.reload()
            } catch (err) {
                toast({
                    title: "Updated Failed",
                    description: err.response.data.message,
                    status: "error",
                })
            }
            onClick()
        },
        validationSchema: Yup.object({
            username: Yup.string().min(3),
            phone_number: Yup.string()
                .min(9)
                .matches(
                    /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/,
                    "Phone number must be valid"
                ),
        }),
        validateOnChange: false,
    })
    const formChangeHandler = ({ target }) => {
        const { name, value } = target
        formik.setFieldValue(name, value)
    }

    const btnSubmit = async (e) => {
        try {
            let pic = new FormData()
            pic.append("profile_picture", e)

            await axiosInstance.patch(
                `/user-profile/pic/${authSelector.id}`,
                pic
            )

            // toast({
            //     title: "Updated Success",
            //     description: response.data.message,
            //     status: "success",
            // })
        } catch (err) {
            toast({
                title: "Updated Failed",
                description: err.response.data.message,
                status: "error",
            })
            console.log(err)
        }
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
                        <ImageCard userData={userData} btnSubmit={btnSubmit} />

                        {/* Change Personal Info */}
                        <Box p="16px">
                            <Center>
                                <Text
                                    p="14px 0 55px"
                                    fontWeight={"bold"}
                                    fontSize="xl"
                                >
                                    Change Your Info
                                </Text>
                            </Center>

                            {/* Form */}
                            <Box fontSize="13px" alignItems="flex-start">
                                <Stack spacing="10">
                                    {/* Name */}
                                    <FormControl
                                        isInvalid={formik.errors.username}
                                    >
                                        <HStack>
                                            <FormLabel
                                                w="300px"
                                                mr="16px"
                                                align="left"
                                            >
                                                Name
                                            </FormLabel>
                                            <InputGroup
                                                w="100%"
                                                display="block"
                                            >
                                                <Box display="flex" w="70%">
                                                    <Input
                                                        onChange={
                                                            formChangeHandler
                                                        }
                                                        name="username"
                                                        defaultValue={
                                                            userData.username
                                                        }
                                                    />
                                                </Box>

                                                <FormErrorMessage>
                                                    {formik.errors.username}
                                                </FormErrorMessage>
                                            </InputGroup>
                                        </HStack>
                                    </FormControl>

                                    {/* Phone Number */}
                                    <FormControl
                                        isInvalid={formik.errors.phone_number}
                                    >
                                        <HStack>
                                            <FormLabel
                                                w="300px"
                                                mr="16px"
                                                align="left"
                                            >
                                                Phone Number
                                            </FormLabel>
                                            <InputGroup
                                                w="100%"
                                                display="block"
                                            >
                                                <Box display="flex" w="70%">
                                                    <InputLeftAddon children="+62" />
                                                    <Input
                                                        onChange={
                                                            formChangeHandler
                                                        }
                                                        name="phone_number"
                                                        defaultValue={
                                                            userData.phone_number
                                                        }
                                                        w="100%"
                                                        type="number"
                                                        maxLength={15}
                                                        minLength={9}
                                                    />
                                                </Box>
                                                <FormErrorMessage>
                                                    {formik.errors.phone_number}
                                                </FormErrorMessage>
                                            </InputGroup>
                                        </HStack>
                                    </FormControl>

                                    {/* Email */}
                                    <FormControl>
                                        <HStack>
                                            <FormLabel
                                                w="300px"
                                                mr="16px"
                                                align="left"
                                            >
                                                Email
                                            </FormLabel>
                                            <InputGroup
                                                w="100%"
                                                display="block"
                                            >
                                                <Box display="flex" w="70%">
                                                    <Input
                                                        onChange={
                                                            formChangeHandler
                                                        }
                                                        name="email"
                                                        defaultValue={
                                                            authSelector.email
                                                        }
                                                        isDisabled
                                                    />
                                                </Box>
                                            </InputGroup>
                                        </HStack>
                                    </FormControl>

                                    {/* Button Submit */}
                                    <Center>
                                        <Button
                                            bg="#F7931E"
                                            color="rgba(0,0,0,.54)"
                                            onClick={formik.handleSubmit}
                                            _hover={{ bgColor: "#F7942f" }}
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
            <Box display={{ base: "block", md: "block", lg: "none" }}>
                <Box>
                    <Center>
                        <Box>
                            <ImageCard
                                userData={userData}
                                btnSubmit={btnSubmit}
                            />
                        </Box>
                    </Center>

                    {/* Change Personal Info */}
                    <Box borderTop="1px solid #dfe1e3">
                        <Center>
                            <Text
                                pt="10px"
                                pb="20px"
                                fontWeight={"bold"}
                                fontSize="14px"
                            >
                                Change Your Info
                            </Text>
                        </Center>

                        {/* Form */}
                        <Box alignItems="flex-start">
                            <Stack spacing="5">
                                {/* Name */}
                                <FormControl isInvalid={formik.errors.username}>
                                    <HStack>
                                        <FormLabel w="100px" align="left">
                                            <Text fontSize="12px">Name</Text>
                                        </FormLabel>
                                        <InputGroup w="100%" display="block">
                                            <Box display="flex" w="100%">
                                                <Input
                                                    onChange={formChangeHandler}
                                                    name="username"
                                                    defaultValue={
                                                        userData.username
                                                    }
                                                    size="sm"
                                                    borderRadius="6px"
                                                />
                                            </Box>

                                            <FormErrorMessage>
                                                <Text fontSize="10px">
                                                    {formik.errors.username}
                                                </Text>
                                            </FormErrorMessage>
                                        </InputGroup>
                                    </HStack>
                                </FormControl>

                                {/* Phone Number */}
                                <FormControl
                                    isInvalid={formik.errors.phone_number}
                                >
                                    <HStack>
                                        <FormLabel w="100px" align="left">
                                            <Text fontSize="12px">
                                                Phone Number
                                            </Text>
                                        </FormLabel>
                                        <InputGroup w="100%" display="block">
                                            <Box display="flex" w="100%">
                                                <InputLeftAddon
                                                    children="+62"
                                                    fontSize="10px"
                                                    boxSize="32.4px"
                                                    justifyContent="center"
                                                />
                                                <Input
                                                    onChange={formChangeHandler}
                                                    name="phone_number"
                                                    defaultValue={
                                                        userData.phone_number
                                                    }
                                                    w="100%"
                                                    type="number"
                                                    maxLength={15}
                                                    minLength={9}
                                                    size="sm"
                                                    borderRightRadius="6px"
                                                />
                                            </Box>
                                            <FormErrorMessage>
                                                <Text fontSize="10px">
                                                    {formik.errors.phone_number}
                                                </Text>
                                            </FormErrorMessage>
                                        </InputGroup>
                                    </HStack>
                                </FormControl>

                                {/* Email */}
                                <FormControl>
                                    <HStack>
                                        <FormLabel w="100px" align="left">
                                            <Text fontSize="12px">Email</Text>
                                        </FormLabel>
                                        <InputGroup w="100%" display="block">
                                            <Box display="flex" w="100%">
                                                <Input
                                                    onChange={formChangeHandler}
                                                    name="email"
                                                    defaultValue={
                                                        authSelector.email
                                                    }
                                                    isDisabled
                                                    size="sm"
                                                    borderRadius="6px"
                                                />
                                            </Box>
                                        </InputGroup>
                                    </HStack>
                                </FormControl>

                                {/* Button Submit */}
                                <Center>
                                    <Button
                                        bg="#F7931E"
                                        color="rgba(0,0,0,.54)"
                                        onClick={formik.handleSubmit}
                                        size="sm"
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

export default UserInfo
