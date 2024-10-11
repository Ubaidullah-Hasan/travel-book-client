"use server"
import axiosInstance from "@/src/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

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
