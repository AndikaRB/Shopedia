import { Box, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import page from "../assets/404 Error with a cute animal-rafiki.svg"
const NotFound = () => {
  return (
    <Box mt="66px">
      <Box mx="auto">
        <Image src={page} w="600px" mx={"auto"} mb="14px" />
        <Text
          textAlign={"center"}
          fontWeight="bold"
          fontSize={"24px"}
          mt="-82px"
        >
          OOPS! PAGE NOT FOUND
        </Text>

        <Text textAlign={"center"}>
          Sorry, the page you're looking for doesn't exist.{" "}
          <Link to={"/"}>
            <Text
              color={"#F7931E"}
              display="inline"
              textDecoration={"underline"}
            >
              Return to home
            </Text>
          </Link>
        </Text>
      </Box>
    </Box>
  )
}

export default NotFound
