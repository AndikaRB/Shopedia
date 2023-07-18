import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import { GoPackage } from "react-icons/go"
import { Ri24HoursFill } from "react-icons/ri"

const ModalFinishTransaction = ({ doneIsOpen, doneOnOpen, doneOnClose, finishOrderBtn }) => {

    return (
        <Modal
            isOpen={doneIsOpen}
            onOpen={doneOnOpen}
            onClose={doneOnClose}
            closeOnEsc={false}
        >
            <ModalOverlay />
            <ModalContent
                borderRadius={"8px"}
                maxW={"480px"}
                mt={"220px"}
                boxShadow={"0 1px 6px 0 rgba(49,53,59,0.12)"}
                p={"32px"}
            >
                <ModalCloseButton />
                <ModalBody p={"0px"}>
                    <Box>
                        <Text
                            color={"#31353BF5"}
                            fontSize={"20px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            mb={"16px"}
                            fontWeight={700}
                            lineHeight={"26px"}
                            letterSpacing={"-0.1px"}
                            textAlign={"center"}
                        >
                            Complete this order?
                        </Text>
                        <Text
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            color={"#31353BAD"}
                            m={"14px 0px"}
                            fontWeight={400}
                            lineHeight={"20px"}
                            letterSpacing={"0px"}
                            textAlign={"center"}
                        >
                            By clicking Complete, we will transfer the funds
                            to the seller, and you might not be able to file
                            a complaint.
                        </Text>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"flex-start"}
                        flexDir={"row"}
                        mb={"16px"}
                    >
                        <Box
                            display={"flex"}
                            minW={"48px"}
                            h={"48px"}
                            min={"48px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            border={"1px solid #E5E7E9"}
                            borderRadius={"8px"}
                        >
                            <GoPackage
                                style={{
                                    minHeight: "17.5px",
                                    minWidth: "17.5px",
                                }}
                            />
                        </Box>
                        <Text
                            ml={"16px"}
                            color={"#31353BAD"}
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            fontWeight={400}
                            lineHeight={"20px"}
                            letterSpacing={"0px"}
                        >
                            Make sure you have received the right products
                            that you ordered. Always make transaction only
                            on Shopedia platform and report if there is any
                            signs of fraud.
                        </Text>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"flex-start"}
                        flexDir={"row"}
                        mb={"16px"}
                    >
                        <Box
                            display={"flex"}
                            minW={"48px"}
                            h={"48px"}
                            min={"48px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            border={"1px solid #E5E7E9"}
                            borderRadius={"8px"}
                        >
                            <Ri24HoursFill
                                style={{
                                    minHeight: "17.5px",
                                    minWidth: "17.5px",
                                }}
                            />
                        </Box>
                        <Text
                            ml={"16px"}
                            color={"#31353BAD"}
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            fontWeight={400}
                            lineHeight={"20px"}
                            letterSpacing={"0px"}
                        >
                            If the order fulfill the Terms & Conditions, we
                            will send the cashback based on the promo within
                            the next 24 hours.{" "}
                        </Text>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"flex-start"}
                        flexDir={"row"}
                        mt={"30px"}
                    >
                        <Button
                            m={"0px 10px 0px 0px"}
                            p={"0px 16px"}
                            w={"230.56px"}
                            h={"40px"}
                            bgColor={"#fff"}
                            border={"1px solid #e5e7e9"}
                            _hover={"none"}
                            onClick={() => doneOnClose()}
                        >
                            Cancel
                        </Button>
                        <Button
                            borderRadius={"8px"}
                            w={"230.56px"}
                            h={"40px"}
                            m={"0px 10px 0px 0px"}
                            p={"0px 16px"}
                            bgColor={"#F7931E"}
                            _hover={{
                                bgColor: "#D6882B",
                            }}
                            _active={{
                                bgColor: "#D6882B",
                            }}
                            color={"#fff"}
                            onClick={finishOrderBtn}
                        >
                            Finish
                        </Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default ModalFinishTransaction
