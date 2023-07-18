import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import RenderProductTransactionDetail from "./RenderProductTransactionDetail"

const ModalTransactionItemDetail = ({ courirDuration, transactionItems, transactionId, moment, isOpen, onOpen, onClose, orderStatusName, paymentDate, transactionName, transactionAddress, paymentMethod, totalQuantity, totalPrice, shippingFee }) => {

    const renderProductDetail = () => {
        return transactionItems.map((val) => {
            return (
                <RenderProductTransactionDetail
                    key={val.id.toString()}
                    productImage={val.Product.Image_Urls[0].image_url}
                    productName={val.Product.product_name}
                    price={val.Product.price}
                    quantity={val.quantity}
                    totalPrice={totalPrice}
                    shippingFee={shippingFee}
                    orderStatusName={orderStatusName}
                    productId={val.Product.id}
                />
            )
        })
    }

    const courir = courirDuration.split("at")[0]
    const shippingDate = courirDuration.split("at")[1]
    const receiptNo = `2208${moment(paymentDate).format("YYMMDD")}${transactionId}`

    return (
        <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} motionPreset={{ lg: 'none', base: 'slideInBottom' }}>
            <ModalOverlay />
            <ModalContent maxW="532.54px" mt={{ lg: "99px", base: '220px' }} borderRadius={"12px"}>
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
                            Transaction Detail
                        </Text>
                    </Box>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    p={"0px 0px 0px 0px"}
                    maxHeight={"530px"}
                    overflowY={"auto"}
                    overflowX={"hidden"}
                    scrollBehavior={"unset"}
                >
                    <Box
                        h={"146.86px"}
                        p={"24px 32px"}
                        borderBottom={"8px solid #f3f4f5"}
                    >
                        <Box
                            m={"0px 0px 12px"}
                            p={"0px 0px 13px"}
                            borderBottom={"thin dashed #E5E7E9"}
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            fontWeight={700}
                            lineHeight={"18px"}
                            letterSpacing={"0px"}
                            display={"flex"}
                            justifyContent={"space-between"}
                        >
                            <Text>Status :</Text>
                            <Text
                                color={orderStatusName === "Done" ? "#0095DA" : orderStatusName === "Canceled" ? "#EF144A" : "#F7931E"
                                }
                            >
                                {orderStatusName}
                            </Text>
                        </Box>

                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            flexDir={"row"}
                            m={"0px 0px 8px"}
                        >
                            <Text
                                color={"#31353BAD"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Invoice No.
                            </Text>
                            <Text
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={700}
                                lineHeight={"20px"}
                                letterSpacing={"0px"}
                                color={"31353BF5"}
                            >
                                INV/{moment(paymentDate).format("YYYYMMDD")}
                                /{transactionName}
                            </Text>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            flexDir={"row"}
                        >
                            <Text
                                color={"#31353BAD"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Payment Date
                            </Text>
                            <Text
                                color={"#31353BF5"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                {moment(paymentDate).format(
                                    "DD MMMM YYYY, HH:mm"
                                )}{" "}
                                WIB
                            </Text>
                        </Box>
                    </Box>
                    <Box
                        pr={"32px"}
                        pl={"32px"}
                        pt={"24px"}
                        pb={"16px"}
                        borderBottom={"8px solid #f3f4f5"}
                    >
                        <Text
                            color={"#31353BF5"}
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            fontWeight={700}
                            lineHeight={"18px"}
                            letterSpacing={"0px"}
                            m={"0px 0px 13px"}
                        >
                            Product Detail
                        </Text>
                        {renderProductDetail()}
                    </Box>
                    <Box p={"23px 32px"} borderBottom={"8px solid #f3f4f5"}>
                        <Text
                            color={"#31353BF5"}
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            lineHeight={"18x"}
                            letterSpacing={"0px"}
                            fontWeight={700}
                            mb={"13px"}
                        >
                            Shipping Info
                        </Text>
                        <Box
                            display={"flex"}
                            justifyContent={"flex-start"}
                            flexDir={"row"}
                            alignItems={"flex-start"}
                            mb={"13px"}
                        >
                            <Text
                                minW={"78.74px"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                color={"#31353BAD"}
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Courir
                            </Text>
                            <Text
                                m={"-4px 14px 0px 0px"}
                                fontWeight={500}
                                alignItems={"flex-start"}
                                fontSize={"16px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                color={"#0000008A"}
                            >
                                :
                            </Text>
                            <Box display={"flex"} flexDir={"column"}>
                                <Text
                                    fontSize={"12px"}
                                    fontFamily={
                                        "Open Sauce One, sans-serif"
                                    }
                                    color={"#31353BF5"}
                                    fontWeight={400}
                                    lineHeight={"18px"}
                                    letterSpacing={"0px"}
                                >
                                    {`Tiki - ${courir}`}
                                </Text>
                                {orderStatusName === "Done" ||
                                    orderStatusName === "Delivered" ? null : (
                                    <Text
                                        fontSize={"12px"}
                                        fontFamily={
                                            "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                        }
                                        color={"#31353BF5"}
                                        fontWeight={700}
                                        lineHeight={"16px"}
                                        letterSpacing={"0px"}
                                    >
                                        {`(Estimate arrival ${shippingDate})`}
                                    </Text>
                                )}
                            </Box>
                        </Box>
                        {orderStatusName !== "Done" &&
                            orderStatusName !== "Delivered" ? null : (
                            <Box
                                display={"flex"}
                                justifyContent={"flex-start"}
                                flexDir={"row"}
                                alignItems={"flex-start"}
                                mb={"13px"}
                            >
                                <Text
                                    minW={"78.74px"}
                                    fontSize={"12px"}
                                    fontFamily={
                                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                    }
                                    color={"#31353BAD"}
                                    fontWeight={400}
                                    lineHeight={"18px"}
                                    letterSpacing={"0px"}
                                >
                                    Receipt No.
                                </Text>
                                <Text
                                    m={"-4px 14px 0px 0px"}
                                    fontWeight={500}
                                    alignItems={"flex-start"}
                                    fontSize={"16px"}
                                    fontFamily={
                                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                    }
                                    color={"#0000008A"}
                                >
                                    :
                                </Text>
                                <Box display={"flex"} flexDir={"column"}>
                                    <Text
                                        fontSize={"12px"}
                                        fontFamily={
                                            "Open Sauce One, sans-serif"
                                        }
                                        color={"#31353BF5"}
                                        fontWeight={400}
                                        lineHeight={"18px"}
                                        letterSpacing={"0px"}
                                    >
                                        {`SPD${receiptNo}`}
                                    </Text>
                                </Box>
                            </Box>
                        )}
                        <Box
                            display={"flex"}
                            justifyContent={"flex-start"}
                            flexDir={"row"}
                            alignItems={"flex-start"}
                        >
                            <Text
                                minW={"78.74px"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                color={"#31353BAD"}
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Address
                            </Text>
                            <Text
                                m={"-4px 14px 0px 0px"}
                                fontWeight={500}
                                alignItems={"flex-start"}
                                fontSize={"16px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                color={"#0000008A"}
                            >
                                :
                            </Text>
                            <Box display={"flex"} flexDir={"column"}>
                                <Text
                                    fontSize={"12px"}
                                    fontFamily={
                                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                    }
                                    color={"#31353BF5"}
                                    fontWeight={700}
                                    lineHeight={"18px"}
                                    letterSpacing={"0px"}
                                >
                                    {transactionAddress.recipients_name}
                                </Text>
                                <Box
                                    fontSize={"12px"}
                                    fontFamily={
                                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                    }
                                    color={"#31353BF5"}
                                    fontWeight={400}
                                    lineHeight={"18px"}
                                    letterSpacing={"0px"}
                                >
                                    <Text
                                        fontSize={"12px"}
                                        fontFamily={
                                            "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                        }
                                        color={"#31353BF5"}
                                        fontWeight={400}
                                        lineHeight={"18px"}
                                        letterSpacing={"0px"}
                                    >
                                        {transactionAddress.phone_number}
                                    </Text>
                                    <Text>
                                        {transactionAddress.full_address}
                                    </Text>
                                    <Text>
                                        {transactionAddress.districts},{" "}
                                        {transactionAddress.city},{" "}
                                        {transactionAddress.province}
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={"23px 32px"} borderBottom={"8px solid #f3f4f5"}>
                        <Text
                            mb={"13px"}
                            color={"#31353BF5"}
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            fontWeight={700}
                            lineHeight={"18px"}
                            letterSpacing={"0px"}
                        >
                            Payment Detail
                        </Text>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            mb={"8px"}
                            pb={"12px"}
                            borderBottom={"thin dashed #E5E7E9"}
                        >
                            <Text
                                color={"#31353BAD"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Payment Method
                            </Text>
                            <Text
                                color={"#31353BF5"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                {paymentMethod}
                            </Text>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            mb={"8px"}
                        >
                            <Text
                                color={"#31353BAD"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Total Price ({totalQuantity}{" "}
                                {totalQuantity > 1 ? "items" : "item"})
                            </Text>
                            <Text
                                color={"#31353BF5"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(totalPrice - 1000 - shippingFee).split(",")[0]}
                            </Text>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            mb={"8px"}
                        >
                            <Text
                                color={"#31353BAD"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Total Shipping Fee
                            </Text>
                            <Text
                                color={"#31353BF5"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(shippingFee).split(",")[0]}
                            </Text>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            mb={"8px"}
                        >
                            <Text
                                color={"#31353BAD"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Application Services Fee
                            </Text>
                            <Text
                                color={"#31353BF5"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Rp 1.000
                            </Text>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            mt={"12px"}
                            pt={"12px"}
                            borderTop={"thin dashed #E5E7E9"}
                        >
                            <Text
                                color={"#31353BF5"}
                                fontSize={"14px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={"bold"}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                Total Payment
                            </Text>
                            <Text
                                color={"#31353BF5"}
                                fontSize={"14px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={"bold"}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(totalPrice).split(",")[0]}
                            </Text>
                        </Box>
                    </Box>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default ModalTransactionItemDetail