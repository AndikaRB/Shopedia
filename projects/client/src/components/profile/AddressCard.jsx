import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { BsThreeDots } from "react-icons/bs"
import { useState } from "react"

const AddressCard = ({
  address_labels,
  recipients_name,
  full_address,
  phone_number,
  id,
  on_delete,
  on_edit,
  on_default,
  is_default,
  isLoading,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [option, setOption] = useState(null)
  const doubleOnClick = () => {
    on_default()
    setOption(null)
  }
  const doubleOnClick1 = () => {
    on_delete()
    setOption(null)
  }
  return (
    <>
      {is_default == true ? (
        <>
          <Box
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            borderRadius="10px"
            m="16px 4px 4px"
            p="16px 24px"
            fontWeight={"bold"}
            color="black"
            fontSize={{ base: "12px", md: "12px", lg: "14px" }}
            bgColor="#E5F9F6"
            border={"1px solid #F7931E"}
          >
            <Box
              bgColor={"#F7931E"}
              w="6.5px"
              h="35px"
              position={"absolute"}
              ml="-24px"
              borderRightRadius={"5px"}
            />
            <Text>{address_labels}</Text>
            <Text fontSize={"14px"}>{recipients_name}</Text>
            <Text mt="4px" fontWeight={"normal"}>
              {phone_number}
            </Text>
            <Text fontWeight={"normal"}>{full_address}</Text>
            <Box display={{ base: "none", md: "none", lg: "flex" }}>
              <Link>
                <Text
                  mt="16px"
                  fontSize={"12px"}
                  color={"#F7931E"}
                  onClick={on_edit}
                >
                  Change Address
                </Text>
              </Link>
            </Box>
            <Box
              display={{ base: "block", md: "block", lg: "none" }}
              border="1px solid var(--NN300,#BFC9D9)"
              borderRadius={"8px"}
              p="6px 16px"
              textAlign={"center"}
              mt="16px"
              w="100%"
            >
              <Link>
                <Text fontSize={"12px"} color={"#F7931E"} onClick={on_edit}>
                  Change Address
                </Text>
              </Link>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          borderRadius="10px"
          m="16px 4px 4px"
          p="16px 24px"
          fontWeight={"bold"}
          color="black"
          fontSize={{ base: "12px", md: "12px", lg: "14px" }}
        >
          <Box
            bgColor={"#F7931E"}
            w="6.5px"
            h="35px"
            position={"absolute"}
            ml="-24px"
            borderRightRadius={"5px"}
          />
          <Text>{address_labels}</Text>
          <Text fontSize={"14px"}>{recipients_name}</Text>
          <Text mt="4px" fontWeight={"normal"}>
            {phone_number}
          </Text>
          <Text fontWeight={"normal"}>{full_address}</Text>
          <Box display={{ base: "none", md: "none", lg: "flex" }}>
            <Link>
              <Text
                mt="16px"
                fontSize={"12px"}
                color={"#F7931E"}
                onClick={on_edit}
              >
                Change Address
              </Text>
            </Link>
            <Link>
              <Text
                mt="16px"
                fontSize={"12px"}
                color={"#F7931E"}
                borderRight={"1px solid #dfe1e3"}
                borderLeft={"1px solid #dfe1e3"}
                pr="12px"
                mr="12px"
                ml="12px"
                pl="12px"
                onClick={on_default}
              >
                Make Address Primary
              </Text>
            </Link>
            <Link>
              <Text
                mt="16px"
                fontSize={"12px"}
                color={"#F7931E"}
                onClick={on_delete}
              >
                Delete
              </Text>
            </Link>
          </Box>

          <Box display={"flex"} gap="2">
            <Box
              display={{ base: "block", md: "block", lg: "none" }}
              border="1px solid var(--NN300,#BFC9D9)"
              borderRadius={"8px"}
              p="6px 16px"
              textAlign={"center"}
              mt="16px"
              w="85%"
            >
              <Link>
                <Text fontSize={"12px"} color={"#F7931E"} onClick={on_edit}>
                  Change Address
                </Text>
              </Link>
            </Box>
            <Box
              display={{ base: "block", md: "block", lg: "none" }}
              border="1px solid var(--NN300,#BFC9D9)"
              p="6px 16px"
              textAlign={"center"}
              borderRadius={"8px"}
              mt="16px"
              w="15%"
            >
              <Link>
                <Box
                  fontSize={"12px"}
                  color={"#F7931E"}
                  onClick={() => setOption(id)}
                  alignItems="center"
                  display={"inline-flex"}
                >
                  <BsThreeDots />
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
      {isLoading === false ? (
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
          <Box display={"flex"}>
            <Skeleton
              height="20px"
              startColor="#bab8b8"
              endColor="#d4d2d2"
              borderRadius={"5px"}
              mt="3"
              w="90px"
              mr="4"
            />
            <Skeleton
              height="20px"
              startColor="#bab8b8"
              endColor="#d4d2d2"
              borderRadius={"5px"}
              mt="3"
              w="90px"
              mr="4"
            />
            <Skeleton
              height="20px"
              startColor="#bab8b8"
              endColor="#d4d2d2"
              borderRadius={"5px"}
              mt="3"
              w="90px"
            />
          </Box>
        </Box>
      ) : null}

      <Modal
        isOpen={option}
        onClose={() => setOption(null)}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          position={"fixed"}
          left="0"
          right={"0"}
          bottom={"0"}
          m="0px"
          borderTopRadius={"10px"}
        >
          <ModalCloseButton mt="2" fontWeight={"bold"} />
          <ModalHeader fontWeight={"bold"}>Other Options</ModalHeader>
          <ModalBody p="0" fontSize={"16px"} fontWeight="bold">
            <Box
              p="16px"
              borderBottom="solid var(--NN300,#BFC9D9) 1px"
              onClick={() => doubleOnClick()}
            >
              Make Address Primary
            </Box>
            <Box p="16px" onClick={() => doubleOnClick1()}>
              Delete Address
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddressCard
