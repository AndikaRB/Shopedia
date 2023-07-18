import {
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import Logo from "../../assets/Shopedia.png"

const AdminDashboard = () => {
  return (
    <>
      <Box marginTop="100px" marginLeft={"275px"} marginRight={"20px"}>
        <Box>
          <Text fontWeight={"bold"} fontSize="30px">
            Content
          </Text>
          <br />
          <Image
            src={Logo}
            alt="Logo"
            textAlign={"center"}
            paddingLeft="35%"
            // justifyContent={"center"}
            // justifyItems="center"
            // justifySelf={"center"}
            // alignItems="center"
            // alignSelf={"center"}
            // alignContent={"center"}
            // textAlign="center"
          />
          <Text textAlign="center">
            We are Shopedia, the leading online retailer for all your electronic
            needs. We carry the latest and greatest in electronics, from phones
            and tablets to laptops and gaming consoles. We have the best prices
            on the market, and our customer service is second to none. So what
            are you waiting for? Come and shop with us today!
          </Text>
          <br />
          <br />
          <Text textAlign={"center"}>
            You are the admin. Let's do something!
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
