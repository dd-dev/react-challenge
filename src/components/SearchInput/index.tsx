import React, { FC, useState } from "react";
import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement, } from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useDebounce } from "react-use";

export const SearchInput: FC<{ onChange: (value: string) => void }> = ({
                                                                         onChange,
                                                                       }) => {
  const [termValue, setTermValue] = useState<string>("");

  useDebounce(() => onChange(termValue), 300, [termValue]);

  return (
    <InputGroup size="lg" mt={10}>
      <InputLeftElement
        pointerEvents="none"
        color="gray.300"
        fontSize="1.2em"
        children={<SearchIcon />}
      />
      <Input
        placeholder="Поиск"
        value={termValue}
        onChange={(event) => setTermValue(event.target.value)}
      />
      {termValue.length > 0 && (
        <InputRightElement
          children={
            <IconButton
              onClick={() => setTermValue("")}
              aria-label="Search database"
              icon={<CloseIcon />}
            />
          }
        />
      )}
    </InputGroup>
  );
};
