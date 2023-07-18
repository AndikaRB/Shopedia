import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import ResponsiveLoading from "../../components/loading/ResponsiveLoading"

const {
  Box,
  Text,
  Image,
  Table,
  Tr,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} = require("@chakra-ui/react")
const { Carousel } = require("react-responsive-carousel")

const ResponsiveProductDetail = ({
  cartItemQuantity,
  addToCart,
  userMustLogin,
  addToCartByProductId,
  addQuantity,
  stock,
}) => {
  const authSelector = useSelector((state) => state.auth)
  const [productDetail, setProductDetail] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {
    isOpen: isOpenDescription,
    onOpen: onOpenDescription,
    onClose: onCloseDescription,
  } = useDisclosure()

  const params = useParams()
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/product/${params.id}`)
      setProductDetail(response.data.data)
      setIsLoading(true)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <>
      {/* Responsive */}
      <Box
        maxW={"500px"}
        mx="auto"
        mt="52px"
        display={{ lg: "none", md: "block", base: "block" }}
      >
        {isLoading && productDetail ? (
          <Box mb="77.5px">
            <Box>
              <Carousel showStatus={false} showArrows={true}>
                {productDetail?.Image_Urls?.map((val, i) => {
                  return (
                    <>
                      <Image
                        src={val.image_url}
                        objectFit="contain"
                        h="375"
                        w="auto"
                      />
                      <Box mt="-25px" ml="16px" textAlign={"left"}>
                        <Box
                          display={"inline"}
                          backgroundColor="blackAlpha.400"
                          color={"white"}
                          p="2px 5px"
                          borderRadius={"5px"}
                        >
                          {i + 1}/{productDetail?.Image_Urls?.length}
                        </Box>
                      </Box>
                    </>
                  )
                })}
              </Carousel>
            </Box>
            <Box p="0 16px" mb="8px" mt="-27.5px">
              <Text m="8px 0" fontWeight={"bold"} fontSize="18px">
                Rp{productDetail.price?.toLocaleString("id-ID")}
              </Text>
              <Text fontSize={"14px"}>{productDetail.product_name}</Text>
            </Box>
            <Box height={"1"} backgroundColor="var(--NN50,#F0F3F7)"></Box>
            <Box m="16px 0" p="0 16px">
              <Text fontSize={"16px"} fontWeight="bold" mb="12px">
                Product Detail
              </Text>
              <Table fontSize={"14px"}>
                <Tr p="6px 0">
                  <Td p="0" w="50%">
                    Category
                  </Td>
                  <Td p="6px 0" color="#F7931E" fontWeight={"bold"}>
                    {productDetail.Category?.category_name}
                  </Td>
                </Tr>
              </Table>
            </Box>
            <Box height={"1"} backgroundColor="var(--NN50,#F0F3F7)"></Box>
            <Box m="16px 0 8px" p="0 16px" h="124.2">
              <Text fontSize={"16px"} fontWeight="bold" m="16px 0 8px">
                Product Description
              </Text>
              <Box
                h="66px"
                mb="8px"
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                fontSize="14px"
                whiteSpace={"pre-line"}
              >
                {productDetail.description}
              </Box>
              <Box
                fontSize="12px"
                fontWeight={"bold"}
                color="#F7931E"
                mt="-4px"
                onClick={onOpenDescription}
              >
                Read More
              </Box>
            </Box>
          </Box>
        ) : null}
        {isLoading === false ? <ResponsiveLoading /> : null}

        <Box
          h="60px"
          position={"fixed"}
          bottom="0"
          left={"0"}
          right="0"
          backgroundColor={"white"}
          boxShadow=" rgb(49 53 59 / 12%) 0px -1px 6px"
          p="10px 0"
          maxW={"500px"}
          mx="auto"
        >
          <Box p="0 10px">
            {cartItemQuantity === null ? (
              <Button
                w="100%"
                fontSize={"14px"}
                fontWeight="bold"
                bgColor="#F7931E"
                color="white"
                _hover={false}
                _active={false}
                onClick={authSelector.id ? addToCart : userMustLogin}
                isDisabled={
                  addQuantity === null || addQuantity === 0 || stock === 0
                    ? true
                    : false
                }
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                w="100%"
                fontSize={"14px"}
                fontWeight="bold"
                bgColor="#F7931E"
                color="white"
                _hover={false}
                _active={false}
                onClick={authSelector.id ? addToCartByProductId : userMustLogin}
                isDisabled={
                  addQuantity === null || addQuantity === 0 || stock === 0
                    ? true
                    : false
                }
              >
                Add to Cart
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Modal readmore description */}
      <Modal
        isOpen={isOpenDescription}
        onClose={onCloseDescription}
        motionPreset="slideInBottom"
        size={{ md: "6xl", base: "xl" }}
      >
        <ModalOverlay />
        <ModalContent
          mt={"60px"}
          borderRadius="8px"
          maxW={"500px"}
          overflow={false}
          bottom={"0px"}
          left={"0px"}
          right={"0px"}
          position={"fixed"}
          m="0"
          maxHeight={"95%"}
        >
          <ModalHeader fontSize={"18px"} fontWeight="bold" h="56px" p="16px">
            <Text>Product Details</Text>
          </ModalHeader>
          <ModalCloseButton
            mt="3px"
            fontSize={"16px"}
            onClick={onCloseDescription}
          />

          <ModalBody overflowY={"scroll"} maxH="529px" p="0" fontSize={"14px"}>
            <Box p="0 16px 16px">
              <Box display={"flex"}>
                <Image
                  w="54px"
                  src={isLoading && productDetail?.Image_Urls[0]?.image_url}
                  mr="8px"
                  objectFit={"contain"}
                />
                <Text
                  overflow={"hidden"}
                  textOverflow="ellipsis"
                  mb="6px"
                  fontWeight={"bold"}
                >
                  {productDetail.product_name}
                </Text>
              </Box>
              <Table mt="16px">
                <Tr>
                  <Td p="6px 0" w="142px">
                    Unit Weight
                  </Td>
                  <Td p="6px 0" color={"#212121"} fontWeight="550">
                    {productDetail.product_weight} g
                  </Td>
                </Tr>
                <Tr>
                  <Td p="6px 0" w="142px">
                    Category
                  </Td>
                  <Td p="6px 0" color={"#0095DA"} fontWeight="bold">
                    {productDetail.Category?.category_name}
                  </Td>
                </Tr>
              </Table>
            </Box>
            <Box>
              <Box>
                <Text fontWeight={"bold"} p="12px 16px" fontSize={"16px"}>
                  Product Description
                </Text>
              </Box>
              <Box p="0 16px 16px" whiteSpace={"pre-line"}>
                {productDetail.description}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ResponsiveProductDetail
