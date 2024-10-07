"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/src/lib/axiosInstance"

export const registerUser = async (userInfo: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/register", userInfo)

        if (data.success) {
            cookies().set("accessToken", data?.result?.accessToken);
            cookies().set("refreshToken", data?.result?.refreshToken);
        }

        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const login = async (userinfo: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", userinfo);

        if (data.success) {
            cookies().set("accessToken", data?.result?.accessToken);
            cookies().set("refreshToken", data?.result?.refreshToken);
        }

        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

export const getCurrentUser = async () => {
    const accessToken = cookies().get("accessToken")?.value;

    let decodedToken = null;

    if (accessToken) {
        decodedToken = await jwtDecode(accessToken);

        const jwtPayload = {
            _id: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
            profilePhoto: decodedToken.profilePhoto,
            role: decodedToken.role,
            status: decodedToken.status,
            isVarified: decodedToken.isVarified,
            isDeleted: decodedToken.isDeleted,
        };

        return jwtPayload;
    }

    return decodedToken;
};

export const logoutUser = () => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
};