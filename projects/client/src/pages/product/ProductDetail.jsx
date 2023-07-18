import {
  Box,
  Text,
  Stack,
  Image,
  Button,
  useNumberInput,
  Input,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Grid,
  GridItem,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import ResponsiveProductDetail from "./ResponsiveProdutcDetail";
import {
  addItemToCart,
  fillCart,
  getTotalCartQuantity,
} from "../../redux/features/cartSlice";
import LoadingPage from "../../components/loading/LoadingPage";

const ProductDetail = ({ product_name, id }) => {
  const [productDetail, setProductDetail] = useState([]);
  const [image, setImage] = useState([]);
  const [stock, setStock] = useState([]);
  const [productId, setProductId] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState(null);
  const [addNote, setAddNote] = useState(false);
  const [inputNote, setInputNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImageDetail, setProductImageDetail] = useState(productImage);
  const [productHover, setProductHover] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authSelector = useSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: imageIsOpen,
    onOpen: imageOnOpen,
    onClose: imageOnClose,
  } = useDisclosure();

  const {
    isOpen: cartIsOpen,
    onOpen: cartOnOpen,
    onClose: cartOnClose,
  } = useDisclosure();

  const {
    isOpen: insufficientIsOpen,
    onOpen: insufficientOnOpen,
    onClose: inSufficientOnClose,
  } = useDisclosure();

  const toast = useToast();

  const location = useLocation();

  const params = useParams();

  const fetchProductDetail = async () => {
    try {
      const response = await axiosInstance.get(`/product/${params.id}`);
      setProductDetail(response.data.data);
      setImage(response.data.data.Image_Urls);
      setProductId(response.data.data.id);
      setProductImage(response.data.data.Image_Urls[0].image_url);
      setCategory(response.data.data.Category.category_name);

      const cartStock = response.data.data.Total_Stocks.map((val) => val.stock);

      let Total = 0;

      for (let i = 0; i < cartStock.length; i++) {
        Total += Number(cartStock[i]);
      }

      setStock(Total);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProductImage = () => {
    return image.map((val) => {
      return (
        <Image
          w={"60px"}
          h={"60px"}
          borderRadius={"8px"}
          src={val.image_url}
          cursor={"pointer"}
          _hover={{ border: "2px solid #0095DA" }}
          // onMouseOver={() => setProductHover(val.image_url)}
          // onMouseOut={() => setProductHover("")}
          onClick={() => setProductImage(val.image_url)}
          border={
            productImage === val.image_url && productHover === ""
              ? "2px solid #0095DA"
              : "1px solid #E0E0E0"
            // productImage === val.image_url || productHover === val.image_url
            //   ? "2px solid #0095DA"
            //   : null
          }
        />
      );
    });
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: stock,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const addQuantity = Number(input.value);

  const userMustLogin = () => {
    if (!authSelector.id) {
      onOpen();
    }
  };

  const fetchCartByProductId = async () => {
    try {
      const response = await axiosInstance.get(
        `/carts/cartBy/ProductId/${productId}`
      );

      if (response.data.data === null) {
        setCartItemQuantity(null);
      } else {
        setCartItemQuantity(response.data.data.quantity);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMyCart = async () => {
    try {
      const response = await axiosInstance.get("/carts/me");
      dispatch(fillCart(response.data.data));

      const cartQuantity = response.data.data.map((val) => val.quantity);

      let Total = 0;

      for (let i = 0; i < cartQuantity.length; i++) {
        Total += Number(cartQuantity[i]);
      }

      dispatch(getTotalCartQuantity(Total));
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    try {
      let addToCart = {
        ProductId: productId,
        quantity: addQuantity,
        note: inputNote,
      };

      const response = await axiosInstance.post("/carts", addToCart);

      dispatch(addItemToCart(response.data.data));
      // toast({
      //   title: "Cart Items Added",
      //   status: "success",
      // });

      cartOnOpen();

      fetchMyCart();
      fetchCartByProductId();
    } catch (err) {
      console.log(err);

      if (stock === 0) {
        toast({
          title: `Failed Added Cart Items`,
          status: "error",
          description: "Product out of stock",
        });
      } else {
        toast({
          title: `Failed Added Cart Items`,
          status: "error",
          description: err.response.data.message,
        });
      }
    }
  };

  const addToExistingCart = async () => {
    try {
      let newQuantity = {
        quantity: addQuantity,
        note: inputNote,
      };
      const response = await axiosInstance.patch(
        `/carts/addCartItems/${productId}`,
        newQuantity
      );

      dispatch(addItemToCart(response.data.data));

      cartOnOpen();

      fetchCartByProductId();
      fetchMyCart();
    } catch (err) {
      console.log(err);

      if (stock === 0) {
        toast({
          title: `Failed Added Cart Items`,
          status: "error",
          description: "Product out of stock",
        });
      } else {
        insufficientOnOpen();

        setTimeout(() => inSufficientOnClose(), 3000);
      }
    }
  };

  const nextImage = () => {
    for (let i = 0; i < image.length; i++) {
      if (image[i].image_url === productImageDetail) {
        if (i === image.length - 1) {
          setProductImageDetail(image[0].image_url);
        }
        setProductImageDetail(image[i + 1].image_url);
      }
    }
  };

  const previousImage = () => {
    for (let i = 0; i < image.length; i++) {
      if (image[i].image_url === productImageDetail) {
        if (i <= 0) {
          setProductImageDetail(image[image.length - 1].image_url);
        }
        setProductImageDetail(image[i - 1].image_url);
      }
    }
  };

  const onCloseImageDetail = () => {
    setProductImageDetail(null);
    imageOnClose();
  };

  const onOpenImageDetail = () => {
    setProductImageDetail(productImage);
    imageOnOpen();
  };

  const cancelNotes = () => {
    setAddNote(false);
    setInputNote("");
  };

  const itemLeft = stock - cartItemQuantity;

  useEffect(() => {
    fetchProductDetail();
  }, []);

  useEffect(() => {
    // if (!productImageDetail) {
    //   setProductImageDetail(productImage);
    // }
    isLoading && fetchCartByProductId();
  }, [cartItemQuantity, productDetail, addQuantity]);

  if (!isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Box
        w={"100%"}
        fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
      >
        <Box
          display={"flex"}
          h={"41px"}
          mt={"80px"}
          flexDir={"row"}
          w={"1188px"}
          mx={"auto"}
          textAlign={"left"}
          fontSize={"13px"}
          lineHeight={"22px"}
          letterSpacing={"0px"}
          alignItems={"center"}
        >
          <Text
            cursor={"pointer"}
            color={"#0095DA"}
            onClick={() => navigate("/")}
          >
            Home
          </Text>
          <Text mx={"10px"} color={"#31353BAD"}>
            ❯
          </Text>
          <Text
            cursor={"pointer"}
            color={"#0095DA"}
            onClick={() => navigate("/product")}
          >
            All Products{" "}
          </Text>
          <Text mx={"10px"} color={"#31353BAD"}>
            ❯
          </Text>
          <Text
            cursor={"pointer"}
            color={"#0095DA"}
            onClick={() => navigate(`/product?category=${category}`)}
          >
            {category}{" "}
          </Text>
          <Text mx={"10px"} color={"#31353BAD"}>
            ❯
          </Text>
          <Text
            maxW={"200px"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            _hover={{ maxWidth: "500px" }}
          >
            {productDetail.product_name}
          </Text>
        </Box>
      </Box>
      <Box
        w={"1250px"}
        h={"760px"}
        boxShadow={"0px 5px 10px 0px rgba(0,0,0,0.15)"}
        mx={"auto"}
        mt={"15px"}
        py={"30px"}
        borderRadius={"16px"}
        borderTop={"5px solid #0095DA"}
        fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
      >
        <Grid
          templateColumns="3.21fr 4.317fr 2.47fr"
          gap={"50px"}
          w={"1188px"}
          mx={"auto"}
        >
          <GridItem>
            <Box w={"348px"} h={"420px"}>
              <Image
                cursor={"pointer"}
                w={"348px"}
                h={"348px"}
                borderRadius={"8px"}
                src={
                  !productHover.length || productHover === null
                    ? productImage
                    : productHover
                }
                onClick={onOpenImageDetail}
              />
              <Box mt={"12px"} display={"flex"} gap={3}>
                {renderProductImage()}
              </Box>
            </Box>
          </GridItem>
          <GridItem w="100%">
            <Text
              fontSize={"18px"}
              lineHeight={"24px"}
              fontWeight={700}
              letterSpacing={"0px"}
              color={"#212121"}
            >
              {productDetail.product_name}
            </Text>
            <Text
              mt={"20px"}
              fontSize={"28px"}
              lineHeight={"34px"}
              fontWeight={700}
              letterSpacing={"0px"}
              color={"#212121"}
            >
              {
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                  .format(productDetail.price)
                  .split(",")[0]
              }
            </Text>
            <Box w={"100%"} h={"20px"} borderBottom={"1px solid #F0F3F7"}></Box>
            <Box h={"45px"} w={"100%"} borderBottom={"1px solid #F0F3F7"}>
              <Text
                p={"10px 24px"}
                h={"44px"}
                w={"89px"}
                borderBottom={"2px solid #0095DA"}
                fontSize={"14px"}
                // lineHeight={"18px"}
                fontWeight={700}
                color={"#0095DA"}
              >
                Detail
              </Text>
            </Box>
            <Box
              mt={"14px"}
              fontSize={"14px"}
              lineHeight={"20px"}
              letterSpacing={"0px"}
              color={"#6D7588"}
            >
              <Text mb={"4px"}>
                Condition:{" "}
                <Text as={"span"} color={"#212121"}>
                  New
                </Text>
              </Text>
              <Text mb={"4px"}>
                Unit Weight:{" "}
                <Text as={"span"} color={"#212121"}>
                  {productDetail.product_weight} g
                </Text>
              </Text>
              <Text mb={"4px"}>
                Category:{" "}
                <Text
                  as={"span"}
                  color={"#0095DA"}
                  fontWeight={600}
                  onClick={() => navigate(`/product?category=${category}`)}
                  cursor={"pointer"}
                >
                  {category}
                </Text>
              </Text>
            </Box>
            <Text
              fontSize={"14px"}
              lineHeight={"20px"}
              letterSpacing={"0px"}
              color={"#212121"}
              mt={"16px"}
              overflowY={"auto"}
              maxH={"420px"}
            >
              {productDetail.description}
              {productDetail.description}
              {productDetail.description}
            </Text>
          </GridItem>
          <GridItem w={"100%"}>
            {/* Add to cart */}
            <Box
              bgColor={"#fff"}
              right={"250px"}
              p={"16px 12px"}
              display="block"
              px="16px"
              w="268px"
              h={"fit-content"}
              boxShadow={"0 0 10px 0 rgb(0 0 0 / 10%) !important"}
              borderRadius={"15px"}
              border={"1px solid #99d5f0"}
              position={"sticky"}
              top={70}
            >
              <Box gap="20px">
                <Stack>
                  <Text
                    fontSize="16px"
                    fontWeight={700}
                    textAlign={"left"}
                    lineHeight={"22px"}
                    m={"4px 0px 20px"}
                    color={"#3135BF5"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                  >
                    Set amount and note
                  </Text>
                </Stack>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  boxSizing={"inherit"}
                  w={"242.03px"}
                  h={"27.97px"}
                >
                  {/* set amount */}
                  <Box
                    w={"104px"}
                    h={"28px"}
                    display={"flex"}
                    border={"1px solid #BFC9D9"}
                    borderRadius={"4px"}
                    p={"3px"}
                    alignItems={"center"}
                    _hover={{
                      borderColor: "#0095DA",
                    }}
                    justifyContent={"flex-start"}
                  >
                    <Box
                      maxW={"20px"}
                      maxH={"20px"}
                      minH={"20px"}
                      minW={"20px"}
                      w={"20px"}
                      h={"20px"}
                      p={"0px"}
                      color={addQuantity > 1 ? "#0095DA" : "#c0cada"}
                      {...dec}
                      isDisabled={stock === 0 ? true : false}
                      bgColor={"#fff"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      _hover={"none"}
                      _active={"none"}
                    >
                      <AiOutlineMinus
                        style={{
                          height: "16px",
                          width: "16px",
                        }}
                      />
                    </Box>
                    <Input
                      isDisabled={stock === 0 ? true : false}
                      minWidth={"56px"}
                      maxWidth={"56px"}
                      height={"20px"}
                      textAlign="center"
                      p={"1px"}
                      {...input}
                      fontFamily={
                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                      }
                      fontSize={"14px"}
                      lineHeight={"18px"}
                      color={"rgba(49,53,59,0.68)"}
                      borderColor={"#fff"}
                      _hover={"none"}
                      focusBorderColor={"#fff"}
                      type={"number"}
                    />
                    {stock === 0 ? (
                      <Box
                        maxW={"20px"}
                        maxH={"20px"}
                        minH={"20px"}
                        minW={"20px"}
                        w={"20px"}
                        h={"20px"}
                        p={"0px"}
                        color={stock <= addQuantity ? "#c0cada" : "#0095DA"}
                        isDisabled={stock !== 0 ? false : true}
                        bgColor={"#fff"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        _hover={"none"}
                        _active={"none"}
                      >
                        <AiOutlinePlus />
                      </Box>
                    ) : (
                      <Box
                        maxW={"20px"}
                        maxH={"20px"}
                        minH={"20px"}
                        minW={"20px"}
                        w={"20px"}
                        h={"20px"}
                        p={"0px"}
                        color={stock <= addQuantity ? "#c0cada" : "#0095DA"}
                        {...inc}
                        isDisabled={stock !== 0 ? false : true}
                        bgColor={"#fff"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        _hover={"none"}
                        _active={"none"}
                      >
                        <AiOutlinePlus />
                      </Box>
                    )}
                  </Box>
                  <Text
                    lineHeight={"20px"}
                    ml={"8px"}
                    fontSize={"14px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    color={"#31353BF5"}
                    fontWeight={500}
                  >
                    {`Total Stocks: `}
                    <Text
                      as={"span"}
                      fontWeight={"bolder"}
                      color={stock === 0 ? "#FF6577" : "#31353BF5"}
                    >
                      {stock}
                    </Text>
                  </Text>
                </Box>
                {addQuantity > stock ? (
                  <Text
                    fontSize={"12px"}
                    fontFamily={"Open Sauce One, sans-serif"}
                    color={"red"}
                    mt={"5px"}
                    letterSpacing={"0.5px"}
                    fontWeight={500}
                  >
                    Maximum Quantity to purchase this item is {stock}
                  </Text>
                ) : null}

                {/* add notes */}
                {stock === 0 ? null : (
                  <Box
                    mt={"16px"}
                    display={"flex"}
                    color={"#0095DA"}
                    gap={"2px"}
                  >
                    {addNote === true ? null : (
                      <>
                        <MdModeEdit />
                        <Text
                          onClick={() => setAddNote(true)}
                          fontSize={"12px"}
                          fontFamily={"Open Sauce One, sans-serif"}
                          fontWeight={"600"}
                          lineHeight={"1,4"}
                          cursor={"pointer"}
                          color={"#0095DA"}
                          flex-direction={"row"}
                        >
                          Add Notes
                        </Text>
                      </>
                    )}
                    {addNote === true ? (
                      <Box>
                        <Input
                          padding={"10px 16px"}
                          type={"text"}
                          onChange={(e) => setInputNote(e.target.value)}
                          value={inputNote}
                          _placeholder={{
                            color: "#c2c2c2",
                          }}
                          placeholder={"Example: white color, medium size"}
                          width={"234px"}
                          height={"40px"}
                          margin={"0px"}
                          border={"1px solid #ebedee"}
                          borderRadius={"8px"}
                          color={"#31353BF5"}
                          focusBorderColor={"#0095DA"}
                          fontFamily={"Open Sauce One, Nunito Sans, sans-serif"}
                          fontSize={"14px"}
                        />
                        <Text
                          onClick={cancelNotes}
                          fontSize={"12px"}
                          fontFamily={"Open Sauce One, sans-serif"}
                          fontWeight={"600"}
                          lineHeight={"1,4"}
                          cursor={"pointer"}
                          color={"#0095DA"}
                          p={"0px"}
                          display={"flex"}
                          alignItems={"center"}
                          margin={"8px 0px 0px"}
                        >
                          Cancel Notes
                        </Text>
                      </Box>
                    ) : null}
                  </Box>
                )}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  pb={"16px"}
                  mt={"18px"}
                >
                  <Text
                    color={"#31353BAD"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    fontSize={"14px"}
                    fontWeight={"400"}
                    lineHeight={"18px"}
                    marginTop={"4px"}
                  >
                    Subtotal
                  </Text>
                  <Text
                    color={"#31353BF5"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    fontSize={"18px"}
                    fontWeight={"bold"}
                    lineHeight={"26px"}
                    margin={"0px"}
                  >
                    {stock === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                          .format(productDetail.price * addQuantity)
                          .split(",")[0]}
                  </Text>
                </Box>

                {cartItemQuantity === null ? (
                  <Button
                    letterSpacing={"0px"}
                    borderRadius={"8px"}
                    bgColor="#F7931E"
                    color="white"
                    w={"100%"}
                    h={"40px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    margin={"8px 0px"}
                    padding={"0px 16px"}
                    fontWeight={700}
                    alignItems={"center"}
                    _hover={{
                      bgColor: "#B86401",
                    }}
                    _active={{
                      bgColor: "#B86401",
                    }}
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
                    letterSpacing={"0px"}
                    borderRadius={"8px"}
                    bgColor="#F7931E"
                    color="white"
                    w={"100%"}
                    h={"40px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    margin={"8px 0px"}
                    padding={"0px 16px"}
                    fontWeight={700}
                    alignItems={"center"}
                    _hover={{
                      bgColor: "#B86401",
                    }}
                    _active={{
                      bgColor: "#B86401",
                    }}
                    onClick={
                      authSelector.id ? addToExistingCart : userMustLogin
                    }
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
          </GridItem>
        </Grid>
      </Box>

      {/* Modal Product Image */}
      <Modal
        isOpen={imageIsOpen}
        onOpen={onOpenImageDetail}
        onClose={onCloseImageDetail}
      >
        <ModalOverlay />
        <ModalContent
          mt={"150px"}
          maxW={"900px"}
          h={"610px"}
          borderRadius={"24px"}
        >
          <ModalCloseButton _hover={"none"} _active={"none"} />
          <ModalBody mt={"15px"} h={"fit-content"}>
            <Box display={"flex"} justifyContent={"center"}>
              <Image
                src={!productImageDetail ? productImage : productImageDetail}
                w={"467.2px"}
                h={"467.2px"}
                borderRadius={"8px"}
              />
            </Box>
            <Box
              w={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              mt={"-250px"}
            >
              <Button
                borderRadius={"50px"}
                w={"55px"}
                h={"55px"}
                bgColor={"#ffffff"}
                boxShadow={"rgba(0, 0, 0, 0.12) 0px 1px 6px 0px"}
                onClick={previousImage}
                cursor={"pointer"}
                _hover={"none"}
                _active={"none"}
              >
                <Text fontSize={"24px"} color={"#858585"} fontWeight={700}>
                  ❮
                </Text>
              </Button>
              <Button
                borderRadius={"50px"}
                w={"55px"}
                h={"55px"}
                bgColor={"#ffffff"}
                boxShadow={"rgba(0, 0, 0, 0.12) 0px 1px 6px 0px"}
                onClick={nextImage}
                cursor={"pointer"}
                _hover={"none"}
                _active={"none"}
              >
                <Text fontSize={"24px"} color={"#858585"} fontWeight={700}>
                  ❯
                </Text>
              </Button>
            </Box>
            <Box
              display={"flex"}
              flexDir={"row"}
              w={"868px"}
              h={"74px"}
              m={"20px 0px 30px 0px"}
              gap={3}
              justifyContent={"center"}
              // position={"fixed"}
              mt={"220px"}
            >
              {image.map((val) => {
                return (
                  <Image
                    w={"60.35px"}
                    h={"60.35px"}
                    src={val.image_url}
                    borderRadius={"8px"}
                    _hover={{ border: "2px solid #0095DA" }}
                    cursor={"pointer"}
                    onClick={() => setProductImageDetail(val.image_url)}
                    border={
                      productImageDetail === val.image_url &&
                      productHover === ""
                        ? "2px solid #0095DA"
                        : "1px solid #E0E0E0"
                    }
                  />
                );
              })}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal Add To Cart */}
      <Modal isOpen={cartIsOpen} onOpen={cartOnOpen} onClose={cartOnClose}>
        <ModalOverlay />
        <ModalContent
          maxWidth={"750px"}
          mt={"220px"}
          h={"fit-content"}
          borderRadius={"12px"}
        >
          <ModalHeader
            p={"20px 20px 0px 32px"}
            mb={"16px"}
            fontSize={"18px"}
            color={"#212121"}
            fontWeight={700}
            lineHeight={"26px"}
          >
            Successfully Added
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={"0px 32px 32px 32px"}>
            <Box
              mx={"auto"}
              p={"16px"}
              minH={"88px"}
              w={"670px"}
              boxShadow={"rgba(141, 150, 170, 0.4) 0px 1px 4px"}
              borderRadius={"12px"}
              display={"flex"}
            >
              <Image
                h={"56px"}
                w={"56px"}
                borderRadius={"4px"}
                src={isLoading === false ? null : image[0].image_url}
              />
              <Text
                mt={"14px"}
                px={"16px"}
                w={"479.03px"}
                maxW={"479.03px"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                textOverflow={"ellipsis"}
                color={"#6D7588"}
                fontSize={"14px"}
                fontWeight={500}
              >
                {productDetail.product_name}
              </Text>
              <Button
                h={"40px"}
                px={"16px"}
                bgColor={"#0095DA"}
                color={"#ffffff"}
                borderRadius={"12px"}
                fontWeight={600}
                fontSize={"15px"}
                my={"auto"}
                _hover={"none"}
                _active={"none"}
                onClick={() => navigate("/cart")}
              >
                Open Cart
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal Stock Insufficient */}
      <Modal
        isOpen={insufficientIsOpen}
        onOpen={insufficientOnOpen}
        onClose={inSufficientOnClose}
        motionPreset={"slideInBottom"}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        {/* <ModalOverlay /> */}
        <ModalContent
          mt={"120px"}
          bgColor={"#E02954"}
          maxH={"42px"}
          maxW={"560px"}
          borderRadius={"8px"}
        >
          <ModalBody p={"12px 16px"} maxH={"42px"}>
            <Box
              fontSize={"13px"}
              lineHeight={"16px"}
              color={"#ffffff"}
              fontWeight={500}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Text>
                {` Only ${itemLeft} left and you already have ${cartItemQuantity} of
              this item in your cart.`}
              </Text>
              <Text onClick={() => inSufficientOnClose()} cursor={"pointer"}>
                Ok
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* if user not logged in */}
      <AlertDialog
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"sm"}
        closeOnEsc={false}
      >
        <AlertDialogOverlay
          bg="blackAlpha.400"
          backdropFilter="blur(50px) hue-rotate(90deg)"
        >
          <AlertDialogContent borderRadius={"30px"} mt={"-50px"}>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color={"#F7931E"}
              pt={"20px"}
            >
              Notification!
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                boxSizing={"border-box"}
              >
                <Text
                  pb={"10px"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                  fontWeight={500}
                >
                  You must log in first before do any transaction
                </Text>
                <Link to={"/login"} replace state={{ from: location }}>
                  <Button
                    borderRadius={"20px"}
                    mt={"16px"}
                    width={"220px"}
                    colorScheme="blue"
                    onClick={() => onClose()}
                  >
                    OK
                  </Button>
                </Link>
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter pb={"5px"}></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Reposive */}
      <ResponsiveProductDetail
        addToCart={addToCart}
        addToCartByProductId={addToExistingCart}
        cartItemQuantity={cartItemQuantity}
        addQuantity={addQuantity}
        stock={stock}
        userMustLogin={userMustLogin}
      />
    </>
  );
};

export default ProductDetail;
