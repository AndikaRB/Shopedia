import { Box, Button, Modal, ModalBody, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"

const ModalCancelUnpaidTransaction = ({ cancelIsOpen, cancelOnOpen, cancelOnClose, cancelUnpaidTransaction }) => {

    return (
        <Modal
            isOpen={cancelIsOpen}
            onOpen={cancelOnOpen}
            onClose={cancelOnClose}
            closeOnEsc={false}
        >
            <ModalOverlay />
            <ModalContent
                mt={"230px"}
                w={"400px"}
                h={"206.5px"}
                borderRadius={"12px"}
            >
                <ModalBody p={"32px 32px 24px"}>
                    <Box
                        display={"flex"}
                        flexDir={"column"}
                        alignItems={"center"}
                        alignContent={"center"}
                    >
                        <Text
                            color={"#31353BF5"}
                            fontSize={"24px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            mb={"14px"}
                            fontWeight={700}
                            lineHeight={"28px"}
                            letterSpacing={"-0,2px"}
                            textAlign={"center"}
                        >
                            Are you sure you want to cancel the transaction?
                        </Text>
                        <Text
                            fontSize={"14px"}
                            fontFamily={"Open Sauce One, sans-serif"}
                            mb={"16px"}
                            color={"#0000008A"}
                            lineHeight={"1.15"}
                        >
                            Confirm Your Transaction Cancellation
                        </Text>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDir={"row"}
                        justifyContent={"space-between"}
                    >
                        <Button
                            w={"164px"}
                            h={"48px"}
                            fontSize={"16px"}
                            fontFamily={"Open Sauce One, sans-serif"}
                            lineHeight={"22px"}
                            fontWeight={600}
                            bgColor={"#fff"}
                            border={"1px solid #0095DA"}
                            color={"#0095DA"}
                            borderRadius={"12px"}
                            onClick={() => cancelOnClose()}
                        >
                            Go Back
                        </Button>
                        <Button
                            w={"164px"}
                            h={"48px"}
                            fontSize={"16px"}
                            fontFamily={"Open Sauce One, sans-serif"}
                            lineHeight={"22px"}
                            fontWeight={600}
                            color={"#fff"}
                            bgColor={"#0095DA"}
                            borderRadius={"12px"}
                            _hover={{
                                bgColor: "#0370A2",
                            }}
                            _active={{
                                bgColor: "#0370A2",
                            }}
                            onClick={cancelUnpaidTransaction}
                        >
                            Yes, Cancel
                        </Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalCancelUnpaidTransaction