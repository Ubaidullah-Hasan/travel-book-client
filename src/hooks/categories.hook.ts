"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"
import { createCategory, getAllCategories } from "../services/category/categories"

export const useGetAllCategories = () => {
    return useQuery({
        queryKey: ['GET_ALL_CATEGORY'],
        queryFn: async () => await getAllCategories(),
    })
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["CREATE_CATEGORY"],
        mutationFn: async (commentData) => await createCategory(commentData),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["GET_ALL_CATEGORY"]); 
            toast.success("Category create successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};