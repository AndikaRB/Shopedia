import { Box } from "@chakra-ui/react";
import CarouselSlider from "../components/HomePage/Carousel";
import HomePageCategory from "../components/HomePage/CategoryHome/HomePageCategory";
import HomeProduct from "../components/product/HomeProduct";

const HomePage = () => {
  return (
    <Box>
      <Box width={{ lg: "1208px", base: "490px" }} marginX={"auto"}>
        <Box
          paddingBottom="24px"
          paddingTop={"24px"}
          h="auto"
          minHeight={"240px"}
        >
          <CarouselSlider />
          <HomePageCategory />
        </Box>

        {/* Product Card */}
        <HomeProduct />
      </Box>
    </Box>
  );
};

export default HomePage;
