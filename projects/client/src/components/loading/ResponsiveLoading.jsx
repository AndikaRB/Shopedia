import { Box, Skeleton } from "@chakra-ui/react"

const ResponsiveLoading = () => {
  return (
    <Box mb="77.5px">
      <Skeleton
        height="375px"
        w="100%"
        startColor="#bab8b8"
        endColor="#d4d2d2"
        borderRadius={"5px"}
      />
      <Box p="0 16px" mb="8px" mt="16px">
        <Skeleton
          height="27px"
          w="150px"
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
          mb="8px"
        />
        <Skeleton
          height="21px"
          w="100%"
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
        />
      </Box>
      <Box height={"1"} backgroundColor="var(--NN50,#F0F3F7)"></Box>
      <Box m="16px 0" p="0 16px">
        <Skeleton
          height="24px"
          w="145px"
          mb={"12px"}
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
        />
        <Box display={"flex"} gap="2">
          <Skeleton
            height="32px"
            w="50%"
            mb={"12px"}
            startColor="#bab8b8"
            endColor="#d4d2d2"
            borderRadius={"5px"}
          />
          <Skeleton
            height="32px"
            w="50%"
            mb={"12px"}
            startColor="#bab8b8"
            endColor="#d4d2d2"
            borderRadius={"5px"}
          />
        </Box>
      </Box>
      <Box height={"1"} backgroundColor="var(--NN50,#F0F3F7)"></Box>
      <Box m="16px 0 8px" p="0 16px" h="124.2">
        <Skeleton
          height="24px"
          w="170px"
          mb={"8px"}
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
        />
        <Skeleton
          height="66px"
          w="100%"
          mb={"8px"}
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
        />
        <Skeleton
          height="18px"
          w="100px"
          mb={"8px"}
          startColor="#bab8b8"
          endColor="#d4d2d2"
          borderRadius={"5px"}
        />
      </Box>
    </Box>
  )
}
export default ResponsiveLoading
