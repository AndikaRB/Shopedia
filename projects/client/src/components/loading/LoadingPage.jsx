import { Box, Spinner, Text } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Box textAlign={"center"}>
      <Box mt={"240px"}>
        <Text p="4" fontWeight={"light"} fontSize="4xl">
          <Text
            fontSize={"30px"}
            fontWeight="bold"
            color={"#0095DA"}
            display="inline"
          >
            Shop
          </Text>
          <Text
            pl={"0"}
            fontSize={"30px"}
            fontWeight="bold"
            color={"#F7931E"}
            display="inline"
          >
            edia
          </Text>
        </Text>
        <Spinner
          thickness="5px"
          speed="0.9s"
          emptyColor="#F7931E"
          color="#0095DA"
          size="xl"
        />
        <Text mt="70px" fontWeight={"semibold"} fontSize="15px">
          Feel the convenience of transactions on Shopedia
        </Text>
      </Box>
    </Box>
  );
};

export default LoadingPage;
