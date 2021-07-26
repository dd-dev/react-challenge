import React, { FC } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "../../fetcher";

export type PostModel = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type UserModel = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

function useUser(id: number) {
  const { data, error } = useSWR<UserModel>(`/users/${id}`, fetcher);

  return { user: data, error };
}

export const PostItem: FC<{ post: PostModel }> = ({ post }) => {
  const { user } = useUser(post.userId);

  return (
    <Box borderRadius="md" p={4} borderColor="gray.200" borderWidth="1px">
      <Heading as="h3" size="lg">
        {post.title}
      </Heading>

      <Text>{post.body}</Text>
      {user && (
        <Box mt={5}>
          <Box fontWeight="bold">{user.name}</Box>
          <Box>{user.email}</Box>
          <Box>{user.phone}</Box>
        </Box>
      )}
    </Box>
  );
};
