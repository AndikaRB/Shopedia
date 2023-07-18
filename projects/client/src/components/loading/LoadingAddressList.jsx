import { Box, Skeleton } from "@chakra-ui/react"

const LoadingAddressList = () => {
  return (
    <Box
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      borderRadius="10px"
      m="16px 4px 4px"
      p="16px 24px"
      fontWeight={"bold"}
      color="black"
      fontSize={"14px"}
    >
      <Box
        bgColor={"#F7931E"}
        w="6.5px"
        h="35px"
        position={"absolute"}
        ml="-24px"
        borderRightRadius={"5px"}
      />
      <Skeleton
        height="20px"
        startColor="#bab8b8"
        endColor="#d4d2d2"
        borderRadius={"5px"}
        w="120px"
      />
      <Skeleton
        height="20px"
        startColor="#bab8b8"
        endColor="#d4d2d2"
        borderRadius={"5px"}
        mt="3"
        w="90px"
      />
      <Skeleton
        height="20px"
        startColor="#bab8b8"
        endColor="#d4d2d2"
        borderRadius={"5px"}
        mt="3"
        w="110px"
      />
      <Skeleton
        height="20px"
        startColor="#bab8b8"
        endColor="#d4d2d2"
        borderRadius={"5px"}
        mt="3"
        w="170px"
      />
      <Box display={{ lg: "flex", md: "block", base: "block" }}>
        <Skeleton
          height="20px"
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
          mt="3"
          w={"90px"}
          mr="4"
          display={{ lg: "block", md: "none", base: "none" }}
        />
        <Skeleton
          height="20px"
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
          mt="3"
          w="90px"
          mr="4"
          display={{ lg: "block", md: "none", base: "none" }}
        />
        <Skeleton
          height={{ lg: "20px", md: "32px", base: "32px" }}
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
          mt="3"
          w={{ lg: "90px", md: "100%", base: "100%" }}
        />
      </Box>
    </Box>
  )
}

export default LoadingAddressList
