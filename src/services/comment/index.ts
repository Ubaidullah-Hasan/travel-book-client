"use server"
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance"


export const createComment = async (data: FieldValues) => {
    try {
        const res = await axiosInstance.post("/comments", data);

        return res.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const getAllCommentsOfPost = async (postId: string) => {
    try {
        const res = await axiosInstance.get(`/comments/post/${postId}`);

        return res.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}



export const deleteCommentsByCommentId = async (commentId: string, userId: string) => {
    try {
        const res = await axiosInstance.delete(`/comments/${commentId}?userId=${userId}`);

        return res.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const editCommentsByOwner = async (commentinfo: any, userId: string) => {
    try {
        const res = await axiosInstance.patch(`/comments/${commentinfo?.commentId}?userId=${userId}`,
            { comment: commentinfo.comment }
        );

        return res.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}