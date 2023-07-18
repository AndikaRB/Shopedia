import { Box, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const CartItemsNavbar = ({ product_name, quantity, product_weight, price, image_urls }) => {

    return (
        <Link to={"/cart"}>
            <Box h={"1px"} bgColor={"#fcd4a5"} mt={"-2px"} />
            <Box
                display={"flex"}
                flexDirection={"row"}
                mt={"15px"}
                pl={"10px"}
                pr={"10px"}
                pb={"13px"}
            >
                <Image
                    src={image_urls}
                    h={"35px"}
                    w={"35px"}
                />
                <Box pl={"10px"}>
                    <Text
                        fontWeight={600}
                        fontSize={"14px"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        width={"200px"}
                        fontColor={"#31353BF5"}
                        fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                        _hover={{
                            color: "blue",
                        }}
                    >
                        {product_name}
                    </Text>
                    <Text
                        fontWeight={400}
                        fontSize={"12px"}
                        width={"180px"}
                        fontColor={"#31353BF5"}
                        fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                    >
                        {quantity}{" "}
                        {quantity > 1 ? "items" : "item"}{" "}
                        ({product_weight}gr)
                    </Text>
                </Box>
            </Box>
            <Box>
                <Text
                    pl={"3px"}
                    fontFamily={"Open Sauce One,Nunito Sans, sans-serif"}
                    fontWeight={700}
                    fontSize={"15px"}
                    color={"#F7931E"}
                    mt={"-42px"}
                    textAlign={"right"}
                    pb={"20px"}
                    mr={"8px"}
                >
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    })
                        .format(price)
                        .split(",")[0]}
                </Text>
            </Box>
        </Link>
    )
}

export default CartItemsNavbar