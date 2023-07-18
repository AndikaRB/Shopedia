import { Box, Stack } from "@chakra-ui/react"

import { useState } from "react"

const CategoryList = ({ category_name, id }) => {
    // const [category, setCategory] = useState({ category_name: "", id: "" })

    // const fetchCategory = async () => {
    //     try {
    //         const response = await axiosInstance.get(`/product/${id}`)
    //         setCategory(response.data.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <>
            <Stack alignItems="flex-start">
                <Box
                    mb="2px"
                    w="full"
                    pl="5px"
                    textAlign="left"
                    variant="unstyled"
                    borderBottom="1px solid #dfe1e3"
                    borderRadius="10px"
                    _hover={{
                        bgColor: "#dfe1e3",
                        borderRadius: "10px",
                        color: "#0095DA",
                    }}
                    cursor="pointer"
                >
                    {category_name}
                </Box>
            </Stack>
        </>
    )
}

export default CategoryList
