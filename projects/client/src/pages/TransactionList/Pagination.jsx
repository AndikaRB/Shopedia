import { Box } from "@chakra-ui/react"

const Pagination = ({ searchParam, setPage, number, setSearchParam, transaction_page, page }) => {

    const pageBtnHandler = () => {
        setPage(number)
        const params = {}

        if (searchParam.get("status")) {
            params["status"] = searchParam.get("status")
        }

        if (searchParam.get("id")) {
            params["id"] = searchParam.get("id")
        } else if (searchParam.get("createdAt")) {
            params["createdAt"] = searchParam.get("createdAt")
        } else if (searchParam.get("updatedAt")) {
            params["updatedAt"] = searchParam.get("updatedAt")
        }

        if (searchParam.get("keyword")) {
            params["keyword"] = searchParam.get("keyword")
        }

        params["page"] = number
        setSearchParam(params)
    }

    return (
        <Box h={'20px'} w={'32px'} >
            <Box
                ml={'4px'}
                mr={'4px'}
                p={'1px 6px'}
                pb={'20px'}
                minW={'24px'}
                h={'20px'}
                fontFamily={"Open Sauce One, Nunito Sans, -apple-system, sans-serif"}
                fontSize={'14px'}
                lineHeight={'18px'}
                textAlign={'center'}
                key={number}
                onClick={pageBtnHandler}
                cursor={'pointer'}
                color={Number(transaction_page) === number || Number(page) === number ? '#0095DA' : '#31353BAD'}
                borderBottom={Number(transaction_page) === number || Number(page) === number ? '2px solid #0095DA' : null}
            >
                {number}
            </Box>
        </Box >
    )
}
export default Pagination