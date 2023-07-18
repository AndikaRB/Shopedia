import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import AddressChangeCard from "./AddressChangeCard"
import FormAddress from "../profile/FormAddress"
import { useFormik } from "formik"
import * as Yup from "yup"
import Alert from "../profile/Alert"
import EditForm from "../profile/EditForm"
import { TbSearch } from "react-icons/tb"

const ChangeAddress = ({ defaultAddressUser }) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const {
    onOpen: onOpenAddNewAddress,
    isOpen: isOpenAddNewAddress,
    onClose: onCloseAddNewAddress,
  } = useDisclosure()

  const {
    onOpen: onOpenAlertAddNewAddress,
    isOpen: isOpenAlertAddNewAddress,
    onClose: onCloseAlertAddNewAddress,
  } = useDisclosure()

  const {
    onOpen: onOpenAlert,
    isOpen: isOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()

  const cancelRef = React.useRef()
  const toast = useToast()
  const [address, setAddress] = useState([])
  const [allAddress, setAllAddress] = useState([])
  const [selectedNewProvince, setSelectedNewProvince] = useState(0)
  const [selectedNewCity, setSelectedNewCity] = useState(0)
  const [selectedEditProvince, setSelectedEditProvince] = useState(0)
  console.log(selectedEditProvince)
  const [selectedEditCity, setSelectedEditCity] = useState(0)
  const [openedEdit, setOpenedEdit] = useState(null)
  const [currentSearch, setCurrentSearch] = useState("")
  const [defaultAddressId, setDefaultAddressId] = useState(0)
  const [refreshAddress, setRefreshAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  defaultAddressUser(defaultAddressId)

  const fetchAddress = async () => {
    try {
      const response = await axiosInstance.get(
        "/checkoutAddress/defaultAddress"
      )
      setAddress(response.data.data)
      setDefaultAddressId(response.data.data.id)
      setIsLoading(true)
    } catch (error) {
      console.log(error.response)
    }
  }

  const fetchAllAddress = async () => {
    try {
      const response = await axiosInstance.get("/checkoutAddress/allAddress", {
        params: {
          recipients_name: currentSearch,
          full_address: currentSearch,
        },
      })
      setAllAddress(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const refreshPage = () => {
    window.location.reload(false)
  }

  const onCloseAddressModal = () => {
    if (refreshAddress === false) {
      onClose()
    }
    if (refreshAddress === true) {
      refreshPage()
    }
  }

  const setAsDefault = async (id) => {
    try {
      const response = await axiosInstance.patch(`/address/setDefault/${id}`)

      toast({
        message: "Address set as default",
        description: response.data.message,
        status: "success",
      })
      fetchAllAddress()
      fetchAddress()
      setRefreshAddress(true)
    } catch (error) {
      console.log(error.response)
      toast({
        message: "Fail to set default",
        description: error.response.data.message,
        status: "error",
      })
    }
  }

  const formikAddNewAddress = useFormik({
    initialValues: {
      recipients_name: "",
      phone_number: "",
      address_labels: "",
      province: "",
      city: "",
      districts: "",
      full_address: "",
    },
    onSubmit: async ({
      recipients_name,
      phone_number,
      address_labels,
      districts,
      full_address,
    }) => {
      try {
        const response = await axiosInstance.post("/address/addNewAddress", {
          recipients_name,
          phone_number,
          address_labels,
          province: selectedNewProvince,
          city: selectedNewCity,
          districts,
          full_address,
        })
        toast({
          title: "Success to add new adderess",
          description: response.data.message,
          status: "success",
        })

        formikAddNewAddress.setFieldValue("recipients_name", "")
        formikAddNewAddress.setFieldValue("phone_number", "")
        formikAddNewAddress.setFieldValue("address_labels", "")
        formikAddNewAddress.setFieldValue("province", "")
        formikAddNewAddress.setFieldValue("city", "")
        formikAddNewAddress.setFieldValue("districts", "")
        formikAddNewAddress.setFieldValue("full_address", "")
        fetchAddress()
        fetchAllAddress()
      } catch (error) {
        console.log(error.response)
        toast({
          title: "Failed to add",
          description: error.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      recipients_name: Yup.string().required(),
      phone_number: Yup.string()
        .required(9)
        .matches(
          /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/,
          "Phone number must be valid"
        ),
      address_labels: Yup.string().required(),
      full_address: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formikAddNewAddress.setFieldValue(name, value)
  }

  const editFormik = useFormik({
    initialValues: {
      recipients_name: "",
      phone_number: "",
      address_labels: "",
      districts: "",
      full_address: "",
    },
    onSubmit: async ({
      recipients_name,
      phone_number,
      address_labels,
      districts,
      full_address,
    }) => {
      try {
        const response = await axiosInstance.patch(
          `/address/updateAddress/${openedEdit.id}`,
          {
            recipients_name,
            phone_number,
            address_labels,
            province: selectedEditProvince || editFormik.values.provinceId,
            city: selectedEditCity || editFormik.values.cityId,
            districts,
            full_address,
          }
        )
        console.log(response)
        toast({
          title: "Address Edited",
          description: response.data.message,
          status: "success",
        })

        editFormik.setFieldValue("recipients_name", "")
        editFormik.setFieldValue("phone_number", "")
        editFormik.setFieldValue("address_labels", "")
        editFormik.setFieldValue("full_address", "")
        editFormik.setFieldValue("districts", "")
        fetchAddress()
        fetchAllAddress()
        setOpenedEdit(null)
      } catch (error) {
        console.log(error)
        toast({
          title: "Failed Edit Admin",
          description: error.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      recipients_name: Yup.string(),
      phone_number: Yup.number(),
      address_labels: Yup.string(),
      districts: Yup.string(),
      full_address: Yup.string(),
    }),
    validateOnChange: false,
  })

  const editFormChangeHandler = ({ target }) => {
    const { name, value } = target
    editFormik.setFieldValue(name, value)
  }

  const doubleOnClick = () => {
    onCloseAlertAddNewAddress()
    onCloseAddNewAddress()
    setSelectedNewProvince(0)
    setSelectedNewCity(0)
    formikAddNewAddress.handleSubmit()
  }

  const doubleOnClick1 = () => {
    editFormik.handleSubmit()
    setSelectedEditProvince(0)
    setSelectedEditCity(0)
    onCloseAlert()
    setRefreshAddress(true)
  }

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search)
    },
  })

  const searchAdminHandler = ({ target }) => {
    const { name, value } = target
    formikSearch.setFieldValue(name, value)
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  useEffect(() => {
    fetchAllAddress()
  }, [isOpen, currentSearch])

  useEffect(() => {
    if (openedEdit) {
      editFormik.setFieldValue("address_labels", openedEdit.address_labels)
      editFormik.setFieldValue("full_address", openedEdit.full_address)
      editFormik.setFieldValue("recipients_name", openedEdit.recipients_name)
      editFormik.setFieldValue("phone_number", openedEdit.phone_number)
      editFormik.setFieldValue("districts", openedEdit.districts)
      editFormik.setFieldValue("cityId", openedEdit.cityId)
      editFormik.setFieldValue("provinceId", openedEdit.provinceId)
    }
  }, [openedEdit])
  return (
    <>
      <Box display={{ lg: "inline", base: "none" }}>
        <Box borderBottom="1px solid #fcd4a5">
          <Text
            fontSize={"14px"}
            fontFamily={"Open Sauce One, sans-serif"}
            fontWeight={700}
            color={"#31353B"}
            pb="14px"
          >
            Shipping Address
          </Text>
        </Box>
        <Box pb="20px" pt="20px">
          <Box>
            <Box display={"flex"} mb="4px">
              <Text
                fontWeight={"bolder"}
                mr="2px"
                fontSize={"13px"}
                color={"#31353B"}
                lineHeight={"1.4"}
                fontFamily={"Open Sauce One, sans-serif"}
              >
                {isLoading && address.recipients_name}
                {isLoading === false ? (
                  <Skeleton
                    height={"16px"}
                    startColor="#bab8b8"
                    endColor="#d4d2d2"
                    w="70px"
                    borderRadius="8px"
                  />
                ) : null}
              </Text>
              <Text
                mr="2px"
                color={"#31353B"}
                lineHeight={"1.4"}
                fontFamily={"Open Sauce One, sans-serif"}
                fontSize={"13px"}
              >
                {`(${isLoading && address.address_labels})`}
                {isLoading === false ? (
                  <Skeleton
                    height={"16px"}
                    startColor="#bab8b8"
                    endColor="#d4d2d2"
                    w="60px"
                    borderRadius="8px"
                  />
                ) : null}
              </Text>
              <Box
                display={"inline-flex"}
                alignItems={"center"}
                fontWeight={700}
                lineHeight={"16px"}
                fontSize="10px"
                backgroundColor="#E5F9F6"
                p="0 8px"
                borderRadius={"3px"}
                color="#0095DA"
                w={"52.2px"}
                h={"20px"}
                fontFamily={"Open Sauce One, sans-serif"}
                m={"0px"}
                justifyContent={"center"}
                ml={"2px"}
              >
                Main
              </Box>
            </Box>
            <Box>
              <Text
                color={"#31353B"}
                lineHeight={"1.4"}
                fontFamily={"Open Sauce One, sans-serif"}
                fontSize={"13px"}
                mb="4px"
              >
                {isLoading && address.phone_number}
                {isLoading === false ? (
                  <Skeleton
                    height={"16px"}
                    startColor="#bab8b8"
                    endColor="#d4d2d2"
                    w="90px"
                    borderRadius="8px"
                  />
                ) : null}
              </Text>
            </Box>
            <Box
              fontFamily={"Open Sauce One, sans-serif"}
              fontSize={"13px"}
              color={"#0000008A"}
              wordBreak={"break-word"}
              lineHeight={"1.4"}
            >
              <Text>
                {isLoading && address.full_address}
                {isLoading === false ? (
                  <Skeleton
                    height={"14px"}
                    startColor="#bab8b8"
                    endColor="#d4d2d2"
                    w="150px"
                    borderRadius="8px"
                  />
                ) : null}
              </Text>
              <Text>
                {isLoading && address.districts}, {isLoading && address.city},
                {isLoading && address.province}
                {isLoading === false ? (
                  <Skeleton
                    height={"14px"}
                    startColor="#bab8b8"
                    endColor="#d4d2d2"
                    w="240px"
                    borderRadius="8px"
                  />
                ) : null}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box borderTop="1px solid #fcd4a5" p={"25px 0px 10px"}>
          <Button
            p="0 17px"
            mb="18px"
            border="1px solid #0095DA"
            bgColor={"white"}
            onClick={onOpen}
            fontSize={"14px"}
            fontFamily={"Open Sauce One, sans-serif"}
            color={"#0095DA"}
            _hover={"none"}
            display={"flex"}
            alignContent={"center"}
          >
            <Text fontWeight={"bold"}>Choose Another Address</Text>
          </Button>
        </Box>
      </Box>

      {/* mobile responsive */}
      <Box display={{ lg: "none", base: "inline" }}>
        <Box
          w={"500px"}
          mt={"6px"}
          display={"flex"}
          flexDir={"column"}
          boxShadow={"rgb(0 0 0 / 15%) 0px 1px 3px 0px"}
        >
          <Box m={"16px"}>
            <Text
              fontSize={"14px"}
              color={"#31353BF5"}
              fontFamily={"Open Sauce One, sans-serif"}
              fontWeight={700}
              lineHeight={"18px"}
            >
              Shipping Destination
            </Text>
          </Box>
          <Box
            w={"500px"}
            p={"16px"}
            display={"flex"}
            flexDir={"column"}
            gap={"1px"}
          >
            <Box
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              color={"#31353BF5"}
              fontSize={"12px"}
              fontFamily={"Open Sauce One, sans-serif"}
              lineHeight={"16px"}
            >
              <Text fontWeight={700}>{address.recipients_name}</Text>
              <Text pl={"3px"}>{`(${address.address_labels})`}</Text>
            </Box>
            <Text
              color={"#31353BAD"}
              fontSize={"12px"}
              fontFamily={"Open Sauce One, sans-serif"}
              lineHeight={"16px"}
              fontWeight={400}
            >
              {address.phone_number}
            </Text>
            <Text
              fontSize={"11px"}
              color={"#31353BAD"}
              fontFamily={"Open Sauce One, sans-serif"}
              lineHeight={"14px"}
              fontWeight={400}
            >
              {address.full_address},{address.districts}, {address.city},{" "}
              {address.province}
            </Text>
            <Button
              mt={"12px"}
              border="1px solid #0095DA"
              bgColor={"white"}
              onClick={onOpen}
              fontSize={"14px"}
              fontFamily={"Open Sauce One, sans-serif"}
              color={"#0095DA"}
              _hover={"none"}
              display={"flex"}
              alignContent={"center"}
              w={"187.2px"}
              h={"32px"}
            >
              <Text
                fontSize={"12px"}
                fontFamily={"Open Sauce One, sans-serif"}
                fontWeight={"600"}
                lineHeight={"16px"}
              >
                Choose Another Address
              </Text>
            </Button>
          </Box>
        </Box>
        <Box h={"6px"} bgColor={"#edeff1"} />
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onCloseAddressModal}
        motionPreset="slideInBottom"
        size={"3xl"}
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
            <Text m="24px 0 16px">Address List</Text>
          </ModalHeader>
          <ModalCloseButton _hover={false} mt="10px" />

          <ModalBody
            overflowY={"scroll"}
            maxH="529px"
            p="24px 40px"
            fontSize={"14px"}
          >
            <form onSubmit={formikSearch.handleSubmit}>
              <FormControl>
                <InputGroup textAlign={"right"}>
                  <Input
                    type={"text"}
                    placeholder="Search by recipient's address or name"
                    name="search"
                    mb="24px"
                    onChange={searchAdminHandler}
                    _placeholder={"halo"}
                    borderRightRadius="0"
                    value={formikSearch.values.search}
                  />

                  <Button borderLeftRadius={"0"} type="submit">
                    <TbSearch />
                  </Button>
                </InputGroup>
              </FormControl>
            </form>
            <Box
              p="20px"
              fontSize={"16px"}
              fontWeight="bold"
              mb="18px"
              border="1px dashed var(--N100,#DBDEE2)"
              borderRadius={"4px"}
              onClick={onOpenAddNewAddress}
            >
              <Text textAlign={"center"}> Add a New Address</Text>
            </Box>

            {allAddress.map((val) => {
              return (
                <AddressChangeCard
                  key={val.id.toString()}
                  address_labels={val.address_labels}
                  recipients_name={val.recipients_name}
                  full_address={val.full_address}
                  phone_number={val.phone_number}
                  id={val.id}
                  on_edit={() => setOpenedEdit(val)}
                  on_default={() => setAsDefault(val.id)}
                  is_default={val?.is_default}
                />
              )
            })}
          </ModalBody>
        </ModalContent>
      </Modal>

      <FormAddress
        isOpen={isOpenAddNewAddress}
        onClose={onCloseAddNewAddress}
        onOpen={onOpenAlertAddNewAddress}
        formChangeHandler={formChangeHandler}
        formik={formikAddNewAddress}
        header={"Add Address"}
        selectProvince={setSelectedNewProvince}
        selectCity={setSelectedNewCity}
      />

      <Alert
        header={"Add New Address"}
        body={"Is the address you entered correct?"}
        cancelRef={cancelRef}
        isOpen={isOpenAlertAddNewAddress}
        onClose={onCloseAlertAddNewAddress}
        onSubmit={() => doubleOnClick()}
        rightButton={"Add Address"}
        leftButton={"Change Address"}
        color={"#F7931E"}
      />

      {/* modal edit address */}
      <EditForm
        editFormChangeHandler={editFormChangeHandler}
        formik={editFormik}
        isOpenMod={openedEdit}
        onSubmit={onOpenAlert}
        onCloseMod={() => setOpenedEdit(null)}
        selectProvince={setSelectedEditProvince}
        selectCity={setSelectedEditCity}
      />

      {/* Alert Edit address */}
      <Alert
        header={"Edit Address"}
        body={"Is the address you entered correct?"}
        cancelRef={cancelRef}
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        onSubmit={() => doubleOnClick1()}
        rightButton={"Edit Address"}
        leftButton={"Change Address"}
        color={"#F7931E"}
      />
    </>
  )
}

export default ChangeAddress
