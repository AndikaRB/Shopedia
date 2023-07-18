import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import RenderProductBuyAgain from "./RenderProductBuyAgain"

const ModalProductBuyAgain = ({ buyIsOpen, buyOnOpen, buyOnClose, transactionItems }) => {

    const renderProductBuyAgain = () => {
        return transactionItems.map((val) => {
            return (
                <RenderProductBuyAgain
                    key={val.id.toString()}
                    productImage={val.Product.Image_Urls[0].image_url}
                    productName={val.Product.product_name}
                    price={val.Product.price}
                    productId={val.Product.id}
                />
            )
        })
    }

    return (
        <Modal isOpen={buyIsOpen} onOpen={buyOnOpen} onClose={buyOnClose}>
            <ModalOverlay />
            <ModalContent
                mt={"200px"}
                maxW={"515.53px"}
                borderRadius={"10px"}
            >
                <ModalCloseButton />
                <ModalBody p={"32px"}>
                    <Text
                        m={"0px 0px 16px -8px"}
                        color={"#31353BF5"}
                        fontSize={"16px"}
                        fontWeight={700}
                        fontFamily={
                            "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                        lineHeight={"20px"}
                        letterSpacing={"0px"}
                    >
                        Buy Again
                    </Text>
                    {renderProductBuyAgain()}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalProductBuyAgain