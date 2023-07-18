import { Box, Button, Text, HStack } from "@chakra-ui/react"
import { BiArrowBack, BiUser } from "react-icons/bi"
import { Link } from "react-router-dom"
import Password from "../../components/profile/Password"
import { useSelector } from "react-redux"

const ChangePassword = () => {
    const authSelector = useSelector((state) => state.auth)
    return (
        <>
            <Box
                mt="55px"
                fontSize={"16px"}
                color="rgba(0,0,0,.54)"
                display={{ base: "none", md: "none", lg: "block" }}
            >
                <Box w="1208px" marginX={"auto"}>
                    <Box display={"flex"} mt="80px" mb="16px">
                        <Box mr="8px" my={"auto"}>
                            <BiUser fontSize={"20px"} />
                        </Box>
                        <Text fontSize={"16px"} fontWeight="bold" my={"auto"}>
                            {authSelector.username}
                        </Text>
                    </Box>

                    <Box border={"1px solid #dfe1e3"} borderRadius="10px">
                        <HStack>
                            {/* Personal Info */}
                            <Box
                                display={"flex"}
                                height="53px"
                                fontWeight={"bold"}
                            >
                                <Link to="/user/profile">
                                    <Box
                                        p="16px 24px"
                                        _hover={{ color: "#0095DA" }}
                                    >
                                        <Text>Personal Info</Text>
                                    </Box>
                                </Link>
                            </Box>

                            {/* Change Password */}
                            <Box
                                display={"flex"}
                                height="53px"
                                fontWeight={"bold"}
                            >
                                <Button
                                    p="16px 24px"
                                    color="#0095DA"
                                    borderBottom={"2px solid #0095DA"}
                                    borderRadius="1px"
                                    variant="link"
                                >
                                    <Text>Change Password</Text>
                                </Button>
                            </Box>

                            {/* Address List */}
                            <Box
                                display={"flex"}
                                height="53px"
                                fontWeight={"bold"}
                            >
                                <Link to="/user/profile/address">
                                    <Box
                                        p="16px 24px"
                                        _hover={{ color: "#0095DA" }}
                                    >
                                        <Text>Address List</Text>
                                    </Box>
                                </Link>
                            </Box>
                        </HStack>
                        <Password />
                    </Box>
                </Box>
            </Box>

            {/* Responsive */}
            <Box
                fontSize={"16px"}
                display={{ base: "block", md: "block", lg: "none" }}
                maxW="500px"
                mx={"auto"}
            >
                <Box
                    position={"fixed"}
                    left="0"
                    right={"0"}
                    top="0"
                    maxW={"500px"}
                    mx="auto"
                    backgroundColor={"white"}
                    zIndex="9998"
                    boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                >
                    <Box
                        h="52px"
                        display={"flex"}
                        borderBottom="1px solid var(--N75,#E5E7E9)"
                        backgroundColor={"#E5F9F6"}
                    >
                        <Box fontSize={"20px"} alignItems="center" my="auto">
                            <Link to={"/user/profile"}>
                                <Box
                                    display={"flex"}
                                    alignItems="center"
                                    w="40px"
                                >
                                    <Box mx="auto">
                                        <BiArrowBack fontSize={"24px"} />
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                        <Box
                            fontSize={"16px"}
                            fontWeight="bold"
                            ml="2"
                            display={"flex"}
                            alignItems="center"
                        >
                            Password
                        </Box>
                    </Box>
                    <Box
                        pt="8px"
                        pb="8px"
                        display={{ base: "block", md: "block", lg: "none" }}
                    >
                        <Password />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ChangePassword
