import { Box, Button, FormControl, FormErrorMessage, FormLabel, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import uploadPH from "../../../assets/uploadPlaceHolder.png"

const ModalAddNewCategory = ({ addNewCategory, inputFileRef, closeAddNewModal, isOpenAddNewCategory, onCloseAddNewCategory, formikAddNewCategory, inputChangeHandler, selectImage, setSelectImage, doubleOnClick }) => {

    return (
        < Modal
            isOpen={isOpenAddNewCategory}
            onClose={onCloseAddNewCategory}
            motionPreset="slideInBottom"
            size={"md"}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <form onSubmit={formikAddNewCategory.handleSubmit}>
                <ModalOverlay bg="blackAlpha.400" />
                <ModalContent borderRadius={'10px'} mt={'120px'}>
                    <ModalHeader fontSize={"2xl"} fontWeight="bold" textAlign={'center'} color={'#31353BF5'} borderBottom={"thin dashed #E5E7E9"}>
                        Add New Category
                    </ModalHeader>

                    <ModalBody pt={'15px'}>
                        <FormLabel fontSize={'20px'} color={'#31353BF5'}>Category Name</FormLabel>
                        <FormControl isInvalid={formikAddNewCategory.errors.category_name}>
                            <Input
                                type="text"
                                name={"category_name"}
                                value={formikAddNewCategory.values.category_name}
                                onChange={inputChangeHandler}
                            />
                            <FormErrorMessage>{formikAddNewCategory.errors.category_name}</FormErrorMessage>
                        </FormControl>
                        <FormLabel
                            mt={"15px"}
                            fontSize={'20px'}
                            color={'#31353BF5'}
                        >
                            Category Image
                        </FormLabel>
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
                            {selectImage ? (
                                <Box w={'200px'} bgColor={'#fff'} display={'flex'} justifyContent={'center'} p={'3px 0px'}>
                                    <Image
                                        h={selectImage ? '80px' : '47px'}
                                        src={selectImage ? selectImage : uploadPH}
                                    />
                                </Box>
                            ) : (
                                <Image
                                    h={selectImage ? '80px' : '47px'}
                                    src={selectImage ? selectImage : uploadPH}
                                />
                            )}
                            <FormControl isInvalid={formikAddNewCategory.errors.category_image}>
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
                                        formikAddNewCategory.setFieldValue("category_image", event.target.files[0])
                                    }}
                                />
                                <Button
                                    bgColor={selectImage ? '#2c7a7b' : null}
                                    mt={'20px'}
                                    display={'flex'}
                                    colorScheme={'teal'}
                                    color={'#fff'}
                                    onClick={() => {
                                        inputFileRef.current.click()
                                    }}
                                    width="200px"
                                    mx={'auto'}
                                    borderRadius={'8px'}
                                >
                                    {formikAddNewCategory?.values?.category_image?.name || "Choose Image"}
                                </Button>
                                <FormErrorMessage>
                                    {formikAddNewCategory.errors.category_image}
                                </FormErrorMessage>
                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor="white" color={'green'} border={"1px solid green"} mr={3} onClick={closeAddNewModal} borderRadius={'8px'} >
                            Cancel
                        </Button>
                        <Button colorScheme="green" mr={3} onClick={addNewCategory} borderRadius={'8px'} isDisabled={!formikAddNewCategory.values.category_name || !formikAddNewCategory.values.category_image}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}
export default ModalAddNewCategory