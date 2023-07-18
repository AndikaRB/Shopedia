import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  GridItem,
  Image,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../api";
import {
  fillCart,
  getTotalCartQuantity,
  getTotalQuantity,
} from "../../redux/features/cartSlice";
import CartItems from "./CartItems";
import { getTotalPrice } from "../../redux/features/cartSlice";
import emptyCart from "../../assets/emptyCart.png";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormAddress from "../../components/profile/FormAddress";
import Alert from "../../components/profile/Alert";
import AlertDialogDeleteSelectedCart from "../../components/Cart/AlertDialogDeleteSelectedCart";
import { HiOutlineArrowLeft } from "react-icons/hi";
import LoadingPage from "../../components/loading/LoadingPage";

const Cart = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectedNewProvince, setSelectedNewProvince] = useState(0);
  const [selectedNewCity, setSelectedNewCity] = useState(0);
  const [selectedCart, setSelectedCart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const cancelRef = React.useRef();

  const navigate = useNavigate();

  const cartSelector = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenAddNewAddress,
    onOpen: onOpenAddNewAddress,
    onClose: onCloseAddNewAddress,
  } = useDisclosure();

  const {
    isOpen: isOpenAlertAddNewAddress,
    onOpen: onOpenAlertAddNewAddress,
    onClose: onCloseAlertAddNewAddress,
  } = useDisclosure();

  const fetchMyCart = async () => {
    try {
      const response = await axiosInstance.get("/carts/me");
      dispatch(fillCart(response.data.data));

      setSelectedCart(response.data.checkedDataCount);

      const cartQuantity = response.data.data.map((val) => val.quantity);

      let Total = 0;

      for (let i = 0; i < cartQuantity.length; i++) {
        Total += Number(cartQuantity[i]);
      }

      dispatch(getTotalCartQuantity(Total));

      if (!response.data.cartChecked.includes(0)) {
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }

      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/carts/${id}`);

      fetchMyCart();
      fetchTotalPrice();

      toast({
        title: "Deleted Item From Cart",
        status: "info",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAllCartsBtnHandler = async () => {
    try {
      await axiosInstance.delete(`/carts/delete/AllCarts`);

      fetchMyCart();
      fetchTotalPrice();
      onClose();

      toast({
        title: " Deleted Selected Items in Cart",
        status: "info",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderCartItems = () => {
    return cartSelector.cart.map((val) => {
      return (
        <CartItems
          key={val.id.toString()}
          productName={val.Product.product_name}
          price={val.Product.price}
          productImage={val.Product.Image_Urls[0].image_url}
          productId={val.ProductId}
          quantity={val.quantity}
          isChecked={val.is_checked}
          cartNote={val.note}
          totalStocks={val.Product.Total_Stocks}
          CartId={val.id}
          fetchMyCart={fetchMyCart}
          onDelete={() => deleteBtnHandler(val.id)}
          allChecked={allChecked}
          fetchTotalPrice={fetchTotalPrice}
        />
      );
    });
  };

  const checkAllCartItems = async () => {
    try {
      const response = await axiosInstance.patch("/carts/checkAllCarts");

      const cartChecked = response.data.data.map((val) => val.is_checked);

      if (!cartChecked.includes(false)) {
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }

      fetchMyCart();
      fetchTotalPrice();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTotalPrice = async () => {
    try {
      const response = await axiosInstance.get("/carts/price/total");

      dispatch(getTotalPrice(response.data.data.totalPrice));

      dispatch(getTotalQuantity(response.data.data.totalQuantity));
    } catch (err) {
      console.log(err);
    }
  };

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
        const response = await axiosInstance.post(
          "/checkoutAddress/addNewAddress",
          {
            recipients_name,
            phone_number,
            address_labels,
            province: selectedNewProvince,
            city: selectedNewCity,
            districts,
            full_address,
          }
        );
        toast({
          title: "Success to add new adderess",
          description: response.data.message,
          status: "success",
        });

        formikAddNewAddress.setFieldValue("recipients_name", "");
        formikAddNewAddress.setFieldValue("phone_number", "");
        formikAddNewAddress.setFieldValue("address_labels", "");
        formikAddNewAddress.setFieldValue("province", "");
        formikAddNewAddress.setFieldValue("city", "");
        formikAddNewAddress.setFieldValue("districts", "");
        formikAddNewAddress.setFieldValue("full_address", "");
        fetchAddress();
        navigate("/cart/shipment");
      } catch (error) {
        console.log(error.response);
        toast({
          title: "Failed to add",
          description: error.response.data.message,
          status: "error",
        });
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
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formikAddNewAddress.setFieldValue(name, value);
  };

  const fetchAddress = async () => {
    try {
      const response = await axiosInstance.get(
        "/checkoutAddress/defaultAddress"
      );
      setAddress(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const doubleOnClick = () => {
    if (address) {
      return navigate("/cart/shipment");
    }
    onOpenAddNewAddress();
    toast({
      title: "Add first your address",
      status: "info",
    });
  };

  const doubleOnClick1 = () => {
    onCloseAlertAddNewAddress();
    onCloseAddNewAddress();
    setSelectedNewProvince(0);
    setSelectedNewCity(0);
    formikAddNewAddress.handleSubmit();
  };

  useEffect(() => {
    fetchMyCart();
    fetchTotalPrice();
  }, []);

  useEffect(() => {
    fetchAddress();
  }, []);

  // if cart empty
  // if (!cartSelector.cart.length && isLoading === false) {
  //   return (
  //     <Box w={'1583px'} h={'700px'} display={'flex'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
  //       <CircularProgress isIndeterminate color='#0095DA' thickness='160px' size='100px' />
  //     </Box>
  //   )

  if (!isLoading) {
    return <LoadingPage />;
  }
  if (!cartSelector.cart.length && isLoading === true) {
    return (
      <Box mt={"140px"} mb={"70px"} textAlign={"center"} display={"block"}>
        <Image src={emptyCart} width={"200px"} margin={"auto auto 20px"} />
        <Text
          fontSize={"24px"}
          fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
          fontWeight={700}
          lineHeight={"28px"}
          letterSpacing={"-0,2px"}
          m={"0px"}
          textDecor={"initial"}
          color={"#31353BF5"}
        >
          Your Cart is Empty
        </Text>
        <Text
          fontWeight={400}
          fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
          letterSpacing={"0px"}
          textDecor={"initial"}
          color={"rgba(49,53,59,0.68)"}
          margin={"8px 0px 16px"}
        >
          Make your dreams come true now!
        </Text>
        <Link to={"/"}>
          <Button
            bgColor={"#0095DA"}
            color={"#fff"}
            width={"200px"}
            fontWeight={700}
            fontFamily={
              "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
            }
            lineHeight={"20px"}
            fontSize={"14px"}
            p={"0px 16px"}
            outline={"none"}
            height={"40px"}
            _hover={{
              bgColor: "#165877",
            }}
            _active={{
              color: "#DDDDDD",
            }}
          >
            Shop Now
          </Button>
        </Link>
      </Box>
    );
  } else {
    return (
      <>
        {isLoading && (
          <Box display={{ lg: "inline", base: "none" }}>
            {/* cart filled */}
            <Box mt={"67px"}>
              <Box
                width={"1070px"}
                h={"66px"}
                m={"0px 231.5px"}
                p={"40px 20px 0px"}
                mx={"auto"}
                mt={"5px"}
              >
                <Text
                  fontSize={"20px"}
                  color="#31353BF5"
                  fontWeight={"700"}
                  fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                >
                  Cart
                </Text>
              </Box>
              <Grid
                minH={"200px"}
                width="710"
                maxWidth={"1027px"}
                margin={"auto"}
                p={"0x 24px"}
                templateColumns="3.8fr 1.7fr"
                gap={2}
                mt={"10px"}
              >
                <GridItem w="100%">
                  <Box
                    w={"710px"}
                    boxShadow={"0 0 10px 0 rgb(0 0 0 / 10%) !important"}
                    borderRadius={"15px"}
                    pl={"28px"}
                    border={"1px solid #99d5f0"}
                  >
                    <Box
                      h={"52px"}
                      width={"650px"}
                      p="16px 0"
                      display={"flex"}
                      justifyContent={"space-between"}
                      mt={"8px"}
                    >
                      <Checkbox
                        isChecked={allChecked}
                        onChange={() => checkAllCartItems()}
                        borderColor={"#6C727C"}
                        size={"lg"}
                      >
                        <Text
                          fontSize={"14px"}
                          color={"#31353BAD"}
                          fontWeight={"400px"}
                          fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                        >
                          Select All
                        </Text>
                      </Checkbox>
                      {selectedCart === 0 ? null : (
                        <Text
                          textAlign={"end"}
                          fontSize={"14px"}
                          display={"block"}
                          fontWeight="700"
                          color={"#0095DA"}
                          fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                          cursor={"pointer"}
                          position={"relative"}
                          onClick={() => onOpen()}
                        >
                          Remove
                        </Text>
                      )}
                    </Box>

                    {/* cart item list */}
                    <Box width={"650px"} h={"5px"} bgColor={"#f7931E"} />
                    <Box>{isLoading && renderCartItems()}</Box>
                    <Box pb={"50px"}></Box>
                  </Box>
                </GridItem>

                {/* Shopping Summary */}
                <GridItem pl={"30px"}>
                  <Box
                    w={"318.02px"}
                    h={"236.88px"}
                    p={"16px"}
                    boxShadow={"0 0 10px 0 rgb(0 0 0 / 10%)"}
                    borderRadius={"15px"}
                    border={"1px solid #99d5f0"}
                  >
                    <Text
                      fontWeight={"600"}
                      position={"relative"}
                      fontSize={"16px"}
                      color={"#31353BF5"}
                      fontFamily={
                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                      }
                      display={"block"}
                      line-height={"20px"}
                      m={"0px 0px 16px"}
                    >
                      Shopping Summary
                    </Text>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      borderBottom={"1px solid #fcd4a5"}
                      pb={"16px"}
                    >
                      <Text
                        color={"#31353BAD"}
                        fontFamily={
                          "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                        fontSize={"14px"}
                        fontWeight={"400"}
                        lineHeight={"18px"}
                        margin={"2px 0px"}
                      >
                        Total Price (items)
                      </Text>
                      <Text
                        color={"#31353BAD"}
                        fontFamily={
                          "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                        fontSize={"14px"}
                        fontWeight={"400"}
                        lineHeight={"18px"}
                        margin={"2px 0px"}
                      >
                        {
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                            .format(cartSelector.totalPrice)
                            .split(",")[0]
                        }
                      </Text>
                    </Box>
                    <Box
                      mt={"16px"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Text
                        fontWeight={"600"}
                        position={"relative"}
                        fontSize={"16px"}
                        color={"#31353BF5"}
                        fontFamily={
                          "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                        display={"block"}
                        line-height={"20px"}
                        m={"2px 0px"}
                      >
                        Grand Total
                      </Text>
                      <Text
                        fontWeight={"600"}
                        position={"relative"}
                        fontSize={"16px"}
                        color={"#31353BF5"}
                        fontFamily={
                          "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                        }
                        display={"block"}
                        line-height={"20px"}
                        m={"2px 0px"}
                      >
                        {
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                            .format(cartSelector.totalPrice)
                            .split(",")[0]
                        }
                      </Text>
                    </Box>
                    {!cartSelector.totalQuantity ? (
                      <Button
                        width={"100%"}
                        h={"48px"}
                        mt={"20px"}
                        fontWeight={"700"}
                        fontSize={"16px"}
                        bgColor={"#0095DA"}
                        color={"#fff"}
                        _hover={"none"}
                        _active={"none"}
                        isDisabled={true}
                      >
                        Buy(0)
                      </Button>
                    ) : (
                      <Button
                        width={"100%"}
                        h={"48px"}
                        mt={"20px"}
                        fontWeight={"700"}
                        fontSize={"16px"}
                        bgColor={"#0095DA"}
                        color={"#fff"}
                        _hover={{
                          bgColor: "#0370A2",
                        }}
                        _active={"none"}
                        onClick={doubleOnClick}
                      >
                        Buy(
                        {cartSelector.totalQuantity})
                      </Button>
                    )}
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        )}

        {/* mobile responsive */}
        <Box display={{ lg: "none", base: "inline" }}>
          <Box
            bgColor={"white"}
            position={"fixed"}
            left="0"
            right={"0"}
            top="0"
            zIndex="9998"
            boxShadow={"rgb(0 0 0 / 15%) 0px 1px 3px 0px"}
          >
            <Box
              h={"52px"}
              maxW={"500px"}
              display={"flex"}
              alignItems={"center"}
              flexdir={"row"}
              justifyContent={"flex-start"}
            >
              <Link to={"/"}>
                <Box
                  w={"52px"}
                  h={"52px"}
                  p={"1px 6px"}
                  pr={"8px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <HiOutlineArrowLeft
                    style={{ height: "24px", width: "24px", color: "#7d8086" }}
                  />
                </Box>
              </Link>
              <Text
                fontSize={"16px"}
                color={"#212121"}
                fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                lineHeight={"20px"}
                fontWeight={800}
              >
                Cart
              </Text>
            </Box>
            <Box
              h={"50px"}
              maxW={"500px"}
              m={"0px "}
              p={"16px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Checkbox
                isChecked={allChecked}
                onChange={() => checkAllCartItems()}
                borderColor={"#6C727C"}
                size={"lg"}
              >
                <Text
                  fontSize={"14px"}
                  color={"#0000008A"}
                  fontWeight={"400"}
                  fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                >
                  Select All Product
                </Text>
              </Checkbox>
              {selectedCart === 0 ? null : (
                <Text
                  textAlign={"end"}
                  fontSize={"14px"}
                  display={"block"}
                  fontWeight={700}
                  color={"#0095DA"}
                  fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                  cursor={"pointer"}
                  position={"relative"}
                  onClick={() => onOpen()}
                >
                  Clear
                </Text>
              )}
            </Box>
          </Box>
          <Box h={"102px"} maxW={"500px"} />
          <Box h={"8px"} bgColor={"#f0f3f7"} maxW={"500px"} />
          <Box>{renderCartItems()}</Box>
          {!cartSelector.totalQuantity ? (
            <>
              <Box maxW={"500px"} h={"72px"} />
              <Box
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
                p={"16px"}
                maxW={"500px"}
                h={"72px"}
                position={"fixed"}
                left="0"
                right={"0"}
                bottom="0"
                zIndex="9998"
                bgColor={"#fff"}
              >
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                >
                  <Text
                    color={"#31353BAD"}
                    fontSize={"14px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    lineHeight={"16px"}
                    fontWeight={700}
                  >
                    Total Price
                  </Text>
                  <Text
                    color={"#31353BF5"}
                    fontSize={"16px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    lineHeight={"18px"}
                    fontWeight={700}
                    m={"4px 0px"}
                  >
                    -
                  </Text>
                </Box>
                <Button
                  borderRadius={"8px"}
                  h={"100%"}
                  color={"#AAB4C8"}
                  bgColor={"#E4EBF5"}
                  onClick={doubleOnClick}
                  fontSize={"16px"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                  lineHeight={"18px"}
                  fontWeight={700}
                  w={"164px"}
                >
                  Buy (0)
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box maxW={"500px"} h={"74px"} />
              <Box
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
                p={"16px"}
                maxW={"500px"}
                h={"74px"}
                position={"fixed"}
                left="0"
                right={"0"}
                bottom="0"
                zIndex="9998"
                bgColor={"#fff"}
              >
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                >
                  <Text
                    color={"#31353BAD"}
                    fontSize={"14px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    lineHeight={"16px"}
                    fontWeight={700}
                  >
                    Total Price
                  </Text>
                  <Text
                    color={"#31353BF5"}
                    fontSize={"16px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    lineHeight={"18px"}
                    fontWeight={700}
                    m={"4px 0px"}
                  >
                    {
                      new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(cartSelector.totalPrice)
                        .split(",")[0]
                    }
                  </Text>
                </Box>
                <Button
                  h={"100%"}
                  color={"#fff"}
                  bgColor={"#0095DA"}
                  onClick={doubleOnClick}
                  fontSize={"16px"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                  lineHeight={"18px"}
                  fontWeight={700}
                  w={"164px"}
                  borderRadius={"8px"}
                  _hover={{
                    bgColor: "#0370A2",
                  }}
                  _active={"none"}
                >
                  Buy ({cartSelector.totalQuantity})
                </Button>
              </Box>
            </>
          )}
        </Box>

        {/* Alert Dialog for Delete Selected Carts */}
        <AlertDialogDeleteSelectedCart
          selectedCart={selectedCart}
          deleteAllCartsBtnHandler={deleteAllCartsBtnHandler}
          isOpen={isOpen}
          onClose={onClose}
        />

        {/* Formik add new address */}
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

        {/* Alert Add New Address */}
        <Alert
          header={"Add New Address"}
          body={"Is the address you entered correct?"}
          cancelRef={cancelRef}
          isOpen={isOpenAlertAddNewAddress}
          onClose={onCloseAlertAddNewAddress}
          onSubmit={() => doubleOnClick1()}
          rightButton={"Add Address"}
          leftButton={"Change Address"}
          color={"#F7931E"}
        />
      </>
    );
  }
};

export default Cart;
