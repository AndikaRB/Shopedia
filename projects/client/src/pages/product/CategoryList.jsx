import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CategoryList = ({
  category_name,
  setCategory,
  setSearchParam,
  category,
  category_filter,
  searchParam,
}) => {
  const filterByCategory = () => {
    setCategory(category_name);
    const params = {};

    if (searchParam.get("id")) {
      params["id"] = searchParam.get("id");
    } else if (searchParam.get("price")) {
      params["price"] = searchParam.get("price");
    } else if (searchParam.get("product_name")) {
      params["product_name"] = searchParam.get("product_name");
    }

    if (searchParam.get("page")) {
      params["page"] = 1;
    }

    params["category"] = category_name;
    setSearchParam(params);
  };

  //   useEffect(() => {
  //     if (category) {
  //       category_name = category;
  //     }
  //   }, []);
  return (
    <>
      {category_filter === category_name ? (
        <Text
          cursor={"pointer"}
          maxH={"33px"}
          mt={"3px"}
          ml={"15px"}
          p={"5px 20px 5px 5px"}
          borderBottom={"1px solid #E4E4E4"}
          borderRadius={"10px"}
          _hover={{ bgColor: "#F3F4F5", color: "#0095DA", fontWeight: 500 }}
          onClick={filterByCategory}
          bgColor={"#F3F4F5"}
          color={"#0095DA"}
          fontWeight={500}
        >
          {category_name}
        </Text>
      ) : (
        <Text
          cursor={"pointer"}
          maxH={"33px"}
          mt={"3px"}
          p={"5px 20px 5px 5px"}
          borderBottom={"1px solid #E4E4E4"}
          borderRadius={"10px"}
          _hover={{ bgColor: "#F3F4F5", color: "#0095DA", fontWeight: 500 }}
          onClick={filterByCategory}
          // fontWeight={500}
        >
          {category_name}
        </Text>
      )}
    </>
  );
};
export default CategoryList;
