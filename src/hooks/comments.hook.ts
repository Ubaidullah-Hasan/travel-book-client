"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { createComment, deleteCommentsByCommentId, editCommentsByOwner, getAllCommentsOfPost } from "../services/comment";

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["CREATE_COMMENT"],
        mutationFn: async (commentData) => await createComment(commentData),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["GET_COMMENT_OF_POST"]); // "GET_COMMENT_OF_POST" ai kye er data remove kore de, pore abar fetch kore dekhai
            toast.success("Comment Added Successfully");
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        },
    });
};


export const useGetAllCommentsOfPost = (postId: string) => {
    return useQuery({
        queryKey: ["GET_COMMENT_OF_POST", postId],
        queryFn: async () => await getAllCommentsOfPost(postId),
        staleTime: 100, // Optional: Adjust stale time as needed => 5s seconds no request of same id
        enabled: !!postId
    });
}


export const useDeleteCommentsById = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationKey: ["DELETE_COMMENT_BY_ID"],
        mutationFn: async (commentId) => await deleteCommentsByCommentId(commentId, userId),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["GET_COMMENT_OF_POST"]); // "GET_COMMENT_OF_POST" ai kye er data remove kore de, pore abar fetch kore dekhai
            toast.success("Comment delete Successfull!");
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        },
    });
};


export const useEditCommentsByOwner = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, any>({
        mutationKey: ["EDIT_COMMENT_BY_OWNER"],
        mutationFn: async (commentInfo) => await editCommentsByOwner(commentInfo, userId),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["GET_COMMENT_OF_POST"]); // "GET_COMMENT_OF_POST" ai kye er data remove kore de, pore abar fetch kore dekhai
            toast.success("Comment update Successfull!");
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        },
    });
};