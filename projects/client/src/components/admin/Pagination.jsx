import { Box, Button } from "@chakra-ui/react"
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai"

const Pagination = ({ previousPage, page, maxPage, nextPage }) => {
  return (
    <Box p="20px" fontSize={"16px"}>
      <Box textAlign={"center"}>
        <Button
          onClick={previousPage}
          disabled={page === 1 ? true : null}
          _hover={false}
          _active={false}
        >
          <AiOutlineLeftCircle fontSize={"20px"} />
        </Button>

        <Box display={"inline"}>{page}</Box>

        <Button
          onClick={nextPage}
          disabled={page >= maxPage ? true : null}
          _hover={false}
          _active={false}
        >
          <AiOutlineRightCircle fontSize={"20px"} />
        </Button>
        <Box>
          Page: {page} of {maxPage}
        </Box>
      </Box>
    </Box>
  )
}

export default Pagination
