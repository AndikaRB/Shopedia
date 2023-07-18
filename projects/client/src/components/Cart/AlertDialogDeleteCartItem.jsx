import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Text } from "@chakra-ui/react"
import { ImCheckmark, ImCross } from "react-icons/im"

const AlertDialogDeleteCartItem = ({ isOpen, onClose, confirmDeleteBtnHandler }) => {

    return (
        <AlertDialog isCentered isOpen={isOpen} onClose={onClose} closeOnEsc={false}>
            <AlertDialogOverlay
                bg="blackAlpha.400"
            >
                <AlertDialogContent
                    position={'fixed'}
                    width={'500px'}
                    height={'200px'}
                    zIndex={'60'}
                    opacity={'1'}
                    p={'32px 32px 24px'}
                    boxShadow={'0px 1px 6px rgba(49,53,59,0.12)'}
                    borderRadius={'30px'}
                >
                    <AlertDialogHeader
                        fontSize="24px"
                        fontWeight="600"
                        fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                        color={'#31353BF5'}
                        textAlign={'center'}
                        m={'0px 0px 14px'}
                        letterSpacing={'-0.2px'}
                        lineHeight={'28px'}
                        p={'0px'}
                    >
                        Remove items?
                    </AlertDialogHeader>

                    <AlertDialogBody
                        fontSize={'17px'}
                        fontWeight={'400px'}
                        fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                        letterSpacing={'0px'}
                        line-height={'22px'}
                        m={'0px 0px 15px'}
                        p={'0px'}
                        color={'#31353BAD'}
                        textAlign={'center'}
                    >
                        <Text
                            m={'0px 0px 25px'}
                        >
                            The selected items will be removed from your cart.
                        </Text>
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            boxSizing={'border-box'}
                            justifyContent={'space-evenly'}
                            gap={3}
                        >
                            <Button
                                bgColor={'#0095DA'}
                                onClick={confirmDeleteBtnHandler}
                                color={'#fff'}
                                p={'0px 16px'}
                                height={'48px'}
                                width={'100px'}
                                fontFamily={'inherit'}
                                fontWeight={700}
                                fontSize={'16px'}
                                _hover={'none'}
                                _active={{ bgColor: "#165877" }}
                                borderRadius={'30px'}
                            >
                                <ImCheckmark />
                            </Button>
                            <Button
                                onClick={onClose}
                                bgColor={'#fff'}
                                border={"1px solid #F7931E"}
                                color={'#F7931E'}
                                p={'0px 16px'}
                                fontWeight={700}
                                height={'48px'}
                                width={'100px'}
                                fontFamily={'inherit'}
                                _hover={'none'}
                                borderRadius={'30px'}
                                m={'0px'}

                            >
                                <ImCross />
                            </Button>
                        </Box>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AlertDialogDeleteCartItem