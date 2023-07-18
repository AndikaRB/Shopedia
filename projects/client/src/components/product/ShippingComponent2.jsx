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

const ShippingComponent2 = () => {
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
            // console.warn(userData);
            // console.warn(fetchUser.data);
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

    const formChangeHandler = ({ target }) => {
        const { name, value } = target;
        searchFormik.setFieldValue(name, value);
    };

    const courierHandler = ({ target }) => {
        const { value } = target;
        setSelectedCourier(value);
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
                    origin: closestCity[0].warehouse.cityId,
                    destination: userData.cityId,
                    weight: values.weight,
                    courier: selectedCourier,
                };

                // console.log(costForm);

                const response = await axiosInstance.post("/shipment/query", costForm);

                toast({
                    title: "Successfully getting shipment cost",
                    status: "success",
                });
                setResults(response);
                // console.log(results);
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

    function distanceBetweenTwoPlace(
        firstLat,
        firstLon,
        secondLat,
        secondLon,
        unit
    ) {
        var firstRadlat = (Math.PI * firstLat) / 180;
        var secondRadlat = (Math.PI * secondLat) / 180;
        var theta = firstLon - secondLon;
        var radtheta = (Math.PI * theta) / 180;
        var distance =
            Math.sin(firstRadlat) * Math.sin(secondRadlat) +
            Math.cos(firstRadlat) * Math.cos(secondRadlat) * Math.cos(radtheta);
        if (distance > 1) {
            distance = 1;
        }
        distance = Math.acos(distance);
        distance = (distance * 180) / Math.PI;
        distance = distance * 60 * 1.1515;
        if (unit == "K") {
            distance = distance * 1.609344;
        }
        if (unit == "N") {
            distance = distance * 0.8684;
        }
        return distance;
    }

    const chooseOne = [];
    const tempDist = []
    for (var i = 0; i < warehouseData.length; i++) {
        const tempNum = distanceBetweenTwoPlace(
            userData.latitude,
            userData.longitude,
            warehouseData[i].latitude,
            warehouseData[i].longitude,
            "K"
        );
        tempDist.push(tempNum)
        chooseOne.push({
            warehouse: warehouseData[i],
            distance: tempNum,
        });

    }
    const minDist = Math.min(...tempDist)
    const closestCity = chooseOne.filter(x => x.distance == minDist)
    // console.log(closestCity[0].warehouse);

    useEffect(() => {
        fetchWarehouseData();
        fetchUserData();
    }, []);

    return (
        <Box mt="100px" ml="10%">
            <Grid templateColumns="1fr 1fr" gap="100px">
                <GridItem>
                    <Box mt="20px">
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

export default ShippingComponent2;