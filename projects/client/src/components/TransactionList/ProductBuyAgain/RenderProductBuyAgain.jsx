import {
    Box,
    Button,
    Grid,
    GridItem,
    Image,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../api";
import {
    addItemToCart,
    fillCart,
    getTotalCartQuantity,
} from "../../../redux/features/cartSlice";

const RenderProductBuyAgain = ({
    productImage,
    productName,
    price,
    productId,
}) => {
    const [cartItemQuantity, setCartItemQuantity] = useState(null);
    const toast = useToast();
    const dispatch = useDispatch();

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

    const addToCart = async () => {
        try {
            let addToCart = {
                ProductId: productId,
                quantity: 1,
                note: "",
            };
            const response = await axiosInstance.post("/carts", addToCart);

            dispatch(addItemToCart(response.data.data));

            toast({
                title: "Product has been added to Shopping Cart",
                status: "success",
            });

            fetchCartByProductId();
            fetchMyCart();
        } catch (err) {
            console.log(err);
            toast({
                title: `Failed Added Cart Items`,
                status: "error",
                description: err.response.data.message,
            });
        }
    };

    const addToCartByProductId = async () => {
        try {
            let newQuantity = {
                quantity: 1,
                note: "",
            };
            const response = await axiosInstance.patch(
                `/carts/addCartItems/${productId}`,
                newQuantity
            );

            dispatch(addItemToCart(response.data.data));
            toast({
                title: "Product has been added to Shopping Cart",
                status: "success",
            });

            fetchCartByProductId();
            fetchMyCart();
        } catch (err) {
            console.log(err);
            toast({
                title: `Failed Added Cart Items`,
                status: "error",
                description: err.response.data.message,
            });
        }
    };

    useEffect(() => {
        fetchCartByProductId();
        fetchMyCart();
    }, [cartItemQuantity]);

    return (
        <Box
            p={"16px"}
            border={"1px solid #e5e7e9"}
            borderRadius={"10px"}
            cursor={"default"}
            mb={"10px"}
        >
            <Grid templateColumns="3.25fr 1.75fr" gap={0}>
                <GridItem borderRight={"thin dashed #e5e7e9"} maxH={"90px"}>
                    <Box
                        pr={"14px"}
                        display={"flex"}
                        alignItems={"flex-start"}
                        mt={"2px"}
                    >
                        <Image
                            src={productImage}
                            w={"45.99px"}
                            h={"45.99px"}
                            mr={"13px"}
                            borderRadius={"6px"}
                        />
                        <Box>
                            <Link to={`/product/${productId}/${productName}`}>
                                <Text
                                    color={"#31353BF5"}
                                    fontSize={"12px"}
                                    fontFamily={
                                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                    }
                                    fontWeight={"bold"}
                                    lineHeight={"18px"}
                                    letterSpacing={"0px"}
                                    style={{
                                        maxWidth: "200px",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {productName}
                                </Text>
                            </Link>
                            <Text
                                color={"#31353BAD"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={400}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                {
                                    new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })
                                        .format(price)
                                        .split(",")[0]
                                }
                            </Text>
                        </Box>
                    </Box>
                </GridItem>
                <GridItem
                    pl={"16px"}
                    w={"151.99px"}
                    naxH={"90px"}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                >
                    <Box display={"flex"} flexDir={"column"} alignItems={"flex-end"}>
                        <Button
                            w={"135px"}
                            h={"31.99px"}
                            p={"0px 16px"}
                            border={"1px solid #0095DA"}
                            bgColor={"#fff"}
                            onClick={
                                cartItemQuantity !== null ? addToCartByProductId : addToCart
                            }
                        >
                            <Text
                                fontSize={"12px"}
                                fontWeight={700}
                                lineHeight={"18px"}
                                color={"#0095DA"}
                            >
                                + Cart
                            </Text>
                        </Button>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default RenderProductBuyAgain;