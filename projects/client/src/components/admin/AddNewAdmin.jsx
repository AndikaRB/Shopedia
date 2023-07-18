import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useEffect, useState } from "react"
import { BiHide, BiShow } from "react-icons/bi"
import { TbCameraPlus } from "react-icons/tb"
import { axiosInstance } from "../../api"

const AddNewAdmin = ({
  header,
  isOpenAddNewAdmin,
  onCloseAddNewAdmin,
  formikAddNewAdmin,
  onOpen,
  color,
}) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const inputFileRef = useRef()
  const [warehouseData, setWarehouseData] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formikAddNewAdmin.setFieldValue(name, value)
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
  }, [formChangeHandler])
  return (
    <Modal
      isOpen={isOpenAddNewAdmin}
      onClose={onCloseAddNewAdmin}
      motionPreset="slideInBottom"
      size={"3xl"}
    >
      <ModalOverlay />
      <form onSubmit={formikAddNewAdmin.handleSubmit}>
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
              <FormControl isInvalid={formikAddNewAdmin.errors.profile_picture}>
                <Image
                  w={"150px"}
                  h="150px"
                  objectFit={"cover"}
                  borderRadius={"8px"}
                  border="3px solid"
                  color={color}
                  mx="auto"
                  src={
                    selectedImage ? selectedImage : "Input Your Profile Picture"
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
                  //   bgColor={color}
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
                    formikAddNewAdmin.setFieldValue(
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
                  {formikAddNewAdmin.errors.profile_picture}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="12px">
              <FormLabel mb="8px">Username</FormLabel>
              <FormControl isInvalid={formikAddNewAdmin.errors.username}>
                <Input
                  value={formikAddNewAdmin.values.username}
                  name="username"
                  type="text"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formikAddNewAdmin.errors.username}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt={"34px"} mb="4px">
              <FormLabel mb={"8px"}>Email</FormLabel>
              <FormControl isInvalid={formikAddNewAdmin.errors.email}>
                <Input
                  value={formikAddNewAdmin.values.email}
                  name="email"
                  type="email"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formikAddNewAdmin.errors.email}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="12px">
              <FormLabel mb={"8px"}>Password</FormLabel>
              <FormControl isInvalid={formikAddNewAdmin.errors.password}>
                <InputGroup>
                  <Input
                    value={formikAddNewAdmin.values.password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={formChangeHandler}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      size="sm"
                      _active={false}
                      _hover={false}
                      onClick={togglePassword}
                      color={color}
                      bgColor="transparent"
                    >
                      {showPassword ? <BiShow /> : <BiHide />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {formikAddNewAdmin.errors.password}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="34px" mb="4px">
              <FormLabel mb="8px">Warehouse</FormLabel>
              <FormControl isInvalid={formikAddNewAdmin.errors.WarehouseId}>
                <Select
                  name="WarehouseId"
                  onChange={formChangeHandler}
                  placeholder="Select warehouse"
                >
                  {renderWarehouse()}
                </Select>
                <FormErrorMessage>
                  {formikAddNewAdmin.errors.WarehouseId}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="12px">
              <FormLabel mt={"15px"}>Phone Number</FormLabel>
              <FormControl isInvalid={formikAddNewAdmin.errors.phone_number}>
                <InputGroup>
                  <InputLeftAddon children="+62" />
                  <Input
                    value={formikAddNewAdmin.values.phone_number}
                    name="phone_number"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    maxLength={15}
                    onChange={formChangeHandler}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {formikAddNewAdmin.errors.phone_number}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Text m="20px 12px" textAlign={"center"}>
              By clicking "Save", you agree to the
              <Text
                color={"#0095DA"}
                ml="2px"
                display="inline"
                fontWeight="bold"
              >
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
                disabled={
                  !formikAddNewAdmin.values.username ||
                  !formikAddNewAdmin.values.phone_number ||
                  !formikAddNewAdmin.values.email ||
                  !formikAddNewAdmin.values.password ||
                  !formikAddNewAdmin.values.profile_picture
                }
              >
                Save
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default AddNewAdmin
