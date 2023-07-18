import { Box, Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Text } from "@chakra-ui/react"
import { AiOutlineSafety } from "react-icons/ai"

const ModalPayment = ({ close, BCARadio, BNIRadio, MandiriRadio, createNewTransaction, paymentIsOpen, paymentOnclose, BCA, BCAChecked, BNI, BNIChecked, mandiri, MandiriChecked, totalBill, totalPrice }) => {

    return (
        <Modal isOpen={paymentIsOpen} onClose={paymentOnclose} closeOnOverlayClick={false}>
            <ModalOverlay bg={{ lg: 'blackAlpha.900', base: 'blackAlpha.700' }} />
            <ModalContent width={'434.55px'} borderRadius={'10px'} mt={{ base: "10  0px", lg: '90px' }}>
                <ModalHeader width={'434.55px'} height={'51.99px'}>
                    <Box display={'flex'} flexDir={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                        <Image
                            src={close}
                            width={'18px'}
                            h={'18px'}
                            onClick={() => paymentOnclose()}
                        />
                        <Text
                            fontSize={'17px'}
                            pl={'15px'}
                            fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                            fontWeight={600}
                            color={'#000000B3'}
                        >
                            Payment
                        </Text>
                    </Box>
                </ModalHeader>
                <ModalBody w={'434.55px'}>
                    <Box display={'flex'} h={'210.92px'} pt={'8px 0px'} flexDir={'column'}>
                        <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            pb={'8px'}
                            pt={'16px'}
                            h={'45.98px'}
                        >
                            <Text
                                fontSize={'16px'}
                                fontWeight={800}
                                lineHeight={'22px'}
                                fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                                color={'#31353BF5'}
                            >
                                Payment Methods
                            </Text>
                        </Box>
                        <RadioGroup>
                            <Box
                                display={'flex'}
                                pt={'12px'}
                                h={'51.99px'}
                                alignItems={'center'}
                                borderBottom={'1px solid rgb(229, 231, 233)'}
                                onClick={BCARadio}
                                cursor={'pointer'}
                            >
                                <Image
                                    p={'0px 12px 14px 0px'}
                                    w={'45px'}
                                    h={'26px'}
                                    src={BCA}
                                />
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    flex={'1 1 0%'}
                                    minH={'52px'}
                                    pr={'16px'}
                                    pb={'12px'}
                                    flexDir={'row'}
                                >
                                    <Text
                                        fontSize={'14px'}
                                        fontWeight={700}
                                        lineHeight={'20px'}
                                        color={'#31353BF5'}
                                        fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                                    >
                                        BCA Virtual Account
                                    </Text>
                                    <Radio
                                        whiteSpace={'nowrap'}
                                        paddingLeftp={'8px'}
                                        position={'relative'}
                                        isChecked={BCAChecked}
                                    />
                                </Box>
                            </Box>

                            <Box
                                display={'flex'}
                                pt={'12px'}
                                h={'51.99px'}
                                alignItems={'center'}
                                borderBottom={'1px solid rgb(229, 231, 233)'}
                                onClick={BNIRadio}
                                cursor={"pointer"}
                            >
                                <Image
                                    p={'0px 12px 14px 0px'}
                                    w={'45px'}
                                    h={'27px'}
                                    src={BNI}
                                />
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    flex={'1 1 0%'}
                                    minH={'52px'}
                                    pr={'16px'}
                                    pb={'12px'}
                                    flexDir={'row'}
                                >
                                    <Text
                                        fontSize={'14px'}
                                        fontWeight={700}
                                        lineHeight={'20px'}
                                        color={'#31353BF5'}
                                        fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                                    >
                                        BNI Virtual Account
                                    </Text>
                                    <Radio
                                        whiteSpace={'nowrap'}
                                        paddingLeftp={'8px'}
                                        position={'relative'}
                                        isChecked={BNIChecked}
                                    />
                                </Box>
                            </Box>
                            <Box
                                display={'flex'}
                                pt={'12px'}
                                h={'51.99px'}
                                alignItems={'center'}
                                onClick={MandiriRadio}
                                cursor={"pointer"}
                            >
                                <Image
                                    p={'0px 12px 16px 0px'}
                                    w={'46px'}
                                    h={'29px'}
                                    src={mandiri}
                                />
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    flex={'1 1 0%'}
                                    minH={'52px'}
                                    pr={'16px'}
                                    pb={'12px'}
                                    flexDir={'row'}
                                >
                                    <Text
                                        fontSize={'14px'}
                                        fontWeight={700}
                                        lineHeight={'20px'}
                                        color={'#31353BF5'}
                                        fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                                    >
                                        Mandiri Virtual Account
                                    </Text>
                                    <Radio
                                        whiteSpace={'nowrap'}
                                        paddingLeftp={'8px'}
                                        position={'relative'}
                                        isChecked={MandiriChecked}
                                    />
                                </Box>
                            </Box>
                        </RadioGroup>
                    </Box>
                    <Box ml={'-24px'} w={'434.55px'} h={'7px'} bgColor={"rgb(243, 244, 245)"} />
                    <Box
                        h={'129.96px'}
                        p={'8px 0px'}
                    >
                        <Text
                            pt={'16px'}
                            pb={'16px'}
                            fontWeight={800}
                            fontSize={'16px'}
                            lineHeight={'22px'}
                            m={'0px'}
                            color={'#31353BF5'}
                            fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                        >
                            Payment Summary
                        </Text>
                        <Box
                            display={'flex'}
                            flexDir={'row'}
                            justifyContent={'space-between'}
                            mb={'8px'}
                            fontSize={'14px'}
                            lineHeight={'18px'}
                            fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                            whiteSpace={'nowrap'}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            color={'#31353BAD'}
                        >
                            <Text>
                                Total Cost
                            </Text>
                            <Text >
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(totalBill).split(",")[0]}
                            </Text>
                        </Box>
                        <Box
                            display={'flex'}
                            flexDir={'row'}
                            justifyContent={'space-between'}
                            fontSize={'14px'}
                            lineHeight={'18px'}
                            fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                            color={'#31353BAD'}
                        >
                            <Text>
                                Transaction fees
                            </Text>
                            <Text>
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(1000).split(",")[0]}
                            </Text>
                        </Box>
                    </Box>
                    <Box ml={'-24px'} w={'434.55px'} h={'7px'} bgColor={"rgb(243, 244, 245)"} />
                    <Box
                        h={'125.97px'}
                        pt={'24px'}
                        pb={'24px'}
                        display={'flex'}
                        justifyContent={'flex-start'}
                    >
                        <AiOutlineSafety style={{ height: "23.99px", minWidth: "23.99px", color: "#0095DA" }} />
                        <Box pl={'12px'}>
                            <Text
                                fontSize={'13px'}
                                mb={'4px'}
                                lineHeight={'18px'}
                                fontWeight={800}
                                fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                                color={'#31353BF5'}
                            >
                                Guaranteed Payment
                            </Text>
                            <Text
                                fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                                color={'#31353BAD'}
                                fontSize={'11px'}
                                lineHeight={'18px'}
                            >
                                Shopedia guarantees the security of the funds you pay in every transaction.
                            </Text>
                        </Box>
                    </Box>
                </ModalBody>

                <ModalFooter
                    display={"flex"}
                    justifyContent={'space-between'}
                    flexDir={'row'}
                    p={'12px 16px'}
                >
                    <Box>
                        <Text
                            fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                            color={'#31353BF5'}
                            fontSize={'12px'}
                            fontWeight={700}
                            lineHeight={'20px'}
                            whiteSpace={'nowrap'}
                            textOverflow={'ellipsis'}
                            overflow={'hidden'}
                        >
                            Total Bill
                        </Text>
                        <Text
                            fontFamily={"Open Sauce One, -apple-system,  BlinkMacSystemFont, sans-serif"}
                            color={'#31353BF5'}
                            fontSize={'16px'}
                            fontWeight={800}
                            m={'0px'}
                            lineHeight={'20px'}
                        >
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(totalPrice).split(",")[0]}
                        </Text>
                    </Box>
                    <Button
                        variant='ghost'
                        h={'40px'}
                        w={'201.28px'}
                        p={'0px 16px'}
                        lineHeight={'18px'}
                        borderRadius={'8px'}
                        fontWeight={800}
                        bgColor={'#0095DA'}
                        color={'#fff'}
                        onClick={createNewTransaction}
                        _hover={'none'}
                        _active={{
                            bgColor: '#0370A2'
                        }}
                    >
                        <Box >
                            <AiOutlineSafety style={{ height: "23.99px", width: "23.99px" }} />
                        </Box>
                        <Text pl={'2px'}>
                            Pay
                        </Text>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalPayment