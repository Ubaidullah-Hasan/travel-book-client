"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { createComment, getAllCommentsOfPost } from "../services/comment";

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["CREATECOMMENT_COMMENT"],
        mutationFn: async (commentData) => await createComment(commentData),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["GET_COMMENT_OF_POST"]); // "GET_COMMENT_OF_POST" ai kye er data remove kore de, pore abar fetch kore dekhai
            toast.success("Comment Added Successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useGetAllCommentsOfPost = (postId: string) => {
    return useQuery({
        queryKey: ["GET_COMMENT_OF_POST", postId],
        queryFn: async () => await getAllCommentsOfPost(postId),
        staleTime: 5000, // Optional: Adjust stale time as needed => 5s seconds no request of same id
    });
}
