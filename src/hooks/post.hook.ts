"use client"
import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "../services/post"
import { IQueryOptions } from "../types"

export const useGetAllPosts = (queryOptions: IQueryOptions) => {
    return useQuery({
        queryKey: ["POST", queryOptions],
        queryFn: async () => await getAllPosts(queryOptions),
    })
}