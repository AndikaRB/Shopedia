import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../api";
import { useSelector } from "react-redux";
import AdminCategoryItems from "./AdminCategoryItems";
import CategoryNotFound from "../../../assets/CategoryNotFound.svg";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";
import ModalAddNewCategory from "../../../components/admin/AdminCategory/ModalAddNewCategory";

const AdminCategory = () => {
  const authSelector = useSelector((state) => state.auth);

  const [showCategory, setShowCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("ASC");
  const [count, setCount] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [selectImage, setSelectImage] = useState(null);

  const inputFileRef = useRef(null);

  const toast = useToast();

  const { onClose } = useDisclosure();

  const {
    isOpen: isOpenAddNewCategory,
    onOpen: onOpenAddNewCategory,
    onClose: onCloseAddNewCategory,
  } = useDisclosure();

  const formikAddNewCategory = useFormik({
    initialValues: {
      category_name: "",
      category_image: null,
    },
    onSubmit: async ({ category_name, category_image }) => {
      try {
        let newCategory = new FormData();

        newCategory.append("category_name", category_name);
        newCategory.append("category_image", category_image);

        const response = await axiosInstance.post(
          "/admin/categories",
          newCategory
        );

        formikAddNewCategory.setFieldValue("category_name", "");
        formikAddNewCategory.setFieldValue("category_image", null);
        if (formikAddNewCategory.errors !== true) {
          onCloseAddNewCategory();
        }
        toast({
          title: "Category Created",
          description: response.data.message,
          status: "success",
        });

        setSelectImage(null);
        fetchCategory();
      } catch (err) {
        console.log(err);
        toast({
          title: "Failed Create New Category",
          description: err.response.data.message,
          status: "error",
        });
      }
    },
  });

  const addNewCategory = () => {
    formikAddNewCategory.handleSubmit();
  };

  const inputChangeHandler = ({ target }) => {
    const { name, value } = target;

    formikAddNewCategory.setFieldValue(name, value);
  };

  const closeAddNewModal = () => {
    onCloseAddNewCategory();
    formikAddNewCategory.setFieldValue("category_name", "");
    formikAddNewCategory.setFieldValue("category_image", null);
    setSelectImage(null);
  };

  const fetchCategory = async () => {
    const maxItemsPerPage = 5;
    try {
      const response = await axiosInstance.get("/admin/categories", {
        params: {
          _page: page,
          _limit: maxItemsPerPage,
          category_name: currentSearch,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      });

      setCount(response.data.dataCount);
      setShowCategory(response.data.data);
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage));
      setIsloading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const resetFilterBtnHandler = () => {
    formik.setFieldValue("search", "");
    setPage(1);
    setCurrentSearch("");
    setSortBy("id");
    setSortDir("ASC");
  };

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search);
      setPage(1);
    },
  });

  const searchCategoryHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  const sortCategoryHandler = ({ target }) => {
    const { value } = target;

    setSortBy(value);
  };

  const sortDateHandler = ({ target }) => {
    const { value } = target;

    setSortDir(value);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const deleteCategoryHandler = async (id) => {
    try {
      await axiosInstance.delete(`/admin/categories/${id}`);

      fetchCategory();

      toast({
        title: "Category Deleted",
        status: "info",
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const renderCategory = () => {
    return showCategory.map((val) => {
      return (
        <AdminCategoryItems
          key={val.id.toString()}
          category_name={val.category_name}
          category_image={val.category_image}
          fetchCategory={fetchCategory}
          onDelete={() => deleteCategoryHandler(val.id)}
          inputFileRef={inputFileRef}
          CategoryId={val.id}
        />
      );
    });
  };

  useEffect(() => {
    fetchCategory();
  }, [page, currentSearch, sortBy, sortDir]);

  return (
    <>
      <Box mt={"40px"} width="750px" h={"750px"} ml={"500px"}>
        <Box p="" display={"flex"} justifyContent="space-between">
          <VStack>
            <Text
              fontSize={"2xl"}
              fontWeight="bold"
              color={"#0095DA"}
              mb={"10px"}
              mr={"330px"}
            >
              Admin Product Category
            </Text>

            {/* Search Category */}
            <HStack>
              <GridItem display={"flex"}>
                <Box display={"flex"} mr={"80px"}>
                  <Box display={"flex"} my={"auto"}>
                    <form onSubmit={formik.handleSubmit}>
                      <FormControl>
                        <InputGroup>
                          <Input
                            size={"md"}
                            type={"text"}
                            placeholder="Search category"
                            width={"200px"}
                            onChange={searchCategoryHandler}
                            name="search"
                            value={formik.values.search}
                          />
                          <InputRightElement width="5rem">
                            <Button
                              h="2rem"
                              ml={"30px"}
                              bgColor="#fff"
                              color={"#0095DA"}
                              type="submit"
                              _hover={"none"}
                            >
                              <BiSearchAlt2 fontSize={"15px"} />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </form>
                  </Box>
                </Box>
              </GridItem>

              {/* sort category data */}
              <Box mt={"54px"} mr={"70px"}>
                <HStack>
                  <Text
                    fontSize={"15px"}
                    fontWeight="semibold"
                    mr="3px"
                    color={"#212121"}
                  >
                    Sort :
                  </Text>
                  <Select
                    onChange={sortCategoryHandler}
                    fontSize={"15px"}
                    fontWeight="normal"
                    fontFamily="serif"
                    width={"137px"}
                    color={"#6D6D6F"}
                  >
                    <option value="id"> ❮ Sort By ❯</option>
                    <option value="category_name">Name</option>
                    <option value="updatedAt">Date modified</option>
                  </Select>

                  <Select
                    onChange={sortDateHandler}
                    fontWeight="normal"
                    fontSize={"15px"}
                    fontFamily="serif"
                    width={"130px"}
                    color={"#6D6D6F"}
                  >
                    <option value="ASC"> ❮ Sort Dir ❯</option>
                    <option value="ASC">Asc</option>
                    <option value="DESC">Desc</option>
                  </Select>
                </HStack>
              </Box>
            </HStack>
          </VStack>
        </Box>

        {/* Table Category Data */}
        <Box
          mt={"25px"}
          pt={"0px"}
          borderTop={"10px solid #0095DA"}
          boxShadow={"rgba(0, 0, 0, 0.15) 0px 0.5rem 1rem"}
          borderRadius={"10px"}
          h={"650px"}
          width={"610px"}
        >
          <Table
            mt={"-5px"}
            variant={count === 0 || isLoading === false ? "simple" : "striped"}
          >
            <Thead
              bgColor={"#0095DA"}
              border={"1px solid #0095DA"}
              borderRadius={"10px"}
            >
              <Tr h={"25px"}>
                <Th width={"200px"} color={"#fff"} fontSize={"14px"}>
                  Category Name
                </Th>
                <Th
                  width={"425px"}
                  textAlign={"center"}
                  color={"#fff"}
                  fontSize={"14px"}
                >
                  Category Image
                </Th>
                <Th>
                  <Button
                    boxShadow={"rgba(0.24, 0.24, 0.24, 0.24) 0px 3px 8px"}
                    bgColor={"#fff"}
                    borderRadius={"50%"}
                    color={authSelector.RoleId !== 3 ? "red" : "green"}
                    _hover={false}
                    onClick={onOpenAddNewCategory}
                    pb={"-5px"}
                    p={"0px 0px 0px 0px"}
                    isDisabled={authSelector.RoleId !== 3 ? true : false}
                    ml={"0px"}
                  >
                    <MdAddCircle fontSize={"40px"} />
                  </Button>
                </Th>
              </Tr>
            </Thead>

            {isLoading === false ? (
              <Tbody bgColor={"white"} maxW={"450px"}>
                <Tr>
                  <Td bgColor={"#fff"}>
                    <Box
                      mt={"70px"}
                      display={"flex"}
                      ml={"250px"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      alignContent={"center"}
                    >
                      <CircularProgress
                        isIndeterminate
                        color="#F7931E"
                        thickness="40px"
                        size="60px"
                      />
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            ) : null}
            {count === 0 ? (
              // if category not found
              <Tbody bgColor={"white"} maxW={"300px"}>
                <Tr>
                  <Td maxW={"250px"} bgColor={"#fff"}>
                    <Box
                      w={"200px"}
                      h={"342.59px"}
                      display={"flex"}
                      justifyContent={"center"}
                      flexDir={"column"}
                      alignContent={"center"}
                      alignItems={"center"}
                      mt={"70px"}
                      ml={"180px"}
                    >
                      <Image
                        src={CategoryNotFound}
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
                        Category Not Found
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
                        The category you are trying to find was not found
                      </Text>
                      <Button
                        onClick={resetFilterBtnHandler}
                        borderRadius={"8px"}
                        minH={"40px"}
                        textAlign={"center"}
                        fontSize={"16px"}
                        lineHeight={"22px"}
                        fontWeight={600}
                        fontFamily={"Open Sauce One, sans-serif"}
                        color={"#fff"}
                        bgColor={"#0095DA"}
                        w={"200px"}
                        _hover={{
                          bgColor: "#0370A2",
                        }}
                        _active={{
                          bgColor: "#0370A2",
                        }}
                      >
                        Reset Filter
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            ) : (
              <Tbody bgColor={"#fff"}>{isLoading && renderCategory()}</Tbody>
            )}
            <Tfoot>
              <Tr></Tr>
            </Tfoot>
          </Table>
        </Box>
      </Box>

      {/* Change Page */}
      <GridItem>
        <HStack justifyContent={"center"} mt={"50px"} mb={"50px"} mr={"150px"}>
          <Button
            bgColor={"white"}
            color={"#0095DA"}
            onClick={previousPage}
            w={"50px"}
            isDisabled={page === 1 ? true : null}
          >
            <BsFillArrowLeftSquareFill fontSize={"30px"} />
          </Button>
          <Button
            w={"10px"}
            p={"10px"}
            bgColor={"#0095DA"}
            color={"white"}
            fontSize={"14px"}
            _hover={"none"}
            onClick={"none"}
          >
            {page}
          </Button>
          <Button
            bgColor={"white"}
            color="#0095DA"
            onClick={nextPage}
            w={"50px"}
            isDisabled={page >= maxPage ? true : null}
          >
            <BsFillArrowRightSquareFill fontSize={"30px"} />
          </Button>
        </HStack>
      </GridItem>

      <ModalAddNewCategory
        isOpenAddNewCategory={isOpenAddNewCategory}
        onCloseAddNewCategory={onCloseAddNewCategory}
        closeAddNewModal={closeAddNewModal}
        formikAddNewCategory={formikAddNewCategory}
        inputChangeHandler={inputChangeHandler}
        selectImage={selectImage}
        setSelectImage={setSelectImage}
        addNewCategory={addNewCategory}
        inputFileRef={inputFileRef}
      />
    </>
  );
};

export default AdminCategory;
