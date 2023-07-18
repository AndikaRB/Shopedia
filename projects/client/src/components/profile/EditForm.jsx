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
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import Alert from "../profile/Alert"
import { CgClose } from "react-icons/cg"

const EditForm = ({
  onSubmit,
  isOpenMod,
  formik,
  editFormChangeHandler,
  onCloseMod,
  selectProvince,
  selectCity,
}) => {
  const [province, setProvince] = useState([])
  const [city, setCity] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(0)
  const [selectedCity, setSelectedCity] = useState(0)
  selectProvince(selectedProvince)
  selectCity(selectedCity)
  const doubleOnClick = () => {
    setSelectedProvince(0)
    setSelectedCity(0)
    onCloseExitAlert()
    onCloseMod()
  }
  const doubleOnClick1 = () => {
    onSubmit()
    // setSelectedProvince(0)
    // setSelectedCity(0)
  }

  const {
    isOpen: isOpenExitAlert,
    onOpen: onOpenExitAlert,
    onClose: onCloseExitAlert,
  } = useDisclosure()
  const cancelRef = React.useRef()

  const fetchProvince = async () => {
    try {
      const response = await axiosInstance.get("/address/province")
      setProvince(response.data.rajaongkir.results)
    } catch (error) {
      console.log(error)
    }
  }

  const renderProvince = () => {
    return province.map((val) => {
      return (
        <option value={val.province_id} key={val.province_id.toString()}>
          {val.province}
        </option>
      )
    })
  }

  const fetchCity = async () => {
    try {
      const response = await axiosInstance.get(
        `/address/city/${selectedProvince}`
      )
      setCity(response.data.rajaongkir.results)
    } catch (error) {
      console.log(error)
    }
  }

  const renderCity = () => {
    return Array.from(city).map((val, i) => {
      return (
        <option value={val.city_id} key={i}>
          {val.type + " "} {val.city_name}
        </option>
      )
    })
  }

  const provinceHandler = ({ target }) => {
    const { value } = target
    setSelectedProvince(value)
  }

  const cityHandler = ({ target }) => {
    const { value } = target
    setSelectedCity(value)
  }

  useEffect(() => {
    fetchProvince()
  }, [])
  useEffect(() => {
    fetchCity()
  }, [selectedProvince])
  return (
    <>
      <Modal
        isOpen={isOpenMod}
        onClose={onCloseMod}
        motionPreset="slideInBottom"
        size={{ lg: "3xl", md: "6xl", base: "xl" }}
      >
        <form>
          <ModalOverlay />
          <ModalContent
            mt={{ lg: "90px", md: "120px", base: "120px" }}
            borderRadius="8px"
            overflow={false}
            bottom={{ lg: "auto", md: "0px", base: "0px" }}
            left={{ lg: "auto", md: "0px", base: "0px" }}
            right={{ lg: "auto", md: "0px", base: "0px" }}
            position={{ lg: "static", md: "fixed", base: "fixed" }}
            m="0"
            zIndex={"99999"}
            height={{ lg: "auto", md: "500px", base: "500px" }}
          >
            <ModalHeader
              fontSize={{ lg: "24px", md: "16px", base: "16px" }}
              fontWeight="bold"
              textAlign={"center"}
              p="0"
              h={{ lg: "36px", md: "24px", base: "24px" }}
              m={{ lg: "16px 0", md: "12px 0 8px", base: "12px 0 8px" }}
            >
              <Grid templateColumns={"repeat(3,1fr)"}>
                <Box></Box>
                <Box>Change Address</Box>
                <Box textAlign={"right"}>
                  <Button
                    onClick={onOpenExitAlert}
                    size={"sm"}
                    mr="2"
                    mt={{ md: "-2", base: "-2" }}
                    bgColor={"#fff"}
                    _hover={false}
                    _active={false}
                  >
                    <CgClose fontSize={"20px"} />
                  </Button>
                </Box>
              </Grid>
            </ModalHeader>

            <ModalBody
              borderTop="1px solid #dfe1e3"
              overflowY={"scroll"}
              maxH="529px"
              p={{ lg: "24px 40px", md: "12px 20px", base: "12px 20px" }}
              fontSize={{ lg: "14px", md: "12px", base: "12px" }}
            >
              <Text
                mb={"24px"}
                fontSize={"20px"}
                fontWeight="bold"
                color={"black"}
                display={{ lg: "block", md: "none", base: "none" }}
              >
                Complete the address details
              </Text>
              <Box mt={{ lg: "34px", md: "0xp", base: "0px" }} mb="4px">
                <Grid templateColumns={"repeat(2, 1fr)"} gap="4">
                  <Box>
                    <FormLabel
                      mb={{ lg: "8px", md: "4px", base: "4px" }}
                      fontSize={{ lg: "16px", md: "14px", base: "14px" }}
                    >
                      Province
                    </FormLabel>
                    <FormControl isInvalid={formik.errors.province}>
                      <Select
                        placeholder="--Select Province--"
                        onChange={provinceHandler}
                      >
                        {renderProvince()}
                      </Select>
                      <FormErrorMessage>
                        {formik.errors.province}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormLabel
                      mb={{ lg: "8px", md: "4px", base: "4px" }}
                      fontSize={{ lg: "16px", md: "14px", base: "14px" }}
                    >
                      City
                    </FormLabel>
                    <FormControl isInvalid={formik.errors.city}>
                      <Select
                        placeholder="--Select City--"
                        onChange={cityHandler}
                      >
                        {renderCity()}
                      </Select>
                      <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </Grid>
              </Box>
              <Box mt={{ lg: "12px", md: "6px", base: "6px" }}>
                <FormLabel
                  mb={{ lg: "8px", md: "4px", base: "4px" }}
                  fontSize={{ lg: "16px", md: "14px", base: "14px" }}
                >
                  Districts
                </FormLabel>
                <FormControl isInvalid={formik.errors.districts}>
                  <Input
                    value={formik.values.districts}
                    name="districts"
                    type={"text"}
                    onChange={editFormChangeHandler}
                  />

                  <FormErrorMessage>{formik.errors.districts}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box
                mt={{ lg: "34px", md: "17px", base: "17px" }}
                mb={{ lg: "4px", md: "2px", base: "2px" }}
              >
                <FormLabel
                  mb={{ lg: "8px", md: "4px", base: "4px" }}
                  fontSize={{ lg: "16px", md: "14px", base: "14px" }}
                >
                  Address Labels
                </FormLabel>
                <FormControl isInvalid={formik.errors.address_labels}>
                  <Input
                    value={formik.values.address_labels}
                    name="address_labels"
                    type="text"
                    onChange={editFormChangeHandler}
                  />
                  <FormErrorMessage>
                    {formik.errors.address_labels}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box mt={{ lg: "12px", md: "6px", base: "6px" }}>
                <FormLabel mb={"8px"}>Full Address</FormLabel>
                <FormControl isInvalid={formik.errors.full_address}>
                  <Textarea
                    value={formik.values.full_address}
                    name="full_address"
                    size={"md"}
                    resize="none"
                    maxLength={200}
                    p="12px 8px"
                    h={{ lg: "119px", md: "100px", base: "100px" }}
                    onChange={editFormChangeHandler}
                  />

                  <FormErrorMessage>
                    {formik.errors.full_address}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box
                mt={{ lg: "34px", md: "17px", base: "17px" }}
                mb={{ lg: "4px", md: "2px", base: "2px" }}
              >
                <FormLabel
                  mb={{ lg: "8px", md: "4px", base: "4px" }}
                  fontSize={{ lg: "16px", md: "14px", base: "14px" }}
                >
                  Recipient's Name
                </FormLabel>
                <FormControl isInvalid={formik.errors.recipients_name}>
                  <Input
                    value={formik.values.recipients_name}
                    name="recipients_name"
                    type={"text"}
                    onChange={editFormChangeHandler}
                  />

                  <FormErrorMessage>
                    {formik.errors.recipients_name}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box
                mt={{ lg: "34px", md: "17px", base: "17px" }}
                mb={{ lg: "4px", md: "2px", base: "2px" }}
              >
                <FormLabel
                  mb={{ lg: "8px", md: "4px", base: "4px" }}
                  fontSize={{ lg: "16px", md: "14px", base: "14px" }}
                >
                  Phone Number
                </FormLabel>
                <FormControl isInvalid={formik.errors.phone_number}>
                  <Input
                    value={formik.values.phone_number}
                    name="phone_number"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    maxLength={15}
                    minLength={9}
                    onChange={editFormChangeHandler}
                  />
                  <FormErrorMessage>
                    {formik.errors.phone_number}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Text
                m={{ lg: "10px 12px", md: "5px 6px", base: "5px 6px" }}
                textAlign={"center"}
              >
                By clicking "Save", you agree to the
                <Text
                  color={"#F7931E"}
                  ml="2px"
                  display="inline"
                  fontWeight="bold"
                >
                  Terms & Conditions
                </Text>
              </Text>
              <Box
                m={{ lg: "16px 0", md: "8px 0px", base: "8px 0px" }}
                textAlign={"center"}
              >
                <Button
                  p={{ lg: "0px 16px", md: "0px 8px", base: "0px 8px" }}
                  fontSize={{ lg: "16px", md: "14px", base: "14px" }}
                  color="white"
                  fontWeight={"bold"}
                  w={{ lg: "80px", md: "60px", base: "60px" }}
                  _hover={false}
                  _active={false}
                  bgColor="#F7931E"
                  onClick={doubleOnClick1}
                >
                  Save
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>

      <Alert
        responsive={"Confirm exit page."}
        header={"Exit Page?"}
        body={
          "You will cancel the change of address. All data changes will not be saved."
        }
        cancelRef={cancelRef}
        isOpen={isOpenExitAlert}
        onClose={onCloseExitAlert}
        onSubmit={doubleOnClick}
        rightButton={"Exit"}
        leftButton={"Cancel"}
        color={"#F7931E"}
      />
    </>
  )
}
export default EditForm
