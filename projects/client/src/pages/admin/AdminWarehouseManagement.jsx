import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  HStack,
  useDisclosure,
  InputGroup,
  Select,
} from "@chakra-ui/react";
// import { useSelector } from "react-redux";
import { axiosInstance } from "../../api";
import Warehouse from "../../components/admin/Warehouse";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import React, { useEffect, useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { TbSearch } from "react-icons/tb";
import WarehouseAddress from "../../components/admin/WarehouseAddress";
import WarehouseAddressEdit from "../../components/admin/WarehouseAddressEdit";

const WarehouseManagement = () => {
  const [data, setData] = useState([]);
  const toast = useToast();
  // const authSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(null);

  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [keywordHandler, setKeywordHandler] = useState("");
  const maxItemsPage = 5;

  const [selectedAddProvince, setSelectedAddProvince] = useState(0);
  const [selectedAddCity, setSelectedAddCity] = useState(0);
  const [selectedEditProvince, setSelectedEditProvince] = useState(0);
  const [selectedEditCity, setSelectedEditCity] = useState(0);

  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("ASC");

  const {
    isOpen: isOpenEditWarehouseAddress,
    onOpen: onOpenEditWarehouseAddress,
    onClose: onCloseEditWarehouseAddress,
  } = useDisclosure();

  const {
    isOpen: isOpenAddNewWarehouseAddress,
    onOpen: onOpenAddNewWarehouseAddress,
    onClose: onCloseAddNewWarehouseAddress,
  } = useDisclosure();

  const fetchWarehouse = useCallback(async () => {
    try {
      const fetchingWH = await axiosInstance.get(`/warehouse`, {
        params: {
          _keywordHandler: keyword,
          _page: pages,
          _limit: maxItemsPage,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      });
      setData(fetchingWH.data.data);
      setTotalCount(fetchingWH.data.totalRows);
      setIsLoading(true);
      setRows(fetchingWH.data.totalRows - maxItemsPage);
      setMaxPage(Math.ceil(fetchingWH.data.totalRows / maxItemsPage));
    } catch (error) {
      console.log(error);
    }
  }, [pages, keyword, sortBy, sortDir]);

  const nextPage = () => {
    setPages(pages + 1);
  };

  const prevPage = () => {
    setPages(pages - 1);
  };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/warehouse/${id}`);

      fetchWarehouse();
      toast({ title: "Warehouse deleted", status: "info" });
    } catch (err) {
      console.log(err);
      toast({ title: "Error deleting data warehouse", status: "error" });
    }
  };

  const addFormik = useFormik({
    initialValues: {
      warehouse_name: "",
      address_labels: "",
      province: "",
      city: "",
      districts: "",
      full_address: "",
    },
    onSubmit: async (values) => {
      try {
        let addWarehouse = {
          warehouse_name: values.warehouse_name,
          address_labels: values.address_labels,
          province: selectedAddProvince,
          city: selectedAddCity,
          districts: values.districts,
          full_address: values.full_address,
        };

        await axiosInstance.post(`/warehouse`, addWarehouse);

        toast({ title: "Warehouse added", status: "success" });
        fetchWarehouse();
        addFormik.setFieldValue("warehouse_name", "");
        addFormik.setFieldValue("address_labels", "");
        addFormik.setFieldValue("province", "");
        addFormik.setFieldValue("city", "");
        addFormik.setFieldValue("districts", "");
        addFormik.setFieldValue("full_address", "");
      } catch (err) {
        console.log(err);
        toast({ title: "Server error while adding", status: "error" });
      }
    },
    validationSchema: Yup.object({
      warehouse_name: Yup.string().required().min(1),
      address_labels: Yup.string().required(),
      districts: Yup.string().required(),
      full_address: Yup.string().required(),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    addFormik.setFieldValue(name, value);
  };

  const onOpenedEditHandler = (val) => {
    onOpenEditWarehouseAddress();
    setOpenedEdit(val);
  };
  const onSubmitAddForm = () => {
    addFormik.handleSubmit();
    onCloseAddNewWarehouseAddress();
  };
  const onSubmitEditForm = () => {
    editFormik.handleSubmit();
    onCloseEditWarehouseAddress();
  };

  const editFormik = useFormik({
    initialValues: {
      warehouse_name: openedEdit ? openedEdit.warehouse_name : "",
      address_labels: openedEdit ? openedEdit.address_labels : "",
      province: openedEdit ? openedEdit.province : "",
      city: openedEdit ? openedEdit.city : "",
      districts: openedEdit ? openedEdit.districts : "",
      full_address: openedEdit ? openedEdit.full_address : "",
    },
    onSubmit: async (values) => {
      try {
        let editedWarehouse = {
          warehouse_name: values.warehouse_name,
          address_labels: values.address_labels,
          province: selectedEditProvince,
          city: selectedEditCity,
          districts: values.districts,
          full_address: values.full_address,
        };

        await axiosInstance.patch(
          `/warehouse/${openedEdit.id}`,
          editedWarehouse
        );

        toast({ title: "Warehouse edited", status: "success" });
        editFormik.setFieldValue("warehouse_name", "");
        editFormik.setFieldValue("address_labels", "");
        editFormik.setFieldValue("province", "");
        editFormik.setFieldValue("city", "");
        editFormik.setFieldValue("districts", "");
        editFormik.setFieldValue("full_address", "");
        fetchWarehouse();
        setOpenedEdit(null);
      } catch (err) {
        console.log(err);
        toast({ title: "Server error while editing", status: "error" });
      }
    },
    validationSchema: Yup.object({
      warehouse_name: Yup.string().required().min(1),
      address_labels: Yup.string().required(),
      districts: Yup.string().required(),
      full_address: Yup.string().required(),
    }),
    validateOnChange: false,
  });

  const editFormChangeHandler = ({ target }) => {
    const { name, value } = target;
    editFormik.setFieldValue(name, value);
  };

  const renderWarehouse = () => {
    return data.map((val) => {
      return (
        <Warehouse
          key={val.id.toString()}
          id={val.id.toString()}
          warehouse_name={val.warehouse_name}
          full_address={val.full_address}
          address_labels={val.address_labels}
          province={val.province}
          city={val.city}
          districts={val.districts}
          username={val?.User?.username}
          latitude={val.latitude}
          longitude={val.longitude}
          onDelete={() => deleteBtnHandler(val.id)}
          onEdit={() => onOpenedEditHandler(val)}
        />
      );
    });
  };

  const searchKey = () => {
    setPages(0);
    setKeyword(keywordHandler);
  };

  const sortCategoryHandler = ({ target }) => {
    const { value } = target;
    setSortBy(value.split(" ")[0]);
    setSortDir(value.split(" ")[1]);
  };

  useEffect(() => {
    fetchWarehouse();
  }, [openedEdit, pages, sortBy, sortDir, keyword, keywordHandler]);

  useEffect(() => {
    if (openedEdit) {
      editFormik.setFieldValue("warehouse_name", openedEdit.warehouse_name);
      editFormik.setFieldValue("address_labels", openedEdit.address_labels);
      editFormik.setFieldValue("province", openedEdit.selectedProvince);
      editFormik.setFieldValue("city", openedEdit.selectedCity);
      editFormik.setFieldValue("districts", openedEdit.districts);
      editFormik.setFieldValue("full_address", openedEdit.full_address);
    }
  }, [openedEdit]);

  return (
    <Box marginBottom={"50px"} ml="275px" mt="25px">
        <HStack justifyContent="space-between">
          <Box>
            <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
              Warehouse List
            </Text>
            <Text fontSize={"2xl"} fontWeight="bold" color={"#0095DA"}>
              Total Warehouses:{totalCount}
            </Text>
          </Box>
          <Button
            bgColor={"#F7931E"}
            color="white"
            marginTop={"5%"}
            onClick={() => onOpenAddNewWarehouseAddress()}
            w="200px"
            marginRight="40px"
          >
            Add New
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
              width={"250px"}
              color={"#6D6D6F"}
              _placeholder="Sort By"
            >
              <option value="id ASC" selected>
                ID Ascending
              </option>
              <option value="id DESC">ID Descending</option>
              <option value="createdAt DESC">Latest</option>
              <option value="createdAt ASC">Old</option>
            </Select>

            <FormControl>
              <InputGroup textAlign={"right"}>
                <Input
                  type="text"
                  placeholder="Search by WH Name"
                  name="search"
                  w="200px"
                  onChange={(event) => setKeywordHandler(event.target.value)}
                  borderRightRadius="0"
                  value={keywordHandler}
                />

                <Button
                  borderLeftRadius={"0"}
                  type="submit"
                  onClick={searchKey}
                >
                  <TbSearch />
                </Button>
              </InputGroup>
            </FormControl>
          </Box>
        </HStack>

      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Warehouse Name</Th>
            <Th>Full Address</Th>
            <Th>Province</Th>
            <Th>City</Th>
            <Th>District</Th>
            <Th>User</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>{isLoading && renderWarehouse()}</Tbody>
      </Table>
      
      <Grid templateColumns={"repeat(3, 1fr"} mt={15}>
        <GridItem />
        <GridItem>
          {!data.length ? (
            <Alert status="warning">
              <AlertIcon />
              <AlertTitle>No post found</AlertTitle>
            </Alert>
          ) : null}
          <HStack justifyContent={"center"} gap={"2px"}>
            {pages + 1 === 1 ? null : (
              <CgChevronLeft onClick={prevPage} color={"#9E7676"}>
                {""}
              </CgChevronLeft>
            )}
            <Text fontSize={"md"}>{pages + 1}</Text>
            {pages + 1 >= maxPage ? null : (
              <CgChevronRight onClick={nextPage} color={"#9E7676"}>
                Next
              </CgChevronRight>
            )}
          </HStack>
        </GridItem>
        <GridItem />
      </Grid>
      <Divider />

      {/* Modal nambah data */}
      <WarehouseAddress
        isOpen={isOpenAddNewWarehouseAddress}
        onClose={onCloseAddNewWarehouseAddress}
        onSubmit={(event) => onSubmitAddForm(event.target.value)}
        formChangeHandler={formChangeHandler}
        formik={addFormik}
        header={"Add Form"}
        selectProvince={setSelectedAddProvince}
        selectCity={setSelectedAddCity}
      />

      {/* Modal untuk Editing data */}
      <WarehouseAddressEdit
        isOpen={isOpenEditWarehouseAddress}
        onClose={onCloseEditWarehouseAddress}
        onSubmit={(event) => onSubmitEditForm(event.target.value)}
        formChangeHandler={editFormChangeHandler}
        formik={editFormik}
        header={"Change Form"}
        selectProvince={setSelectedEditProvince}
        selectCity={setSelectedEditCity}
      />
    </Box>
  );
};

export default WarehouseManagement;
