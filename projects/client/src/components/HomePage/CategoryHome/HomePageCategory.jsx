import { Box, CircularProgress, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api";
import CategoryHomeItems from "./CategoryHomeItems";

const HomePageCategory = ({ filter }) => {
  const [showCategory, setShowCategory] = useState([]);
  const [showCategoryMobile, setShowCategoryMobile] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [limitCategory, setLimitCategory] = useState(10);

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setShowCategory(response.data.data);
      setIsloading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategoryMobile = async () => {
    try {
      const response = await axiosInstance.get("/categories", {
        params: {
          _limit: limitCategory,
        },
      });
      setShowCategoryMobile(response.data.data);
      setIsloading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCategory = () => {
    return showCategory.map((val) => {
      return (
        <CategoryHomeItems
          key={val.id.toString()}
          category_name={val.category_name}
          category_image={val.category_image}
          id={val.id}
        />
      );
    });
  };

  const renderCategoryMobile = () => {
    return showCategoryMobile.map((val) => {
      return (
        <CategoryHomeItems
          key={val.id.toString()}
          category_name={val.category_name}
          category_image={val.category_image}
          id={val.id}
        />
      );
    });
  };

  useEffect(() => {
    fetchCategory();
    fetchCategoryMobile();
  }, [limitCategory]);

  return (
    <>
      {isLoading && (
        <Box display={{ lg: "inline", base: "none" }}>
          <Box
            width={"1200px"}
            borderRadius={"10px"}
            marginTop={"3rem"}
            boxShadow={"0 0.5rem 1rem rgba(0,0,0,0.15)"}
            mt={"30px"}
            mx={"auto"}
          >
            <Box
              fontWeight={600}
              p={"8px 5px 8px 12px"}
              position={"relative"}
              borderRadius={"10px 0 45px"}
              bgColor={"#0095DA"}
              width={"245px"}
            >
              <Text color={"#fff"} fontSize={"22px"} position={"relative"}>
                Shop By Categories
              </Text>
            </Box>
            {/* {isLoading === false ? (
                    <Box
                        w={"1200px"}
                        h={"400px"}
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
                ) : null} */}
            <Grid
              templateColumns="repeat(9, 1fr)"
              rowGap={"20px"}
              columnGap={"3px"}
              mt={"0px"}
              p={"25px"}
              pl={"15px"}
              pr={"15px"}
              pb={"50px"}
            >
              {isLoading && renderCategory()}
            </Grid>
          </Box>
        </Box>
      )}

      {/* mobile responsive */}
      <Box display={{ lg: "none", base: "inline" }}>
        <Box
          width={"480px"}
          borderRadius={"10px"}
          marginTop={"3rem"}
          boxShadow={"0 0.5rem 1rem rgba(0,0,0,0.15)"}
          mt={"20px"}
          ml={"6px"}
          h={"100%"}
        >
          <Box
            fontWeight={600}
            p={"5px 2px 5px 9px"}
            position={"relative"}
            borderRadius={"10px 0 45px"}
            bgColor={"#0095DA"}
            width={"200px"}
          >
            <Text color={"#fff"} fontSize={"18px"} position={"relative"}>
              Shop By Categories
            </Text>
          </Box>
          {isLoading === false ? (
            <Box
              w={"480px"}
              h={"300px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              alignContent={"center"}
            >
              <CircularProgress
                isIndeterminate
                color="#0095DA"
                thickness="160px"
                size="40px"
              />
            </Box>
          ) : null}
          <Grid
            templateColumns="repeat(5, 1fr)"
            rowGap={"5px"}
            columnGap={"0px"}
            p={"20px 10px 10px 20px"}
            w={"480px"}
          >
            {isLoading && renderCategoryMobile()}
          </Grid>
          {limitCategory === 10 ? (
            <Text
              cursor={"pointer"}
              fontWeight={600}
              p={"10px 0px 20px 0px"}
              textAlign={"center"}
              fontSize={"14px"}
              color={"#0095DA"}
              o
              onClick={() => setLimitCategory(50)}
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
            >
              Show More Categories
            </Text>
          ) : (
            <Text
              cursor={"pointer"}
              fontWeight={600}
              p={"1px 0px 20px 0px"}
              textAlign={"center"}
              fontSize={"14px"}
              color={"#0095DA"}
              onClick={() => setLimitCategory(10)}
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
            >
              Show Less
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};
export default HomePageCategory;
