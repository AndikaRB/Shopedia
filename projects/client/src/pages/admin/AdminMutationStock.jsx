import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../../api";
import { TbSearch } from "react-icons/tb";
import { IoIosAlert } from "react-icons/io";
import AdminStockMutationComp from "../../components/admin/AdminStockMutationComp";

const AdminMutationStock = () => {
  const [stockData, setStockData] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("ASC");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedWarehouse1, setSelectedWarehouse1] = useState(0);
  const [selectedWarehouse2, setSelectedWarehouse2] = useState(0);

  const toast = useToast(); 

  const fetchAdminData = async () => {
    const maxItemsPerPage = 5;
    try {
      const response = await axiosInstance.get(
        "/stock-mutation/getAllStockMutation",
        {
          params: {
            _page: page,
            _limit: maxItemsPerPage,
            id: currentSearch,
            _sortBy: sortBy,
            _sortDir: sortDir,
          },
        }
      );

      setTotalCount(response.data.dataCount);
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage));
      setStockData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveMut = async (val) => {
    await axiosInstance.post(`/stock-mutation/approveMutation/${val.id}`);
    fetchAdminData();
  };
  const denyMut = async (val) => {
    await axiosInstance.post(`/stock-mutation/denyMutation/${val.id}`);
    fetchAdminData();
  };

  const renderStockMutation = () => {
    return stockData.map((val) => {
      return (
        <Tr key={val.id.toString()}>
          <Td>{val.id}</Td>
          <Td>{val.from_warehouse}</Td>
          <Td>{val.to_warehouse}</Td>
          <Td>{val.quantity}</Td>
          <Td>{val.mutation_status}</Td>
          <Td>{val.Product?.product_name}</Td>
          <Td>
            {val.mutation_status === "Waiting for approval" ? (
              <Box>
                <Button
                  onClick={() => approveMut(val)}
                  bgColor="#0095DA"
                  color="white"
                  marginTop="20px"
                  marginRight="5px"
                  >
                  Approve
                </Button>
                <Button
                  bgColor="#F7931E"
                  color="white"
                  onClick={() => denyMut(val)}
                  marginTop="20px"
                >
                  Reject
                </Button>
              </Box>
            ) : null}
          </Td>
        </Tr>
      );
    });
  };

  const nextPage = () => {
    setIsLoading(true)
    setPage(page + 1);
    setIsLoading(false)
  };
  
  const prevPage = () => {
    setIsLoading(true)
    setPage(page - 1);
    setIsLoading(false)
  };

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search);
      setPage(1);
    },
  });
  const addFormik = useFormik({
    initialValues: {
      from_warehouse: "",
      to_warehouse: "",
      quantity: "",
      ProductId: "",
    },
    onSubmit: async (values) => {
      try {
        let addWarehouse = {
          from_warehouse: selectedWarehouse1,
          to_warehouse: selectedWarehouse2,
          quantity: values.quantity,
          ProductId: selectedProduct,
        };
         await axiosInstance.post(
          `/stock-mutation/addMutation`,
          addWarehouse
        );

        toast({ title: "Mutation added", status: "success" });
        fetchAdminData();
        addFormik.setFieldValue("from_warehouse", "");
        addFormik.setFieldValue("to_warehouse", "");
        addFormik.setFieldValue("quantity", "");
        addFormik.setFieldValue("ProductId", "");
      } catch (err) {
        console.log(err);
        toast({ title: "Server error while adding", status: "error" });
      }
    },
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    addFormik.setFieldValue(name, value);
  };

  const {
    isOpen: isOpenAddNewWarehouseAddress,
    onOpen: onOpenAddNewWarehouseAddress,
    onClose: onCloseAddNewWarehouseAddress,
  } = useDisclosure();

  const searchAdminHandler = ({ target }) => {
    const { name, value } = target;
    formikSearch.setFieldValue(name, value);
  };
  const onSubmitAddForm = () => {
    addFormik.handleSubmit();
    onCloseAddNewWarehouseAddress();
  };

  const sortCategoryHandler = ({ target }) => {
    const { value } = target;
    setSortBy(value.split(" ")[0]);
    setSortDir(value.split(" ")[1]);
  };

  useEffect(() => {
    fetchAdminData();
  }, [currentSearch, page, sortDir, sortBy, isLoading]);

  return (
    <Box marginLeft={"230px"}>
      {/* <Box p="20px 0" display={"flex"} mr="2"> */}
      <HStack justifyContent="space-between">
        <Box>
          <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
            Stock Mutation Report
          </Text>
          <Text fontSize={"2xl"} fontWeight="bold" color={"#0095DA"}>
            Total Changes:{totalCount}
          </Text>
        </Box>
        <br />
        <Button
          bgColor={"#F7931E"}
          color="white"
          marginTop={"5%"}
          onClick={() => onOpenAddNewWarehouseAddress()}
          w="200px"
          marginRight="40px"
        >
          Add New Mutation
        </Button>
      </HStack>
      <HStack mt="5px" justifyContent="right">
        <Box gap="4" display={"flex"}>
          <Text my="auto">Sort</Text>
          <Select
            onChange={sortCategoryHandler}
            fontSize={"15px"}
            fontWeight="normal"
            fontFamily="serif"
            width={"137px"}
            color={"#6D6D6F"}
            _placeholder="Sort By"
          >
            <option value="ID ASC" selected>
              ID Ascending
            </option>
            <option value="ID DESC">ID Descending</option>
            <option value="createdAt DESC">Latest</option>
            <option value="createdAt ASC">Old</option>
          </Select>

          <form onSubmit={formikSearch.handleSubmit}>
            <FormControl>
              <InputGroup textAlign={"right"}>
                <Input
                  type="text"
                  placeholder="Search by ID"
                  name="search"
                  w="200px"
                  onChange={searchAdminHandler}
                  borderRightRadius="0"
                  value={formikSearch.values.search}
                />

                <Button borderLeftRadius={"0"} type="submit">
                  <TbSearch />
                </Button>
              </InputGroup>
            </FormControl>
          </form>
        </Box>
      </HStack>
      {/* <br />
        <br /> */}
      {/* </Box> */}
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>From Warehouse</Th>
            <Th>To Warehouse</Th>
            <Th>Quantity</Th>
            {/* <Th>Stock Before in Receiver</Th>
            <Th>Stock After in Receiver</Th> */}
            <Th>Mutation Status</Th>
            <Th>Product Name</Th>
          </Tr>
        </Thead>
        <Tbody>{renderStockMutation()}</Tbody>
      </Table>
      {!stockData.length ? (
        <Box p="10px" bgColor={"#E5F9F6"}>
          <Box mx="auto">
            <Box display={"flex"} mx="auto" w="170px">
              <IoIosAlert fontSize={"25px"} color="#0095DA" />
              <Text fontWeight="medium" ml="2">
                No stock mutation found
              </Text>
            </Box>
          </Box>
        </Box>
      ) : null}

      <Box p="20px">
        <Box textAlign={"center"}>
          {page === 1 ? null : (
            <Button onClick={prevPage} disabled={page === 1 ? true : null}>
              {"< Prev"}
            </Button>
          )}
          {page >= maxPage ? null : (
            <Button
              onClick={nextPage}
              ml="10px"
              disabled={page >= maxPage ? true : null}
            >
              {"Next >"}
            </Button>
          )}
        </Box>
      </Box>

      <AdminStockMutationComp
        isOpen={isOpenAddNewWarehouseAddress}
        onClose={onCloseAddNewWarehouseAddress}
        onSubmit={(event) => onSubmitAddForm(event.target.value)}
        formChangeHandler={formChangeHandler}
        addFormik={addFormik}
        header={"Add Mutation"}
        selectProduct={setSelectedProduct}
        selectWarehouse1={setSelectedWarehouse1}
        selectWarehouse2={setSelectedWarehouse2}
      />
    </Box>
  );
};
export default AdminMutationStock;
