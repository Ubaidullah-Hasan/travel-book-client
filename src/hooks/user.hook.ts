"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { getSingleUserById, getUserFollowInfo, TIds, toggleUserFollowInfo, TUserPayment, updateUserProfile, userPayment } from "../services/userServices";

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

export const useUserPayment = () => {
    const queryClient = useQueryClient(); // Get the query client


    return useMutation<any, Error, TUserPayment>({
        mutationKey: ["USER_PAYMENT"],
        mutationFn: async (info) => await userPayment(info),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["USER_PAYMENT"]);
        },
        onError: (error) => {
            // toast.error(error.message);
            toast.error("Something went wrong! You must have 1 upvote for premium users.");
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

export const useGetSinglUserById = (userId: string | undefined) => {
    
    return useQuery<any, Error, FieldValues>({
        queryKey: ["GET_SINGL_USER"],
        queryFn: async () => await getSingleUserById(userId),
        enabled: !!userId,
    });
}