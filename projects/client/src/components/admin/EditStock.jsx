import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import { CgClose } from "react-icons/cg"
import Alert from "../profile/Alert"

const EditStock = ({
  editFormik,
  isOpen,
  header,
  onClose,
  color,
  onOpen,
  onCloseMod,
}) => {
  const cancelRef = React.useRef()
  const doubleOnClick = () => {
    onCloseExitAlert()
    onCloseMod()
  }
  const {
    isOpen: isOpenExitAlert,
    onOpen: onOpenExitAlert,
    onClose: onCloseExitAlert,
  } = useDisclosure()

  const editFormChangeHandler = ({ target }) => {
    const { name, value } = target
    editFormik.setFieldValue(name, value)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size={"md"}
      >
        <ModalOverlay />
        <form onSubmit={editFormik.handleSubmit}>
          <ModalContent mt={"90px"} borderRadius="8px" overflow={false}>
            <ModalHeader
              fontSize={"23.8px"}
              fontWeight="bold"
              textAlign={"center"}
              p="0"
              h="36px"
              m="16px 0"
            >
              <Grid templateColumns={"repeat(3,1fr)"}>
                <Box></Box>
                <Box my={"auto"}>{header}</Box>
                <Box textAlign={"right"}>
                  <Button
                    onClick={onOpenExitAlert}
                    size={"sm"}
                    mr="2"
                    bgColor={"#fff"}
                    _hover={false}
                  >
                    <CgClose fontSize={"20px"} />
                  </Button>
                </Box>
              </Grid>
            </ModalHeader>

            <ModalBody
              borderBottom="1px solid #dfe1e3"
              maxH="529px"
              p="24px 40px"
              fontSize={"14px"}
            >
              <Box mt="10px" mb="4px" display={"flex"} gap="2">
                <FormLabel my={"auto"}>Stock</FormLabel>
                <FormControl isInvalid={editFormik.errors.stock}>
                  <Input
                    value={editFormik.values.stock}
                    name="stock"
                    type="number"
                    onChange={editFormChangeHandler}
                  />
                  <FormErrorMessage>{editFormik.errors.stock}</FormErrorMessage>
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
                  bgColor={color}
                  onClick={onOpen}
                >
                  Save
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>

      <Alert
        header={"Exit Page?"}
        body={
          "You will cancel the update of stock. Data changes will not be saved."
        }
        cancelRef={cancelRef}
        isOpen={isOpenExitAlert}
        onClose={onCloseExitAlert}
        onSubmit={doubleOnClick}
        rightButton={"Exit"}
        leftButton={"Cancel"}
        color={color}
      />
    </>
  )
}

export default EditStock
