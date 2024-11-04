"use server"
import { revalidateTag } from "next/cache";
import { axiosInstance } from "@/src/lib/axiosInstance";
import { IQueryOptions } from "@/src/types";

export const getAllPosts = async (queryOptions: IQueryOptions) => {
    try {
        const res = await axiosInstance.get(`/posts`, {
            params: queryOptions
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }

}

export const createPost = async (postData: FormData) => {
    try {
        const res = await axiosInstance.post(`/posts`, postData);

        revalidateTag("posts");

        return res.data;
    } catch (error: any) {
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
        console.log(error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
    }
}

export const getSinglePostByPostId = async (postId: string) => {
    console.log({postId});
    try {
        const res = await axiosInstance.get(`/posts/${postId}`);

        return res.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}

export type TUpdateData = {
    title: string,
    categoryId: string,
    isPremium: boolean,
}

export const updateSinglePost = async (updateData: TUpdateData, userId: string) => {
    try {
        const res = await axiosInstance.patch(`/posts/${userId}`, updateData);

        return res.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}


export type TToggleVote = {
    userId: string,
    postId: string,
}

export const toggleUpVote = async (info: TToggleVote) => {
    try {
        const res = await axiosInstance.patch(
            `/posts/toggle-upvote/${info?.postId}`,
            { userId: info?.userId }
        );

        return res.data;

    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
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
        throw new Error(error?.response?.data?.message);
    }
}


export const deletePostPermanently = async (postId: string) => {
    try {
        const res = await axiosInstance.delete(`/posts/${postId}`);

        revalidateTag("posts");

        return res.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message)
    }
}

