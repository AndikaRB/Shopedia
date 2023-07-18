import {
    Box,
    Button,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
} from "@chakra-ui/react"
import { IoAlertCircleSharp } from "react-icons/io5"

const ModalCancelTransaction = ({
    cancelPaidTransaction,
    transactionItems,
    moment,
    formChangeHandler,
    cancelReason,
    MdKeyboardArrowDown,
    reason,
    inputText,
    cancelIsOpen,
    cancelOnOpen,
    cancelOnClose,
    closeCancelBtn,
    paymentDate,
    transactionName,
    changeOrderBtnHandler,
    changeShippingBtnHandler,
    setCancelReason,
    changeOtherReasonBtnHandler,
    setInformationOrder,
    informationOrder,
    setInformationShipping,
    informationShipping,
}) => {
    const renderTransactionItems = () => {
        return transactionItems.map((val) => {
            return (
                <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    flexDir={"row"}
                    mb={"12px"}
                >
                    <Image
                        borderRadius={"6px"}
                        src={val.Product.Image_Urls[0].image_url}
                        minW={"56px"}
                        maxH={"56px"}
                    />
                    <Box display={"flex"} flexDir={"column"} pl={"16px"}>
                        <Text
                            color={"#31353B"}
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            mb={"6px"}
                            fontWeight={700}
                            lineHeight={"18px"}
                        >
                            {val.Product.product_name}
                        </Text>
                        <Text
                            fontSize={"12px"}
                            fontFamily={"Open Sauce One, sans-serif"}
                            mb={"4px"}
                            color={"#31353B"}
                            lineHeight={"14px"}
                        >
                            {
                                new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                })
                                    .format(val.price_per_item)
                                    .split(",")[0]
                            }
                        </Text>
                    </Box>
                </Box>
            )
        })
    }

    return (
        <Modal
            isOpen={cancelIsOpen}
            onOpen={cancelOnOpen}
            onClose={cancelOnClose}
            closeOnEsc={false}
        >
            <ModalOverlay />
            <ModalContent mt={"120px"} maxW={"560px"} borderRadius={"8px"}>
                <ModalHeader
                    borderBottom={"1px solid #e5e7e9"}
                    pt={"32px"}
                    pb={"16px"}
                >
                    <Box>
                        <Text
                            color={"31353BF5"}
                            fontSize={"20px"}
                            fontWeight={700}
                            lineHeight={"26px"}
                            letterSpacing={"-0.1px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            textAlign={"center"}
                        >
                            Cancel Transaction
                        </Text>
                    </Box>
                </ModalHeader>
                <ModalCloseButton onClick={closeCancelBtn} />
                <ModalBody
                    p={"20px 32px 32px 32px"}
                    overflow={"auto"}
                    maxH={"530px"}
                >
                    <Box
                        p={"12px"}
                        bgColor={"#E5F9F6"}
                        borderRadius={"8px"}
                        display={"flex"}
                        flexDir={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <IoAlertCircleSharp
                            style={{ color: "#F7931E", height: "18px" }}
                        />
                        <Text
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            color={"#212121"}
                            lineHeight={"22px"}
                            letterSpacing={"0px"}
                            fontWeight={400}
                            pl={"6px"}
                        >
                            Your order can be canceled before being processed by
                            the Admin.
                        </Text>
                    </Box>
                    <Box mt={"16px"} mb={"16px"}>
                        <Text
                            color={"#31353BAD"}
                            fontSize={"12px"}
                            fontFamily={"Open Sauce One, sans-serif"}
                            lineHeight={"18px"}
                        >
                            {`INV / ${moment(paymentDate).format(
                                "YYYYMMDD"
                            )} / ${transactionName}`}
                        </Text>
                    </Box>
                    <Box
                        mb={"24px"}
                        pb={"14px"}
                        borderBottom={"thin dashed rgb(229, 231, 233)"}
                    >
                        {renderTransactionItems()}
                    </Box>
                    <Box w={"479px"} h={"90px"}>
                        <Text
                            color={"#31353B"}
                            fontSize={"16px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            mb={"8px"}
                            fontWeight={700}
                            lineHeight={"22px"}
                        >
                            Why do you want to cancel this order?
                        </Text>
                        <Menu>
                            <Box>
                                <MenuButton
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    flexDir={"row"}
                                    w={"479px"}
                                    borderWidth="1px"
                                    textAlign={"left"}
                                    h={"40px"}
                                    p={"0px 8px 0px 12px "}
                                    borderRadius={"8px"}
                                >
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Text
                                            color={
                                                !reason
                                                    ? "#31353B70"
                                                    : "#31353BF5"
                                            }
                                            fontSize={"14px"}
                                            fontFamily={
                                                "Open Sauce One, sans-serif"
                                            }
                                        >
                                            {!reason ? "Choose Reason" : reason}
                                        </Text>
                                        <MdKeyboardArrowDown
                                            style={{ fontSize: "25px" }}
                                        />
                                    </Box>
                                </MenuButton>
                            </Box>
                            <MenuList
                                w={"479px"}
                                borderRadius={"8px"}
                                mt={"-13px"}
                                borderTopRadius={"0px"}
                                fontWeight={400}
                                lineHeight={1.33}
                                color={"#31353BF5"}
                                fontFamily={"Open Sauce One, sans-serif"}
                                fontSize={"14px"}
                                p={"0px 4px"}
                            >
                                <MenuItem
                                    p={"6px 8px 6px 5px"}
                                    onClick={changeOrderBtnHandler}
                                >
                                    I want to change order
                                </MenuItem>
                                <MenuItem
                                    p={"6px 8px 6px 5px"}
                                    onClick={changeShippingBtnHandler}
                                >
                                    I want to change shipping
                                </MenuItem>
                                <MenuItem
                                    p={"6px 8px 6px 5px"}
                                    onClick={changeOtherReasonBtnHandler}
                                >
                                    Other reason
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                    {reason === "I want to change order" ? (
                        <Box w={"479px"} h={"90px"}>
                            <Text
                                color={"#31353B"}
                                fontSize={"16px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                mb={"8px"}
                                fontWeight={700}
                                lineHeight={"22px"}
                            >
                                What order information would you like to change?
                            </Text>
                            <Menu pb={"8px"}>
                                <Box>
                                    <MenuButton
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        flexDir={"row"}
                                        w={"479px"}
                                        borderWidth="1px"
                                        textAlign={"left"}
                                        h={"40px"}
                                        p={"0px 8px 0px 12px "}
                                        borderRadius={"8px"}
                                    >
                                        <Box
                                            display={"flex"}
                                            justifyContent={"space-between"}
                                        >
                                            <Text
                                                color={
                                                    !informationOrder
                                                        ? "#31353B70"
                                                        : "#31353BF5"
                                                }
                                                fontSize={"14px"}
                                                fontFamily={
                                                    "Open Sauce One, sans-serif"
                                                }
                                            >
                                                {!informationOrder
                                                    ? "Choose Reason"
                                                    : informationOrder}
                                            </Text>
                                            <MdKeyboardArrowDown
                                                style={{ fontSize: "25px" }}
                                            />
                                        </Box>
                                    </MenuButton>
                                </Box>
                                <MenuList
                                    w={"479px"}
                                    borderRadius={"8px"}
                                    mt={"-13px"}
                                    borderTopRadius={"0px"}
                                    fontWeight={400}
                                    lineHeight={1.33}
                                    color={"#31353BF5"}
                                    fontFamily={"Open Sauce One, sans-serif"}
                                    fontSize={"14px"}
                                    p={"0px 4px"}
                                >
                                    <Box
                                        onClick={() =>
                                            setCancelReason(
                                                "I want to change the product I purchased"
                                            )
                                        }
                                    >
                                        <MenuItem
                                            p={"6px 8px 6px 5px"}
                                            onClick={() =>
                                                setInformationOrder(
                                                    "I want to change the product I purchased"
                                                )
                                            }
                                        >
                                            I want to change the product I
                                            purchased
                                        </MenuItem>
                                    </Box>
                                    <Box
                                        onClick={() =>
                                            setCancelReason(
                                                "I want to change the quantity of the same product"
                                            )
                                        }
                                    >
                                        <MenuItem
                                            p={"6px 8px 6px 5px"}
                                            onClick={() =>
                                                setInformationOrder(
                                                    "I want to change the quantity of the same product"
                                                )
                                            }
                                        >
                                            I want to change the quantity of the
                                            same product
                                        </MenuItem>
                                    </Box>
                                    <Box
                                        onClick={() =>
                                            setCancelReason(
                                                "I want to cancel buying some products"
                                            )
                                        }
                                    >
                                        <MenuItem
                                            p={"6px 8px 6px 5px"}
                                            onClick={() =>
                                                setInformationOrder(
                                                    "I want to cancel buying some products"
                                                )
                                            }
                                        >
                                            I want to cancel buying some
                                            products
                                        </MenuItem>
                                    </Box>
                                    <Box
                                        onClick={() =>
                                            setCancelReason(
                                                "Double order occurs"
                                            )
                                        }
                                    >
                                        <MenuItem
                                            p={"6px 8px 6px 5px"}
                                            onClick={() =>
                                                setInformationOrder(
                                                    "Double order occurs"
                                                )
                                            }
                                        >
                                            Double order occurs
                                        </MenuItem>
                                    </Box>
                                </MenuList>
                            </Menu>
                        </Box>
                    ) : null}

                    {reason === "I want to change shipping" ? (
                        <Box w={"479px"} h={"90px"}>
                            <Text
                                color={"#31353B"}
                                fontSize={"16px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                mb={"8px"}
                                fontWeight={700}
                                lineHeight={"22px"}
                            >
                                What shipping information would you like to
                                change?
                            </Text>
                            <Menu pb={"8px"}>
                                <Box>
                                    <MenuButton
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        flexDir={"row"}
                                        w={"479px"}
                                        borderWidth="1px"
                                        textAlign={"left"}
                                        h={"40px"}
                                        p={"0px 8px 0px 12px "}
                                        borderRadius={"8px"}
                                    >
                                        <Box
                                            display={"flex"}
                                            justifyContent={"space-between"}
                                        >
                                            <Text
                                                color={
                                                    !informationShipping
                                                        ? "#31353B70"
                                                        : "#31353BF5"
                                                }
                                                fontSize={"14px"}
                                                fontFamily={
                                                    "Open Sauce One, sans-serif"
                                                }
                                            >
                                                {!informationShipping
                                                    ? "Choose Reason"
                                                    : informationShipping}
                                            </Text>
                                            <MdKeyboardArrowDown
                                                style={{ fontSize: "25px" }}
                                            />
                                        </Box>
                                    </MenuButton>
                                </Box>
                                <MenuList
                                    w={"479px"}
                                    borderRadius={"8px"}
                                    mt={"-13px"}
                                    borderTopRadius={"0px"}
                                    fontWeight={400}
                                    lineHeight={1.33}
                                    color={"#31353BF5"}
                                    fontFamily={"Open Sauce One, sans-serif"}
                                    fontSize={"14px"}
                                    p={"0px 4px"}
                                >
                                    <Box
                                        onClick={() =>
                                            setCancelReason(
                                                "I want to change the shipping address"
                                            )
                                        }
                                    >
                                        <MenuItem
                                            p={"6px 8px 6px 5px"}
                                            onClick={() =>
                                                setInformationShipping(
                                                    "I want to change the shipping address"
                                                )
                                            }
                                        >
                                            I want to change the shipping
                                            address
                                        </MenuItem>
                                    </Box>
                                    <Box
                                        onClick={() =>
                                            setCancelReason(
                                                "I want to change the quantity of the same product"
                                            )
                                        }
                                    >
                                        <MenuItem
                                            p={"6px 8px 6px 5px"}
                                            onClick={() =>
                                                setInformationShipping(
                                                    "I want to change the quantity of the same product"
                                                )
                                            }
                                        >
                                            I want to change the delivery
                                            duration
                                        </MenuItem>
                                    </Box>
                                </MenuList>
                            </Menu>
                        </Box>
                    ) : null}
                    {reason === "Other reason" ? (
                        <Box>
                            <Text
                                color={"#31353B"}
                                fontSize={"16px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                mb={"8px"}
                                fontWeight={700}
                                lineHeight={"22px"}
                            >
                                What problems are you having?
                            </Text>
                            <Textarea
                                type={"text"}
                                placeholder={"Type reason"}
                                p={"8px 12px"}
                                fontSize={"14px"}
                                lineHeight={"22px"}
                                overflow={"hidden"}
                                fontFamily={"Open Sauce One, sans-serif"}
                                maxLength={160}
                                color={"#31353B"}
                                onChange={formChangeHandler}
                                focusBorderColor={
                                    inputText.length < 16 && inputText.length
                                        ? "#EF144A"
                                        : "#0095DA"
                                }
                            />
                            <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                {inputText.length < 16 && inputText.length ? (
                                    <Text
                                        fontSize={"12px"}
                                        fontFamily={
                                            "Open Sauce One, sans-serif"
                                        }
                                        color={"#EF144A"}
                                        m={"4px 0px 0px"}
                                        lineHeight={"18px"}
                                    >
                                        Min. 15 characters*
                                    </Text>
                                ) : (
                                    <Text></Text>
                                )}
                                <Box
                                    textAlign={"end"}
                                    fontFamily={"Open Sauce One, sans-serif"}
                                    fontSize={"12px"}
                                    m={"4px 0px 0px"}
                                    color={
                                        inputText.length < 16 &&
                                            inputText.length
                                            ? "#EF144A"
                                            : "#73767a"
                                    }
                                >
                                    <Text>{inputText.length}/160</Text>
                                </Box>
                            </Box>
                        </Box>
                    ) : null}
                    <Button
                        w={"100%"}
                        mt={"10px"}
                        bgColor={"#0095DA"}
                        _hover={{
                            bgColor: "#0370A2",
                        }}
                        _active={{
                            bgColor: "#0370A2",
                        }}
                        color={"#fff"}
                        h={"48px"}
                        fontSize={"16px"}
                        fontFamily={"Open Sauce One, sans-serif"}
                        fontWeight={600}
                        lineHeight={"22px"}
                        onClick={cancelPaidTransaction}
                        isDisabled={
                            !cancelReason.length ||
                                (reason === "Other reason" && inputText.length < 16)
                                ? true
                                : false
                        }
                    >
                        Apply For Cancelation
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalCancelTransaction
