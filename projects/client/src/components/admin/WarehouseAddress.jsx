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
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../api"

const WarehouseAddress = ({
  isOpen,
  onClose,
  onSubmit,
  formik,
  formChangeHandler,
  header,
  selectProvince,
  selectCity,
}) => {
  const [province, setProvince] = useState([])
  const [city, setCity] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(0)
  const [selectedCity, setSelectedCity] = useState(0)
  selectProvince(selectedProvince)
  selectCity(selectedCity)

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={"3xl"}
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

          <ModalBody
            overflowY={"scroll"}
            maxH="529px"
            p="24px 40px"
            fontSize={"14px"}
          >
            <Text
              // mb={"24px"}
              fontSize={"20px"}
              fontWeight="bold"
              color={"black"}
            >
              Add warehouse details
            </Text>

            <Box 
            mt="20px"
            >
              <FormLabel>Warehouse Name</FormLabel>
              <FormControl isInvalid={formik.errors.warehouse_name}>
                <Input
                  value={formik.values.warehouse_name}
                  name="warehouse_name"
                  type="text"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formik.errors.warehouse_name}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <FormLabel>Address Labels</FormLabel>
              <FormControl isInvalid={formik.errors.address_labels}>
                <Input
                  value={formik.values.address_labels}
                  name="address_labels"
                  type={"text"}
                  onChange={formChangeHandler}
                />

                <FormErrorMessage>
                  {formik.errors.address_labels}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <Grid templateColumns={"1fr 1fr"} gap="4">
                <Box>
                  <FormLabel mb="8px">Province</FormLabel>
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
                  <FormLabel mb="8px">City</FormLabel>
                  <Select placeholder="--Select City--" onChange={cityHandler}>
                    {renderCity()}
                  </Select>
                </Box>
              </Grid>
            </Box>

            <Box>
              <FormLabel mb="8px">Districts</FormLabel>
              <FormControl isInvalid={formik.errors.districts}>
                <Input
                  value={formik.values.districts}
                  name="districts"
                  type={"text"}
                  onChange={formChangeHandler}
                />

                <FormErrorMessage>{formik.errors.districts}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="12px">
              <FormLabel mb={"8px"}>Full Address</FormLabel>
              <FormControl isInvalid={formik.errors.full_address}>
                <Textarea
                  value={formik.values.full_address}
                  name="full_address"
                  size={"md"}
                  resize="none"
                  maxLength={200}
                  p="12px 8px"
                  h={"119px"}
                  onChange={formChangeHandler}
                />

                <FormErrorMessage>
                  {formik.errors.full_address}
                </FormErrorMessage>
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
                onClick={onSubmit}
                disabled={
                  !formik.values.warehouse_name ||
                  !formik.values.address_labels ||
                  !formik.values.full_address ||
                  !formik.values.districts ||
                  selectedCity === 0 ||
                  selectedProvince === 0
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

export default WarehouseAddress

