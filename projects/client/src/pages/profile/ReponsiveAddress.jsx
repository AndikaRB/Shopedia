import { Box, Text } from "@chakra-ui/react"
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"
import LoadingAddressList from "../../components/loading/LoadingAddressList"
import AddressCard from "../../components/profile/AddressCard"
import Search from "../../components/Search"

const ResponsiveAddress = ({
  onOpenAddNewAddress,
  isLoading,
  address,
  formikSearch,
  searchHandler,
  setDefaultAlert,
  setDeleteAlert,
  setOpenedEdit,
}) => {
  return (
    <Box
      fontSize={"16px"}
      display={{ base: "block", md: "block", lg: "none" }}
      maxW="500px"
      mx={"auto"}
    >
      <Box
        position={"fixed"}
        left="0"
        right={"0"}
        top="0"
        maxW={"500px"}
        mx="auto"
        backgroundColor={"white"}
        zIndex="9998"
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      >
        <Box
          h="52px"
          display={"flex"}
          borderBottom="1px solid var(--N75,#E5E7E9)"
          backgroundColor={"#E5F9F6"}
        >
          <Box fontSize={"20px"} alignItems="center" my="auto">
            <Link to={"/user/profile"}>
              <Box display={"flex"} alignItems="center" w="40px">
                <Box mx="auto">
                  <BiArrowBack fontSize={"24px"} />
                </Box>
              </Box>
            </Link>
          </Box>
          <Box
            fontSize={"16px"}
            fontWeight="bold"
            ml="2"
            display={"flex"}
            alignItems="center"
          >
            Address List
          </Box>
          <Box
            fontSize={"14px"}
            fontWeight="bold"
            ml="auto"
            display={"flex"}
            alignItems="center"
            pr="16px"
            onClick={onOpenAddNewAddress}
            color="#F7931E"
          >
            Add New Address
          </Box>
        </Box>
        <Box p="8px">
          <Search
            formikSearch={formikSearch}
            searchHandler={searchHandler}
            placeholder="Search by recipient's address or name"
            width={"100%"}
          />
        </Box>
      </Box>
      <Box p="0 12px" mt="120px" zIndex="9998" mb="20px">
        {isLoading &&
          address.map((val) => {
            return (
              <AddressCard
                key={val.id.toString()}
                address_labels={val.address_labels}
                recipients_name={val.recipients_name}
                full_address={val.full_address}
                phone_number={val.phone_number}
                id={val.id}
                on_delete={() => setDeleteAlert(val)}
                on_edit={() => setOpenedEdit(val)}
                on_default={() => setDefaultAlert(val)}
                is_default={val.is_default}
                isLoading={isLoading}
              />
            )
          })}
        {isLoading === false ? <LoadingAddressList /> : null}
        {!address.length && isLoading === true ? (
          <Box
            fontSize={"22px"}
            fontWeight="semibold"
            textAlign={"center"}
            p="40px"
            color={"#F7931E"}
          >
            <Link>
              <Text onClick={onOpenAddNewAddress}>
                Click Here To Add Your First Address
              </Text>
            </Link>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default ResponsiveAddress
