import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useRef } from "react"
import React, { useState } from "react"
import { CgClose } from "react-icons/cg"
import { TbCameraPlus } from "react-icons/tb"
import Alert from "../profile/Alert"
import { axiosInstance } from "../../api"
import { useEffect } from "react"

const EditAdmin = ({
  isOpen,
  onClose,
  header,
  editFormik,
  color,
  onOpen,
  onCloseMod,
}) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [warehouseData, setWarehouseData] = useState([])
  const inputFileRef = useRef()
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

  const fetchAllWarehouse = async () => {
    try {
      const response = await axiosInstance.get("/userData/findAllWarehouse")

      setWarehouseData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderWarehouse = () => {
    return warehouseData.map((val) => {
      return (
        <option key={val.id.toString()} value={val.id.toString()}>
          {val.warehouse_name}
        </option>
      )
    })
  }

  useEffect(() => {
    fetchAllWarehouse()
  }, [editFormChangeHandler])
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size={"3xl"}
      >
        <ModalOverlay />
        <form onSubmit={editFormik.handleSubmit}>
          <ModalContent mt={"90px"} borderRadius="8px" overflow={false}>
            <ModalHeader
              fontSize={"24px"}
              fontWeight="bold"
              textAlign={"center"}
              p="0"
              h="36px"
              m="16px 0"
            >
              <Grid templateColumns={"repeat(3,1fr)"}>
                <Box></Box>
                <Box>{header}</Box>
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
              overflowY={"scroll"}
              maxH="529px"
              p="24px 40px"
              fontSize={"14px"}
            >
              <Text
                mb={"24px"}
                fontSize={"20px"}
                fontWeight="bold"
                color={"black"}
              >
                Complete the data details
              </Text>

              <Box mt="34px" mb="4px">
                <FormControl isInvalid={editFormik.errors.profile_picture}>
                  <Image
                    w={"150px"}
                    h="150px"
                    objectFit={"cover"}
                    borderRadius={"8px"}
                    border="3px solid"
                    color={color}
                    mx="auto"
                    src={
                      selectedImage ? selectedImage : isOpen?.profile_picture
                    }
                  />

                  <Button
                    borderRadius={"50%"}
                    w="auto"
                    h="30px"
                    border="2px solid"
                    onClick={() => inputFileRef.current.click()}
                    color={"#F7931E"}
                    _hover={false}
                    ml="392px"
                    size={"xs"}
                    mt="-33px"
                  >
                    <TbCameraPlus color={"#F7931E"} />
                  </Button>

                  <Input
                    w="100%"
                    _hover={false}
                    fontWeight="bold"
                    bgColor={"white"}
                    onChange={(e) => {
                      editFormik.setFieldValue(
                        "profile_picture",
                        e.target.files[0]
                      )
                      setSelectedImage(URL.createObjectURL(e.target.files[0]))
                    }}
                    accept="image/*"
                    name="profile_picture"
                    type="file"
                    color="transparent"
                    border="0"
                    display={"none"}
                    ref={inputFileRef}
                  />
                  <FormErrorMessage>
                    {editFormik.errors.profile_picture}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box mt="12px">
                <FormLabel>Username</FormLabel>
                <FormControl isInvalid={editFormik.errors.username}>
                  <Input
                    value={editFormik.values.username}
                    name="username"
                    type="text"
                    onChange={editFormChangeHandler}
                  />
                  <FormErrorMessage>
                    {editFormik.errors.username}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box mt="34px" mb="4px">
                <FormLabel mt="15px">Phone Number</FormLabel>
                <FormControl isInvalid={editFormik.errors.phone_number}>
                  <InputGroup>
                    <InputLeftAddon children="+62" />
                    <Input
                      value={editFormik.values.phone_number}
                      name="phone_number"
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      onChange={editFormChangeHandler}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {editFormik.errors.phone_number}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box mt="12px">
                <FormLabel mb="8px">Email</FormLabel>
                <FormControl
                // isInvalid={editFormik.errors.email}
                >
                  <Input
                    disabled
                    // value={editFormik.values.email}
                    name="email"
                    type="text"
                    onChange={editFormChangeHandler}
                    //
                  />
                  <FormErrorMessage>
                    {/* {editFormik.errors.email} */}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box mt="34px" mb="4px">
                <FormLabel mb="8px">Warehouse</FormLabel>
                <FormControl isInvalid={editFormik.errors.WarehouseId}>
                  <Select
                    name="WarehouseId"
                    value={editFormik.values.WarehouseId}
                    onChange={editFormChangeHandler}
                    placeholder="Select Warehouse"
                  >
                    {renderWarehouse()}
                  </Select>
                  <FormErrorMessage>
                    {editFormik.errors.WarehouseId}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Text m="20px 12px" textAlign={"center"}>
                By clicking "Save", you agree to the
                <Text color={color} ml="2px" display="inline" fontWeight="bold">
                  Terms & Conditions
                </Text>
              </Text>
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
          "You will cancel the change of admin. All data changes will not be saved."
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

export default EditAdmin
