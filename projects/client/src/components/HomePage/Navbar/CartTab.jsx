import {
    Box,
    Button,
    Image,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
} from "@chakra-ui/react";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptyCart from "../../../assets/emptyCart.png";
import CartItemsNavbar from "./CartItemsNavbar";

const CartTab = ({ authSelector, totalCartQuantity }) => {
    const cartSelector = useSelector((state) => state.cart);
    const renderCartNavbar = () => {
        return cartSelector.cart.map((val) => {
            return (
                <CartItemsNavbar
                    product_name={val?.Product.product_name}
                    quantity={val?.quantity}
                    product_weight={val?.Product.product_weight}
                    price={val?.Product.price}
                    image_urls={val?.Product.Image_Urls[0].image_url}
                />
            );
        });
    };
    return (
        <Box display={{ lg: "flex", base: "none" }}>
            <Box display={"flex"} gap="4" fontSize="14px" fontWeight={"semibold"}>
                <Link to="/cart">
                    <Box
                        display={"flex"}
                        my="auto"
                        gap={2}
                        borderRight="2px solid #e0e0e0"
                        paddingRight={"10px"}
                        color="#6c727c"
                    >
                        <Popover trigger="hover">
                            <PopoverTrigger>
                                <Link to="/cart">
                                    <Button
                                        ml={!authSelector.id ? "0px" : "10px"}
                                        bgColor={"inherit"}
                                        fontSize={"2xl"}
                                        _hover={{
                                            bgColor: "#A5D8F8",
                                            color: "orange",
                                        }}
                                        mr={"10px"}
                                        p={2}
                                    >
                                        <IoMdCart fontSize={"22px"} />
                                        {cartSelector.cart.length && authSelector.id ? (
                                            <sup>
                                                <Box
                                                    fontSize={"11px"}
                                                    backgroundColor={"#EF144A"}
                                                    borderRadius={"50%"}
                                                    m={"-2px -8px 0px -8px"}
                                                    p={"7px 6px 8px 5px"}
                                                    color={"white"}
                                                    fontWeight={700}
                                                >
                                                    {cartSelector.totalCartQuantity}
                                                </Box>
                                            </sup>
                                        ) : null}
                                    </Button>
                                </Link>
                            </PopoverTrigger>

                            {!cartSelector.cart.length || !authSelector.id ? (
                                <>
                                    {/* if cart empty or user not logged in yet*/}
                                    <PopoverContent bgColor={"#E5F9F6"}>
                                        <PopoverBody>
                                            <Box>
                                                <Image
                                                    p="10px"
                                                    margin={"0 auto"}
                                                    width={"200px"}
                                                    src={emptyCart}
                                                />
                                                <Text
                                                    color={"#393d43"}
                                                    textAlign="center"
                                                    fontWeight={"bold"}
                                                >
                                                    Hey your shopping cart is empty!
                                                </Text>
                                                <Text
                                                    mt={"5px"}
                                                    color={"#919396"}
                                                    textAlign="center"
                                                    fontSize={"12px"}
                                                    mb={"5px"}
                                                >
                                                    Being idle is no fun. Let's fill it with your dream
                                                    items!
                                                </Text>
                                            </Box>
                                        </PopoverBody>
                                    </PopoverContent>
                                </>
                            ) : (
                                <>
                                    {/* if cart filled */}
                                    <PopoverContent
                                        bgColor={"#E5F9F6"}
                                        w={"405px"}
                                        borderRadius={"12px"}
                                    >
                                        <PopoverBody>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                                mt={"8px"}
                                                mb={"12px"}
                                                pl={"2px"}
                                                pr={"2px"}
                                            >
                                                <Text fontSize={"15px"} fontWeight={600}>
                                                    Total ({cartSelector.totalCartQuantity})
                                                </Text>
                                                <Link to="/cart">
                                                    <Text
                                                        color="#0095DA"
                                                        fontFamily={
                                                            "Open Sauce One,Nunito Sans, sans-serif"
                                                        }
                                                        fontWeight={700}
                                                        fontSize={"13px"}
                                                        mr={"5px"}
                                                    >
                                                        {" "}
                                                        Cart
                                                    </Text>
                                                </Link>
                                            </Box>
                                            <Box
                                                h={"1px"}
                                                bgColor={"#F7931E"}
                                                mb={"-6px"}
                                                pb={"2px"}
                                            />
                                            <Box
                                                h={"1px"}
                                                bgColor={"transparent"}
                                                pb={"4px"}
                                                mt={"2px"}
                                            />
                                            <Box
                                                pt={"2px"}
                                                overflow={"auto"}
                                                maxH={"335px"}
                                                cursor={"pointer"}
                                            >
                                                {renderCartNavbar()}
                                            </Box>
                                        </PopoverBody>
                                    </PopoverContent>
                                </>
                            )}
                        </Popover>
                    </Box>
                </Link>
            </Box>
        </Box>
    );
};

export default CartTab;