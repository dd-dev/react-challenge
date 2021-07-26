import React, { useMemo, useState } from "react";
import { Box, Button, Center, ChakraProvider, Container, Flex, Spinner, Stack, } from "@chakra-ui/react";
import { SWRConfig, useSWRInfinite } from "swr";
import { PostItem, PostModel } from "./components/PostItem";
import { fetcher } from "./fetcher";
import { SearchInput } from "./components/SearchInput";

type FilterState = { term: string };
const PAGE_SIZE = 5;

function App() {
  const [filterState, setFilterState] = useState<FilterState>({
    term: "",
  });
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<PostModel[]>(
    (index) =>
      `/posts?q=${filterState.term}&_limit=${PAGE_SIZE}&_start=${
        index * PAGE_SIZE
      }`,
    fetcher
  );

  const content = useMemo(() => {
    if (data) {
      if (data.length > 0) {
        return (
          <Stack spacing={5}>
            {data.map((page) =>
              page.map((post) => <PostItem key={post.id} post={post} />)
            )}
          </Stack>
        );
      }

      return <Box>Ни чего не найдено, измените параметры поиска.</Box>;
    }

    return null;
  }, [data]);

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        /* @ts-ignore */
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ChakraProvider>
        <Container maxW="container.xl" minH="100vh">
          <SearchInput
            onChange={(value: string) =>
              setFilterState((prevState) => ({
                ...prevState,
                term: value,
              }))
            }
          />

          <Box mt={10}>
            {data ? (
              <Box>
                <Flex justifyContent="flex-end" mb={5}>
                  <Button onClick={() => setSize(size + 1)}>
                    Загрузить ещё
                  </Button>
                </Flex>
                {content}
              </Box>
            ) : (
              <Center>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Center>
            )}
          </Box>
        </Container>
      </ChakraProvider>
    </SWRConfig>
  );
}

export default App;
