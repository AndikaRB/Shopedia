import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    Center,
    Input,
    Text,
} from "@chakra-ui/react"

import { useRef, useState } from "react"
import { BsPencil } from "react-icons/bs"
import { useSelector } from "react-redux"

const ImageCard = ({ userData, btnSubmit }) => {
    const [selectImage, setSelectImage] = useState(null)
    const inputFileRef = useRef()
    const authSelector = useSelector((state) => state.auth)
    const apiImg = process.env.REACT_APP_IMAGE_URL

    return (
        <>
            <Box p="16px 0" display={{ base: "none", md: "none", lg: "flex" }}>
                <Box p="16px" width={"290px"}>
                    <Box
                        p="16px"
                        mb="24px"
                        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                        borderRadius="8px"
                    >
                        <Avatar
                            src={
                                selectImage
                                    ? selectImage
                                    : `${apiImg}/${authSelector.profile_picture}`
                            }
                            name={userData.username}
                            w={"225px"}
                            h="225px"
                            mb="16px"
                            borderRadius={"3px"}
                        />
                        <Button
                            w="100%"
                            _hover={false}
                            fontWeight="bold"
                            bgColor={"white"}
                            border="1px solid #dfe1e3"
                            borderRadius={"5px"}
                            onClick={() => inputFileRef.current.click()}
                        >
                            Select Photo
                        </Button>
                        <Input
                            w="100%"
                            _hover={false}
                            fontWeight="bold"
                            bgColor={"white"}
                            border="1px solid #dfe1e3"
                            borderRadius={"5px"}
                            onChange={(e) => {
                                setSelectImage(
                                    URL.createObjectURL(e.target.files[0])
                                )
                                btnSubmit(e.target.files[0])
                            }}
                            accept="image/*"
                            name="profile_picture"
                            type="file"
                            color="transparent"
                            ref={inputFileRef}
                            display="none"
                        />

                        <Text m="12px 0" fontSize={"12px"}>
                            File size: maximum 2,000,000 bytes (2 Megabytes).
                            Allowed file extensions: .JPG .JPEG .PNG
                        </Text>
                    </Box>
                </Box>
            </Box>

            {/* Responsive */}
            <Box
                display={{ base: "block", md: "block", lg: "none" }}
                maxW="500px"
            >
                <Box>
                    <Center>
                        <Box
                            p="16px"
                            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                            borderRadius="full"
                            w="fit-content"
                            h="fit-content"
                            position="relative"
                        >
                            <Avatar
                                src={
                                    selectImage
                                        ? selectImage
                                        : `${apiImg}/${authSelector.profile_picture}`
                                }
                                name={userData.username}
                                w="75px"
                                h="75px"
                            >
                                <AvatarBadge boxSize="1.5em" bg="#F7931E">
                                    <BsPencil
                                        fontSize="15px"
                                        _hover={false}
                                        fontWeight="bold"
                                        borderRadius={"5px"}
                                        onClick={() =>
                                            inputFileRef.current.click()
                                        }
                                        variant="unstyled"
                                        position="absolute"
                                        color="white"
                                        cursor="pointer"
                                        right={"20"}
                                    />
                                </AvatarBadge>
                            </Avatar>
                        </Box>
                    </Center>
                    <Box>
                        <Input
                            w="100%"
                            _hover={false}
                            fontWeight="bold"
                            bgColor={"white"}
                            border="1px solid #dfe1e3"
                            borderRadius={"5px"}
                            onChange={(e) => {
                                setSelectImage(
                                    URL.createObjectURL(e.target.files[0])
                                )
                                btnSubmit(e.target.files[0])
                            }}
                            accept="image/*"
                            name="profile_picture"
                            type="file"
                            color="transparent"
                            ref={inputFileRef}
                            display="none"
                        />
                    </Box>
                    <Box w="250px" pb="10px">
                        <Text mt="8px" fontSize="10px" textAlign="justify">
                            File size: maximum 2,000,000 bytes (2 Megabytes).
                            Allowed file extensions: .JPG .JPEG .PNG
                        </Text>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ImageCard
