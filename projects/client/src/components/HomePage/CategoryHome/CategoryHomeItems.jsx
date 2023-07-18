import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api";
import { motion } from "framer-motion";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import LoadingPage from "../../loading/LoadingPage";

const CategoryHomeItems = ({ id, category_name, category_image, testfil }) => {
  const [countProduct, setCountProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const fetchCategoryByProductName = async () => {
    try {
      const response = await axiosInstance.get(`categories/category_detail`, {
        params: {
          category_name: category_name,
        },
      });

      const productQuantity = response.data.data.Products.map((val) => val);

      setCountProduct(productQuantity.length);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const productBtnHandler = () => {
    navigate(`/product?category=${category_name}`);
  };
  useEffect(() => {
    fetchCategoryByProductName();
  }, []);

  const myStyle = {
    fontSize: "14px",
    fontWeight: 700,
    paddingBot: "3px",
    marginTop: "3px",
    textAlign: "center",
  };

  const apiImg = process.env.REACT_APP_IMAGE_URL;

  if (!isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Box
        display={{ lg: "inline", base: "none" }}
        onClick={() => productBtnHandler()}
      >
        <GridItem w={"126px"} h={"122px"} cursor={"pointer"}>
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            _hover={{
              color: "#F7931E",
            }}
          >
            <motion.button
              whileHover={{
                scale: 1.2,
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              transition={{
                type: "spring",
                stifness: 300,
              }}
            >
              <Image
                w={"80px"}
                h={"80px"}
                src={`${apiImg}/${category_image}`}
              />
            </motion.button>
            <motion.text style={myStyle}>{category_name}</motion.text>
            <Text fontSize={"11.2px"} color={"#6C757D"} pb={"3px"}>
              {countProduct} Products
            </Text>
          </Box>
        </GridItem>
      </Box>

      {/* responsive mobile */}
      <Box display={{ lg: "none", base: "inline" }}>
        <GridItem
          w={"80px"}
          h={"96px"}
          cursor={"pointer"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            alignContent={"center"}
            _hover={{
              color: "#F7931E",
            }}
          >
            <motion.button
              whileHover={{
                scale: 1.2,
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              transition={{
                type: "spring",
                stifness: 300,
              }}
            >
              <Image
                w={"60px"}
                h={"60px"}
                src={`${apiImg}/${category_image}`}
              />
            </motion.button>
            <motion.text
              style={{
                fontSize: "11px",
                fontWeight: 700,
                paddingBot: "3px",
                marginTop: "0px",
                textAlign: "center",
              }}
            >
              {category_name}
            </motion.text>
            <Text fontSize={"9.2px"} color={"#6C757D"} pb={"3px"}>
              {countProduct} Products
            </Text>
          </Box>
        </GridItem>
      </Box>
    </>
  );
};

export default CategoryHomeItems;
