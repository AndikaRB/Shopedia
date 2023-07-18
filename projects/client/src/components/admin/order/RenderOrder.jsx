import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react"

const RenderOrder = ({ image_url, quantity, price, product_name }) => {
    return (
        <Box
            p={"16px"}
            border={"1px solid #e5e7e9"}
            borderRadius={"8px"}
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
                            src={image_url}
                            w={"45.99px"}
                            h={"45.99px"}
                            mr={"13px"}
                            borderRadius={"6px"}
                        />
                        <Box>
                            <Text
                                color={"#31353BF5"}
                                fontSize={"12px"}
                                fontFamily={
                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                }
                                fontWeight={"bold"}
                                lineHeight={"18px"}
                                letterSpacing={"0px"}
                            >
                                {product_name}
                            </Text>

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
                                {quantity} {quantity > 1 ? "items" : "item"} x{" "}
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
                    <Box
                        display={"flex"}
                        flexDir={"column"}
                        alignItems={"flex-end"}
                    >
                        <Text
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            mb={"2px"}
                            color={"#31353BF5"}
                            fontWeight={400}
                            lineHeight={"20px"}
                            letterSpacing={"0px"}
                        >
                            Total Price
                        </Text>

                        <Text
                            color={"#31353BF5"}
                            fontSize={"14px"}
                            fontFamily={
                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                            }
                            lineHeight={"20px"}
                            letterSpacing={"0px"}
                            fontWeight={700}
                        >
                            {
                                new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                })
                                    .format(quantity * price)
                                    .split(",")[0]
                            }
                        </Text>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default RenderOrder
