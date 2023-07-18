import { Box, Skeleton, Td, Tr } from "@chakra-ui/react"

const LoadingManageAdmin = () => {
  return (
    <Tr>
      <Td p="10px">
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="64px"
          w="64px"
          borderRadius="8px"
        />
      </Td>
      <Td p="10px">
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="64px"
          borderRadius="8px"
        />
      </Td>
      <Td p="10px">
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="64px"
          borderRadius="8px"
        />
      </Td>
      <Td p="10px">
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="64px"
          borderRadius="8px"
        />
      </Td>
      <Td p="10px">
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="64px"
          borderRadius="8px"
        />
      </Td>
      <Td p="10px">
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="64px"
          borderRadius="8px"
        />
      </Td>
      <Td p="10px">
        <Box display={"flex"} gap="2">
          <Skeleton
            startColor="#bab8b8"
            endColor="#d4d2d2"
            borderRadius="8px"
            w="49px"
            h="40px"
          />
          <Skeleton
            startColor="#bab8b8"
            endColor="#d4d2d2"
            borderRadius="8px"
            w="49px"
            h="40px"
          />
        </Box>
      </Td>
    </Tr>
  )
}

export default LoadingManageAdmin
