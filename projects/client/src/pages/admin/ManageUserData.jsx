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
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import { IoIosAlert } from "react-icons/io"
import { axiosInstance } from "../../api"
import AddressModal from "../../components/admin/AddressModal"
import Pagination from "../../components/admin/Pagination"
import LoadingManageUser from "../../components/loading/LoadingManageUser"
import Search from "../../components/Search"

const ManageUserData = () => {
  const [userData, setUserData] = useState([])
  const [currentSearch, setCurrentSearch] = useState("")
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("username")
  const [sortDir, setSortDir] = useState("ASC")
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [openedAddress, setOpenedAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const fetchUserData = async () => {
    const maxItemsPerPage = 5
    try {
      const response = await axiosInstance.get("/userData/getAllUser", {
        params: {
          _page: page,
          _limit: maxItemsPerPage,
          username: currentSearch,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      })

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

  useEffect(() => {
    fetchUserData()
  }, [currentSearch, page, sortDir, sortBy, openedAddress])
  return (
    <Box ml="220px" p="24px" bgColor={"var(--NN50,#F0F3F7);"} h="100vh">
      <Box mb="16px">
        <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
          User Data({userData.length})
        </Text>
      </Box>

      <Grid gap="4" templateColumns={"repeat(2, 1fr)"} mt="4" mb="4">
        <Select
          onChange={sortCategoryHandler}
          fontSize={"15px"}
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
            <Th p="10px" w="100px">
              Address
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading &&
            userData.map((val) => {
              return (
                <Tr>
                  <Td p="10px" w={"64px"}>
                    <Avatar
                      size={"lg"}
                      borderRadius={"0"}
                      name={val.username}
                      src={`${apiImg}/${val.profile_picture}`}
                    />
                  </Td>
                  <Td p="10px">{val.username || "null"}</Td>
                  <Td p="10px">{val.email}</Td>
                  <Td p="10px">{val.phone_number || "null"}</Td>
                  <Td p="10px" w={"100px"}>
                    <Button
                      onClick={() => setOpenedAddress(val)}
                      _hover={false}
                      _active={false}
                      color="white"
                      bgColor="#0095DA"
                    >
                      Details
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          {isLoading === false ? <LoadingManageUser /> : null}
        </Tbody>
      </Table>
      {!userData.length && isLoading === true ? (
        <Box p="10px" bgColor={"#E5F9F6"}>
          <Box mx="auto">
            <Box display={"flex"} mx="auto" w="170px">
              <IoIosAlert fontSize={"25px"} color="#0095DA" />
              <Text fontWeight="medium" ml="2">
                No user found
              </Text>
            </Box>
          </Box>
        </Box>
      ) : null}

      <Pagination
        maxPage={maxPage}
        nextPage={nextPage}
        page={page}
        previousPage={previousPage}
      />

      <AddressModal
        header="Details Address"
        isOpen={openedAddress}
        onClose={() => setOpenedAddress(null)}
        val={openedAddress?.Addresses?.map((val) => val)}
      />
    </Box>
  )
}
export default ManageUserData
