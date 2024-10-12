"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { getUserFollowInfo, TIds, toggleUserFollowInfo, updateUserProfile } from "../services/userServices";

export const useUpdateProfile = (userEmail: string) => {

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["PROFILE_UPDATE"],
        mutationFn: async (data) => await updateUserProfile(data, userEmail),
        onSuccess: () => {
            toast.success("Successfully updated your profile!", {
                position: "top-center"
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}


export const useUpdateUserFollow = () => {
    const queryClient = useQueryClient(); // Get the query client


    return useMutation<any, Error, TIds>({
        mutationKey: ["USER_FOLLOW"],
        mutationFn: async (userIds) => await toggleUserFollowInfo(userIds),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["USER_FOLLOW"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useGetUserFollow = (userId: string | undefined) => {
    
    return useQuery<any, Error, FieldValues>({
        queryKey: ["USER_FOLLOW"],
        queryFn: async () => await getUserFollowInfo(userId),
        enabled: !!userId,
    });
}