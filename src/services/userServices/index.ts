"use server"
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";
import axiosInstance from "@/src/lib/axiosInstance";
import { USER_ROLE } from "@/src/constant";

export const updateUserProfile = async (updateInfo: FieldValues, userEmail: string) => {
    try {
        const { data } = await axiosInstance.patch(
            `/users/update-user/${userEmail}`,
            updateInfo
        );

        revalidateTag("profile");

        return data;
    } catch (error) {
        // console.log(error.response.data.message)
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
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}

export const getSingleUserById = async (userId: string | undefined) => {
    try {
        const { data } = await axiosInstance.get(
            `/users/${userId}`
        );

        return data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}

export const getAllUsers = async () => {
    try {
        const { data } = await axiosInstance.get(
            `/users`
        );

        return data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
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


export const deleteUserByAdmin = async (userId: string) => {
    try {
        const { data } = await axiosInstance.patch(
            `/users/${userId}`,
        );

        revalidateTag("profile");

        return data;
    } catch (error) {
        throw new Error("Failed to update profile!");
    }
}


type TUserRole = keyof typeof USER_ROLE;

export type TEditUserPayload = {
    userId: string,
    role: TUserRole
}

export const editUserRoleByAdmin = async (payload: TEditUserPayload) => {
    try {
        const { data } = await axiosInstance.patch(
            `/users/role/${payload?.userId}`,
            { role: payload.role }
        );

        revalidateTag("profile");

        return data;
    } catch (error) {
        // console.log(error?.response?.data?.message);
        throw new Error("Failed to update profile!");
    }
}

// export type TSendMessage = { message: string, name: string, email: string }

export const sendMessage = async (payload: FieldValues) => {
    try {
        const { data } = await axiosInstance.post(
            `/contact-messages`,
            payload
        );

        return data;
    } catch (error) {
        // console.log(error?.response?.data?.message);
        throw new Error("Failed to send message!");
    }
}