"use server"
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance";

export const updateUserProfile = async (updateInfo: FieldValues, userEmail: string) => {
    console.log(updateInfo, userEmail);
    try {
        const { data } = await axiosInstance.patch(
            `/users/update-user/${userEmail}`,
            updateInfo
        );

        return data;
    } catch (error) {
        throw new Error("Failed to update profile!");
    }
}

export type TIds = { userId: string; followingId: string | undefined; }

export const toggleUserFollowInfo = async (ids: TIds) => {
    console.log( ids);
    try {
        const { data } = await axiosInstance.patch(
            `/users/user-follow`,
            ids
        );

        return data;
    } catch (error) {
        // console.log(error);
        throw new Error("Failed to update profile!");
    }
}

export const getUserFollowInfo = async (userId: string|undefined) => {
    try {
        const { data } = await axiosInstance.get(
            `/users/user-follow/${userId}`
        );

        return data;
    } catch (error) {
        throw new Error("Failed to retrive follow info!");
    }
}
