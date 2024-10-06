"use client"
import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "../services/post"

export const useGetAllPosts = () => {
    return useQuery({
        queryKey: ["POST"],
        queryFn: async() => await getAllPosts(),
    })
}