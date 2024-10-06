"use server"
import { axiosInstance } from "@/src/lib/axiosInstance";

export const getAllPosts = async() => {
    const res = await axiosInstance.get("/posts");

    return res.data;
}