"use client"
import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "../services/category/categories"

export const useGetAllCategories = () => {
    return useQuery({
        queryKey: ['CATEGORY'],
        queryFn: async() => await getAllCategories(),
    })
}