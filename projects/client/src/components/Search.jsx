import { Button, FormControl, Input, InputGroup } from "@chakra-ui/react"
import { TbSearch } from "react-icons/tb"

const Search = ({ formikSearch, searchHandler, placeholder, width }) => {
  return (
    <form onSubmit={formikSearch.handleSubmit}>
      <FormControl>
        <InputGroup textAlign={"right"}>
          <Input
            type={"text"}
            placeholder={placeholder}
            name="search"
            w={width}
            onChange={searchHandler}
            borderRightRadius="0"
            value={formikSearch.values.search}
            bgColor={"white"}
            _hover={false}
          />

          <Button
            borderLeftRadius={"0"}
            type="submit"
            bgColor={"white"}
            _hover={false}
            border="1px solid #e2e8f0"
            borderLeft={"0px"}
          >
            <TbSearch />
          </Button>
        </InputGroup>
      </FormControl>
    </form>
  )
}

export default Search
