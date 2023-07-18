import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  useDisclosure,
  FormErrorMessage,
  ModalOverlay,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  Image,
  Select,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { axiosInstance } from "../../api/index";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { TbCameraPlus } from "react-icons/tb";
import upload from "../../assets/upload.png";
import { TbSearch } from "react-icons/tb";

const AdminProductData = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [openedEdit, setOpenedEdit] = useState(null);
  const [rows, setRows] = useState(0);
  const [admin, setAdmin] = useState([]);
  const [pages, setPages] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [keywordHandler, setKeywordHandler] = useState("");
  const maxItemsPage = 5;

  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef();

  const [category, setCategory] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("ASC");

  const fetchProductData = async () => {
    try {
      const productData = await axiosInstance.get("/admin/product", {
        params: {
          _keywordHandler: keyword,
          _page: pages,
          _limit: maxItemsPage,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      });
      setData(productData.data.data);
      setTotalCount(productData.data.totalRows);
      setAdmin(productData.data.data);

      setRows(productData.data.totalRows - maxItemsPage);
      setMaxPage(Math.ceil(productData.data.totalRows / maxItemsPage));

      const categoryRes = await axiosInstance.get("/admin/product/category");
      setCategory(categoryRes.data.data);

      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCategory = () => {
    return Array.from(category).map((val) => {
      return (
        <option value={val.id} key={val.id.toString()}>
          {val.category_name}
        </option>
      );
    });
  };
  const nextPage = () => {
    setPages(pages + 1);
  };

  const prevPage = () => {
    setPages(pages - 1);
  };

  const searchKey = () => {
    setPages(0);
    setKeyword(keywordHandler);
  };

  const deleteBtnHandler = async (val) => {
    try {
      await axiosInstance.delete(`/admin/product/detail/${val.id}`);
      toast({ title: "Successfully deleted product", status: "success" });
      fetchProductData();
    } catch (error) {
      console.log(error);
    }
  };
  const renderProductData = () => {
    return data.map((val) => {
      return (
        <Tr key={val.id.toString()}>
          <Td>{val.id.toString()}</Td>
          <Td>
            <Image
              width="100px"
              height="100px"
              src={val?.Image_Urls[0]?.image_url}
            />
          </Td>
          <Td>{val.product_name || "null"}</Td>
          <Td>{val.description || "null"}</Td>
          <Td>{val.product_weight || "null"}</Td>
          <Td>
            {val.price
              ? val.price.toLocaleString("in-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              : "null"}
          </Td>
          <Td>{val?.Category?.category_name}</Td>
          <Td>
            <Box>
              <Box mb={"2"}>
                <Link to={`/admin/product/detail/${val.id}`}>
                  <Button
                    width={"100px"}
                    bgColor={"#0095DA"}
                    _hover={false}
                    color="white"
                  >
                    Edit
                  </Button>
                </Link>
              </Box>
              <Box>
                <Button
                  width={"100px"}
                  bgColor={"#F7931E"}
                  _hover={false}
                  color="white"
                  onClick={() => deleteBtnHandler(val)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Td>
        </Tr>
      );
    });
  };

  const {
    isOpen: isOpenAddNewProduct,
    onOpen: onOpenAddNewProduct,
    onClose: onCloseAddNewProduct,
  } = useDisclosure();

  const formikAddProduct = useFormik({
    initialValues: {
      image_url: {},
      product_name: "",
      description: "",
      product_weight: "",
      price: "",
      CategoryId: "",
    },
    onSubmit: async ({
      image_url,
      product_name,
      description,
      product_weight,
      price,
      CategoryId,
    }) => {
      try {
        const data = new FormData();

        if (image_url) {
          data.append("image_url", image_url);
        }
        if (product_name) {
          data.append("product_name", product_name);
        }
        if (description) {
          data.append("description", description);
        }
        if (product_weight) {
          data.append("product_weight", product_weight);
        }
        if (price) {
          data.append("price", price);
        }
        if (CategoryId) {
          data.append("CategoryId", CategoryId);
        }
        const response = await axiosInstance.post("/admin/product/", data);

        toast({
          title: "Registration Success",
          description: response.data.message,
          status: "success",
        });
        formikAddProduct.setFieldValue("image_url", "");
        formikAddProduct.setFieldValue("product_name", "");
        formikAddProduct.setFieldValue("description", "");
        formikAddProduct.setFieldValue("product_weight", "");
        formikAddProduct.setFieldValue("price", "");
        formikAddProduct.setFieldValue("CategoryId", "");
        fetchProductData();
      } catch (error) {
        console.log(error.response);
        toast({
          title: "Registration Failed",
          description: error.response.data.message,
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required().min(3),
      description: Yup.string().required().min(3),
      product_weight: Yup.number().required(),
      price: Yup.number().required().min(3),
      CategoryId: Yup.number().required(),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formikAddProduct.setFieldValue(name, value);
  };

  
  const onCloseModal = () => {
    formikAddProduct.handleSubmit();
    onCloseAddNewProduct();
  };

  const sortCategoryHandler = ({ target }) => {
    const { value } = target;
    setSortBy(value.split(" ")[0]);
    setSortDir(value.split(" ")[1]);
  };

  useEffect(() => {
    fetchProductData();
    // fetchCategory();
  }, [openedEdit, pages, keyword, sortBy, sortDir]);

  return (
    <>
      <Box marginLeft="250px" marginTop="25px">
        <HStack justifyContent="space-between">
          <Box>
            <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
              Product Data
            </Text>
            <Text fontSize={"2xl"} fontWeight="bold" color={"#0095DA"}>
              Total Products:{totalCount}
            </Text>
          </Box>
          <br />
          <Button
            bgColor={"#F7931E"}
            color="white"
            _hover={false}
            onClick={onOpenAddNewProduct}
          >
            Add New Product
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
              <option value="ID ASC" selected>
                ID Ascending
              </option>
              <option value="ID DESC">ID Descending</option>
              <option value="createdAt DESC">Latest</option>
              <option value="createdAt ASC">Old</option>
            </Select>

            {/* <form onSubmit={formikSearch.handleSubmit}> */}
            <FormControl>
              <InputGroup textAlign={"right"}>
                <Input
                  type="text"
                  placeholder="Search Product Name or Desc"
                  name="search"
                  w="250px"
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
              <Th w="10px">ID</Th>
              <Th w="100px">Photo Profile</Th>
              <Th w="150px">Name</Th>
              <Th w="450px">Description</Th>
              <Th>Weight (Grams)</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{isLoading && renderProductData()}</Tbody>
        </Table>
      </Box>
    
      <Grid templateColumns={"repeat(3, 1fr"} mt={15}>
      <GridItem />
        <GridItem>
          {!admin.length ? (
            <Alert status="warning" ml="275px">
              <AlertIcon />
              <AlertTitle>No post found</AlertTitle>
            </Alert>
          ) : null}
          <HStack justifyContent={"center"} gap={"2px"} paddingLeft="65px">
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

      {/* Modal Add New Admin */}
      <Modal
        isOpen={isOpenAddNewProduct}
        onClose={onCloseAddNewProduct}
        motionPreset="slideInBottom"
        size={"4xl"}
      >
        <form onSubmit={formikAddProduct.handleSubmit}>
          <ModalOverlay />
          <ModalContent bgColor={"#0095DA"} p="20px">
            <ModalHeader fontSize={"2xl"} fontWeight="bold">
              New Product
            </ModalHeader>

            <ModalBody>
              <HStack>
                <FormControl isInvalid={formikAddProduct.errors.image_url}>
                  <Image
                    w={"150px"}
                    h="150px"
                    objectFit={"cover"}
                    borderRadius={"8px"}
                    border="3px solid"
                    color={"#0095DA"}
                    mx="auto"
                    src={selectedImage ? selectedImage : upload}
                  />
                  <Button
                    borderRadius={"50%"}
                    w="auto"
                    h="30px"
                    border="2px solid"
                    onClick={() => inputFileRef.current.click()}
                    color={"#F7931E"}
                    _hover={false}
                    ml="58%"
                    size={"xs"}
                    mt="-33px"
                  >
                    <TbCameraPlus color={"#F7931E"} />
                  </Button>

                  <Input
                    w="100%"
                    _hover={false}
                    fontWeight="bold"
                    bgColor={"white"}
                    onChange={(e) => {
                      console.log(e.target.files[0].File);
                      formikAddProduct.setFieldValue(
                        "image_url",
                        e.target.files[0]
                      );
                      setSelectedImage(URL.createObjectURL(e.target.files[0]));
                    }}
                    accept="image/*"
                    name="image_url"
                    type="file"
                    color="transparent"
                    border="0"
                    display={"none"}
                    ref={inputFileRef}
                  />
                  <FormErrorMessage>
                    {formikAddProduct.errors.image_url}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <FormLabel>Name</FormLabel>
              <FormControl isInvalid={formikAddProduct.errors.product_name}>
                <Input
                  value={formikAddProduct.values.product_name}
                  name="product_name"
                  type="text"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formikAddProduct.errors.product_name}
                </FormErrorMessage>
              </FormControl>

              <FormLabel mt={"15px"}>Description</FormLabel>
              <FormControl isInvalid={formikAddProduct.errors.description}>
                <Textarea 
                value={formikAddProduct.values.description}
                name="description"
                onChange={formChangeHandler}
                />
                
                <FormErrorMessage>
                  {formikAddProduct.errors.description}
                </FormErrorMessage>
              </FormControl>

              <FormLabel mt={"15px"}>Weight in Grams</FormLabel>
              <FormControl isInvalid={formikAddProduct.errors.product_weight}>
                <Input
                  value={formikAddProduct.values.product_weight}
                  name="product_weight"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formikAddProduct.errors.product_weight}
                </FormErrorMessage>
              </FormControl>

              <FormLabel mt={"15px"}>Price</FormLabel>
              <FormControl isInvalid={formikAddProduct.errors.price}>
                <Input
                  value={formikAddProduct.values.price}
                  name="price"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formikAddProduct.errors.price}
                </FormErrorMessage>
              </FormControl>

              <FormLabel mt={"15px"}>Category</FormLabel>
              <FormControl isInvalid={formikAddProduct.errors.CategoryId}>
                <Select
                  name="CategoryId"
                  onChange={formChangeHandler}
                  placeholder="Select category"
                >
                  {isLoading && renderCategory()}
                </Select>
                <FormErrorMessage>
                  {formikAddProduct.errors.CategoryId}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onCloseAddNewProduct}>
                Cancel
              </Button>
              <Button colorScheme="green" mr={3} onClick={onCloseModal}>
                Add New Product
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AdminProductData;
