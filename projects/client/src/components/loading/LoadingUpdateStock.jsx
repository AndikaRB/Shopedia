import { Skeleton, Td, Tr } from "@chakra-ui/react"

const LoadingUpdateStock = () => {
  return (
    <Tr>
      <Td>
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="20px"
          borderRadius="8px"
        />
      </Td>
      <Td>
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="20px"
          borderRadius="8px"
        />
      </Td>
      <Td>
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="20px"
          borderRadius="8px"
        />
      </Td>
      <Td>
        <Skeleton
          startColor="#bab8b8"
          endColor="#d4d2d2"
          height="20px"
          borderRadius="8px"
        />
      </Td>
    </Tr>
  )
}

export default LoadingUpdateStock
