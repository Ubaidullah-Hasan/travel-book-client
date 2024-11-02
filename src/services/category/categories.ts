"use server"
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance"


export const getAllCategories = async () => {
    try {
        const res = await axiosInstance.get("/categories");

        return res.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const createCategory = async (category: FieldValues) => {
    try {
        const res = await axiosInstance.post("/categories", category);

        return res.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);

    }
}