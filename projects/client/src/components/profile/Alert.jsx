import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react"

const Alert = ({
  isOpen,
  cancelRef,
  onClose,
  onSubmit,
  body,
  header,
  rightButton,
  leftButton,
  color,
  responsive,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          p={{
            lg: "32px 32px 24px",
            md: "24px 16px 16px",
            base: "24px 16px 16px",
          }}
          my="auto"
          boxSize={"-moz-fit-content"}
          maxW={{ lg: "400px", md: "350px", base: "340px" }}
        >
          <AlertDialogHeader
            fontSize={{ lg: "24px", md: "20px", base: "20px" }}
            fontWeight="bold"
            mb="14px"
            p="0"
            textAlign={"center"}
          >
            {header}
          </AlertDialogHeader>
          <AlertDialogBody textAlign={"center"} p="0">
            <Text
              fontSize={"16px"}
              m="0px 0px 32px"
              display={{ lg: "block", md: "none", base: "none" }}
            >
              {body}
            </Text>
            <Text
              fontSize={"14px"}
              m="0px 0px 32px"
              display={{ lg: "none", md: "block", base: "block" }}
            >
              {responsive}
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter p="0" alignSelf="center">
            <Button
              ref={cancelRef}
              onClick={onClose}
              w={{ lg: "164px", md: "152px", base: "152px" }}
              h={{ lg: "48px", md: "40px", base: "40px" }}
              mr={"6px"}
              borderRadius="8px"
              fontWeight={"bold"}
              bgColor="white"
              border="1px solid"
              color={color}
              _hover={false}
              _active={false}
            >
              {leftButton}
            </Button>
            <Button
              fontWeight={"bold"}
              bgColor={color}
              color={"white"}
              type="submit"
              onClick={onSubmit}
              w={{ lg: "164px", md: "152px", base: "152px" }}
              h={{ lg: "48px", md: "40px", base: "40px" }}
              borderRadius="8px"
              _hover={false}
              textAlign="left"
              _active={false}
            >
              <Text
                maxW={"160px"}
                p="0 16px"
                overflow="hidden"
                textOverflow={"ellipsis"}
                display={{ lg: "block", md: "none", base: "none" }}
              >
                {rightButton}
              </Text>
              <Text
                maxW={"160px"}
                p="0 16px"
                overflow="hidden"
                textOverflow={"ellipsis"}
                display={{ lg: "none", md: "block", base: "block" }}
              >
                Confirm
              </Text>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default Alert
