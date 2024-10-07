"use server"
import { axiosInstance } from "@/src/lib/axiosInstance";
import { IQueryOptions } from "@/src/types";

export const getAllPosts = async(queryOptions:IQueryOptions) => {
    const res = await axiosInstance.get(`/posts`, {
        params: queryOptions
    });

    return res.data;
}