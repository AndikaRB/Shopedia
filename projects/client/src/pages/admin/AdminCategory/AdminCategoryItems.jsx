import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Image,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../api";
import ModalEditCategory from "../../../components/admin/AdminCategory/ModalEditCategory";

const AdminCategoryItems = ({
  CategoryId,
  fetchCategory,
  category_name,
  category_image,
  onDelete,
  inputFileRef,
}) => {
  const [selectImage, setSelectImage] = useState(null);

  const authSelector = useSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenEditCategory,
    onOpen: onOpenEditCategory,
    onClose: onCloseEditCategory,
  } = useDisclosure();

  const toast = useToast();

  const editFormik = useFormik({
    initialValues: {
      category_name: "",
      category_image: null,
    },
    onSubmit: async ({ category_name, category_image }) => {
      try {
        const newCategory = new FormData();

        if (category_name) {
          newCategory.append("category_name", category_name);
        }

        if (category_image) {
          newCategory.append("category_image", category_image);
        }

        const response = await axiosInstance.patch(
          `/admin/categories/${CategoryId}`,
          newCategory
        );

        toast({
          title: "Category Edited",
          description: response.data.message,
          status: "success",
        });

        onCloseEditCategory();
        setSelectImage(null);
        fetchCategory();
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed Edit Category",
          description: error.response.data.message,
          status: "error",
        });
      }
    },
  });

  const editChangeHandler = ({ target }) => {
    const { name, value } = target;

    editFormik.setFieldValue(name, value);
  };

  const confirmDeleteBtnHandler = () => {
    onClose();
    onDelete();
  };

  const closeEditModal = () => {
    onCloseEditCategory();
    editFormik.setFieldValue("category_name", "");
    editFormik.setFieldValue("category_image", null);
    setSelectImage(null);
  };

  const apiImg = process.env.REACT_APP_IMAGE_URL;

  useEffect(() => {
    if (isOpenEditCategory) {
      editFormik.setFieldValue("category_name", category_name);
    }
    fetchCategory();
  }, [isOpenEditCategory]);

  return (
    <>
      {/* category data table */}
      <Tr>
        <Td>
          <Text fontWeight={"700"}>{category_name || "null"}</Text>
        </Td>
        <Td>
          <Image
            mx={"auto"}
            src={`${apiImg}/${category_image}`}
            width={"80px"}
            height={"80px"}
          />
        </Td>

        {/* Edit and Delete Button */}
        <Td>
          <Button
            bgColor={"#F8F7F7"}
            _hover={false}
            _active={false}
            color="#F7931E"
            onClick={onOpenEditCategory}
            width={"cover"}
            pr={"1px"}
            pl={"1px"}
            isDisabled={authSelector.RoleId !== 3 ? true : false}
          >
            <BiEdit fontSize={"25px"} />
          </Button>
          <Button
            _active={false}
            pr={"1px"}
            pl={"1px"}
            width={"cover"}
            bgColor={"#F8F7F7"}
            _hover={false}
            color="red"
            onClick={() => onOpen()}
            isDisabled={authSelector.RoleId !== 3 ? true : false}
          >
            <RiDeleteBin2Fill fontSize={"25px"} />
          </Button>
        </Td>
      </Tr>

      {/* Alert Dialog For Delete Category */}
      <AlertDialog
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
      >
        <AlertDialogOverlay bg="blackAlpha.400">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={onClose}
                bgColor={"#fff"}
                border={"1px solid red"}
                color={"red"}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={confirmDeleteBtnHandler}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Modal Edit Category */}
      <ModalEditCategory
        isOpenEditCategory={isOpenEditCategory}
        onOpenEditCategory={onOpenEditCategory}
        onCloseEditCategory={onCloseEditCategory}
        editFormik={editFormik}
        category_name={category_name}
        editChangeHandler={editChangeHandler}
        selectImage={selectImage}
        setSelectImage={setSelectImage}
        apiImg={apiImg}
        category_image={category_image}
        inputFileRef={inputFileRef}
        closeEditModal={closeEditModal}
      />
    </>
  );
};

export default AdminCategoryItems;
