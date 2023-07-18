import { Box, Button, FormControl, FormErrorMessage, FormLabel, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

const ModalEditCategory = ({ addNewCategory, isOpenEditCategory, onOpenEditCategory, onCloseEditCategory, editFormik, category_name, editChangeHandler, selectImage, setSelectImage, apiImg, category_image, inputFileRef, closeEditModal }) => {

    return (
        <Modal
            isOpen={isOpenEditCategory}
            onOpen={onOpenEditCategory}
            onClose={onCloseEditCategory}
            motionPreset="slideInBottom"
            size={"md"}
            closeOnEsc={false}
        >
            <form onSubmit={editFormik.handleSubmit}>
                <ModalOverlay bg="blackAlpha.400" />
                <ModalContent borderRadius={'10px'} mt={'120px'}>
                    <ModalHeader fontSize={"2xl"} fontWeight="bold" textAlign={'center'} color={'#31353BF5'} borderBottom={"thin dashed #E5E7E9"}>
                        Edit Category
                    </ModalHeader>
                    <ModalBody>
                        <FormLabel fontSize={'20px'} color={'#31353BF5'}>Category Name</FormLabel>
                        <FormControl isInvalid={editFormik.errors.category_name}>
                            <Input
                                type="text"
                                name={"category_name"}
                                defaultValue={category_name}
                                onChange={editChangeHandler}
                            />
                            <FormErrorMessage>
                                {editFormik.errors.category_name}
                            </FormErrorMessage>
                        </FormControl>

                        <FormLabel
                            mt={"15px"}
                            fontSize={'20px'}
                            color={'#31353BF5'}
                        >
                            Category Image
                        </FormLabel>
                        <FormControl isInvalid={editFormik.errors.category_image}>
                            <Box
                                h={'200px'}
                                bgColor={'#E2E2E2'}
                                borderRadius={'8px'}
                                w={'399.06px'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                mx={'auto'}
                                p={'32px'}
                                flexDir={'column'}

                            >
                                <Box w={'200px'} bgColor={'#fff'} display={'flex'} justifyContent={'center'} p={'3px 0px'}>
                                    <Image
                                        h={selectImage ? '80px' : '80px'}
                                        src={selectImage ? selectImage : `${apiImg}/${category_image}`}
                                    />
                                </Box>
                                <Input
                                    display="none"
                                    ref={inputFileRef}
                                    name="category_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                        setSelectImage(
                                            URL.createObjectURL(event.target.files[0])
                                        )
                                        editFormik.setFieldValue("category_image", event.target.files[0])
                                    }}
                                />
                                <Button
                                    bgColor={selectImage ? '#DC873F' : '#FFB43B'}
                                    _hover={{
                                        bgColor: "#DC873F"
                                    }}
                                    mt={'20px'}
                                    display={'flex'}
                                    color={'#fff'}
                                    onClick={() => {
                                        inputFileRef.current.click()
                                    }}
                                    width="200px"
                                    mx={'auto'}
                                    borderRadius={'8px'}
                                    minH={'40px'}
                                >
                                    {selectImage ? editFormik?.values?.category_image?.name : "Change Image"}
                                </Button>
                            </Box>
                            <FormErrorMessage>
                                {editFormik.errors.category_image}
                            </FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bgColor="white"
                            border={"1px solid #F7931E"}
                            _hover={false}
                            color="#F7931E"
                            mr={3}
                            onClick={closeEditModal}
                            borderRadius={'8px'}
                        >
                            Cancel
                        </Button>
                        <Button
                            borderRadius={'8px'}
                            bgColor="#F7931E"
                            color={"white"}
                            _hover={false}
                            mr={3}
                            type="submit"
                            isDisabled={category_name !== editFormik.values.category_name || selectImage ? false : true}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default ModalEditCategory