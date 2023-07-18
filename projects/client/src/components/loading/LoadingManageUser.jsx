import { Skeleton, Td, Tr } from "@chakra-ui/react"

const LoadingManageUser = () => {
  return (
    <Tr>
      <Td p="10px">
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          w="64px"
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
          height="40px"
          borderRadius="8px"
        />
      </Td>
    </Tr>
  )
}

export default LoadingManageUser
