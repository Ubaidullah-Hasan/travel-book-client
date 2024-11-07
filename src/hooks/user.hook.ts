"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { deleteUserByAdmin, editUserRoleByAdmin, getAllUsers, getSingleUserById, getUserFollowInfo, sendMessage, TEditUserPayload, TIds, toggleUserFollowInfo, TUserPayment, updateUserProfile, userPayment } from "../services/userServices";

export const useUpdateProfile = (userEmail: string) => {

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["PROFILE_UPDATE"],
        mutationFn: async (data) => await updateUserProfile(data, userEmail),
        onSuccess: () => {
            toast.success("Successfully updated your profile!", {
                position: "top-center"
            });
        },
        onError: () => {
            toast.error("Something went wrong!");
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
export const useGetAllUsers = () => {

    return useQuery<any, Error, FieldValues>({
        queryKey: ["GET_ALL_USERS"],
        queryFn: async () => await getAllUsers(),
    });
}

export const useDeleteUser = () => {

    return useMutation<any, Error, string>({
        mutationKey: ["DELETE_USER"],
        mutationFn: async (userId) => await deleteUserByAdmin(userId),
        onSuccess: () => {
            toast.success("Blocked this user!", {
                position: "top-center"
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useEditUserRole = () => {

    return useMutation<any, Error, TEditUserPayload>({
        mutationKey: ["EDIT_USER"],
        mutationFn: async (payload) => await editUserRoleByAdmin(payload),
        onSuccess: () => {
            toast.success("User role updated!", {
                position: "top-center"
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useSendMessage = () => {

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["send_message"],
        mutationFn: async (payload) => await sendMessage(payload),
        onSuccess: () => {
            toast.success("Send message Successfully!", {
                position: "top-center"
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
