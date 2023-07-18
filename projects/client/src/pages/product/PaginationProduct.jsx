import { Box } from "@chakra-ui/react";

const PaginationProduct = ({
  setPage,
  number,
  setSearchParam,
  searchParam,
  product_page,
  page,
  category,
}) => {
  const pageBtnHandler = () => {
    setPage(number);
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

    params["page"] = number;
    setSearchParam(params);
  };

  return (
    <Box h={"20px"} w={"32px"}>
      <Box
        ml={"4px"}
        mr={"4px"}
        p={"1px 6px"}
        pb={"20px"}
        minW={"24px"}
        h={"20px"}
        fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
        fontSize={"14px"}
        lineHeight={"18px"}
        textAlign={"center"}
        key={number}
        onClick={pageBtnHandler}
        cursor={"pointer"}
        color={
          Number(product_page) === number || Number(page) === number
            ? "#0095DA"
            : "#31353BAD"
        }
        borderBottom={
          Number(product_page) === number || Number(page) === number
            ? "2px solid #0095DA"
            : null
        }
      >
        {number}
      </Box>
    </Box>
  );
};
export default PaginationProduct;
