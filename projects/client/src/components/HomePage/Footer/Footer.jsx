import { Box, Grid, GridItem, HStack, Image, Stack, Text } from "@chakra-ui/react"
import footer from "../../../assets/footer.png"
import { BsFacebook, BsInstagram, BsPinterest, BsTwitter } from "react-icons/bs"
import AppStoreBadge from './AppStoreBadge'
import PlayStoreBadge from './PlayStoreBadge'
import shopediaImg from "../../../assets/shopedia-image.svg"
import logo from "../../../assets/logo.png"
import googlePlay from "../../../assets/googlePlay.png"
import appStore from "../../../assets/appStore.png"
import phoneStore from "../../../assets/phoneStore.jpg"
import { useLocation } from "react-router-dom"

const Footer = () => {
    const location = useLocation()
    return (
        <>
            <Box display={{ lg: 'inline', base: 'none' }}>
                <Box
                    left="0"
                    bottom="0"
                    right="0"
                    display="flex"
                    borderTop={"1px solid #dddfe2"}
                    mt="100px"
                    bgColor={'#fff'}
                    height="455px"
                >
                    <Box w="1208px" marginX={"auto"}>

                        <Grid
                            templateColumns={" 2.2fr 1fr"}
                            width={"100%"}
                            maxW="100%"
                            fontFamily={'Open Sauce One, sans-serif'}
                            display={"grid"}
                        >
                            {/* Left */}
                            <GridItem>
                                <Grid templateColumns={" 1fr 1fr 1fr "} >
                                    <GridItem mt="20px">
                                        {/* Top Left / Warehouse*/}
                                        <Box fontSize={"14px"}
                                            color="#6c727c"
                                        >
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={"18px"}
                                                color={"#F7931E"}
                                                p="0 4"
                                            >
                                                Warehouse
                                            </Text>
                                            <Box cursor={'pointer'} color={"313153BAD"}>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0" >
                                                    About Warehouse
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Intellectual property rights
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Career
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Blog
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Bridestory
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Warehouse Parents
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Patner Blog
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Warehouse Affiliate Program
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Warehouse B2B Digital
                                                </Text>
                                            </Box>
                                        </Box>

                                        {/* Bottom Left / Buy  */}
                                        <Box
                                            fontSize={"14px"}
                                            color="#6c727c"
                                            mt="20px"
                                        >
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={"18px"}
                                                color={"#F7931E"}
                                                p="0 4"
                                            >
                                                Buy
                                            </Text>
                                            <Box cursor={'pointer'} color={"313153BAD"}>
                                                < Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Bill & Top Up
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Trade-ins handphone
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Warehouse manual transfer
                                                </Text>
                                            </Box>
                                        </Box>
                                    </GridItem>

                                    <GridItem mt="20px">
                                        {/* Mid Top  / sell */}
                                        <Box fontSize={"14px"} color="#6c727c">
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={"18px"}
                                                color={"#F7931E"}
                                                p="0 4"
                                            >
                                                Sell
                                            </Text>
                                            <Box cursor={'pointer'} color={"313153BAD"}>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Seller Education Center
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Warress Patner
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Official Store List
                                                </Text>
                                            </Box>
                                        </Box>

                                        {/* Mid / Help and Guide */}
                                        <Box
                                            fontSize={"14px"}
                                            color="#6c727c"
                                            mt="20px"
                                        >
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={"18px"}
                                                color={"#F7931E"}
                                                p="0 4"
                                            >
                                                Help and Guide
                                            </Text>
                                            <Box cursor={'pointer'} color={"313153BAD"}>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Warehouse Care
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Term and Condition
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Privacy Policy
                                                </Text>
                                                <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                    Patner
                                                </Text>
                                            </Box>
                                        </Box>

                                        {/* Button Mid / Security and Privacy */}
                                        <Box
                                            fontSize={"14px"}
                                            color="#6c727c"
                                            mt="20px"
                                        >
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={"18px"}
                                                color={"#F7931E"}
                                                p="0 4"
                                            >
                                                Security and Privacy
                                            </Text>
                                            <Image src={footer} mt="5px" ml="-8px"></Image>
                                        </Box>
                                    </GridItem>

                                    <GridItem mt="20px">
                                        {/*  Right Top / Follow Us */}
                                        <Box fontSize={"14px"} color="#6c727c">
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={"18px"}
                                                color={"#F7931E"}
                                                p="0 4"
                                            >
                                                Follow Us
                                            </Text>
                                            <Box display={"flex"} mt="5px" cursor={'pointer'}>
                                                <Box mr="2">
                                                    <BsFacebook fontSize={"20px"} color="#3b5998" />
                                                </Box>
                                                <Box mr="2">
                                                    <BsTwitter fontSize={"20px"} color="#00aced" />
                                                </Box>
                                                <Box mr="2">
                                                    <BsPinterest fontSize={"20px"} color="#cb2027" />
                                                </Box>
                                                <Box mr="2">
                                                    <BsInstagram fontSize={"20px"} color="#d93174" />
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* Right Buttom / Group 3 */}
                                        <Box
                                            fontSize={"14px"}
                                            color="#6c727c"
                                            mt="20px"
                                        >
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={"18px"}
                                                color={"#F7931E"}
                                                p="0 4"
                                            >
                                                Group 3
                                            </Text>
                                            <Box color={"313153BAD"}>
                                                <a
                                                    href="https://github.com/AndikaRB"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                        Andika Ridho
                                                    </Text>
                                                </a>
                                                <a
                                                    href="https://github.com/BagusDP2011"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                        Bagus Dwi Putra
                                                    </Text>
                                                </a>
                                                <a
                                                    href="https://github.com/mfikrif11"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                        Fikri Fernanda
                                                    </Text>
                                                </a>
                                                <a
                                                    href="https://github.com/joel374"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Text _hover={{ color: "#0095DA" }} p="3px 0">
                                                        Joel Legifani
                                                    </Text>
                                                </a>
                                            </Box>
                                        </Box>
                                    </GridItem>
                                </Grid >
                            </GridItem >

                            {/* Shopedia Install App */}
                            < Stack align={'flex-start'} p={'30px'} mt={'-14px'} >
                                <Image src={shopediaImg} width={'290px'} />
                                <HStack>
                                    <Text
                                        textAlign={'center'}
                                        fontSize={"25px"}
                                        fontWeight="bold"
                                        color={"#0095DA"}
                                        display="inline"
                                        ml={'10px'}
                                    >
                                        Shop
                                        <Text
                                            pl={'0'}
                                            fontSize={"25px"}
                                            fontWeight="bold"
                                            color={"#F7931E"}
                                            display="inline"
                                        >
                                            edia
                                        </Text>
                                        <Image src={logo} width={'35px'} display={'inline'} mb={'-8px'} />
                                    </Text>
                                    <Text fontSize={'20px'} fontWeight={'bold'} pt={'5px'} pl={0} mr={'5px'}>Install App</Text>
                                </HStack>
                                <HStack cursor={'pointer'} justifyContent={'center'}>
                                    <Box ml={'3px'} pr={'-5px'}>
                                        <AppStoreBadge />
                                    </Box>
                                    <Box pl={'0'}>
                                        <PlayStoreBadge />
                                    </Box>
                                </HStack>
                            </Stack >
                        </Grid >
                    </Box >
                </Box >
            </Box>

            {/* mobile responsive */}
            {location.pathname !== '/' && location.pathname !== "/product" ? null : (
                <Box display={{ lg: 'none', base: 'inline' }} maxW={'500px'}>
                    <Box
                        maxH={'300px'}
                        maxW={'500px'}
                        p={'16px'}
                        borderTop={'1px solid #e5e7e9'}
                        left="0"
                        bottom="0"
                        right="0"
                        w={'500px'}
                    >
                        <Box display={'flex'} justifyContent={'flex-start'} maxW={'500px'} gap={'6px'} cursor={'pointer'}>
                            <Text
                                fontSize={'12px'}
                                color={'#31353BAD'}
                                mb={'4px'}
                                lineHeight={'16px'}
                                fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                                borderRight={'1px solid #31353BF5'}
                                pr={'6px'}
                            >
                                Shopedia Care
                            </Text>
                            <Text
                                fontSize={'12px'}
                                color={'#31353BAD'}
                                mb={'4px'}
                                lineHeight={'16px'}
                                fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                                borderRight={'1px solid #31353BF5'}
                                pr={'6px'}
                            >
                                Term & Conditions
                            </Text>
                            <Text
                                fontSize={'12px'}
                                color={'#31353BAD'}
                                mb={'4px'}
                                lineHeight={'16px'}
                                fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                            >
                                Privacy Policy
                            </Text>
                        </Box>
                        <Box h={'64.09px'} m={'12px 0px 16px'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} maxW={'500px'}>
                            <Box display={'flex'} flexDir={'column'}>
                                <Text
                                    color={'#31353BF5'}
                                    fontSize={'12px'}
                                    fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                                    fontWeight={'bold'}
                                    lineHeight={'16px'}
                                >
                                    Enjoy Shopedia App
                                </Text>
                                <Box display={'flex'} flexDir={'row'} justifyContent={'flex-start'} gap={'5px'} mt={'8px'} >
                                    <Image src={googlePlay} minW={'121.56px'} minH={'37'} w={'121.56px'} maxW={'121.56pxpx'} maxH={'37'} cursor={'pointer'} />
                                    <Image src={appStore} minW={'121.56px'} minH={'38px'} maxW={'121.56px'} maxH={'38px'} cursor={'pointer'} />
                                </Box>
                            </Box>
                            <Box display={'flex'} >
                                <Image
                                    // h={'75px'}
                                    // w={'180px'}
                                    src={phoneStore}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Footer