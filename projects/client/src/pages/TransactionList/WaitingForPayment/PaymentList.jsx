import { Box, Button, CircularProgress, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../../api"
import PaymentListItem from "./PaymentListItem"
import emptyStroll from "../../../assets/emptyStroll.jpg"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { fillUnpaidTrans } from "../../../redux/features/transSlice"

const PaymentList = () => {
    const [unpaidTransaction, setUnpaidTransaction] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const [count, setCount] = useState(1)

    const dispatch = useDispatch()

    const fetchUnpaidTransaction = async () => {
        try {
            const response = await axiosInstance.get("/transactions/unpaid-transaction")

            setCount(response.data.dataCount)

            setUnpaidTransaction(response.data.data)

            dispatch(fillUnpaidTrans(response.data.data))

            setIsloading(true)
        } catch (err) {
            console.log(err)
        }
    }

    const renderPaymentListItem = () => {
        return unpaidTransaction.map((val) => {
            return (
                <PaymentListItem
                    key={val.id.toString()}
                    paymentDate={val.payment_date}
                    paymentExpiredDate={val.payment_expired_date}
                    transactionAddress={val.Address}
                    transactionName={val.transaction_name}
                    totalPrice={val.total_price}
                    paymentMethod={val.payment_method}
                    transaction={val}
                    transactionItems={val.TransactionItems}
                    courirDuration={val.courir_duration}
                    fetchUnpaidTransaction={fetchUnpaidTransaction}
                />
            )
        })
    }

    useEffect(() => {
        fetchUnpaidTransaction()
    }, [isLoading, unpaidTransaction])

    return (
        <>
            <Box display={{ lg: 'inline', base: 'none' }}>
                <Box mt={"70px"}>
                    <Link to="/transaction-list">
                        <Box pt={"12px"} mt={"-10px"}>
                            <Button
                                bgColor={"white"}
                                fontSize={"35px"}
                                _hover={"none"}
                                pb={"5px"}
                            >
                                ←
                            </Button>
                        </Box>
                    </Link>
                </Box>
                <Box
                    mt={"38px"}
                    mx={"auto"}
                    maxW={"1080px"}
                    w={"763px"}
                    minH={count === 0 ? "505px" : "1042.94px"}
                    h={count === 0 ? "505px" : "1042.94px"}
                    p={"16px"}
                    border={"1px solid #99d5f0"}
                    boxShadow={"0 0 10px 0 rgb(0 0 0 / 10%)"}
                    borderRadius={"15px"}
                >
                    <Text
                        color={"#31353BAD"}
                        fontSize={"14px"}
                        fontFamily={"Open Sauce One, sans-serif"}
                        fontWeight={"bold"}
                        lineHeight={"16px"}
                    >
                        Awaiting For Payment
                    </Text>
                    {isLoading === false ? (
                        <Box
                            w={"763px"}
                            h={"400px"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            alignContent={"center"}
                        >
                            <CircularProgress
                                isIndeterminate
                                color="#F7931E"
                                thickness="160px"
                                size="100px"
                            />
                        </Box>
                    ) : null}
                    {count === 0 ? (
                        <Box
                            m={"32px 214.5px"}
                            w={"300px"}
                            h={"342.59px"}
                            display={"flex"}
                            justifyContent={"center"}
                            flexDir={"column"}
                            alignContent={"center"}
                            alignItems={"center"}
                        >
                            <Image
                                src={emptyStroll}
                                p={"0px"}
                                m={"0px"}
                                w={"250px"}
                                h={"187.5px"}
                            />
                            <Text
                                textAlign={"center"}
                                fontSize={"16px"}
                                color={"#31353BAD"}
                                m={"14px 3.5px"}
                                fontFamily={"Open Sauce One, sans-serif"}
                                fontWeight={"bold"}
                                lineHeight={"16px"}
                            >
                                No transactions yet
                            </Text>
                            <Text
                                textAlign={"center"}
                                fontSize={"14px"}
                                color={"#31353BAD"}
                                m={"3.5px 3.5px 28px"}
                                fontFamily={"Open Sauce One, sans-serif"}
                                fontWeight={"unset"}
                                lineHeight={"16px"}
                            >
                                Come on, start shopping and fulfill your various
                                needs at Shopedia.
                            </Text>
                            <Link to={"/"}>
                                <Button
                                    borderRadius={"8px"}
                                    minH={"48px"}
                                    textAlign={"center"}
                                    fontSize={"16px"}
                                    lineHeight={"22px"}
                                    fontWeight={600}
                                    fontFamily={"Open Sauce One, sans-serif"}
                                    color={"#fff"}
                                    bgColor={"#0095DA"}
                                    w={"300px"}
                                    _hover={{
                                        bgColor: "#0370A2",
                                    }}
                                    _active={{
                                        bgColor: "#0370A2",
                                    }}
                                >
                                    Start Shopping
                                </Button>
                            </Link>
                        </Box>
                    ) : (
                        <Box>
                            {isLoading &&
                                <Box>
                                    {renderPaymentListItem()}
                                </Box>}
                        </Box>
                    )}
                </Box>
            </Box>

            {/* mobile responsive */}
            <Box display={{ lg: 'none', base: 'inline' }}>
                <Box
                    h={'52px'}
                    maxW={'500px'}
                    display={'flex'}
                    alignItems={'center'}
                    flexdir={'row'}
                    justifyContent={'flex-start'}
                    bgColor={'white'}
                    position={'fixed'}
                    left="0"
                    right={"0"}
                    top="0"
                    zIndex="9998"
                >
                    <Link to={'/transaction-list'}>
                        <Box w={'52px'} h={'52px'} p={'1px 6px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <HiOutlineArrowLeft style={{ height: "24px", width: "24px", color: "#7d8086" }} />
                        </Box>
                    </Link>
                    <Text
                        fontSize={'16px'}
                        color={'#31353BF5'}
                        fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                        lineHeight={'20px'}
                        fontWeight={700}
                    >
                        Awaiting Payment
                    </Text>
                </Box>
                <Box h={'52px'} />
                {renderPaymentListItem()}
            </Box>
        </>
    )
}

export default PaymentList
