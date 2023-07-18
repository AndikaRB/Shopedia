import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

    const authSelector = useSelector((state) => state.auth)

    const location = useLocation()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const backToLogin = () => {
        onClose()
    }

    const openAlert = () => {
        onOpen()
    }

    useEffect(() => {
        if (!authSelector.id) {
            openAlert()
        }
    }, [])

    if (authSelector.id) {
        return (children)
    } else if (!authSelector.id) {
        return (
            <>
                <AlertDialog isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={backToLogin} size={"sm"}
                    closeOnEsc={false}
                >
                    <AlertDialogOverlay
                        bg="blackAlpha.400"
                        backdropFilter='blur(50px) hue-rotate(90deg)'
                    >
                        <AlertDialogContent
                            borderRadius={'30px'}
                            mt={'-50px'}
                        >
                            <AlertDialogHeader fontSize="lg" fontWeight="bold" color={'#F7931E'} pt={'20px'}>
                                Notification!
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    boxSizing={'border-box'}
                                >
                                    <Text pb={'10px'} fontFamily={'Open Sauce One, Nunito Sans, -apple-system, sans-serif'} fontWeight={500}>
                                        You must log in first before do any transaction
                                    </Text>
                                    <Link to={"/login"} replace state={{ from: location }}>
                                        <Button
                                            borderRadius={'20px'}
                                            mt={'16px'}
                                            width={'220px'}
                                            colorScheme="blue"
                                            onClick={backToLogin}
                                        >
                                            OK
                                        </Button>
                                    </Link>
                                </Box>
                            </AlertDialogBody>

                            <AlertDialogFooter pb={'5px'}>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
    }
}

export default ProtectedRoute