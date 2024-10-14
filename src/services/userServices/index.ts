"use server"
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance";

export const updateUserProfile = async (updateInfo: FieldValues, userEmail: string) => {
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
    try {
        const { data } = await axiosInstance.patch(
            `/users/user-follow`,
            ids
        );

        return data;
    } catch (error) {
        throw new Error("Failed to update profile!");
    }
}

export const getUserFollowInfo = async (userId: string | undefined) => {
    try {
        const { data } = await axiosInstance.get(
            `/users/user-follow/${userId}`
        );

        return data;
    } catch (error) {
        throw new Error("Failed to retrive follow info!");
    }
}

export const getSingleUserById = async (userId: string | undefined) => {
    try {
        const { data } = await axiosInstance.get(
            `/users/${userId}`
        );

        return data;
    } catch (error) {
        throw new Error("Failed to retrive follow info!");
    }
}

export type TUserPayment = {
    id: string | undefined,
    totalPrice: number,
}
export const userPayment = async (info: TUserPayment) => {
    try {
        const { data } = await axiosInstance.patch(
            `/users/user-payment/${info?.id}`,
            { totalPrice: info?.totalPrice }
        );

        return data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}
