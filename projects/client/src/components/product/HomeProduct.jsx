import {
  Box,
  Text,
  Grid,
  HStack,
  CircularProgress,
  GridItem,
  Image,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../api";
import LoadingPage from "../loading/LoadingPage";
import ProductItem from "./ProductItem";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchProduct = async () => {
    try {
      const maxItemsPerPage = 12;
      const response = await axiosInstance.get(`/product`, {
        params: {
          _limit: maxItemsPerPage,
        },
      });
      setProducts(response.data.data);
      setIsloading(true);
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    fetchProduct();
  }, []);

  // if (!isLoading) {
  //   return <LoadingPage />;
  // }
  return (
    <>
      {isLoading && (
        <Box
          h={"fit-content"}
          w={"100%"}
          boxShadow={"0 0.5rem 1rem rgba(0,0,0,0.15)"}
          borderRadius={"10px"}
          px={"8px"}
          pt={"1px"}
        >
          <Box
            justifyContent={"space-between"}
            display={"flex"}
            borderBottom={"3px double #0095DA"}
            mt={"30px"}
            pb={"10px"}
          ></Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            pb={"20px"}
            bgColor={"#ffffff"}
          >
            <Text
              fontSize={"24px"}
              lineHeight={"28.8px"}
              mt={"-20px"}
              bgColor={"white"}
              px={"10px"}
              fontWeight={600}
              color={"#31353BF5"}
            >
              Recomended For You
            </Text>
          </Box>
          <Box
            w={"1200px"}
            h={"fit-content"}
            px={"5px"}
            pb={"25px"}
            mt={"10px"}
          >
            <Grid templateColumns="repeat(6, 1fr)" gap={"1px"} rowGap={"25px"}>
              {renderProduct()}
            </Grid>
            <Box display={"flex"} justifyContent={"center"} mt={"25px"}>
              <Link to="/product">
                <Button
                  w={"160px"}
                  bgColor={"#0095DA"}
                  color={"#ffffff"}
                  _hover={{
                    bgColor: "#0370A2",
                  }}
                  _active={{
                    bgColor: "#0370A2",
                  }}
                >
                  See All Products
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default HomeProduct;
