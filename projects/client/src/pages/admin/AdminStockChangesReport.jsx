import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../../api";
import { TbSearch } from "react-icons/tb";
import { IoIosAlert } from "react-icons/io";

const AdminStockChangesReport = () => {
  const [stockData, setStockData] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("ASC");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [currentTime, setCurrentTime] = useState(1);
  const [endTime, setEndTime] = useState(1);

  const toast = useToast();

  const fetchAdminData = async () => {
    const maxItemsPerPage = 6;
    try {
      const response = await axiosInstance.get("/export/stock", {
        params: {
          _page: page,
          _limit: maxItemsPerPage,
          id: currentSearch,
          _sortBy: sortBy,
          _sortDir: sortDir,
          currentTime: currentTime,
          endTime: endTime,
        },
      });

      setTotalCount(response.data.dataCount);
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage));
      setStockData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStock = () => {
    return stockData.map((val) => {
      return (
        <Tr key={val.id.toString()}>
          <Td>{val.id}</Td>
          <Td>{val.stock_before}</Td>
          <Td>{val.stock_after}</Td>
          <Td>{val.Type_Journal?.name}</Td>
          <Td>{val.Type_Journal?.type === 0 ? "Minus" : "Added"}</Td>
          <Td>{val.Product?.product_name}</Td>
        </Tr>
      );
    });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
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
  const formikDate = useFormik({
    initialValues: {
      currentTime: "",
    },
    onSubmit: ({ start, end }) => {
      setCurrentTime(start);
      setEndTime(end);
      setPage(1);
    },
  });

  const searchAdminHandler = ({ target }) => {
    const { name, value } = target;
    formikSearch.setFieldValue(name, value);
  };
  const currentTimeHandler = ({ target }) => {
    const { value } = target;
    setCurrentTime(value);
    fetchAdminData();
  };
  const endTimeHandler = ({ target }) => {
    const { value } = target;
    setEndTime(value);
    fetchAdminData();
  };
  const sortCategoryHandler = ({ target }) => {
    const { value } = target;
    setSortBy(value.split(" ")[0]);
    setSortDir(value.split(" ")[1]);
  };

  const downloadCSV = async () => {
    try {
      await axiosInstance.get("export/stock/csv", {
        params: {
          id: currentSearch,
          _sortBy: sortBy,
          _sortDir: sortDir,
          currentTime: currentTime,
          endTime: endTime,
        },
      });
      toast({
        title: "Successfully exported CSV in your Server folder",
        status: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [currentSearch, page, sortDir, sortBy, currentTime, endTime]);

  return (
    <Box marginLeft={"230px"}>
      <Box p="20px 0" display={"flex"} justifyContent="space-between" mr="2">
        <HStack>
          <Box>
            <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
              Stock Changes Report
            </Text>
            <Text fontSize={"2xl"} fontWeight="bold" color={"#0095DA"}>
              Total Changes:{totalCount}
            </Text>
          </Box>
        </HStack>

        <HStack mt="5px" justifyContent="center">
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
        <br />
        <br />
        <HStack>
          <Box>
            <FormLabel for="start">Start date:</FormLabel>
            <Input
              type="date"
              id="start"
              name="start"
              onChange={currentTimeHandler}
              value={formikDate.values.start}
              defaultValue="2022-01-01"
              min="2020-01-01"
              max="2022-12-31"
            ></Input>
            <br />
            <FormLabel for="end">End date:</FormLabel>
            <Input
              type="date"
              id="end"
              name="end"
              onChange={endTimeHandler}
              value={formikDate.values.end}
              defaultValue="2022-12-31"
              min="2020-01-01"
              max="2022-12-31"
            ></Input>
          </Box>
        </HStack>
      </Box>
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Stock Before</Th>
            <Th>Stock After</Th>
            <Th>Journal Name</Th>
            <Th>Journal Type</Th>
            <Th>Product Name</Th>
          </Tr>
        </Thead>
        <Tbody>{renderStock()}</Tbody>
      </Table>
      {!stockData.length ? (
        <Box p="10px" bgColor={"#E5F9F6"}>
          <Box mx="auto">
            <Box display={"flex"} mx="auto" w="170px">
              <IoIosAlert fontSize={"25px"} color="#0095DA" />
              <Text fontWeight="medium" ml="2">
                No stock changes found
              </Text>
            </Box>
          </Box>
        </Box>
      ) : null}

      <Box p="20px">
        <Box textAlign={"center"}>
          {page === 1 ? null : (
            <Button onClick={previousPage} disabled={page === 1 ? true : null}>
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

      <Box>
        <HStack justifyContent="right">
          <Button onClick={downloadCSV} bgColor="#0095DA" mr="20px">
            Export to CSV
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
export default AdminStockChangesReport;
