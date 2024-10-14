"use server"
import axiosInstance from "@/src/lib/axiosInstance"


export const getAllCategories = async () => {
    try {
        const res = await axiosInstance.get("/categories");

        return res.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}