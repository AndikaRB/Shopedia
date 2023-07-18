import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react"

const AddressModal = ({ header, isOpen, onClose, val }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent mt={"90px"} borderRadius="8px" overflow={false}>
        <ModalHeader
          fontSize={"24px"}
          fontWeight="bold"
          textAlign={"center"}
          borderBottom="1px solid #dfe1e3"
          p="0"
          h="36px"
        >
          <Text m="24px 0 16px">{header}</Text>
        </ModalHeader>
        <ModalCloseButton _hover={false} mt="10px" />

        <ModalBody
          maxH="529px"
          p="24px 40px"
          fontSize={"16px"}
          overflowY="scroll"
        >
          <Box mb="4px">
            <Text>
              {val?.length === 0 ? (
                <Text>Address not filled in</Text>
              ) : (
                val?.map((val) => {
                  return val.is_default == 1 ? (
                    <Box
                      border={"1px solid #F7931E"}
                      p="16px"
                      borderRadius={"10px"}
                      mb="4"
                    >
                      <Text fontWeight={"bold"}>Default Address</Text>
                      <Table>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Address Labels
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.address_labels}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Recipients Name
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.recipients_name}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Phone Number
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.phone_number}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Full Address
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.full_address}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Districts
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.districts}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            City
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.city}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Province
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.province}
                          </Td>
                        </Tr>
                      </Table>
                    </Box>
                  ) : (
                    <Box
                      border={"1px solid #0095DA"}
                      p="16px"
                      borderRadius={"10px"}
                      mb="4"
                    >
                      <Text fontWeight={"bold"}>Another Address</Text>
                      <Table>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Address Labels
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.address_labels}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Recipients Name
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.recipients_name}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Phone Number
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.phone_number}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Full Address
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.full_address}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Districts
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.districts}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            City
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.city}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td p="5px 0" border="none">
                            Province
                          </Td>
                          <Td p="5px 0" border="none">
                            : {val.province}
                          </Td>
                        </Tr>
                      </Table>
                    </Box>
                  )
                })
              )}
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddressModal
