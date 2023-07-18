import {
    Box,
    Button,
    Grid,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    Text,
} from "@chakra-ui/react"

const ChangeAddress = ({
    username,
    id,
    email,
    phone_number,
    profile_picture,
    password,
    onViewDetail,
}) => {
    return (
        <Box p="16px 0" display={"flex"}>
            <Box p="16px" border="1px solid green">
                <Text p="14px 0 24px" fontWeight={"bold"}>
                    Change Your Personal Info
                </Text>

                <Box
                    fontSize="13px"
                    alignItems="flex-start"
                    border="1px solid red"
                >
                    <Stack spacing="10">
                        <HStack>
                            <Text w="114px" mr="16px">
                                Name
                            </Text>

                            <InputGroup w="100%">
                                <Input defaultValue={username} />
                            </InputGroup>
                        </HStack>

                        <HStack>
                            <Text w="114px" mr="16px">
                                Email
                            </Text>

                            <InputGroup w="100%">
                                <Input defaultValue={email} isDisabled />
                            </InputGroup>
                        </HStack>

                        <HStack>
                            <Text w="114px" mr="16px" border="1px solid brown">
                                Phone Number
                            </Text>
                            <InputGroup>
                                <InputLeftAddon children="+62" />
                                <Input defaultValue={phone_number} />
                            </InputGroup>
                        </HStack>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ChangeAddress
