import {
    Box,
    Text,
    Th,
    Thead,
    Tr,
    Table,
    TableContainer,
    Tbody,
    Td,
    useDisclosure,
} from "@chakra-ui/react"
import moment from "moment"
import ModalOrderHistory from "./ModalOrderHistory"

const TransactionOrderList = ({
    transactionItems,
    transaction_name,
    username,
    total_quantity,
    warehouse_name,
    order_date,
    order_status,
    total_price,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log("TR", transactionItems)
    return (
        <>
            <Tr h="50px">
                <Td p="10px">
                    <Text
                        color="#0095DA"
                        variant="link"
                        cursor="pointer"
                        onClick={() => onOpen()}
                        _hover={{
                            color: "#0095DA",
                            textDecoration: "underline",
                        }}
                    >
                        {transaction_name}
                    </Text>
                    {/* </Button> */}
                </Td>
                <Td p="10px">
                    <Text overflow="hidden" textOverflow="ellipsis">
                        {username}
                    </Text>
                </Td>
                <Td p="10px">
                    <Text>
                        {moment(order_date).format("DD MMMM YYYY, HH:mm:ss")}
                    </Text>
                </Td>
                <Td p="10px">
                    <Text>{total_quantity}</Text>
                </Td>
                <Td p="10px">
                    <Text>
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                        }).format(total_price)}
                    </Text>
                </Td>
                <Td p="10px">
                    <Text>{order_status}</Text>
                </Td>

                <Td p="10px">
                    <Text>{warehouse_name}</Text>
                </Td>
            </Tr>

            {/* Modal */}
            <ModalOrderHistory
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                transactionItems={transactionItems}
            />
        </>
    )
}

export default TransactionOrderList
