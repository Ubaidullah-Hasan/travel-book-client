"use server"
import { revalidateTag } from "next/cache";
import { axiosInstance } from "@/src/lib/axiosInstance";
import { IQueryOptions } from "@/src/types";

export const getAllPosts = async (queryOptions: IQueryOptions) => {
    const res = await axiosInstance.get(`/posts`, {
        params: queryOptions
    });

    return res.data;
}

export const createPost = async (postData: FormData) => {
    const res = await axiosInstance.post(`/posts`, postData);

    revalidateTag("posts");

    return res.data;
}

export const getUserAllPosts = async (queryOptions: IQueryOptions, userId:string) => {
    try {
        const res = await axiosInstance.get(`/posts/user-post/${userId}`, {
            params: queryOptions
        });

        return res.data;
    } catch (error:any) {
        throw new Error(error.response.data.message);
    }
}
