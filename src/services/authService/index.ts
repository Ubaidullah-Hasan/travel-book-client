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
        throw new Error(error.message);
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
        throw new Error(error.message);
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

export const logoutUser = async() => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
};

export const getNewAccessToken = async () => {
    try {
        const refreshToken = cookies().get("refreshToken")?.value;

        const res = await axiosInstance({
            url: "/auth/refresh-token",
            method: "POST",
            withCredentials: true,
            headers: {
                cookie: `refreshToken=${refreshToken}`,
            },
        });

        return res.data;
    } catch (error) {
        throw new Error("Failed to get new access token");
    }
};

export const changePassword = async (passInfo:FieldValues) => {
    try {
        const { data } = await axiosInstance.post("auth/change-password", passInfo);

        return data;
    } catch (error) {
        throw new Error("Failed to change password!");
    }
}