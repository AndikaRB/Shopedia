import {
  Avatar,
  Box,
  Button,
  Grid,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"
import * as Yup from "yup"
import AddNewAdmin from "../../components/admin/AddNewAdmin"
import Alert from "../../components/profile/Alert"
import EditAdmin from "../../components/admin/EditAdmin"
import { IoIosAlert } from "react-icons/io"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { GoDiffAdded } from "react-icons/go"
import LoadingManageAdmin from "../../components/loading/LoadingManageAdmin"
import Search from "../../components/Search"
import Pagination from "../../components/admin/Pagination"

const ManageAdminData = () => {
  const [userData, setUserData] = useState([])
  const cancelRef = React.useRef()
  const [currentSearch, setCurrentSearch] = useState("")
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("username")
  const [sortDir, setSortDir] = useState("ASC")
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const {
    isOpen: isOpenAddNewAdmin,
    onOpen: onOpenAddNewAdmin,
    onClose: onCloseAddNewAdmin,
  } = useDisclosure()

  const { onOpen, isOpen, onClose } = useDisclosure()

  const {
    onOpen: onOpenAlert,
    isOpen: isOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()

  const [openedEdit, setOpenedEdit] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [deleteAlert, setDeleteAlert] = useState(null)

  const fetchAdminData = async () => {
    const maxItemsPerPage = 5
    try {
      const response = await axiosInstance.get(
        "/userData/getAllWarehouseAdmin",
        {
          params: {
            _page: page,
            _limit: maxItemsPerPage,
            username: currentSearch,
            _sortBy: sortBy,
            _sortDir: sortDir,
          },
        }
      )

      setTotalCount(response.data.dataCount)
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))

      if (page === 1) {
        setUserData(response.data.data)
      } else {
        setUserData(response.data.data)
      }
      setIsLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  const apiImg = process.env.REACT_APP_IMAGE_URL

  const nextPage = () => {
    setPage(page + 1)
    setIsLoading(false)
  }

  const previousPage = () => {
    setPage(page - 1)
    setIsLoading(false)
  }

  const formikAddNewAdmin = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone_number: "",
      username: "",
      WarehouseId: "",
    },
    onSubmit: async ({
      email,
      password,
      phone_number,
      profile_picture,
      username,
      WarehouseId,
    }) => {
      try {
        const adminData = new FormData()

        if (email) {
          adminData.append("email", email)
        }

        if (password) {
          adminData.append("password", password)
        }

        if (phone_number) {
          adminData.append("phone_number", phone_number)
        }

        if (profile_picture) {
          adminData.append("profile_picture", profile_picture)
        }

        if (username) {
          adminData.append("username", username)
        }

        if (WarehouseId) {
          adminData.append("WarehouseId", WarehouseId)
        }

        const response = await axiosInstance.post(
          "/userData/addNewAdmin",
          adminData
        )

        toast({
          title: "Registration Success",
          description: response.data.message,
          status: "success",
        })
        formikAddNewAdmin.setFieldValue("email", "")
        formikAddNewAdmin.setFieldValue("password", "")
        formikAddNewAdmin.setFieldValue("phone_number", "")
        formikAddNewAdmin.setFieldValue("username", "")
        formikAddNewAdmin.setFieldValue("WarehouseId", "")
        fetchAdminData()
      } catch (error) {
        console.log(error)
        toast({
          title: "Registration Failed",
          description: error.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string()
        .required(8)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      phone_number: Yup.number().required().min(9),
      profile_picture: Yup.string().required(),
      username: Yup.string().required().min(3),
    }),
    validateOnChange: false,
  })

  const editFormik = useFormik({
    initialValues: {
      phone_number: "",
      username: "",
      WarehouseId: "",
    },
    onSubmit: async ({
      phone_number,
      profile_picture,
      username,
      WarehouseId,
    }) => {
      try {
        const adminData = new FormData()

        if (phone_number) {
          adminData.append("phone_number", phone_number)
        }

        if (profile_picture) {
          adminData.append("profile_picture", profile_picture)
        }

        if (username) {
          adminData.append("username", username)
        }

        if (WarehouseId) {
          adminData.append("WarehouseId", WarehouseId)
        }

        const response = await axiosInstance.patch(
          `/userData/editAdmin/${openedEdit.id}`,
          adminData
        )
        toast({
          title: "Admin Edited",
          description: response.data.message,
          status: "success",
        })

        editFormik.setFieldValue("phone_number", "")
        editFormik.setFieldValue("profile_picture", "")
        editFormik.setFieldValue("username", "")
        editFormik.setFieldValue("WarehouseId", "")
        fetchAdminData()
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
      phone_number: Yup.number().min(9),
      username: Yup.string().min(3),
    }),
    validateOnChange: false,
  })

  const deleteAdminHandler = async (id) => {
    try {
      await axiosInstance.delete(`/userData/deleteAdmin/${id}`)

      fetchAdminData()

      toast({
        title: "Admin Deleted",
        status: "info",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed Delete Admin",
        description: error.response.data.message,
        status: "error",
      })
    }
  }

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search)
      setPage(1)
      setIsLoading(false)
    },
  })

  const searchHandler = ({ target }) => {
    const { name, value } = target
    formikSearch.setFieldValue(name, value)
  }
  const sortCategoryHandler = ({ target }) => {
    const { value } = target
    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
    setIsLoading(false)
  }
  const doubleOnClick = () => {
    onClose()
    onCloseAddNewAdmin()
    formikAddNewAdmin.handleSubmit()
    setIsLoading(false)
  }

  const doubleOnClick1 = () => {
    editFormik.handleSubmit()
    onCloseAlert()
    setSelectedImage(null)
    setIsLoading(false)
  }

  const doubleOnClick2 = () => {
    setDeleteAlert(null)
    deleteAdminHandler(deleteAlert.id)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAdminData()
  }, [
    openedEdit,
    deleteAlert,
    selectedImage,
    currentSearch,
    page,
    sortDir,
    sortBy,
  ])

  useEffect(() => {
    if (openedEdit) {
      editFormik.setFieldValue("email", openedEdit.email)
      editFormik.setFieldValue("phone_number", openedEdit.phone_number)
      editFormik.setFieldValue("profile_picture", openedEdit.profile_picture)
      editFormik.setFieldValue("username", openedEdit.username)
      editFormik.setFieldValue("WarehouseId", openedEdit.WarehouseId)
    }
  }, [openedEdit])
  return (
    <Box ml="220px" p="24px" bgColor={"var(--NN50,#F0F3F7);"} h="100vh">
      <Box mb="16px">
        <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
          Admin Data({totalCount})
        </Text>
      </Box>

      <Grid gap="4" templateColumns={"1fr 1fr auto"} mt="4" mb="4">
        <Select
          onChange={sortCategoryHandler}
          fontSize={"15px"}
          fontWeight="normal"
          color={"#6D6D6F"}
          bgColor={"white"}
        >
          <option value="username ASC" selected>
            Name A-Z
          </option>
          <option value="username DESC">Name Z-A</option>
          <option value="createdAt DESC">Latest</option>
          <option value="createdAt ASC">Old</option>
        </Select>

        <Search
          formikSearch={formikSearch}
          searchHandler={searchHandler}
          placeholder="Search by username"
          width={"100%"}
        />

        <Button
          bgColor={"#0095DA"}
          color="white"
          _hover={false}
          _active={false}
          title="Add New"
          onClick={onOpenAddNewAdmin}
        >
          <GoDiffAdded fontSize={"17px"} />
        </Button>
      </Grid>

      <Table
        variant={"striped"}
        colorScheme={"blue"}
        bgColor="white"
        borderRadius="8px"
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      >
        <Thead>
          <Tr>
            <Th p="10px" w="64px">
              Photo Profile
            </Th>
            <Th p="10px">Username</Th>
            <Th p="10px">Email</Th>
            <Th p="10px">Phone Number</Th>
            <Th p="10px">Role</Th>
            <Th p="10px">Warehouse</Th>
            <Th p="10px" w={"120px"}>
              Option
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading &&
            userData.map((val) => {
              return (
                <Tr key={val.id.toString()}>
                  <Td p={"10px"} w="64px">
                    <Avatar
                      size={"lg"}
                      borderRadius={"0"}
                      name={val.username}
                      src={`${apiImg}/${val.profile_picture}`}
                    />
                  </Td>
                  <Td p={"10px"}>{val.username}</Td>
                  <Td p={"10px"} w="240px">
                    {val.email}
                  </Td>
                  <Td p={"10px"} w="160px">
                    {val.phone_number || "null"}
                  </Td>
                  <Td p={"10px"}>{val.Role.role_name || "null"}</Td>
                  <Td p={"10px"}>{val.Warehouse?.warehouse_name || "null "}</Td>
                  <Td p={"10px"}>
                    <Box gap="2" display="flex">
                      <Button
                        bgColor={"#0095DA"}
                        _hover={false}
                        title="Edit"
                        _active={false}
                        color="white"
                        onClick={() => setOpenedEdit(val)}
                      >
                        <BiEdit fontSize={"17px"} />
                      </Button>
                      <Button
                        bgColor={"#F7931E"}
                        _hover={false}
                        title="Delete"
                        _active={false}
                        color="white"
                        onClick={() => setDeleteAlert(val)}
                      >
                        <RiDeleteBin2Fill fontSize={"17px"} />
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              )
            })}
          {isLoading === false ? <LoadingManageAdmin /> : null}
        </Tbody>
      </Table>
      {!userData.length && isLoading === true ? (
        <Box p="10px" bgColor={"#E5F9F6"}>
          <Box mx="auto">
            <Box display={"flex"} mx="auto" w="170px">
              <IoIosAlert fontSize={"25px"} color="#0095DA" />
              <Text fontWeight="medium" ml="2">
                No admin found
              </Text>
            </Box>
          </Box>
        </Box>
      ) : null}

      {/* Alert Delete */}
      <Alert
        body={`Areyou sure to delete "${deleteAlert?.username}"`}
        cancelRef={cancelRef}
        color={"#0095DA"}
        header={"Delete Admin"}
        isOpen={deleteAlert}
        leftButton={"Cancel"}
        onClose={() => setDeleteAlert(null)}
        onSubmit={() => doubleOnClick2()}
        rightButton={"Delete"}
      />

      {/* Modal Add New Admin */}
      <AddNewAdmin
        formikAddNewAdmin={formikAddNewAdmin}
        isOpenAddNewAdmin={isOpenAddNewAdmin}
        onCloseAddNewAdmin={onCloseAddNewAdmin}
        header="Add New Admin"
        onOpen={onOpen}
        color="#0095DA"
      />

      {/* Alert Add New Admin */}
      <Alert
        header={"Add New Admin"}
        body={"Is data that you entered is correct"}
        cancelRef={cancelRef}
        isOpen={isOpen}
        leftButton={"Cancel"}
        onClose={onClose}
        rightButton={"Add New Admin"}
        onSubmit={() => doubleOnClick()}
        color={"#0095DA"}
      />

      {/* Modal Edit Admin */}
      <EditAdmin
        editFormik={editFormik}
        isOpen={openedEdit}
        header={"Edit Admin"}
        onClose={() => setOpenedEdit(null)}
        color={"#0095DA"}
        onOpen={onOpenAlert}
        onCloseMod={() => setOpenedEdit(null)}
      />

      {/* Alert Edit admin */}
      <Alert
        body={"Is data that you entered correct?"}
        cancelRef={cancelRef}
        color={"#0095DA"}
        header={"Edit Admin"}
        isOpen={isOpenAlert}
        leftButton={"Cancel"}
        onClose={onCloseAlert}
        onSubmit={doubleOnClick1}
        rightButton={"Edit Admin"}
      />

      <Pagination
        maxPage={maxPage}
        nextPage={nextPage}
        page={page}
        previousPage={previousPage}
      />
    </Box>
  )
}
export default ManageAdminData
