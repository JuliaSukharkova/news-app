import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post } from '../../../entities/post/model/types';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: Post[]; total: number }, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `posts?limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
