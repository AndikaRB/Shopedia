import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react"

const RejectForm = ({ isOpen, onClose, onOpen, formik, header }) => {
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={"2xl"}
    >
      <form>
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

          <ModalBody maxH="529px" p="24px 40px" fontSize={"14px"}>
            <Text fontSize={"18px"} fontWeight="bold">
              Send messagge to user
            </Text>

            <Box mt="18px" mb="24px">
              <FormLabel mb={"8px"}>Message</FormLabel>
              <FormControl isInvalid={formik.errors.message}>
                <Textarea
                  value={formik.values.message}
                  name="message"
                  size={"md"}
                  resize="none"
                  maxLength={200}
                  p="12px 8px"
                  h={"119px"}
                  onChange={formChangeHandler}
                />

                <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box m="16px 0px" textAlign={"center"}>
              <Button
                p="0px 16px"
                fontSize={"16px"}
                color="white"
                fontWeight={"bold"}
                w="80px"
                _hover={false}
                bgColor="#F7931E"
                onClick={onOpen}
                disabled={!formik.values.message}
              >
                Send
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default RejectForm
