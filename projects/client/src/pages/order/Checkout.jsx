import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api";
import ChangeAddress from "../../components/order/ChangeAddress";
import CheckoutCartItems from "../../components/order/CheckoutCartItems";
import Alert from "../../components/profile/Alert";
import {
  getTotalPrice,
  getTotalQuantity,
} from "../../redux/features/cartSlice";
import close from "../../assets/close.png";
import BCA from "../../assets/BankLogo/BCA.png";
import BNI from "../../assets/BankLogo/BNI.png";
import mandiri from "../../assets/BankLogo/mandiri.png";
import ShippingComponent from "../../components/order/ShippingComponent";
import ModalPayment from "../../components/order/ModalPayment";
import { HiOutlineArrowLeft } from "react-icons/hi";
import LoadingPage from "../../components/loading/LoadingPage";

const Checkout = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [BCAChecked, setBCAChecked] = useState(true);
  const [BNIChecked, setBNIChecked] = useState(false);
  const [MandiriChecked, setMandiriChecked] = useState(false);
  const [productWeight, setProductWeight] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("BCA");
  const [shippingFee, setShippingFee] = useState(0);
  const [shippingError, setShippingError] = useState(false);
  const [defaultAddressId, setDefaultAddressId] = useState(0);
  const [courirDuration, setCourirDuration] = useState("");
  const [closestWarehouse, setClosestWarehouse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const BCARadio = () => {
    setBCAChecked(true);
    setBNIChecked(false);
    setMandiriChecked(false);

    setPaymentMethod("BCA");
  };

  const BNIRadio = () => {
    setBCAChecked(false);
    setBNIChecked(true);
    setMandiriChecked(false);

    setPaymentMethod("BNI");
  };

  const MandiriRadio = () => {
    setBCAChecked(false);
    setBNIChecked(false);
    setMandiriChecked(true);

    setPaymentMethod("Mandiri");
  };

  const {
    isOpen: paymentIsOpen,
    onOpen: paymentOnOpen,
    onClose: paymentOnclose,
  } = useDisclosure();

  const cartSelector = useSelector((state) => state.cart);

  const fetchTotalPrice = async () => {
    try {
      const response = await axiosInstance.get("/carts/price/total");

      dispatch(getTotalPrice(response.data.data.totalPrice));

      dispatch(getTotalQuantity(response.data.data.totalQuantity));
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCheckoutCartItems = async () => {
    try {
      const response = await axiosInstance.get(
        "/transactions/checkoutCartItems"
      );

      const productWeight = response.data.data.map(
        (val) => val.Product.product_weight
      );
      let total = 0;

      for (let i = 0; i < productWeight.length; i++) {
        total += Number(productWeight[i]);
      }

      setProductWeight(total);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const toast = useToast();

  const openPayment = () => {
    if (!shippingFee) {
      toast({
        title: "there is some incompletion please fix it first",
        status: "error",
      });
      setShippingError(true);
    } else {
      paymentOnOpen();
      setShippingError(false);
    }
  };

  const createNewTransaction = async () => {
    try {
      const response = await axiosInstance.post("/transactions/payItems", {
        shipping_fee: shippingFee,
        payment_method: paymentMethod,
        total_price: totalPrice,
        AddressId: defaultAddressId,
        courir_duration: courirDuration,
        WarehouseId: closestWarehouse,
      });

      navigate(
        `/payment/thank-you/shopedia/${response.data.data.transaction_name}`
      );

      toast({
        title: "Payment Success",
        description: response.data.message,
        status: "success",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "payment failed",
        description: err.response.data.message,
        status: "error",
      });
    }
  };

  const totalBill = Number(shippingFee) + Number(cartSelector.totalPrice);
  const transactionFee = 1000;
  const totalPrice = Number(totalBill) + transactionFee;

  useEffect(() => {
    fetchTotalPrice();
    fetchCheckoutCartItems();
  }, []);

  if (!isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      {/* mobile responsive */}
      <Box display={{ lg: "none", base: "inline" }}>
        <Box
          h={"52px"}
          maxW={"500px"}
          display={"flex"}
          alignItems={"center"}
          flexdir={"row"}
          justifyContent={"flex-start"}
          boxShadow={"rgb(0 0 0 / 15%) 0px 1px 3px 0px"}
          bgColor={"white"}
          position={"fixed"}
          left="0"
          right={"0"}
          top="0"
          zIndex="9998"
        >
          <Link to={"/cart"}>
            <Box
              w={"52px"}
              h={"52px"}
              p={"1px 6px"}
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
            fontWeight={700}
          >
            Shipping
          </Text>
        </Box>
        <Box h={"52px"} w={"500px"} />
        <Box>
          <ChangeAddress defaultAddressUser={setDefaultAddressId} />
          <CheckoutCartItems />
          <Box h={"6px"} bgColor={"#edeff1"} />
          <ShippingComponent
            closestWarehouseTransaction={setClosestWarehouse}
            selectedCourir={setCourirDuration}
            shippingFeePay={setShippingFee}
            productWeight={productWeight}
            shippingError={shippingError}
            setShippingError={setShippingError}
          />
          <Box h={"6px"} bgColor={"#edeff1"} />
          <Box
            w={"500px"}
            h={"96px"}
            display={"flex"}
            flexDir={"column"}
            p={"14px 16px"}
            fontFamily={
              "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
            }
            margin={"0px"}
            color={"#31353BF5"}
            fontSize={"12px"}
            borderBottom="6px solid #edeff1"
          >
            <Text fontWeight={600} lineHeight={"16px"} mb={"8px"}>
              Shopping summary
            </Text>
            <Box
              display={"flex"}
              flexDir={"row"}
              justifyContent={"space-between"}
              color={"#31353BAD"}
            >
              <Text>
                Total price ({cartSelector.totalQuantity}{" "}
                {cartSelector.totalQuantity < 2 ? "product" : "products"})
              </Text>
              <Text>
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
              display={"flex"}
              flexDir={"row"}
              mt={"5px"}
              justifyContent={"space-between"}
              color={"#31353BAD"}
            >
              <Text>Total Shipping Cost</Text>
              <Text>
                {
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                    .format(shippingFee)
                    .split(",")[0]
                }
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          p={"16px"}
          w={"500px"}
          h={"80px"}
        >
          <Box display={"flex"} flexDir={"column"} justifyContent={"center"}>
            <Text
              color={"#31353BAD"}
              fontSize={"12px"}
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
              lineHeight={"16px"}
              fontWeight={700}
            >
              Total
            </Text>
            <Text
              color={"#31353BF5"}
              fontSize={"14px"}
              fontFamily={
                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
              }
              lineHeight={"18px"}
              fontWeight={700}
            >
              {
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                  .format(totalBill)
                  .split(",")[0]
              }
            </Text>
          </Box>
          <Button
            borderRadius={"8px"}
            h={"100%"}
            color={"#fff"}
            bgColor={"#0095DA"}
            onClick={openPayment}
            fontSize={"14px"}
            fontFamily={
              "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
            }
            lineHeight={"18px"}
            fontWeight={700}
            w={"164px"}
          >
            Select Payment
          </Button>
        </Box>
      </Box>

      {/* Dekstop mode */}
      <Box display={{ lg: "inline", base: "none" }}>
        <Box h="52px" borderBottom="1px solid #e4e6e9">
          <Box m={"0px"} mt={"8px"} w={"1080px"} mx="auto" h="60px">
            <Link onClick={onOpen}>
              <Text
                fontSize={"30px"}
                fontWeight="bold"
                color={"#0095DA"}
                display="inline"
                my="auto"
                fontFamily={"Open Sauce One, sans-serif"}
              >
                Shop
              </Text>
              <Text
                pl={"0"}
                fontSize={"30px"}
                fontWeight="bold"
                color={"#F7931E"}
                display="inline"
                my="auto"
                fontFamily={"Open Sauce One, sans-serif"}
              >
                edia
              </Text>
            </Link>
          </Box>
        </Box>
        <Box w={"1120px"} p="0 20px" mx="auto">
          <Flex>
            <Box w="685px" mr="45px">
              <Box mt="30px">
                <Text
                  fontWeight={700}
                  fontSize="24px"
                  color={"#31353B"}
                  fontFamily={"Open Sauce One, sans-serif"}
                  margin={"0px 0px 20px"}
                >
                  Checkout
                </Text>
                <Box
                  w={"710px"}
                  border={"1px solid #99d5f0"}
                  boxShadow={"0 0 10px 0 rgb(0 0 0 / 10%)"}
                  borderRadius={"15px"}
                  mb={"50px"}
                  p={"20px"}
                >
                  <Box borderBottom="6px solid #F7931E">
                    <ChangeAddress defaultAddressUser={setDefaultAddressId} />
                  </Box>
                  <Box pt={"19px"} minH={"232px"}>
                    <Grid templateColumns=".55fr .45fr" gap={1}>
                      <CheckoutCartItems />
                      <ShippingComponent
                        closestWarehouseTransaction={setClosestWarehouse}
                        selectedCourir={setCourirDuration}
                        shippingFeePay={setShippingFee}
                        productWeight={productWeight}
                        shippingError={shippingError}
                        setShippingError={setShippingError}
                      />
                    </Grid>
                  </Box>
                  <Box h={"1px"} bgColor={"#fcd4a5"} w={"100%"}></Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    p={"10px 0px"}
                    fontWeight={700}
                    fontSize={"14px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    lineHeight={"20px"}
                    letterSpacing={"0px"}
                    margin={"0px"}
                    color={"#31353BF5"}
                    borderBottom="6px solid #F7931E"
                    mb={"10px"}
                  >
                    <Text>Subtotal</Text>
                    <Text>
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
                </Box>
              </Box>
            </Box>

            {/* Shopping Summary */}
            <Box w="350px" mt="85px">
              <Box>
                <Box
                  inset="92px auto auto 0px"
                  zIndex={"1"}
                  boxShadow={"0 0 10px 0 rgb(0 0 0 / 10%)"}
                  borderRadius={"15px"}
                  border={"1px solid #99d5f0"}
                >
                  <Box p="16px" pb={"25px"}>
                    <Text
                      fontWeight={700}
                      lineHeight={1.6}
                      fontSize={"14px"}
                      fontFamily={"Open Sauce One, sans-serif"}
                      color={"#31353B"}
                    >
                      Shopping summary
                    </Text>
                    <Box
                      lineHeight={1.5}
                      fontSize={"14px"}
                      fontFamily={"Open Sauce One, sans-serif"}
                      color={"#31353B"}
                      textTransform={"capitalize"}
                      m="16px 0"
                    >
                      <Box display={"flex"} justifyContent="space-between">
                        <Box p={"0px 14px 0px 0px"}>
                          Total price ({cartSelector.totalQuantity}{" "}
                          {cartSelector.totalQuantity < 2
                            ? "product"
                            : "products"}
                          )
                        </Box>
                        <Box>
                          {
                            new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })
                              .format(cartSelector.totalPrice)
                              .split(",")[0]
                          }
                        </Box>
                      </Box>
                      <Box display={"flex"} justifyContent="space-between">
                        <Box p={"0px 14px 0px 0px"}>Total Shipping Cost</Box>
                        <Box>
                          {
                            new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })
                              .format(shippingFee)
                              .split(",")[0]
                          }
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      pt="16px"
                      mb="22px"
                      borderTop="1px solid #fcd4a5"
                      fontWeight={700}
                      fontSize={"16px"}
                      fontFamily={"Open Sauce One, sans-serif"}
                      color={"#31353B"}
                    >
                      <Box pr={"14px"}>Grand Total</Box>
                      <Box fontSize={"17px"}>
                        {
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                            .format(totalBill)
                            .split(",")[0]
                        }
                      </Box>
                    </Box>
                    <Button
                      w="100%"
                      onClick={openPayment}
                      h={"48px"}
                      bgColor={"#0095DA"}
                      _hover={{
                        bgColor: "#0370A2",
                      }}
                      _active={"none"}
                    >
                      <Text
                        lineHeight={"22px"}
                        color="#fff"
                        fontFamily={"Open Sauce One, sans-serif"}
                        fontWeight={700}
                      >
                        Choose Payment
                      </Text>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Alert Leaving Page */}
      <Alert
        body={"Changes you make to this page will not be saved"}
        cancelRef={cancelRef}
        color="#0095DA"
        isOpen={isOpen}
        header="Back To Cart?"
        leftButton={"Stay On This Page"}
        rightButton={"Go Back & Delete Changes"}
        onClose={onClose}
        onSubmit={() => navigate("/cart")}
      />

      {/* Modal Payment */}
      <ModalPayment
        paymentIsOpen={paymentIsOpen}
        paymentOnclose={paymentOnclose}
        paymentOnOpen={paymentOnOpen}
        BCA={BCA}
        BCAChecked={BCAChecked}
        BNI={BNI}
        BNIChecked={BNIChecked}
        mandiri={mandiri}
        MandiriChecked={MandiriChecked}
        totalBill={totalBill}
        totalPrice={totalPrice}
        BCARadio={BCARadio}
        BNIRadio={BNIRadio}
        MandiriRadio={MandiriRadio}
        createNewTransaction={createNewTransaction}
        close={close}
      />
    </>
  );
};

export default Checkout;
