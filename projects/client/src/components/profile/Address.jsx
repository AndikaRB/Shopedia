import { Box, Image } from "@chakra-ui/react"

import { useSelector } from "react-redux"

const Address = () => {
    const authSelector = useSelector((state) => state.auth)

    return (
        <Box p="16px 0" display={"flex"} border="1px solid #dfe1e3">
            {/* Profile Photo */}
            <Box p="16px" width={"290px"}>
                <Box
                    p="16px"
                    mb="24px"
                    boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                    borderRadius="8px"
                >
                    <Image
                        src={authSelector.profile_picture}
                        alt="Jane Doe"
                        w={"258px"}
                        mb="16px"
                        borderRadius={"3px"}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Address
