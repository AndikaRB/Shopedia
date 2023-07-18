import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product_name, id, price, image_url }) => {
  const [productId, setProductId] = useState(0);

  const navigate = useNavigate();

  const productBtnHandler = () => {
    setProductId(id);
    navigate(`/product/${id}/${product_name}`);
  };
  useEffect(() => {}, [productId]);
  return (
    <>
      <GridItem
        onClick={productBtnHandler}
        cursor={"pointer"}
        w="190px"
        maxW={"190px"}
        // maxH={"311px"}
        h="fit-content"
        p={"0px 0px 20px 0px"}
        // border={"1px solid #C0C0C0"}
        boxShadow={"0px 1px 6px 0px rgba(49,53,59,0.12)"}
        borderRadius={"10px"}
        _hover={{
          border: "3px solid #0095DA",
          color: "#0095DA",
          maxWidth: "190px",
          maxH: "305.2px",
        }}
      >
        <Image
          w={"188px"}
          h={"188px"}
          src={image_url}
          borderTopRadius={"10px"}
        />
        <Box w={"100%"} pt={"10px"} px={"8px"}>
          <Text
            cursor={"pointer"}
            height={"57.6px"}
            fontSize={"12px"}
            lineHeight={"18px"}
            fontWeight={600}
            textAlign={"left"}
            mb={"6px"}
            style={{
              maxWidth: "172px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "36.1px",
            }}
          >
            {product_name}
          </Text>
          <Text
            bgColor={"#0095DA"}
            fontSize={"12px"}
            fontWeight={600}
            m={"2px 3px 2px 0px"}
            p={"1px 5px 1px 5px"}
            borderRadius={"2.5px"}
            w={"fit-content"}
            h={"fit-content"}
            color={"#ffffff"}
          >
            Ready
          </Text>
          <Text
            mt={"5px"}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"20px"}
            textAlign={"left"}
            color={"#F7931E"}
          >
            Rp {price.toLocaleString("id-ID")}
          </Text>
        </Box>
      </GridItem>
    </>
  );
};

export default ProductItem;
