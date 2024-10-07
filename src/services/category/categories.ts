"use server"
import axiosInstance from "@/src/lib/axiosInstance"


export const getAllCategories = async () => {
    const res = await axiosInstance.get("/categories");

    return res.data;
}