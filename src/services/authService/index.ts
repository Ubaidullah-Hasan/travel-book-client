"use server"
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance"

export const registerUser = async (userInfo: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/register", userInfo)

        if (data.success) {
            cookies().set("accessToken", data?.data?.accessToken);
            cookies().set("refreshToken", data?.data?.refreshToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}