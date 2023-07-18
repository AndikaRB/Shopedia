import {
    Box,
    Grid,
    GridItem,
    Image,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import status1 from "../../../assets/transactionStatusLogo/awaiting.png";
import status2 from "../../../assets/transactionStatusLogo/processed2.png";
import status3 from "../../../assets/transactionStatusLogo/Delivered.png";
import status4 from "../../../assets/transactionStatusLogo/Shipping.png";
import { useSelector } from "react-redux";
import { IoIosAlert, IoIosNotifications } from "react-icons/io";

const NotificationTab = ({ authSelector, navigate, unpaidTransaction }) => {
    const transSelector = useSelector((state) => state.trans);
    const statusOrder = transSelector.trans.map((val) => val.OrderStatusId);

    let StatusOrderActive = [];
    let AwaitingConfirmation = [];
    let Processed = [];
    let Shipping = [];
    let Delivered = [];

    for (let i = 0; i < statusOrder.length; i++) {
        if (statusOrder[i] === 1) {
            AwaitingConfirmation.push(statusOrder[i]);
        } else if (statusOrder[i] === 2) {
            Processed.push(statusOrder[i]);
        } else if (statusOrder[i] === 3) {
            Shipping.push(statusOrder[i]);
        } else if (statusOrder[i] === 4) {
            Delivered.push(statusOrder[i]);
        }
    }

    for (let i = 0; i < statusOrder.length; i++) {
        if (
            statusOrder[i] === 1 ||
            statusOrder[i] === 2 ||
            statusOrder[i] === 3 ||
            statusOrder[i] === 4
        ) {
            StatusOrderActive.push(statusOrder[i]);
        }
    }

    const goToAwaitingConfirmation = () => {
        navigate("/transaction-list?status=Awaiting+Confirmation");
    };

    const goToProcessed = () => {
        navigate("/transaction-list?status=Processed");
    };

    const goToDelivered = () => {
        navigate("/transaction-list?status=Delivered");
    };

    const goToShipping = () => {
        navigate("/transaction-list?status=Shipping");
    };
    return (
        <Box>
            {authSelector.id ? (
                <Box
                    display={"flex"}
                    gap="4"
                    fontSize="14px"
                    fontWeight={"semibold"}
                    cursor={"pointer"}
                >
                    <Box
                        display={"flex"}
                        my="auto"
                        gap={2}
                        paddingRight={1}
                        color="#6c727c"
                    >
                        <Popover trigger="hover">
                            <PopoverTrigger>
                                <Box pl={"10px"} mr={"-12px"}>
                                    <Stack
                                        p={2}
                                        _hover={{
                                            bgColor: "#A5D8F8",
                                            borderRadius: "7px",
                                            color: "orange",
                                        }}
                                    >
                                        <Box display={"flex"} flexDir={"row"}>
                                            <IoIosNotifications fontSize={"22px"} />
                                            {(StatusOrderActive.length && authSelector.id) ||
                                                (transSelector.unpaidTrans.length && authSelector.id) ? (
                                                <sup>
                                                    <Box
                                                        fontSize={"11px"}
                                                        backgroundColor={"#EF144A"}
                                                        borderRadius={"50%"}
                                                        m={"-2px -9px 0px -8px"}
                                                        p={"7px 6px 8px 5px"}
                                                        color={"white"}
                                                        fontWeight={700}
                                                    >
                                                        {StatusOrderActive.length +
                                                            transSelector.unpaidTrans.length}
                                                    </Box>
                                                </sup>
                                            ) : null}
                                        </Box>
                                    </Stack>
                                </Box>
                            </PopoverTrigger>
                            <PopoverContent
                                bgColor={"#E5F9F6"}
                                width={"310px"}
                                height={"270px"}
                                borderRadius={"20px"}
                            >
                                <Box boxShadow={"rgba(0, 0, 0, 0.05) 0px 3px 8px"}>
                                    <PopoverHeader
                                        display={"flex"}
                                        justifyContent="space-between"
                                        pt={"10px"}
                                        pb={"10px"}
                                    >
                                        <Text fontSize={"17px"}>Notification</Text>
                                        <Box fontSize={"21px"}>
                                            <IoIosAlert />
                                        </Box>
                                    </PopoverHeader>
                                </Box>
                                <PopoverBody>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        pb={"7px"}
                                        pt={"5px"}
                                    >
                                        <Text
                                            fontSize={"15px"}
                                            fontWeight={600}
                                            ml={"25px"}
                                            fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                                        >
                                            Transaction
                                        </Text>
                                        <Link to={"/transaction-list"}>
                                            <Text
                                                color={"#F7931E"}
                                                fontSize={"12px"}
                                                mt={"10px"}
                                                mb={"-5px"}
                                                fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                                            >
                                                See All
                                            </Text>
                                        </Link>
                                    </Box>
                                    <Box display={"flex"} dir={"row"} justifyContent={""}>
                                        <Box
                                            width={"164px"}
                                            bgColor={"#F7931E"}
                                            h={"3px"}
                                            mb={"7px"}
                                        />
                                        <Box
                                            width={"164px"}
                                            bgColor={"#0095DA"}
                                            h={"3px"}
                                            mb={"7px"}
                                        />
                                    </Box>
                                    <Box pl={"8px"} pr={"8px"} mt={"4px"}>
                                        <Box
                                            _hover={{
                                                bgColor: "#f3f4f5",
                                            }}
                                            display={"flex"}
                                            w={"284px"}
                                            flexDir={"row"}
                                            justifyContent={"space-between"}
                                            border={"1px solid #99d5f0"}
                                            borderRadius={"10px"}
                                            p={"5px 8px 5px 8px"}
                                            alignItems={"center"}
                                            ml={"-8px"}
                                            onClick={() => navigate("/transaction/payment-list")}
                                        >
                                            <Text
                                                color={"#31353BAD"}
                                                fontFamily={
                                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                                }
                                                fontSize={"11px"}
                                                fontWeight={400}
                                            >
                                                Waiting For Payment
                                            </Text>
                                            <Text
                                                fontFamily={
                                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                                }
                                                fontWeight={500}
                                                textAlign={"center"}
                                                borderRadius={"8px"}
                                                color={"#fff"}
                                                bgColor={
                                                    transSelector.unpaidTrans.length === 0
                                                        ? null
                                                        : "#ef144a"
                                                }
                                                p={"0px 1px"}
                                                fontSize={"10px "}
                                                w={"15px"}
                                            >
                                                {transSelector.unpaidTrans.length === 0
                                                    ? null
                                                    : transSelector.unpaidTrans.length}
                                            </Text>
                                        </Box>
                                        <Grid
                                            templateColumns="repeat(4, 1fr)"
                                            gap={"4px"}
                                            mt={"19px"}
                                            display={"flex"}
                                            justifyContent={"space-between"}
                                        >
                                            <GridItem
                                                w="70px"
                                                h="10"
                                                alignItems={"center"}
                                                onClick={goToAwaitingConfirmation}
                                            >
                                                <Box display={"flex"}>
                                                    <Image
                                                        margin={"auto"}
                                                        minW={"35px"}
                                                        minH={"35px"}
                                                        h={"35px"}
                                                        w={"35px"}
                                                        maxH={"35px"}
                                                        maxW={"35px"}
                                                        src={status1}
                                                        ml={"17px"}
                                                    />
                                                    {!AwaitingConfirmation.length ? null : (
                                                        <sup>
                                                            <Box
                                                                fontSize={"11px"}
                                                                backgroundColor={"#EF144A"}
                                                                borderRadius={"50%"}
                                                                m={"3px 11px 0px -8px"}
                                                                p={"6px 5px 8px 5px"}
                                                                color={"white"}
                                                                fontWeight={700}
                                                            >
                                                                {AwaitingConfirmation.length}
                                                            </Box>
                                                        </sup>
                                                    )}
                                                </Box>
                                                <Text
                                                    mt={"8px"}
                                                    textAlign={"center"}
                                                    fontSize={"12px"}
                                                    fontWeight={400}
                                                    fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                                                >
                                                    Awaiting Confirmation
                                                </Text>
                                            </GridItem>
                                            <GridItem w="60px" h="10" onClick={goToProcessed}>
                                                <Box display={"flex"}>
                                                    <Image
                                                        mt={"8px"}
                                                        margin={"auto"}
                                                        minW={"35px"}
                                                        minH={"35px"}
                                                        h={"35px"}
                                                        w={"35px"}
                                                        maxH={"35px"}
                                                        maxW={"35px"}
                                                        src={status2}
                                                        ml={"13px"}
                                                    />
                                                    {!Processed.length ? null : (
                                                        <sup>
                                                            <Box
                                                                fontSize={"11px"}
                                                                backgroundColor={"#EF144A"}
                                                                borderRadius={"50%"}
                                                                m={"3px 6px 0px -8px"}
                                                                p={"6px 5px 8px 5px"}
                                                                color={"white"}
                                                                fontWeight={700}
                                                            >
                                                                {Processed.length}
                                                            </Box>
                                                        </sup>
                                                    )}
                                                </Box>
                                                <Text
                                                    mt={"8px"}
                                                    textAlign={"center"}
                                                    fontSize={"12px"}
                                                    fontWeight={400}
                                                    fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                                                >
                                                    Processed
                                                </Text>
                                            </GridItem>
                                            <GridItem w="60px" h="10" onClick={goToShipping}>
                                                <Box display={"flex"}>
                                                    <Image
                                                        margin={"auto"}
                                                        src={status4}
                                                        minW={"40px"}
                                                        minH={"38px"}
                                                        h={"40px"}
                                                        w={"38px"}
                                                        maxH={"40px"}
                                                        maxW={"38px"}
                                                        ml={"8px"}
                                                        mt={"-3px"}
                                                    />
                                                    {!Shipping.length ? null : (
                                                        <sup>
                                                            <Box
                                                                fontSize={"11px"}
                                                                backgroundColor={"#EF144A"}
                                                                borderRadius={"50%"}
                                                                m={"5px 5px 0px -10px"}
                                                                p={"6px 5px 8px 5px"}
                                                                color={"white"}
                                                                fontWeight={700}
                                                            >
                                                                {Shipping.length}
                                                            </Box>
                                                        </sup>
                                                    )}
                                                </Box>
                                                <Text
                                                    mt={"6px"}
                                                    textAlign={"center"}
                                                    fontSize={"12px"}
                                                    fontWeight={400}
                                                    fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                                                >
                                                    Shipping
                                                </Text>
                                            </GridItem>
                                            <GridItem w="60px" h="10" onClick={goToDelivered}>
                                                <Box display={"flex"}>
                                                    <Image
                                                        margin={"auto"}
                                                        src={status3}
                                                        minW={"40px"}
                                                        minH={"37px"}
                                                        h={"40px"}
                                                        w={"37px"}
                                                        maxH={"40px"}
                                                        maxW={"37px"}
                                                        mr={"-3px"}
                                                        mt={"-1px"}
                                                    />
                                                    <sup>
                                                        <Box
                                                            fontSize={"11px"}
                                                            bgColor={
                                                                !Delivered.length ? "transparent" : "#EF144A"
                                                            }
                                                            borderRadius={"50%"}
                                                            m={"5px 8px 0px -10px"}
                                                            p={"6px 5px 8px 5px"}
                                                            color={
                                                                !Delivered.length ? "transparent" : "white"
                                                            }
                                                            fontWeight={700}
                                                        >
                                                            {Delivered.length}
                                                        </Box>
                                                    </sup>
                                                </Box>
                                                <Text
                                                    mt={"4px"}
                                                    textAlign={"center"}
                                                    fontSize={"12px"}
                                                    fontWeight={400}
                                                    fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                                                >
                                                    Delivered
                                                </Text>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                    <Box
                                        width={"100%"}
                                        bgColor={"#e5e7e9"}
                                        h={"5px"}
                                        mt={"50px"}
                                    />
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                </Box>
            ) : null}
        </Box>
    );
};
export default NotificationTab;