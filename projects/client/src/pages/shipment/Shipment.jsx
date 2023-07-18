import {
  Box,
  Text,
  Divider,
  FormLabel,
  Select,
  Button,
  FormControl,
  Input,
  useToast,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import { GiAirplaneDeparture } from "react-icons/gi";

const Shipment = () => {
  const [userData, setUserData] = useState({});
  const [warehouseData, setWarehouseData] = useState({});
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);
  const [selectedCourier, setSelectedCourier] = useState(0);
  const [results, setResults] = useState({});

  const toast = useToast();

  const fetchUserData = async () => {
    try {
      const fetchUser = await axiosInstance.get("/shipment/userAddress");
      setUserData(fetchUser.data.data);
      console.warn(userData)
      console.warn(fetchUser.data)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWarehouseData = async () => {
    try {
      const fetchWarehouse = await axiosInstance.get(
        "/shipment/warehouseAddress"
      );
      setWarehouseData(fetchWarehouse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const warehouseHandler = ({ target }) => {
    const { value } = target;
    setSelectedWarehouse(value);
  };

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    searchFormik.setFieldValue(name, value);
  };

  const courierHandler = ({ target }) => {
    const { value } = target;
    setSelectedCourier(value);
  };

  const renderWarehouse = () => {
    console.log(warehouseData)
    return Array.from(warehouseData).map((val) => {
      return (
        <option value={val.cityId} key={val.id.toString()}>
          {val.warehouse_name} | {val.city} | {val.cityId}
        </option>
      );
    });
  };
  const searchFormik = useFormik({
    initialValues: {
      destination: "",
      origin: "",
      weight: "",
      courier: "",
    },
    onSubmit: async (values) => {
      try {
        const costForm = {
          origin: selectedWarehouse,
          destination: userData.cityId,
          weight: values.weight,
          courier: selectedCourier,
        };

        console.log(costForm)

        const response = await axiosInstance.post("/shipment/query", costForm);

        toast({
          title: "Successfully getting shipment cost",
          status: "success",
        });
        setResults(response);
        console.log(results)
      } catch (error) {
        console.log("Server error creating cost query");
      }
    },
  });

  const mapCosts = () => {
    return results?.data?.results[0]?.costs.map((val) => {
      return (
        <Box>
          <HStack>
            <GiAirplaneDeparture />
            <Text fontWeight="bold" noOfLines="1">
              {val.service}
            </Text>
          </HStack>
          <Text>
            {val.cost[0].value.toLocaleString("in-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </Text>
          <Text>{val.cost[0].etd} (days)</Text>
        </Box>
      );
    });
  };

  console.warn(results)
  console.log(results?.data?.results[0]?.costs);
  useEffect(() => {
    fetchWarehouseData();
    fetchUserData();
  }, []);

  return (
    <Box mt="100px" ml="10%">
      <Text
        fontWeight="bold"
        fontSize="30px"
        alignSelf={"center"}
        textAlign="center"
      >
        Check Shipment Cost
      </Text>
      <Grid templateColumns="1fr 1fr" gap="100px">
        <GridItem>
          <Divider />
          <Box mt="20px">
            <Text>
              From your current location: <strong>{userData?.city ? userData.city : "Please login and set address"}</strong>
            </Text>
            <br />
            <FormLabel>To our warehouse: </FormLabel>
            <Select
              placeholder="--Select Warehouse--"
              onChange={warehouseHandler}
            >
              {renderWarehouse()}
            </Select>
            <FormLabel>Weight in grams:</FormLabel>
            <FormControl isInvalid={searchFormik.errors.warehouse_name}>
              <Input
                value={searchFormik.values.warehouse_name}
                name="weight"
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={formChangeHandler}
              />
            </FormControl>
            <FormLabel>Choose courier: </FormLabel>
            <Select placeholder="--Select Courier--" onChange={courierHandler}>
              <option value="pos">POS Indonesia</option>
              <option value="jne">JNE</option>
              <option value="tiki">TIKI</option>
            </Select>
            <Button
              bgColor="#0095DA"
              onClick={() => searchFormik.handleSubmit()}
            >
              Check Price
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <br />
          <Text>Shipment Cost Result:</Text>
          <br />
          <Text>
            Sending packages from{" "}
            <strong>
              {results?.data?.data?.rajaongkir?.origin_details?.city_name}
            </strong>{" "}
          </Text>
          <Text>
            all the way to{" "}
            <strong>
              {results?.data?.data?.rajaongkir?.destination_details?.city_name}
            </strong>
          </Text>
          <br />
          <Text>Using courier: </Text>
          <strong>{results?.data?.results[0]?.name}</strong>
          <Text>Services availablity:</Text>
          {mapCosts()}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Shipment;
