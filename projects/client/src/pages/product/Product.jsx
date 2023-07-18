import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Select,
  Spacer,
  Text,
  Flex,
  Center,
  CircularProgress,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { axiosInstance } from "../../api";
import ProductItem from "../../components/product/ProductItem";
import Navbar from "../../components/HomePage/Navbar/Navbar";
import PaginationProduct from "./PaginationProduct";
import CategoryList from "./CategoryList";
import NotFound from "../../assets/no-product-found.png";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("ASC");
  const [category, setCategory] = useState("");
  const [searchProduct, setSearchProduct] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [catPage, setCatPage] = useState(1);
  const [catTotalCount, setCatTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [catId, setCatId] = useState([]);
  const catPerRow = 9;
  const [catLimit, setCatLimit] = useState(catPerRow);
  const [maxCategory, setMaxCategory] = useState(0);
  const [next, setNext] = useState();
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const [countPerPage, setCountPerPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [option5, setOption5] = useState(false);

  const category_filter = query.get("category");

  const product_page = query.get("page");

  const keyword_filter = query.get("keyword");

  const fetchProduct = async () => {
    const maxItemsPerPage = 10;

    try {
      const response = await axiosInstance.get(`/product`, {
        params: {
          _page: product_page,
          _limit: maxItemsPerPage,
          _sortBy: sortBy,
          _sortDir: sortDir,
          product_name: searchValue,
          category_name: category_filter,
          keyword: keyword_filter,
        },
      });
      setTotalCount(response.data.dataCount);
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage));

      setCountPerPage(response.data.data.map((val) => val.id).length);

      if (page === 1) {
        setProducts(response.data.data);
      } else {
        setProducts(response.data.data);
      }
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(`/product/category`, {
        params: {
          _limit: catLimit,
          _page: catPage,
          _sortDir: "ASC",
        },
      });
      setCatTotalCount(response.data.dataCount);
      setMaxCategory(response.data.categoryCount);

      if (catPage === 1) {
        setCategoryData(response.data.data);
      } else {
        setCategoryData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const nextPageBtn = () => {
    setPage(page + 1);

    const params = {};

    if (searchParam.get("id")) {
      params["id"] = searchParam.get("id");
    } else if (searchParam.get("price")) {
      params["price"] = searchParam.get("price");
    } else if (searchParam.get("product_name")) {
      params["product_name"] = searchParam.get("product_name");
    }

    if (searchParam.get("category")) {
      params["category"] = category;
    }

    if (searchParam.get("keyword")) {
      params["keyword"] = searchParam.get("keyword");
    }

    if (product_page === null) {
      params["page"] = Number(product_page) + 2;
      setSearchParam(params);
    } else {
      params["page"] = Number(product_page) + 1;
      setSearchParam(params);
    }
  };

  const previousPageBtn = () => {
    setPage(page - 1);

    const params = {};

    if (searchParam.get("id")) {
      params["id"] = searchParam.get("id");
    } else if (searchParam.get("price")) {
      params["price"] = searchParam.get("price");
    } else if (searchParam.get("product_name")) {
      params["product_name"] = searchParam.get("product_name");
    }

    if (searchParam.get("category")) {
      params["category"] = category;
    }

    if (searchParam.get("keyword")) {
      params["keyword"] = searchParam.get("keyword");
    }

    params["page"] = Number(product_page) - 1;
    setSearchParam(params);
  };

  // pagination
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCount / 10); i++) {
    pageNumbers.push(i);
  }

  const renderPagination = () => {
    return pageNumbers.map((number) => {
      return (
        <PaginationProduct
          setPage={setPage}
          page={page}
          number={number}
          setSearchParam={setSearchParam}
          product_page={product_page}
          searchParam={searchParam}
          category={category}
        />
      );
    });
  };

  const renderProduct = () => {
    return products.map((val) => {
      return (
        <ProductItem
          key={val.id.toString()}
          product_name={val.product_name}
          image_url={val.Image_Urls[0]?.image_url}
          price={val.price}
          id={val.id}
        />
      );
    });
  };

  const renderCategory = () => {
    return categoryData.map((val) => {
      return (
        <CategoryList
          key={val.id.toString()}
          category_name={val.category_name}
          setCategory={setCategory}
          setSearchParam={setSearchParam}
          searchParam={searchParam}
          category={category}
          category_filter={category_filter}
        />
      );
    });
  };

  const sortBtnHandler = ({ target }) => {
    const { value } = target;
    setSortBy(value.split(" ")[0]);
    setSortDir(value.split(" ")[1]);

    const params = {};

    if (searchParam.get("page")) {
      params["page"] = 1;
    }

    if (searchParam.get("category")) {
      params["category"] = category;
    }

    if (searchParam.get("keyword")) {
      params["keyword"] = searchParam.get("keyword");
    }

    params[value.split(" ")[0]] = value.split(" ")[1];
    setSearchParam(params);
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setKeyword(searchProduct);

      setOption1(true);
      setOption2(false);
      setOption3(false);
      setOption4(false);
      setOption5(false);
    }
  };

  const seeMoreBtnHandler = () => {
    setCatLimit(null);
  };

  const backToProduct = () => {
    navigate("/product");
    setCategory(null);
  };

  console.log(category_filter);
  useEffect(() => {
    if (product_page) {
      setPage(product_page);
    }

    if (keyword_filter) {
      setSearchProduct(keyword_filter);
    }

    if (category_filter) {
      setCategory(category_filter);
    }

    for (let entry of searchParam.entries()) {
      if (entry[0] === "product_name" || entry[0] === "price") {
        setSortBy(entry[0]);
        setSortDir(entry[1]);
      }
    }

    if (sortBy === "id" && sortDir === "ASC") {
      setOption1(true);
    } else if (sortBy === "product_name" && sortDir === "ASC") {
      setOption2(true);
    } else if (sortBy === "product_name" && sortDir === "DESC") {
      setOption3(true);
    } else if (sortBy === "price" && sortDir === "DESC") {
      setOption4(true);
    } else if (sortBy === "price" && sortDir === "ASC") {
      setOption5(true);
    }

    fetchProduct();
    fetchCategory();
  }, [
    page,
    sortBy,
    sortDir,
    category,
    searchValue,
    catPage,
    searchParam,
    catLimit,
    keyword,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <>
      {/* {keyword_filter ? null : (
        <Navbar
          // onClick={() => searchBtnHandler()}
          onChange={(e) => setSearchProduct(e.target.value)}
          setOption1={setOption1}
          setOption2={setOption2}
          setOption3={setOption3}
          setOption4={setOption4}
          setOption5={setOption5}
          setSortBy={setSortBy}
          setSortDir={setSortDir}
          keyword_filter={keyword_filter}
          keyword={keyword}
          onKeyDown={handleKeyEnter}
        />
      )} */}
      <Box w={"100%"} bgColor={"#f1f1f1"}>
        <Box
          display={"flex"}
          h={"41px"}
          mt={"70px"}
          flexDir={"row"}
          w={"1350px"}
          mx={"auto"}
          textAlign={"left"}
          fontSize={"14px"}
          lineHeight={"20px"}
          letterSpacing={"0px"}
          alignItems={"center"}
        >
          <Text
            cursor={"pointer"}
            color={"#0095DA"}
            onClick={() => navigate("/")}
          >
            Home
          </Text>
          <Text mx={"5px"}>/</Text>
          <Text cursor={"pointer"} color={"#0095DA"} onClick={backToProduct}>
            All Products{" "}
          </Text>
          {category_filter ? (
            <>
              <Text mx={"5px"}>/</Text>
              <Text
                cursor={"pointer"}
                color={"#0095DA"}
                onClick={() => navigate(`/product?category=${category}`)}
              >
                Category{" "}
              </Text>
              <Text mx={"5px"}>/</Text>
              <Text cursor={"pointer"} onClick={() => navigate("/product")}>
                {category_filter}{" "}
              </Text>
            </>
          ) : null}
        </Box>
      </Box>
      <Grid mt={"30px"} templateColumns="1fr 4fr" w="1350px" mx="auto">
        <GridItem
          w="100%"
          maxW={"250px"}
          h={"755px"}
          boxShadow={"0px 5px 10px 0px rgba(0,0,0,0.15)"}
          borderRadius={"10px"}
          borderTop={"5px solid #0095DA"}
          p={"25px 20px"}
          overflow={"auto"}
          mr={"20px"}
        >
          <Box mb={"30px"}>
            <Text
              fontSize={"18px"}
              lineHeight={"21.6px"}
              fontWeight={500}
              mb={"10px"}
            >
              Categories
            </Text>
            {renderCategory()}
            {catLimit === maxCategory ? (
              <Text
                mt={"10px"}
                fontSize={"14px"}
                lineHeight={"21px"}
                letterSpacing={"0px"}
                textDecor={"underline"}
                color={"#0095DA"}
                cursor={"pointer"}
                onClick={seeMoreBtnHandler}
              >
                See More
              </Text>
            ) : (
              <Text
                mt={"10px"}
                fontSize={"14px"}
                lineHeight={"21px"}
                letterSpacing={"0px"}
                textDecor={"underline"}
                color={"#0095DA"}
                cursor={"pointer"}
                onClick={() => setCatLimit(catPerRow)}
              >
                See Less
              </Text>
            )}
          </Box>
          <Box>
            <Text
              fontSize={"18px"}
              lineHeight={"21.6px"}
              fontWeight={500}
              mb={"10px"}
            >
              Sort By
            </Text>
            <Select
              h={"50px"}
              w={"100%"}
              border={"1px solid #DDDDDD"}
              // px={"20px"}
              display={"flex"}
              alignItems={"center"}
              onClick={sortBtnHandler}
              // placeholder={placeHolder}
            >
              <option value="id ASC" selected={option1}>
                Sort By Default
              </option>
              <option value="product_name ASC" selected={option2}>
                Sort By A-Z
              </option>
              <option value="product_name DESC" selected={option3}>
                Sort By Z-A
              </option>
              <option value="price DESC" selected={option4}>
                Sort By Highest Price
              </option>
              <option value="price ASC" selected={option5}>
                Sort By Lowest Price
              </option>
            </Select>
          </Box>
        </GridItem>

        {/* product */}
        <GridItem
          h={"fit-content"}
          w={"100%"}
          boxShadow={"0 0.5rem 1rem rgba(0,0,0,0.15)"}
          borderRadius={"5px"}
        >
          <Box
            w={"100%"}
            h={"35px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgColor={"#0095DA"}
            borderRadius={"5px"}
          >
            <Text
              fontSize={"18px"}
              lineHeight={"27px"}
              fontWeight={500}
              color={"#ffffff"}
            >
              {/* {category ? category : "All Products"} */}
              {keyword_filter
                ? `Search: ${keyword_filter}`
                : category
                ? category
                : "All Products"}
            </Text>
          </Box>
          {(totalCount === 0 && isLoading) ||
          (countPerPage === 0 && isLoading) ? (
            <Box
              w={"100%"}
              h={"260.3px"}
              px={"20px"}
              py={"10px"}
              display={"flex"}
            >
              <Image h={"240px"} w={"313px"} src={NotFound} mr={"10px"} />
              <Box p={"10px"}>
                <Text
                  color={"#6C757D"}
                  fontSize={"35px"}
                  fontWeight={300}
                  lineHeight={"42px"}
                  letterSpacing={"0px"}
                >
                  Oops, No Product Found...
                </Text>
                <Text
                  mt={"10px"}
                  color={"#6C757D"}
                  fontSize={"18px"}
                  lineHeight={"21.6px"}
                  fontWeight={300}
                  letterSpacing={"0px"}
                >
                  Please try another keyword
                </Text>
                <Button
                  mt={"15px"}
                  p={"15px 45px"}
                  bgColor={"#0095DA"}
                  color={"#fff"}
                  _hover={{
                    bgColor: "#0370A2",
                  }}
                  _active={"none"}
                  onClick={() => navigate("/product")}
                >
                  Reset Filter
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {" "}
              <Grid
                templateColumns="repeat(5,1fr)"
                p={"35px"}
                pt={"25px"}
                mx={"auto"}
                rowGap={"25px"}
                gap={"15px"}
                h={"fit-content"}
                minH={"695.2px"}
              >
                {isLoading && renderProduct()}
              </Grid>
              <Box
                display={"flex"}
                justifyContent={"center"}
                h={"24px"}
                bgColor={"#fff"}
                alignItems={"center"}
                borderBottomRadius={"10px"}
                pb={"25px"}
              >
                <Box
                  cursor={"pointer"}
                  color={
                    Number(product_page) === 1 || Number(page) === 1
                      ? "#dbdee2"
                      : "#31353BAD"
                  }
                  ml={"4px"}
                  mr={"4px"}
                  p={"1px 6px"}
                  minW={"24px"}
                  h={"20px"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                  fontSize={"14px"}
                  lineHeight={"18px"}
                  textAlign={"center"}
                  onClick={
                    Number(product_page) === 1 || Number(page) === 1
                      ? null
                      : previousPageBtn
                  }
                >
                  ❮
                </Box>
                {renderPagination()}
                <Box
                  onClick={
                    Number(product_page) >= maxPage || Number(page) >= maxPage
                      ? null
                      : nextPageBtn
                  }
                  cursor={"pointer"}
                  color={
                    Number(product_page) >= maxPage || Number(page) >= maxPage
                      ? "#dbdee2"
                      : "#31353BAD"
                  }
                  ml={"4px"}
                  mr={"4px"}
                  p={"1px 6px"}
                  minW={"24px"}
                  h={"20px"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                  fontSize={"14px"}
                  lineHeight={"18px"}
                  textAlign={"center"}
                >
                  ❯
                </Box>
              </Box>
            </>
          )}
          {/* pagination */}
        </GridItem>
      </Grid>

      {/* Responsive */}
      {/* <Box
        mx="auto"
        mt="52px"
        display={{ base: "block", md: "block", lg: "none" }}
        maxW="500px"
      > */}
      {/* Filter and Search */}
      {/* <Box position="fixed" bgColor="white" w="100%">
          <Box
            marginBlockEnd="16px"
            marginBlockStart="18px"
            display="grid"
            alignItems="center"
            gridTemplateColumns="repeat(3,1fr)"
            gap="4px"
            maxW="500px"
            p="16px"
          > */}
      {/* Filter */}
      {/* <GridItem justifySelf="end" ml="30px">
              <Select placeholder="Filter" onChange={filterBtnHandler}>
                {categoryData.map((val) => (
                  <option
                    value={val.id}
                    bgColor="white"
                    borderBottom="1px solid #dfe1e3"
                    justifyContent="flex-start"
                    _hover={{
                      bgColor: "#dfe1e3",
                      borderRadius: "10px",
                      color: "#0095DA",
                    }}
                  >
                    {val.category_name}
                  </option>
                ))}
              </Select>
            </GridItem> */}

      {/* Sort */}
      {/* <GridItem justifySelf="end" ml="30px">
              <Select onChange={sortBtnHandler} placeholder="Sort">
                <option value="product_name ASC">A - Z</option>
                <option value="product_name DESC">Z - A</option>
                <option value="price DESC">Highest</option>
                <option value="price ASC">Lowest</option>
              </Select>
            </GridItem> */}

      {/* Reset */}
      {/* <GridItem justifySelf="end">
              <Button
                variant="unstyled"
                onClick={() => resetBtnHandler()}
                color="#F7931E"
                fontWeight="bold"
              >
                <Text fontSize="12px" pr="15px">
                  RESET
                </Text>
              </Button>
            </GridItem>
          </Box>
        </Box> */}

      {/* Content */}
      {/* <Box mx="auto" w="500px">
          <Center> */}
      {/* Product */}
      {/* <Box borderRadius="12px" mt="110px" w="500px">
              {isLoading === false ? (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  alignContent={"center"}
                >
                  <CircularProgress
                    isIndeterminate
                    color="#0095DA"
                    thickness="160px"
                    size="100px"
                  />
                </Box>
              ) : !products.length ? (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle textAlign="center">No Products Found</AlertTitle>
                </Alert>
              ) : null}

              <Grid
                p="16px 0"
                pl="16px"
                gap="4"
                templateColumns="repeat(2,1fr)"
                justifyItems="center"
                w="500px"
              >
                {isLoading && renderProduct()}
              </Grid>
            </Box>
          </Center>
        </Box> */}

      {/* Page */}

      {/* <Box gap="2px" mb="10px" w="500px">
          <Center>
            {page === 1 ? null : (
              <CgChevronLeft
                bgColor="#0095DA"
                onClick={prevPageBtnHandler}
                color="#0095DA"
                cursor="pointer"
                size={30}
              />
            )}
            <Text>{page}</Text>
            {page >= maxPage ? null : (
              <CgChevronRight
                bgColor="#0095DA"
                color="#0095DA"
                onClick={nextPageBtnHandler}
                cursor="pointer"
                size={30}
              />
            )}
          </Center>
        </Box>
      </Box> */}
    </>
  );
};

export default Product;
