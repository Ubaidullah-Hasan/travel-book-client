"use server"
import axiosInstance from "@/src/lib/axiosInstance"


export const getAllCategories = async () => {
    try {
        const res = await axiosInstance.get("/categories");

        return res.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message)
    }
}