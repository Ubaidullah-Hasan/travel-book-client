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
    try {
        const res = await axiosInstance.post(`/posts`, postData);

        revalidateTag("posts");

        return res.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error?.response?.data?.message)
    }
}

export const getUserAllPosts = async (queryOptions: IQueryOptions, userId: string) => {
    try {
        const res = await axiosInstance.get(`/posts/user-post/${userId}`, {
            params: queryOptions
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export type TToggleVote = {
    userId: string,
    postId: string,
}

export const toggleUpVote = async (info: TToggleVote) => {
    console.log(info)
    try {
        const res = await axiosInstance.patch(
            `/posts/toggle-upvote/${info?.postId}`,
            { userId: info?.userId }
        );

        return res.data;

    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const toggleDownVote = async (info: TToggleVote) => {
    try {
        const res = await axiosInstance.patch(
            `/posts/toggle-downvote/${info?.postId}`,
            { userId: info?.userId }
        );

        return res.data;

    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}


