import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Text } from "@chakra-ui/react"

const AlertDialogDeleteSelectedCart = ({ isOpen, onClose, selectedCart, deleteAllCartsBtnHandler }) => {

    return (
        <AlertDialog
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            closeOnEsc={false}
        >
            <AlertDialogOverlay bg="blackAlpha.400">
                <AlertDialogContent
                    position={"fixed"}
                    width={"400px"}
                    maxW={"400px"}
                    height={"270px"}
                    zIndex={"60"}
                    opacity={"1"}
                    p={"32px 32px 24px"}
                    boxShadow={"0px 1px 6px rgba(49,53,59,0.12)"}
                    borderRadius={"30px"}
                    mt={"10px"}
                >
                    <AlertDialogHeader
                        fontSize="24px"
                        fontWeight="600"
                        fontFamily={
                            "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                        color={"#31353BF5"}
                        textAlign={"center"}
                        m={"0px 0px 14px"}
                        letterSpacing={"-0.2px"}
                        lineHeight={"28px"}
                        p={"0px"}
                    >
                        Remove {selectedCart} items?
                    </AlertDialogHeader>
                    <AlertDialogBody
                        fontSize={"17px"}
                        fontWeight={"400px"}
                        fontFamily={
                            "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                        letterSpacing={"0px"}
                        line-height={"22px"}
                        m={"0px 0px 32px"}
                        p={"0px"}
                        color={"#31353BAD"}
                        textAlign={"center"}
                    >
                        <Text m={"0px 0px 25px"}>
                            The selected items will be removed from your cart.
                        </Text>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            boxSizing={"border-box"}
                        >
                            <Button
                                display={"block"}
                                bgColor={"#0095DA"}
                                onClick={deleteAllCartsBtnHandler}
                                color={"#fff"}
                                p={"0px 16px"}
                                height={"48px"}
                                position={"relative"}
                                width={"304px"}
                                fontFamily={"inherit"}
                                fontWeight={700}
                                fontSize={"16px"}
                                _hover={"none"}
                                borderRadius={"20px"}
                                _active={{ bgColor: "#165877" }}
                            >
                                Remove Items
                            </Button>
                            <Button
                                onClick={onClose}
                                bgColor={"#fff"}
                                color={"#F7931E"}
                                display={"block"}
                                m={"8px 0px 0px"}
                                p={"0px 16px"}
                                fontWeight={700}
                                height={"48px"}
                                width={"304px"}
                                fontFamily={"inherit"}
                                _hover={"none"}
                                _active={"none"}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </AlertDialogBody>
                    <AlertDialogFooter></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AlertDialogDeleteSelectedCart