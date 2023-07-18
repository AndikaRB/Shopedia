import {
    Box,
    Button,
    Text,
    Th,
    Thead,
    Tr,
    Table,
    TableContainer,
    Tbody,
    Td,
    Select,
    HStack,
    Skeleton,
    Input,
    InputGroup,
    GridItem,
    Grid,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useSelector } from "react-redux"
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai"
import { TbSearch } from "react-icons/tb"
import TransactionOrderList from "../../components/admin/order/TransactionOrderList"

const AdminOrderHistory = () => {
    const [transactionData, setTransactionData] = useState([])
    const [warehouseData, setWarehouseData] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const authSelector = useSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [filterWarehouse, setFilterWarehouse] = useState("")
    const [filterMonth, setFilterMonth] = useState("")
    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("DESC")
    const [searchValue, setSearchValue] = useState("")
    const [searchInput, setSearchInput] = useState("")

    const maxItemsPerPage = 10
    const fetchData = async () => {
        try {
            let url = `/admin/order-history/getOrder`
            if (authSelector.WarehouseId) {
                await axiosInstance.get(
                    (url += `?WarehouseId=${authSelector.WarehouseId}`)
                )
            }
            const response = await axiosInstance.get(url, {
                params: {
                    _page: page,
                    _limit: maxItemsPerPage,
                    WarehouseId: filterWarehouse,
                    createdAt: filterMonth,
                    _sortBy: sortBy,
                    _sortDir: sortDir,
                    transaction_name: searchValue,
                },
            })
            setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))
            if (page === 1) {
                setTransactionData(response.data.data)
            } else {
                setTransactionData(response.data.data)
            }
            setIsLoading(true)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchWarehouse = async () => {
        try {
            const response = await axiosInstance.get(
                "/admin/order-history/findWarehouse"
            )
            setWarehouseData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const filterWarehouseBtnHandler = ({ target }) => {
        const { value } = target
        setFilterWarehouse(value)
        setIsLoading(false)
    }

    const filterMonthBtnHandler = ({ target }) => {
        const { value } = target
        setFilterMonth(value)
        setIsLoading(false)
    }

    const sortHandler = ({ target }) => {
        const { value } = target
        setSortBy(value.split(" ")[0])
        setSortDir(value.split(" ")[1])
        setIsLoading(false)
    }
    const searchBtnHandler = () => {
        setSearchValue(searchInput)
        setIsLoading(false)
    }
    const handleKeyEnter = (e) => {
        if (e.key === "Enter") {
            setSearchValue(searchInput)
        }
    }
    const nextPageBtnHandler = () => {
        setPage(page + 1)
        setIsLoading(false)
    }

    const prevPageBtnHandler = () => {
        setPage(page - 1)
        setIsLoading(false)
    }

    const renderOrderData = () => {
        return transactionData.map((val) => {
            return (
                <TransactionOrderList
                    key={val.id.toString()}
                    transactionItems={val.TransactionItems}
                    transaction_name={val.transaction_name}
                    username={val.User.username}
                    order_date={val.createdAt}
                    total_quantity={val.total_quantity}
                    total_price={val.total_price}
                    order_status={val.Order_status.order_status_name}
                    warehouse_name={val.Warehouse.warehouse_name}
                />
            )
        })
    }
    useEffect(() => {
        fetchData()
        fetchWarehouse()
    }, [
        page,
        filterMonth,
        filterWarehouse,
        sortBy,
        sortDir,
        authSelector,
        searchValue,
    ])
    return (
        <>
            <Box ml="250px" mr="1.5em">
                <Box mt="2em">
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        color="#F7931E"
                    >
                        Order History
                    </Text>
                    <Box mt="3vh">
                        <Grid
                            p="5px"
                            gap="5"
                            w="full"
                            gridTemplateColumns="repeat(4,1fr)"
                        >
                            {/* Sort */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                                onChange={sortHandler}
                            >
                                <Select>
                                    <option value="id">Sort</option>
                                    <option value="createdAt DESC">
                                        Latest
                                    </option>
                                    <option value="createdAt ASC">Old</option>
                                </Select>
                            </GridItem>

                            {/* Month */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                                onChange={filterMonthBtnHandler}
                            >
                                <Select>
                                    <option value="">By Month</option>
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </Select>
                            </GridItem>

                            {/* Warehouse */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                onChange={filterWarehouseBtnHandler}
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                            >
                                <Select>
                                    <option value="">By Warehouse</option>
                                    {authSelector.WarehouseId ===
                                    transactionData.map(
                                        (val) => val.WarehouseId
                                    )[0]
                                        ? transactionData.map((val) => (
                                              <option value={val.WarehouseId}>
                                                  {val.Warehouse.warehouse_name}
                                              </option>
                                          ))[0]
                                        : warehouseData.map((val) => (
                                              <option value={val.id}>
                                                  {val.warehouse_name}
                                              </option>
                                          ))}
                                </Select>
                            </GridItem>

                            {/* Search */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                            >
                                <InputGroup>
                                    <Input
                                        placeholder="Search here"
                                        _placeholder={{ fontSize: "14px" }}
                                        onChange={(e) =>
                                            setSearchInput(e.target.value)
                                        }
                                        onKeyDown={handleKeyEnter}
                                        value={searchInput}
                                    />
                                    <Button
                                        borderLeftRadius={"0"}
                                        type="submit"
                                        bgColor={"white"}
                                        border="1px solid #e2e8f0"
                                        borderLeft={"0px"}
                                        onClick={searchBtnHandler}
                                    >
                                        <TbSearch />
                                    </Button>
                                </InputGroup>
                            </GridItem>
                        </Grid>
                    </Box>
                    <TableContainer
                        border="1px solid #dfe1e3"
                        mt="3vh"
                        borderRadius="8px"
                        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                        bgColor="white"
                    >
                        <Table variant={"striped"} colorScheme={"blue"}>
                            <Thead>
                                <Tr>
                                    <Th p="10px">
                                        <Text fontSize="10px">invoice</Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">User</Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">Order Date</Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">
                                            Total quantity
                                        </Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">Total Price</Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">
                                            Order status
                                        </Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">Warehouse</Text>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {isLoading && renderOrderData()}
                                {isLoading === false ? (
                                    <Tr>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="60%"
                                                borderRadius="8px"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="70%"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="100%"
                                                borderRadius="8px"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="45%"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="30%"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                    </Tr>
                                ) : null}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {/* Page */}
                    <HStack justifyContent="center" gap="2" mt="1em">
                        {page === 1 ? null : (
                            <AiOutlineLeftCircle
                                bgColor="#0095DA"
                                onClick={prevPageBtnHandler}
                                color="#0095DA"
                                cursor="pointer"
                                size={20}
                            />
                        )}
                        <Text color="#0095DA">{page}</Text>
                        {page >= maxPage ? null : (
                            <AiOutlineRightCircle
                                bgColor="#0095DA"
                                color="#0095DA"
                                onClick={nextPageBtnHandler}
                                cursor="pointer"
                                size={20}
                            />
                        )}
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default AdminOrderHistory
