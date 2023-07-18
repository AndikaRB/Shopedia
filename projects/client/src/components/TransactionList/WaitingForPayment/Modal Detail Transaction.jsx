import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"

const ModalDetailTransaction = ({ courir, shippingDate, isOpen, onClose, transaction, renderTransactionItems, transactionAddress }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt={'180px'} w={'504.88px'} maxHeight={"520px"} overflow={"auto"}>
                <ModalCloseButton />
                <ModalBody pt={'20px'} pb={'20px'}>
                    <Text
                        color={'#31353BF5'}
                        fontSize={'20px'}
                        m={'0px 0px 20px'}
                        fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                        fontWeight={700}
                        lineHeight={'26px'}
                        letterSpacing={'-0.1px'}
                        textAlign={'center'}
                        mt={'10px'}
                    >
                        Payment Detail
                    </Text>
                    <Box display={'flex'} justifyContent={'space-between'} m={'10px 0px'}>
                        <Text
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            Total Price ({transaction.total_quantity} {transaction.total_quantity > 1 ? "items" : "item"})
                        </Text>
                        <Text
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(transaction.total_price - transaction.shipping_fee - 1000).split(",")[0]}
                        </Text>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} m={'10px 0px'} borderBottom={'1px solid #e5e7e9'} pb={'10px'}>
                        <Text
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            Total Shipment Fee
                        </Text>
                        <Text
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(transaction.shipping_fee).split(",")[0]}
                        </Text>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} m={'10px 0px'}>
                        <Text
                            fontSize={'14px'}
                            color={'#000000B3'}
                            fontFamily={"Open Sauce One, sans-serif"}
                            fontWeight={'bold'}
                        >
                            Total Bill
                        </Text>
                        <Text
                            fontSize={'14px'}
                            color={'#000000B3'}
                            fontFamily={"Open Sauce One, sans-serif"}
                            fontWeight={'bold'}
                        >
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(transaction.total_price - 1000).split(",")[0]}
                        </Text>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} m={'10px 0px'} borderBottom={'1px solid #e5e7e9'} pb={'10px'}>
                        <Text
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            Application Service Fees
                        </Text>
                        <Text
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(1000).split(",")[0]}
                        </Text>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} m={'10px 0px'} borderBottom={'1px solid #e5e7e9'} pb={'10px'}>
                        <Text
                            fontSize={'16px'}
                            color={'#000000B3'}
                            fontFamily={"Open Sauce One, sans-serif"}
                            fontWeight={'bold'}
                        >
                            Total Payment
                        </Text>
                        <Text
                            fontSize={'16px'}
                            color={'#F7931E'}
                            fontFamily={"Open Sauce One, sans-serif"}
                            fontWeight={'bold'}
                        >
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(transaction.total_price).split(",")[0]}
                        </Text>
                    </Box>
                    <Text
                        fontSize={'14px'}
                        color={'#31353BAD'}
                        fontFamily={"Open Sauce One, sans-serif"}
                        fontWeight={'bold'}
                        pt={'2px'}
                    >
                        Paid with
                    </Text>
                    <Box display={'flex'} justifyContent={'space-between'} m={'10px 0px'} borderBottom={'1px solid #e5e7e9'} pb={'10px'}>
                        <Text
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            Mandiri Virtual Account
                        </Text>
                        <Text
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(transaction.total_price).split(",")[0]}
                        </Text>
                    </Box>
                    <Box p={'8px 0px'} pb={'30px'}>
                        <Text
                            color={'31353BF5'}
                            fontSize={'18px'}
                            fontFamily={"Open Sauce One, sans-serif"}
                            fontWeight={'bold'}
                            lineHeight={'20px'}
                            pb={'5px'}
                        >
                            Purchased items
                        </Text>
                        {renderTransactionItems()}
                        <Box
                            display={'flex'}
                            m={'10px 0px 2px'}
                            justifyContent={'space-between'}
                            fontSize={'14px'}
                            color={'#31353BAD'}
                            fontFamily={"Open Sauce One, sans-serif"}
                        >
                            <Text>
                                Shipping Fee
                            </Text>
                            <Text>
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(transaction.shipping_fee).split(",")[0]}
                            </Text>
                        </Box>
                        <Text
                            fontSize={'14px'}
                            fontFamily={"Open Sauce One, sans-serif"}
                            color={'#000000B3'}
                        >
                            {courir}
                        </Text>
                        <Text
                            fontSize={'14px'}
                            fontFamily={"Open Sauce One, sans-serif"}
                            color={'#000000B3'}
                        >
                            Estimated arrival {shippingDate}
                        </Text>
                        <Box mt={'10px'}>
                            <Text
                                fontSize={'14px'}
                                fontFamily={"Open Sauce One, sans-serif"}
                                color={'#000000B3'}
                                fontWeight={'bold'}
                            >
                                Shipping Address
                            </Text>
                            <Text
                                color={'#31353BAD'}
                                fontFamily={"Open Sauce One, sans-serif"}
                                lineHeight={'20px'}
                                fontSize={'14px'}
                            >
                                {transactionAddress.full_address}
                            </Text>
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalDetailTransaction