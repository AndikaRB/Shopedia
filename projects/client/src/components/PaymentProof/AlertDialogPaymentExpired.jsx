import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Box, Button, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import timeOut from "../../assets/timeOut.jpg"

const AlertDialogPaymentExpired = ({ expIsOpen, expOnOpen, expOnClose, onClose }) => {
    return (
        <AlertDialog isCentered closeOnOverlayClick={false} isOpen={expIsOpen} onOpen={expOnOpen} onClose={expOnClose} size={"sm"}
            closeOnEsc={false}
        >
            <AlertDialogOverlay
                bg="blackAlpha.800"
                backdropFilter='blur(50px) hue-rotate(90deg)'
            >
                <AlertDialogContent
                    w={'400px'}
                    borderRadius={'25px'}
                    mt={'-40px'}
                >
                    <AlertDialogBody>
                        <Text
                            fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                            fontSize="lg" fontWeight="bold" color={'#F7931E'} pt={'20px'} textAlign={'center'}
                        >
                            Payment Expired!
                        </Text>
                        <Image
                            src={timeOut}
                        />
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            justifyContent={'space-evenly'}
                            alignItems={'center'}
                            boxSizing={'border-box'}
                            gap={3}
                            fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                        >
                            <Link to={"/"} >
                                <Button
                                    borderRadius={'15px'}
                                    mt={'16px'}
                                    width={'170px'}
                                    colorScheme="blue"
                                    onClick={() => onClose()}
                                    fontSize={'14px'}
                                    color={'#0095DA'}
                                    bgColor={'#fff'}
                                    border={'1px solid #0095DA'}
                                    _hover={{ bgColor: "#DADADA" }}
                                    _active={'none'}
                                >
                                    Back to Homepage
                                </Button>
                            </Link>
                            <Link to={"/cart"} >
                                <Button
                                    fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                                    borderRadius={'15px'}
                                    mt={'16px'}
                                    width={'170px'}
                                    colorScheme="blue"
                                    onClick={() => onClose()}
                                    fontSize={'14px'}
                                >
                                    Create New Transaction
                                </Button>
                            </Link>
                        </Box>
                    </AlertDialogBody>

                    <AlertDialogFooter pb={'5px'}>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AlertDialogPaymentExpired