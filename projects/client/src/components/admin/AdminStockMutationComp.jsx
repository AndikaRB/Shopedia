import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";

const WarehouseAddress = ({
  isOpen,
  onClose,
  onSubmit,
  addFormik,
  formChangeHandler,
  header,
  selectProduct,
  selectWarehouse1,
  selectWarehouse2,
}) => {
  const [warehouse, setWarehouse] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedWarehouse1, setSelectedWarehouse1] = useState(0);
  const [selectedWarehouse2, setSelectedWarehouse2] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  selectWarehouse1(selectedWarehouse1)
  selectWarehouse2(selectedWarehouse2)
  selectProduct(selectedProduct)

  const fetchWarehouse = async () => {
    try {
      const response = await axiosInstance.get("/stock-mutation/warehouse");
      setWarehouse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderWarehouse = () => {
    return warehouse.map((val) => {
      return (
        <option value={val.id} key={val.id.toString()}>
          {val.warehouse_name}
        </option>
      );
    });
  };
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/stock-mutation/product");
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderProduct = () => {
    return product.map((val) => {
      return (
        <option value={val.id} key={val.id.toString()}>
          {val.product_name}
        </option>
      );
    });
  };

  const warehouseHandler1 = ({ target }) => {
    const { value } = target;
    setSelectedWarehouse1(value);
  };
  const warehouseHandler2 = ({ target }) => {
    const { value } = target;
    setSelectedWarehouse2(value);
  };
  const productHandler = ({ target }) => {
    const { value } = target;
    setSelectedProduct(value);
  };

  useEffect(() => {
    fetchWarehouse();
    fetchProduct()
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={"3xl"}
    >
      <form>
        <ModalOverlay />
        <ModalContent mt={"90px"} borderRadius="8px" overflow={false}>
          <ModalHeader
            fontSize={"24px"}
            fontWeight="bold"
            textAlign={"center"}
            borderBottom="1px solid #dfe1e3"
            p="0"
            h="36px"
          >
            <Text m="24px 0 16px">{header}</Text>
          </ModalHeader>
          <ModalCloseButton _hover={false} mt="10px" />

          <ModalBody
            overflowY={"scroll"}
            maxH="529px"
            p="24px 40px"
            fontSize={"14px"}
          >
            <Text
              // mb={"24px"}
              fontSize={"20px"}
              fontWeight="bold"
              color={"black"}
            >
              Add mutation details
            </Text>

            <Box mt="20px">
              <FormLabel>From Warehouse</FormLabel>
              <FormControl isInvalid={addFormik.errors.from_warehouse}>
                <Select
                  placeholder="--Select Warehouse--"
                  onChange={warehouseHandler1}
                >
                  {renderWarehouse()}
                </Select>
                <FormErrorMessage>
                  {addFormik.errors.from_warehouse}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <FormLabel>To Warehouse</FormLabel>
              <FormControl isInvalid={addFormik.errors.to_warehouse}>
                <Select
                  placeholder="--Select Warehouse--"
                  onChange={warehouseHandler2}
                >
                  {renderWarehouse()}
                </Select>

                <FormErrorMessage>
                  {addFormik.errors.to_warehouse}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <FormLabel mb="8px">Quantity</FormLabel>
              <FormControl isInvalid={addFormik.errors.quantity}>
                <Input
                  value={addFormik.values.quantity}
                  name="quantity"
                  type={"text"}
                  onChange={formChangeHandler}
                />

                <FormErrorMessage>
                  {addFormik.errors.quantity}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="12px">
              <FormLabel mb={"8px"}>Product Name</FormLabel>
              <FormControl isInvalid={addFormik.errors.ProductId}>
              <Select
                  placeholder="--Select Product--"
                  onChange={productHandler}
                >
                  {renderProduct()}
                </Select>


                <FormErrorMessage>
                  {addFormik.errors.ProductId}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box m="16px 0px" textAlign={"center"}>
              <Button
                p="0px 16px"
                fontSize={"16px"}
                color="white"
                fontWeight={"bold"}
                w="80px"
                _hover={false}
                bgColor="#F7931E"
                onClick={onSubmit}
                disabled={
                  !addFormik.values.quantity ||
                  !selectedWarehouse1 ||
                  !selectedWarehouse2 || 
                  !selectedProduct                
                }
              >
                Save
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default WarehouseAddress;
