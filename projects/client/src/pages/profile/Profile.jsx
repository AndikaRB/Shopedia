import {
    Box,
    Button,
    Text,
    HStack,
    Avatar,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@chakra-ui/react"

import { BiArrowBack, BiStore, BiUser } from "react-icons/bi"

import UserInfo from "../../components/profile/UserInfo"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { BsPencil } from "react-icons/bs"
import { RiLockPasswordLine } from "react-icons/ri"
import { TbLogout } from "react-icons/tb"
import { logout } from "../../redux/features/authSlice"

const Profile = () => {
    const authSelector = useSelector((state) => state.auth)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const location = useLocation()
    const apiImg = process.env.REACT_APP_IMAGE_URL

    const refreshPage = () => {
        window.location.reload(false)
    }

    const logoutBtnHandler = () => {
        localStorage.removeItem("auth_token")
        dispatch(logout())

        toast({
            title: "User Logout",
            status: "info",
        })

        if (
            location.pathname === "/cart" ||
            location.pathname === "/transaction-list" ||
            location.pathname === "/user/profile" ||
            location.pathname === "/user/profile/change-password" ||
            location.pathname === "/user/profile/address"
        ) {
            navigate("/login")
            refreshPage()
        } else {
            refreshPage()
        }
    }

    return (
        <>
            <Box
                mt="55px"
                fontSize={"16px"}
                display={{ base: "none", md: "none", lg: "block" }}
                color="rgba(0,0,0,.54)"
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
                                <Button
                                    p="16px 24px"
                                    color="#0095DA"
                                    borderBottom={"2px solid #0095DA"}
                                    borderRadius="1px"
                                    variant="link"
                                >
                                    <Text>Personal Data</Text>
                                </Button>
                            </Box>

                            {/* Change Password */}
                            <Box
                                display={"flex"}
                                height="53px"
                                fontWeight={"bold"}
                            >
                                <Link to="/user/profile/change-password">
                                    <Box
                                        p="16px 24px"
                                        _hover={{ color: "#0095DA" }}
                                    >
                                        <Text>Change Password</Text>
                                    </Box>
                                </Link>
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
                        <UserInfo />
                    </Box>
                </Box>
            </Box>

            {/* Responsive */}
            <Box
                display={{ base: "block", md: "block", lg: "none" }}
                maxW="500px"
                mx="auto"
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
                >
                    <Box
                        display={"flex"}
                        borderBottom="1px solid var(--N75,#E5E7E9)"
                        h={"52px"}
                        backgroundColor={"#E5F9F6"}
                    >
                        <Box fontSize={"20px"} alignItems="center" my="auto">
                            <Link to={"/"}>
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
                            My Account
                        </Box>
                    </Box>
                </Box>

                <Box p="16px" display={"flex"} mt="52px ">
                    <Avatar
                        w={"64px"}
                        h="64px"
                        name={authSelector.username}
                        src={`${apiImg}/${authSelector.profile_picture}`}
                    />
                    <Box ml="16px" w="175px">
                        <Text fontWeight={"bold"}>{authSelector.username}</Text>
                        <Text>{authSelector.phone_number}</Text>
                        <Text>{authSelector.email}</Text>
                    </Box>
                    <Box
                        display={"flex"}
                        ml="auto"
                        alignItems={"center"}
                        variant="link"
                        cursor="pointer"
                    >
                        <BsPencil onClick={onOpen} fontSize={"20px"} />
                    </Box>
                </Box>

                <Box pt="17px">
                    <Box>
                        <Text fontWeight={"bold"} pl={"16px"} pr="16px">
                            Account Settings
                        </Text>
                        <Link to="/user/profile/address">
                            <Box p="16px 16px 16px 0" ml="16px">
                                <Box display={"flex"}>
                                    <Box display={"flex"} alignItems="center">
                                        <BiStore fontSize={"24px"} />
                                    </Box>

                                    <Box ml="2">
                                        <Text fontWeight={"bold"}>
                                            Address List
                                        </Text>
                                        <Text fontSize={"12px"} mt="4px">
                                            Set the delivery address for
                                            groceries
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                        <Link to="/user/profile/change-password">
                            <Box p="16px 16px 16px 0" ml="16px">
                                <Box display={"flex"}>
                                    <Box display={"flex"} alignItems="center">
                                        <RiLockPasswordLine fontSize={"24px"} />
                                    </Box>

                                    <Box ml="2">
                                        <Text fontWeight={"bold"}>
                                            Password
                                        </Text>
                                        <Text fontSize={"12px"} mt="4px">
                                            Change your password
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                        <Link onClick={logoutBtnHandler}>
                            <Box borderTop="8px solid var(--N50,#F3F4F5)">
                                <Box p="16px 16px 16px 0" ml="16px">
                                    <Box display={"flex"}>
                                        <Box>
                                            <TbLogout fontSize={"24px"} />
                                        </Box>
                                        <Box ml="2" fontWeight={"bold"}>
                                            Logout
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                    </Box>
                </Box>
            </Box>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
                <ModalOverlay />
                <ModalContent h="500px">
                    <ModalHeader fontSize="12px">Edit User Info</ModalHeader>
                    <ModalCloseButton size="sm" mt="5px" />
                    <ModalBody>
                        <UserInfo />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Profile
