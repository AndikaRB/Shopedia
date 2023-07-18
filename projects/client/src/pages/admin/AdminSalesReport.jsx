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
    Select,
    HStack,
    Grid,
    GridItem,
    Input,
    InputGroup,
    Button,
    Skeleton,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"
import { useSelector } from "react-redux"
import { TbSearch } from "react-icons/tb"
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai"

const AdminSalesReport = () => {
    const [salesData, setSalesData] = useState([])
    const [warehouseData, setWarehouseData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [filterWarehouse, setFilterWarehouse] = useState("")
    const [filterCategory, setFilterCategory] = useState("")
    const [filterMonth, setFilterMonth] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [sort, setSort] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const authSelector = useSelector((state) => state.auth)

    const maxItemsPerPage = 10
    const fetchData = async () => {
        try {
            let url = `/admin/sales-report/get`

            if (authSelector.WarehouseId) {
                url += `?WarehouseId=${authSelector.WarehouseId}`
            }
            console.log("url", url)
            const response = await axiosInstance.get(url, {
                params: {
                    _page: page,
                    _limit: maxItemsPerPage,
                    WarehouseId: filterWarehouse,
                    CategoryId: filterCategory,
                    createdAt: filterMonth,
                    product_name: searchValue,
                    category_name: searchValue,
                    _sortBy: sort,
                },
            })
            setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))
            if (page === 1) {
                setSalesData(response.data.data)
            } else {
                setSalesData(response.data.data)
            }
            setIsLoading(true)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchWarehouse = async () => {
        try {
            const response = await axiosInstance.get(
                "/admin/sales-report/findWarehouse"
            )

            setWarehouseData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get("/categories")
            setCategoryData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const filterWarehouseBtnHandler = ({ target }) => {
        const { value } = target
        setFilterWarehouse(value)
        setIsLoading(false)
    }

    const filterCategoryBtnHandler = ({ target }) => {
        const { value } = target
        setFilterCategory(value)
        setIsLoading(false)
    }

    const filterMonthBtnHandler = ({ target }) => {
        const { value } = target
        setFilterMonth(value)
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

    const sortHandler = ({ target }) => {
        const { value } = target
        setSort(value)
        setIsLoading(false)
    }

    const nextPageBtnHandler = () => {
        setPage(page + 1)
        setIsLoading(false)
    }

    const prevPageBtnHandler = () => {
        setPage(page - 1)
        setIsLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [
        filterWarehouse,
        filterCategory,
        filterMonth,
        page,
        sort,
        searchValue,
        authSelector,
    ])

    useEffect(() => {
        fetchWarehouse()
        fetchCategory()
    }, [])
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
                        Sales Report
                    </Text>
                    <Box mt="3vh">
                        <Grid
                            p="5px"
                            gap="5"
                            w="full"
                            gridTemplateColumns="repeat(5,1fr)"
                        >
                            {/* Sort */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                                onChange={sortHandler}
                            >
                                <Select placeholder="---Sort---">
                                    <option value={"ASC"}>Old</option>
                                    <option value={"DESC"}>Latest</option>
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
                                    <option value="">---By Month---</option>
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

                            {/* Category */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                                onChange={filterCategoryBtnHandler}
                            >
                                <Select>
                                    <option value="">---By Category---</option>
                                    {categoryData.map((val) => (
                                        <option value={val.id}>
                                            {val.category_name}
                                        </option>
                                    ))}
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
                                    <option value="">---By Warehouse---</option>
                                    {authSelector.WarehouseId ===
                                    salesData.map((val) => val.WarehouseId)[0]
                                        ? salesData.map((val) => (
                                              <option value={val.WarehouseId}>
                                                  {val.warehouse_name}
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
                                        placeholder="Find product or category"
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
                                    <Th w="150px" fontWeight="bold">
                                        <Text fontSize="10px">Date</Text>
                                    </Th>
                                    <Th w="100px" fontWeight="bold">
                                        <Text fontSize="10px">Category</Text>
                                    </Th>
                                    <Th w="200px" fontWeight="bold">
                                        <Text fontSize="10px">
                                            Product Name
                                        </Text>
                                    </Th>
                                    <Th w="130px" fontWeight="bold">
                                        <Text fontSize="10px">Price</Text>
                                    </Th>
                                    <Th w="50px" fontWeight="bold">
                                        <Text fontSize="10px">quantity</Text>
                                    </Th>
                                    <Th w="130px" fontWeight="bold">
                                        <Text fontSize="10px">Total</Text>
                                    </Th>
                                    <Th w="100px" fontWeight="bold">
                                        <Text fontSize="10px">Warehouse</Text>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {isLoading &&
                                    salesData.map((val) => (
                                        <Tr>
                                            <Td maxW="150px">
                                                <Text>
                                                    {
                                                        val.createdAt.split(
                                                            "T"
                                                        )[0]
                                                    }{" "}
                                                    /{" "}
                                                    {val.createdAt
                                                        .split("T")[1]
                                                        .split(".000Z")}
                                                </Text>
                                            </Td>

                                            <Td maxW="100px">
                                                <Text>{val.category_name}</Text>
                                            </Td>
                                            <Td maxW="200px">
                                                <Text
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                >
                                                    {val.product_name}
                                                </Text>
                                            </Td>
                                            <Td maxW="130px">
                                                <Text>
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                            minimumFractionDigits: 0,
                                                        }
                                                    ).format(val.price)}
                                                </Text>
                                            </Td>
                                            <Td maxW="50px">
                                                <Text>{val.quantity}</Text>
                                            </Td>

                                            <Td maxW="130px">
                                                <Text>
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                            minimumFractionDigits: 0,
                                                        }
                                                    ).format(val.total)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {val.warehouse_name}
                                                </Text>
                                            </Td>
                                        </Tr>
                                    ))}
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

export default AdminSalesReport
