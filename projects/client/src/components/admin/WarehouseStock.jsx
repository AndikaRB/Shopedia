import {
    Box,
    Button,
    Grid,
    Image,
    Select,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useEffect } from "react"
import { IoIosAlert } from "react-icons/io"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import EditStock from "./EditStock"
import * as Yup from "yup"
import Alert from "../profile/Alert"
import { useSelector } from "react-redux"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin2Fill } from "react-icons/ri"
import LoadingWarehouseStock from "../loading/LoadingWarehouseStock"
import Search from "../Search"
import Pagination from "./Pagination"

const WarehouseStock = ({}) => {
    const authSelector = useSelector((state) => state.auth)
    const [data, setData] = useState([])
    const params = useParams()
    const [sortBy, setSortBy] = useState("product_name")
    const [sortDir, setSortDir] = useState("ASC")
    const [maxPage, setMaxPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [currentSearch, setCurrentSearch] = useState("")
    const [page, setPage] = useState(1)
    const [openedEdit, setOpenedEdit] = useState(null)
    const cancelRef = React.useRef()
    const [deleteAlert, setDeleteAlert] = useState(null)
    const [filter, setFilter] = useState(0)
    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const {
        onOpen: onOpenAlert,
        isOpen: isOpenAlert,
        onClose: onCloseAlert,
    } = useDisclosure()

    const doubleOnClick1 = () => {
        editFormik.handleSubmit()
        onCloseAlert()
        setIsLoading(false)
    }

    const fetchWarehouseData = async () => {
        const maxItemsPerPage = 4
        try {
            if (authSelector.RoleId === 2) {
                const response = await axiosInstance.get(
                    `/stock/getAllProduct/${authSelector.WarehouseId}`,
                    {
                        params: {
                            _page: page,
                            _limit: maxItemsPerPage,
                            product_name: currentSearch,
                            CategoryId: filter,
                            _sortBy: sortBy,
                            _sortDir: sortDir,
                        },
                    }
                )
                setTotalCount(response.data.dataCount)
                setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))

                if (page === 1) {
                    setData(response.data.data)
                } else {
                    setData(response.data.data)
                }
                setIsLoading(true)
            }

            const warehouse = await axiosInstance.get("/stock/getAllWarehouse")
            const warehouseId = warehouse.data.data.filter((val) => {
                return val.warehouse_name == params.id
            })

            const response = await axiosInstance.get(
                `/stock/getAllProduct/${warehouseId[0].id}`,
                {
                    params: {
                        _page: page,
                        _limit: maxItemsPerPage,
                        product_name: currentSearch,
                        CategoryId: filter,
                        _sortBy: sortBy,
                        _sortDir: sortDir,
                    },
                }
            )

            setTotalCount(response.data.dataCount)
            setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))

            if (page === 1) {
                setData(response.data.data)
            } else {
                setData(response.data.data)
            }
            setIsLoading(true)
        } catch (error) {
            console.log(error)
        }
    }
    const nextPage = () => {
        setPage(page + 1)
        setIsLoading(false)
    }

    const previousPage = () => {
        setPage(page - 1)
        setIsLoading(false)
    }

    const sortCategoryHandler = ({ target }) => {
        const { value } = target

        setSortBy(value.split(" ")[0])
        setSortDir(value.split(" ")[1])
        setIsLoading(false)
    }

    const formikSearch = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit: ({ search }) => {
            setCurrentSearch(search)
            setPage(1)
            setIsLoading(false)
        },
    })

    const searchHandler = ({ target }) => {
        const { name, value } = target
        formikSearch.setFieldValue(name, value)
    }

    const toast = useToast()

    const editFormik = useFormik({
        initialValues: {
            stock: "",
        },
        onSubmit: async ({ stock }) => {
            try {
                const response = await axiosInstance.patch(
                    `/stock/updateStock/${openedEdit.id}`,
                    {
                        stock,
                    }
                )
                toast({
                    title: "Stock Updated",
                    description: response.data.message,
                    status: "success",
                })

                editFormik.setFieldValue("stock", "")

                fetchWarehouseData()
                setOpenedEdit(null)
            } catch (error) {
                console.log(error)
                toast({
                    title: "Failed Update Stock",
                    description: error.response.data.message,
                    status: "error",
                })
            }
        },
        validationSchema: Yup.object({
            username: Yup.number(),
        }),
        validateOnChange: false,
    })

    const deleteAdminHandler = async (id) => {
        try {
            await axiosInstance.patch(`/stock/deleteStock/${deleteAlert.id}`)

            fetchWarehouseData()

            toast({
                title: "Stock Deleted",
                status: "info",
            })
        } catch (error) {
            console.log(error.response)
            toast({
                title: "Failed Delete Stock",
                description: error.response.data.message,
                status: "error",
            })
        }
    }

    const doubleOnClick2 = () => {
        setDeleteAlert(null)
        deleteAdminHandler(deleteAlert.id)
        setIsLoading(false)
    }

    const filterBookHandler = ({ target }) => {
        const { value } = target

        setFilter(value)
        setIsLoading(false)
    }

    const fetchAllCategory = async () => {
        try {
            const response = await axiosInstance("/stock/getAllCategory")

            setCategory(response.data.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    const renderCategory = () => {
        return category.map((val) => {
            return (
                <option value={val.id} key={val.id}>
                    {val.category_name}
                </option>
            )
        })
    }

    useEffect(() => {
        fetchAllCategory()
    }, [])
    useEffect(() => {
        fetchWarehouseData()
    }, [sortDir, sortBy, currentSearch, page, openedEdit, filter])
    useEffect(() => {
        if (openedEdit) {
            editFormik.setFieldValue("stock", openedEdit.stock)
        }
    }, [openedEdit])
    return (
        <Box ml="220px" p="24px" bgColor={"var(--NN50,#F0F3F7);"} h="100vh">
            <Box mb="16px">
                <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
                    Update Stock Warehouse {params.id}
                </Text>
            </Box>
            <Grid gap="4" templateColumns={"repeat(3, 1fr)"} mt="4" mb="4">
                <Select
                    onChange={filterBookHandler}
                    fontSize={"15px"}
                    bgColor="white"
                    color={"#6D6D6F"}
                >
                    <option selected>All</option>
                    {renderCategory()}
                </Select>

                <Select
                    onChange={sortCategoryHandler}
                    fontSize={"15px"}
                    bgColor="white"
                    color={"#6D6D6F"}
                >
                    <option value="product_name ASC" selected>
                        Name A-Z
                    </option>
                    <option value="product_name DESC">Name Z-A</option>
                    <option value="stock DESC">most stock</option>
                    <option value="stock ASC">least stock</option>
                </Select>

                <Search
                    formikSearch={formikSearch}
                    searchHandler={searchHandler}
                    placeholder="Search by product name"
                    width={"100%"}
                />
            </Grid>
            <Table
                variant={"striped"}
                colorScheme={"blue"}
                bgColor="white"
                borderRadius="8px"
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            >
                <Thead>
                    <Tr>
                        <Th p="10px">Image</Th>
                        <Th p="10px">Product Name</Th>
                        <Th p="10px">Category</Th>
                        <Th p="10px">Price</Th>
                        <Th p="10px">Stock</Th>
                        <Th p="10px">Option</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {isLoading &&
                        data.map((val) => {
                            return (
                                <Tr h="auto" key={val.id.toString()}>
                                    <Td p="10px" w="100px">
                                        <Image
                                            src={
                                                val.Product.Image_Urls[0]
                                                    .image_url
                                            }
                                        />
                                    </Td>
                                    <Td
                                        p="10px"
                                        w="500px"
                                        overflow={"hidden"}
                                        textOverflow="ellipsis"
                                    >
                                        {val.Product.product_name}
                                    </Td>
                                    <Td p="10px">
                                        {val.Product.Category.category_name}
                                    </Td>
                                    <Td p="10px" fontWeight={"660"} w="200px">
                                        Rp.{" "}
                                        {val.Product.price.toLocaleString(
                                            "id-ID"
                                        )}
                                    </Td>
                                    <Td p="10px">{val.stock}</Td>
                                    <Td p="10px" w="100px">
                                        <Box display={"flex"} gap="2">
                                            <Button
                                                color={"white"}
                                                bgColor="#F7931E"
                                                _hover={false}
                                                _active={false}
                                                onClick={() =>
                                                    setOpenedEdit(val)
                                                }
                                                title="Update Stock"
                                            >
                                                <BiEdit fontSize={"17px"} />
                                            </Button>
                                            <Button
                                                color={"white"}
                                                bgColor="#0095DA"
                                                _hover={false}
                                                _active={false}
                                                title="Delete Stock"
                                                onClick={() =>
                                                    setDeleteAlert(val)
                                                }
                                                disabled={val.stock === 0}
                                            >
                                                <RiDeleteBin2Fill
                                                    fontSize={"17px"}
                                                />
                                            </Button>
                                        </Box>
                                    </Td>
                                </Tr>
                            )
                        })}
                    {isLoading === false ? <LoadingWarehouseStock /> : null}
                </Tbody>
            </Table>
            {!data.length && isLoading === true ? (
                <Box p="10px" bgColor={"#E5F9F6"}>
                    <Box mx="auto">
                        <Box display={"flex"} mx="auto" w="170px">
                            <IoIosAlert fontSize={"25px"} color="#0095DA" />
                            <Text fontWeight="medium" ml="2">
                                No product found
                            </Text>
                        </Box>
                    </Box>
                </Box>
            ) : null}

            <Pagination
                maxPage={maxPage}
                nextPage={nextPage}
                page={page}
                previousPage={previousPage}
            />

            {/* Modal update */}
            <EditStock
                editFormik={editFormik}
                isOpen={openedEdit}
                header={"Update Stock"}
                onClose={() => setOpenedEdit(null)}
                color={"#0095DA"}
                onOpen={onOpenAlert}
                onCloseMod={() => setOpenedEdit(null)}
            />

            {/* Alert update stock modal */}
            <Alert
                body={"Is stock that you entered correct?"}
                cancelRef={cancelRef}
                color={"#0095DA"}
                header={"Update Stock"}
                isOpen={isOpenAlert}
                leftButton={"Cancel"}
                onClose={onCloseAlert}
                onSubmit={doubleOnClick1}
                rightButton={"Update Stock"}
            />

            {/* Alert delete Stock */}
            <Alert
                body={`Are you sure to delete?`}
                cancelRef={cancelRef}
                color={"#0095DA"}
                header={"Delete Stock"}
                isOpen={deleteAlert}
                leftButton={"Cancel"}
                onClose={() => setDeleteAlert(null)}
                onSubmit={() => doubleOnClick2()}
                rightButton={"Delete"}
            />
        </Box>
    )
}

export default WarehouseStock
