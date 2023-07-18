import {
    Box,
    Button,
    Grid,
    GridItem,
    Image,
    Text,
    useDisclosure,
    useToast,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../api";
import { useState } from "react";
import ModalCancelTransaction from "../../components/TransactionList/ModalCancelTransaction";
import ModalTransactionItemDetail from "../../components/TransactionList/TransactionItemDetail/ModalTransactionItemDetail";
import ModalProductBuyAgain from "../../components/TransactionList/ProductBuyAgain/ModalProductBuyAgain";
import ModalFinishTransaction from "../../components/TransactionList/ModalFinishTransaction";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsHandbagFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addTransaction, fillTrans } from "../../redux/features/transSlice";

const TransactionListItems = ({
    fetchMyTransactionList,
    shippingFee,
    transactionAddress,
    totalQuantity,
    paymentMethod,
    paymentDate,
    orderStatusName,
    transactionName,
    totalPrice,
    transactionItems,
    courirDuration,
}) => {
    const [reason, setReason] = useState(null);
    const [informationOrder, setInformationOrder] = useState(null);
    const [informationShipping, setInformationShipping] = useState(null);
    const [inputText, setInputText] = useState("");
    const [cancelReason, setCancelReason] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isOpen: buyIsOpen,
        onOpen: buyOnOpen,
        onClose: buyOnClose,
    } = useDisclosure();

    const {
        isOpen: doneIsOpen,
        onOpen: doneOnOpen,
        onClose: doneOnClose,
    } = useDisclosure();

    const {
        isOpen: cancelIsOpen,
        onOpen: cancelOnOpen,
        onClose: cancelOnClose,
    } = useDisclosure();

    const fetchAllTransaction = async () => {
        try {
            const response = await axiosInstance.get(
                "/transactions/all-transaction-list"
            );
            dispatch(fillTrans(response.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    // finish transaction
    const finishOrderBtn = async () => {
        try {
            const response = await axiosInstance.patch(
                `transactions/finish-order/${transactionName}`
            );

            dispatch(addTransaction(response.data.data));
            toast({
                title: "Your transaction complete",
                description: response.data.message,
                status: "success",
            });
            doneOnClose();
            fetchMyTransactionList();
            fetchAllTransaction();
        } catch (err) {
            console.log(err);
        }
    };

    //cancel transaction
    const cancelPaidTransaction = async () => {
        try {
            const response = await axiosInstance.patch(
                `/transactions/cancel-paid-transaction/${transactionName}`
            );

            dispatch(addTransaction(response.data.data));
            toast({
                title: "Success",
                description: "You have successfully canceled this transaction",
                status: "success",
            });

            fetchMyTransactionList();
            fetchAllTransaction();
            cancelOnClose();
        } catch (err) {
            console.log(err);
        }
    };

    const closeCancelBtn = () => {
        setReason(null);
        setInformationOrder(null);
        setInformationShipping(null);
        setCancelReason("");
        cancelOnClose();
    };

    // cancel reason
    const changeOrderBtnHandler = () => {
        setInformationShipping(null);
        setInputText("");
        setReason("I want to change order");
        if (reason !== "I want to change order") {
            setCancelReason("");
        }
    };

    const changeShippingBtnHandler = () => {
        setInformationOrder(null);
        setInputText("");
        setReason("I want to change shipping");
        if (reason !== "I want to change shipping") {
            setCancelReason("");
        }
    };

    const changeOtherReasonBtnHandler = () => {
        setInformationOrder(null);
        setInformationShipping(null);
        setReason("Other reason");
        if (inputText.length < 16) {
            setCancelReason("");
        }
    };

    const formChangeHandler = ({ target }) => {
        const { value } = target;

        setInputText(value);
        setCancelReason(value);
    };

    return (
        <>
            <Box display={{ lg: "inline", base: "none" }}>
                <Box m={"0px 0px 16px"} p={"0px 16px"} cursor={"default"}>
                    <Box
                        w={"100%"}
                        p={"16px"}
                        borderRadius={"8px"}
                        boxShadow={"0 1px 6px 0 rgba(49,53,59,0.12)"}
                    >
                        {/* purchase information */}
                        <Box
                            display={"flex"}
                            justifyContent={"flex-start"}
                            h={"22px"}
                            m={"0px 0px 15px"}
                            alignItems={"center"}
                        >
                            <BsHandbagFill
                                style={{
                                    marginRight: "10px",
                                    height: "22px",
                                    width: "22px",
                                    color: "#F7931E",
                                }}
                            />
                            <Text
                                color={"#31353BF5"}
                                fontSize={"12px"}
                                fontWeight={700}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                lineHeight={"20px"}
                                letterSpacing={"0px"}
                                marginRight={"10px"}
                            >
                                Purchased
                            </Text>

                            {/* purchased date */}
                            <Text
                                color={"#31353BF5"}
                                fontSize={"12px"}
                                fontWeight={400}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                lineHeight={"20px"}
                                letterSpacing={"0px"}
                                marginRight={"10px"}
                            >
                                {moment(paymentDate).format("D MMM YYYY")}
                            </Text>

                            {/* order status */}
                            <Text
                                display={"flex"}
                                alignItems={"center"}
                                fontWeight={700}
                                borderRadius={"3px"}
                                lineHeight={"16px"}
                                p={"0px 8px"}
                                h={"20px"}
                                fontSize={"11.429px"}
                                bgColor={
                                    orderStatusName === "Done"
                                        ? "#E5F9F6"
                                        : orderStatusName === "Canceled"
                                            ? "rgb(255, 234, 239)"
                                            : "#fff0b3"
                                }
                                color={
                                    orderStatusName === "Done"
                                        ? "#0095DA"
                                        : orderStatusName === "Canceled"
                                            ? "#EF144A"
                                            : "#F7931E"
                                }
                                justifyContent={"center"}
                                mr={"10px"}
                            >
                                {orderStatusName}
                            </Text>

                            {/* invoice */}
                            <Text
                                color={"#31353BAD"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"20px"}
                                letterSpacing={"0px"}
                            >
                                INV/{moment(paymentDate).format("YYYYMMDD")}/ {transactionName}
                            </Text>
                        </Box>

                        {/* transacion item arr[0] */}
                        <Grid templateColumns="3.95fr 1.05fr" w={"784px"} gap={0}>
                            <GridItem>
                                <Box display={"flex"} flexDir={"column"}>
                                    <Box
                                        h={"80px"}
                                        display={"flex"}
                                        flexDir={"row"}
                                        cursor={"default"}
                                    >
                                        <Image
                                            w={"60px"}
                                            h={"60px"}
                                            borderRadius={"6px"}
                                            src={transactionItems[0].Product.Image_Urls[0].image_url}
                                        />
                                        <Box pl={"16px"}>
                                            <Link
                                                to={`/product/${transactionItems[0].Product.id}/${transactionItems[0].Product.product_name}`}
                                            >
                                                <Text
                                                    color={"31353BF5"}
                                                    fontSize={"14px"}
                                                    fontFamily={
                                                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                                    }
                                                    m={"0px 0px 3px"}
                                                    lineHeight={"16px"}
                                                    fontWeight={700}
                                                    letterSpacing={"0px"}
                                                    whiteSpace={"nowrap"}
                                                    overflow={"hidden"}
                                                    textOverflow={"ellipsis"}
                                                    cursor={"point"}
                                                    w={"439px"}
                                                >
                                                    {transactionItems[0].Product.product_name}
                                                </Text>
                                            </Link>
                                            <Text
                                                color={"#31353BAD"}
                                                fontSize={"12px"}
                                                fontFamily={
                                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                                }
                                                m={"0px 0px 3px"}
                                                fontWeight={400}
                                                lineHeight={"20px"}
                                                letterSpacing={"0px"}
                                            >
                                                {transactionItems[0].quantity}{" "}
                                                {transactionItems[0].quantity > 1 ? "items" : "item"} x{" "}
                                                {
                                                    new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    })
                                                        .format(transactionItems[0].Product.price)
                                                        .split(",")[0]
                                                }
                                            </Text>
                                            <Text
                                                fontSize={"12px"}
                                                fontFamily={
                                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                                }
                                                lineHeight={"20px"}
                                                letterSpacing={"0px"}
                                                color={"#31353BAD"}
                                                fontWeight={400}
                                                m={"8px 0px 0px"}
                                                cursor={"pointer"}
                                                onClick={() => onOpen()}
                                            >
                                                {transactionItems.length > 1
                                                    ? `+${transactionItems.length - 1} more product`
                                                    : null}
                                            </Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>
                            <GridItem>
                                <Box
                                    pl={"24px"}
                                    h={"60px"}
                                    w={"180px"}
                                    display={"flex"}
                                    my={"auto"}
                                    pt={"10px"}
                                    pb={"10px"}
                                    flexDir={"column"}
                                    borderLeft={"1px solid #e5e7e9"}
                                >
                                    <Text
                                        color={"#31353BAD"}
                                        fontSize={"12px"}
                                        fontFamily={
                                            "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                        }
                                        fontWeight={400}
                                        lineHeight={"20px"}
                                        letterSpacing={"0px"}
                                    >
                                        Total Purchased
                                    </Text>
                                    <Text
                                        color={"#31353BF5"}
                                        fontSize={"14px"}
                                        fontFamily={
                                            "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                        }
                                        fontWeight={700}
                                        lineHeight={"20px"}
                                        letterSpacing={"0px"}
                                    >
                                        {
                                            new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })
                                                .format(totalPrice)
                                                .split(",")[0]
                                        }
                                    </Text>
                                </Box>
                            </GridItem>
                        </Grid>
                        <Box
                            display={"flex"}
                            justifyContent={"flex-end"}
                            mt={"9px"}
                            h={"44px"}
                        >
                            <Box
                                display={"flex"}
                                flexDir={"row"}
                                justifyContent={"space-evenly"}
                                columnGap={"16px"}
                            >
                                <Text
                                    fontSize={"12px"}
                                    m={"12px 0px"}
                                    fontFamily={
                                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                    }
                                    color={"#0095DA"}
                                    fontWeight={700}
                                    lineHeight={"20px"}
                                    letterSpacing={"0px"}
                                    cursor={"pointer"}
                                    onClick={() => onOpen()}
                                >
                                    Transaction Detail
                                </Text>
                                {orderStatusName === "Done" ? (
                                    <Button
                                        display={"flex"}
                                        alignItems={"center"}
                                        h={"40px"}
                                        w={"140px"}
                                        color={"#fff"}
                                        fontSize={"12px"}
                                        fontFamily={"Open Sauce One, sans-serif"}
                                        fontWeight={700}
                                        lineHeight={"24px"}
                                        bgColor={"#0095DA"}
                                        _hover={{
                                            bgColor: "#0370A2",
                                        }}
                                        _active={{
                                            bgColor: "#0370A2",
                                        }}
                                        onClick={() => buyOnOpen()}
                                    >
                                        Buy Again
                                    </Button>
                                ) : orderStatusName === "Delivered" ? (
                                    <Button
                                        display={"flex"}
                                        alignItems={"center"}
                                        h={"40px"}
                                        w={"140px"}
                                        color={"#fff"}
                                        fontSize={"12px"}
                                        fontFamily={"Open Sauce One, sans-serif"}
                                        fontWeight={700}
                                        lineHeight={"24px"}
                                        bgColor={"#F7931E"}
                                        _hover={{
                                            bgColor: "#D6882B",
                                        }}
                                        _active={{
                                            bgColor: "#D6882B",
                                        }}
                                        onClick={() => doneOnOpen()}
                                    >
                                        Done
                                    </Button>
                                ) : null}
                                {orderStatusName !== "Awaiting Confirmation" ? (
                                    <Button
                                        h={"40px"}
                                        w={"42.98px"}
                                        bgColor={"#fff"}
                                        p={"0px 12px"}
                                        border={"1px solid #0095DA"}
                                        borderRadius={"8px"}
                                        _hover={"none"}
                                    >
                                        <Box
                                            fontSize={"23px"}
                                            fontWeight={700}
                                            fontFamily={"Open Sauce One, sans-serif"}
                                            color={"#9FA6B0"}
                                            display={"flex"}
                                            alignContent={"center"}
                                            h={"40px"}
                                            _hover={"none"}
                                        >
                                            ...
                                        </Box>
                                    </Button>
                                ) : (
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button
                                                h={"40px"}
                                                w={"42.98px"}
                                                bgColor={"#fff"}
                                                p={"0px 12px"}
                                                border={"1px solid #0095DA"}
                                                borderRadius={"8px"}
                                                _hover={"none"}
                                            >
                                                <Box
                                                    fontSize={"23px"}
                                                    fontWeight={700}
                                                    fontFamily={"Open Sauce One, sans-serif"}
                                                    color={"#9FA6B0"}
                                                    display={"flex"}
                                                    alignContent={"center"}
                                                    h={"40px"}
                                                    _hover={"none"}
                                                >
                                                    ...
                                                </Box>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            _hover={{ bgColor: "#E5F9F6" }}
                                            cursor={"pointer"}
                                            _focus={"#fff"}
                                            _active={"none"}
                                            mr={"145px"}
                                            mt={"-5px"}
                                            w={"173.61px"}
                                            maxH={"40px"}
                                            onClick={() => cancelOnOpen()}
                                            boxShadow={"0 1px 6px 0 rgba(49,53,59,0.12)"}
                                            border={"none"}
                                        >
                                            <PopoverBody p={"10px 15px"}>
                                                <Box
                                                    display={"flex"}
                                                    flexDir={"row"}
                                                    justifyContent={"flex-start"}
                                                    alignItems={"center"}
                                                    alignContent={"center"}
                                                    onClick={() => cancelOnOpen()}
                                                >
                                                    <Box w={"20px"} h={"20px"}>
                                                        <RiDeleteBin6Line
                                                            style={{
                                                                color: "#8d96aa",
                                                                width: "17.58px",
                                                                maxWidth: "17.58px",
                                                                minWidth: "17.58px",
                                                                height: "19.26px",
                                                                maxHeight: "19.26px",
                                                                minHeight: "19.26px",
                                                            }}
                                                        />
                                                    </Box>
                                                    <Text
                                                        fontSize={"14px"}
                                                        fontFamily={"Open Sauce One, sans-serif"}
                                                        color={"#0000008A"}
                                                        lineHeight={"1.15"}
                                                        pl={"2px"}
                                                    >
                                                        Cancel Transaction
                                                    </Text>
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* mobile responsive */}
            <Box display={{ lg: "none", base: "inline" }}>
                <Box>
                    <Box
                        p={"12px"}
                        m={"12px 16px"}
                        boxShadow={"0 1px 4px 0 rgba(141,150,170,0.4)"}
                        borderRadius={"8px"}
                    >
                        <Box
                            display={"flex"}
                            flexDir={"row"}
                            justifyContent={"space-between"}
                            pb={"12px"}
                            h={"44px"}
                            borderBottom={"1px solid #e5e7e9"}
                        >
                            <Box
                                display={"flex"}
                                flexDir={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                            >
                                <BsHandbagFill
                                    style={{
                                        height: "21px",
                                        width: "21px",
                                        color: "#F7931E",
                                        marginTop: "-4px",
                                    }}
                                />
                                <Box display={"flex"} flexDir={"column"} p={"0px 8px"}>
                                    <Text
                                        color={"#31353BF5"}
                                        fontSize={"10px"}
                                        fontFamily={
                                            "Open Sauce One, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                                        }
                                        fontWeight={800}
                                        lineHeight={"12px"}
                                        alignItems={"center"}
                                    >
                                        Purchased
                                    </Text>
                                    <Text
                                        // mt={'2px'}
                                        color={"#31353BAD"}
                                        fontSize={"10px"}
                                        fontFamily={
                                            "Open Sauce One, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                                        }
                                        fontWeight={400}
                                        lineHeight={"16px"}
                                    >
                                        {moment(paymentDate).format("D MMM YYYY")}
                                    </Text>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDir={"row"}>
                                <Box
                                    display={"flex"}
                                    flexDir={"column"}
                                    alignItems={"end"}
                                    justifyContent={"center"}
                                >
                                    <Text
                                        fontSize={"10px"}
                                        fontFamily={
                                            "Open Sauce One, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                                        }
                                        fontWeight={700}
                                        borderRadius={"3px"}
                                        // h={'20px'}
                                        p={"4px"}
                                        lineHeight={"16px"}
                                        bgColor={
                                            orderStatusName === "Done"
                                                ? "#E5F9F6"
                                                : orderStatusName === "Canceled"
                                                    ? "rgb(255, 234, 239)"
                                                    : "#fff0b3"
                                        }
                                        color={
                                            orderStatusName === "Done"
                                                ? "#0095DA"
                                                : orderStatusName === "Canceled"
                                                    ? "#EF144A"
                                                    : "#FA591D"
                                        }
                                    >
                                        {orderStatusName}
                                    </Text>
                                </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <HiOutlineDotsVertical
                                        style={{ fontSize: "23px", color: "#838994" }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box p={"12px 0px 17px"} h={"70.89px"}>
                            <Box
                                display={"flex"}
                                justifyContent={"flex-start"}
                                flexDir={"row"}
                                h={"33.89px"}
                                mb={"8px"}
                                onClick={() => onOpen()}
                            >
                                <Image
                                    w={"40px"}
                                    h={"40px"}
                                    borderRadius={"6px"}
                                    src={transactionItems[0].Product.Image_Urls[0].image_url}
                                />
                                <Box display={"flex"} flexDir={"column"} pl={"12px"}>
                                    <Link
                                        to={`/product/${transactionItems[0].Product.id}/${transactionItems[0].Product.product_name}`}
                                    >
                                        <Text
                                            fontSize={"14px"}
                                            color={"#31353BF5"}
                                            fontFamily={
                                                "Open Sauce One, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                                            }
                                            fontWeight={800}
                                            lineHeight={"1.15"}
                                            m={"2px 0px"}
                                            maxW={"384px"}
                                            whiteSpace={"nowrap"}
                                            overflow={"hidden"}
                                            textOverflow={"ellipsis"}
                                            cursor={"point"}
                                        >
                                            {transactionItems[0].Product.product_name}
                                        </Text>
                                        <Text
                                            color={"#31353BAD"}
                                            fontSize={"12px"}
                                            fontFamily={
                                                "Open Sauce One, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                                            }
                                            lineHeight={"18px"}
                                            m={"2px 0px"}
                                        >
                                            {transactionItems[0].quantity}{" "}
                                            {transactionItems[0].quantity > 1 ? "items" : "item"}
                                        </Text>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                        {transactionItems.length > 1 ? (
                            <Text
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                lineHeight={"16px"}
                                letterSpacing={"0px"}
                                color={"#31353BAD"}
                                fontWeight={400}
                                mb={"10px"}
                                cursor={"pointer"}
                                onClick={() => onOpen()}
                            >
                                {`+${transactionItems.length - 1} more product`}
                            </Text>
                        ) : null}
                        <Box
                            display={"flex"}
                            flexDir={"row"}
                            justifyContent={"space-between"}
                            h={"32.09px"}
                            alignItems={"end"}
                        >
                            <Box display={"flex"} flexDir={"column"}>
                                <Text
                                    color={"#31353BF5"}
                                    fontSize={"10px"}
                                    fontFamily={
                                        "Open Sauce One, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                                    }
                                    lineHeight={"16px"}
                                    fontWeight={400}
                                >
                                    Total Purchased
                                </Text>
                                <Text
                                    fontSize={"12px"}
                                    color={"#40454C"}
                                    fontFamily={
                                        "Open Sauce One, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                                    }
                                    fontWeight={600}
                                    lineHeight={"16px"}
                                >
                                    {
                                        new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        })
                                            .format(totalPrice)
                                            .split(",")[0]
                                    }
                                </Text>
                            </Box>
                            {orderStatusName === "Done" ? (
                                <Button
                                    mt={"-2px"}
                                    borderRadius={"8px"}
                                    h={"24px"}
                                    w={"110px"}
                                    color={"#fff"}
                                    fontSize={"12px"}
                                    fontFamily={"Open Sauce One, sans-serif"}
                                    fontWeight={700}
                                    lineHeight={"24px"}
                                    bgColor={"#0095DA"}
                                    _hover={{
                                        bgColor: "#0370A2",
                                    }}
                                    _active={{
                                        bgColor: "#0370A2",
                                    }}
                                    onClick={() => buyOnOpen()}
                                >
                                    Buy Again
                                </Button>
                            ) : orderStatusName === "Delivered" ? (
                                <Button
                                    mt={"-2px"}
                                    borderRadius={"8px"}
                                    h={"24px"}
                                    w={"110px"}
                                    color={"#fff"}
                                    fontSize={"12px"}
                                    fontFamily={"Open Sauce One, sans-serif"}
                                    fontWeight={700}
                                    lineHeight={"24px"}
                                    bgColor={"#F7931E"}
                                    _hover={{
                                        bgColor: "#D6882B",
                                    }}
                                    _active={{
                                        bgColor: "#D6882B",
                                    }}
                                    onClick={() => doneOnOpen()}
                                >
                                    Done
                                </Button>
                            ) : null}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Transaction Item Detail */}
            <ModalTransactionItemDetail
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                orderStatusName={orderStatusName}
                paymentDate={paymentDate}
                transactionName={transactionName}
                transactionAddress={transactionAddress}
                paymentMethod={paymentMethod}
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
                shippingFee={shippingFee}
                transactionItems={transactionItems}
                courirDuration={courirDuration}
                moment={moment}
            />

            {/* Product Buy Again */}
            <ModalProductBuyAgain
                buyIsOpen={buyIsOpen}
                buyOnOpen={buyOnOpen}
                buyOnClose={buyOnClose}
                transactionItems={transactionItems}
            />

            {/* Finish Transaction */}
            <ModalFinishTransaction
                doneIsOpen={doneIsOpen}
                doneOnOpen={doneOnOpen}
                doneOnClose={doneOnClose}
                finishOrderBtn={finishOrderBtn}
            />

            {/* Cancel Paid Transaction */}
            <ModalCancelTransaction
                cancelIsOpen={cancelIsOpen}
                cancelOnOpen={cancelOnOpen}
                cancelOnClose={cancelOnClose}
                closeCancelBtn={closeCancelBtn}
                paymentDate={paymentDate}
                transactionName={transactionName}
                changeOrderBtnHandler={changeOrderBtnHandler}
                changeShippingBtnHandler={changeShippingBtnHandler}
                setCancelReason={setCancelReason}
                changeOtherReasonBtnHandler={changeOtherReasonBtnHandler}
                setInformationOrder={setInformationOrder}
                informationOrder={informationOrder}
                setInformationShipping={setInformationShipping}
                informationShipping={informationShipping}
                reason={reason}
                inputText={inputText}
                MdKeyboardArrowDown={MdKeyboardArrowDown}
                cancelReason={cancelReason}
                moment={moment}
                formChangeHandler={formChangeHandler}
                transactionItems={transactionItems}
                cancelPaidTransaction={cancelPaidTransaction}
            />
        </>
    );
};

export default TransactionListItems;